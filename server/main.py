from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import joblib
import io
import logging
import os

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Global variables
model = None
scaler = None

# Attack type mappings
ATTACK_TYPES = {
    0: "BENIGN",
    1: "Bot", 
    2: "DDoS",
    3: "DoS GoldenEye",
    4: "DoS Hulk",
    5: "DoS Slowhttptest", 
    6: "DoS slowloris",
    7: "FTP-Patator",
    8: "Heartbleed",
    9: "Infiltration",
    10: "PortScan",
    11: "SSH-Patator",
    12: "Web Attack � Brute Force",
    13: "Web Attack � Sql Injection", 
    14: "Web Attack � XSS"
}

def load_model():
    """Load the XGBoost model and scaler"""
    global model, scaler
    try:
        model_path = os.path.join(os.path.dirname(__file__), '..', 'xgboost_model.pkl')
        scaler_path = os.path.join(os.path.dirname(__file__), '..', 'scaler_main.pkl')
        
        model = joblib.load(model_path)
        scaler = joblib.load(scaler_path)
        
        logger.info(f"Model loaded: {model.n_features_in_} features expected")
        return True
    except Exception as e:
        logger.error(f"Error loading model: {str(e)}")
        return False

# def prepare_features(df):
#     """Prepare features for prediction"""
#     try:
#         # Get expected feature order from model
#         feature_names = model.get_booster().feature_names
        
#         # Remove label columns if present
#         label_cols = ['Label', 'Label_Encoded']
#         for col in label_cols:
#             if col in df.columns:
#                 df = df.drop(columns=[col])
        
#         # Ensure we have all required features in correct order
#         missing_features = set(feature_names) - set(df.columns)
#         if missing_features:
#             logger.warning(f"Missing features: {missing_features}")
#             for feature in missing_features:
#                 df[feature] = 0
        
#         # Select features in model's expected order
#         df = df[feature_names]
        
#         # Check if data is already scaled
#         data_min = df.min().min()
#         data_max = df.max().max()
#         is_scaled = (data_min >= 0 and data_max <= 1.0 and df.mean().mean() < 0.5)
        
#         if is_scaled:
#             logger.info("Data appears to be already scaled, skipping scaler")
#             return df.values
#         else:
#             logger.info("Applying scaler to raw data")
#             # Handle inf/nan before scaling
#             df = df.replace([np.inf, -np.inf], np.nan)
#             df = df.fillna(0)
#             return scaler.transform(df)
        
#     except Exception as e:
#         logger.error(f"Error preparing features: {str(e)}")
#         raise

def prepare_features(df):
    """Prepare features for prediction - handles mixed scaled/unscaled data"""
    try:
        # Get expected feature order from model
        feature_names = model.get_booster().feature_names
        
        # Remove label columns if present
        label_cols = ['Label', 'Label_Encoded']
        for col in label_cols:
            if col in df.columns:
                df = df.drop(columns=[col])
        
        # Ensure we have all required features in correct order
        missing_features = set(feature_names) - set(df.columns)
        if missing_features:
            logger.warning(f"Missing features: {missing_features}")
            for feature in missing_features:
                df[feature] = 0
        
        # Select features in model's expected order
        df = df[feature_names]
        
        # Handle inf/nan values
        df = df.replace([np.inf, -np.inf], np.nan)
        df = df.fillna(0)
        
        # Check each row individually for scaling
        processed_rows = []
        for idx, row in df.iterrows():
            row_values = row.values
            row_min = np.min(row_values)
            row_max = np.max(row_values)
            row_mean = np.mean(row_values)
            
            # Determine if this specific row is scaled
            row_is_scaled = (row_min >= -0.01 and row_max <= 1.01 and row_mean < 0.5)
            
            if row_is_scaled:
                # Row is already scaled, use as-is
                processed_rows.append(row_values)
            else:
                # Row needs scaling
                row_scaled = scaler.transform(row_values.reshape(1, -1))[0]
                processed_rows.append(row_scaled)
        
        result = np.array(processed_rows)
        logger.info(f"Processed {len(df)} rows: detected mixed scaling")
        return result
        
    except Exception as e:
        logger.error(f"Error preparing features: {str(e)}")
        raise


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/predict', methods=['POST'])
def predict_single():
    """Predict attack type for a single set of features"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        data = request.json
        if not data:
            return jsonify({'error': 'No data provided'}), 400
        
        # Convert to DataFrame
        df = pd.DataFrame([data])
        
        # Prepare features
        features = prepare_features(df)
        
        # Make prediction
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        confidence = float(probabilities[prediction]) * 100
        
        result = {
            'label': int(prediction),
            'attack_type': ATTACK_TYPES.get(prediction, 'Unknown'),
            'confidence': round(confidence, 2),
            'timestamp': pd.Timestamp.now().isoformat()
        }
        
        logger.info(f"Single prediction: {result['attack_type']} ({result['confidence']}%)")
        return jsonify(result)
        
    except Exception as e:
        logger.error(f"Error in single prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/predict_csv', methods=['POST'])
def predict_csv():
    """Predict attack types for CSV file upload"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400
        
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not file.filename.lower().endswith('.csv'):
            return jsonify({'error': 'File must be a CSV'}), 400
        
        # Read CSV file
        csv_content = file.read().decode('utf-8')
        df = pd.read_csv(io.StringIO(csv_content))
        
        if df.empty:
            return jsonify({'error': 'CSV file is empty'}), 400
        
        # Check for ground truth labels (for comparison if available)
        has_labels = 'Label' in df.columns or 'Label_Encoded' in df.columns
        actual_labels = None
        
        if has_labels:
            if 'Label_Encoded' in df.columns:
                actual_labels = df['Label_Encoded'].values
            elif 'Label' in df.columns:
                # Map text labels to encoded values
                label_to_code = {v: k for k, v in ATTACK_TYPES.items()}
                actual_labels = df['Label'].map(label_to_code).values
        
        # Prepare features
        features = prepare_features(df)
        
        # Make predictions
        predictions = model.predict(features)
        probabilities = model.predict_proba(features)
        
        # Prepare results
        results = []
        correct_count = 0
        
        for i, (pred, probs) in enumerate(zip(predictions, probabilities)):
            confidence = float(probs[int(pred)]) * 100  # Ensure pred is int
            
            result_item = {
                'row': i + 1,
                'predicted_label': int(pred),
                'predicted_type': ATTACK_TYPES.get(int(pred), 'Unknown'),
                'confidence': round(confidence, 2)
            }
            
            # Add actual vs predicted if labels available
            if actual_labels is not None and i < len(actual_labels):
                actual = int(actual_labels[i])  # Convert numpy int to Python int
                result_item['actual_label'] = actual
                result_item['actual_type'] = ATTACK_TYPES.get(actual, 'Unknown')
                # Fix: Convert numpy bool to Python bool/string
                is_correct = bool(pred == actual)  # Convert to Python bool
                result_item['correct'] = is_correct
                if is_correct:
                    correct_count += 1
            
            results.append(result_item)
        
        response = {
            'total_predictions': len(results),
            'results': results,
            'timestamp': pd.Timestamp.now().isoformat()
        }
        
        # Add accuracy if labels were available
        if actual_labels is not None:
            accuracy = correct_count / len(results) * 100
            response['accuracy'] = round(accuracy, 2)
            response['correct_predictions'] = correct_count
            response['incorrect_predictions'] = len(results) - correct_count
        
        logger.info(f"CSV prediction completed: {len(results)} predictions")
        if actual_labels is not None:
            logger.info(f"Accuracy: {response['accuracy']}%")
        
        return jsonify(response)
        
    except Exception as e:
        logger.error(f"Error in CSV prediction: {str(e)}")
        return jsonify({'error': str(e)}), 500

@app.route('/attack_types', methods=['GET'])
def get_attack_types():
    """Get all available attack types"""
    return jsonify(ATTACK_TYPES)

@app.route('/model_info', methods=['GET'])
def get_model_info():
    """Get information about the loaded model"""
    try:
        if model is None:
            return jsonify({'error': 'Model not loaded'}), 500
        
        info = {
            'model_type': str(type(model).__name__),
            'feature_count': model.n_features_in_,
            'feature_names': model.get_booster().feature_names,
            'classes': len(ATTACK_TYPES),
            'attack_types': ATTACK_TYPES
        }
        
        return jsonify(info)
        
    except Exception as e:
        logger.error(f"Error getting model info: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    if load_model():
        logger.info("Starting Flask server...")
        app.run(debug=True, host='0.0.0.0', port=5000)
    else:
        logger.error("Failed to load model. Exiting...")
        exit(1)