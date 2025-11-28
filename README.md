<div align="center">

# Network Intrusion Detection System

### AI-Powered Security Analysis Platform

[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![XGBoost](https://img.shields.io/badge/XGBoost-ML-FF6600?style=for-the-badge&logo=xgboost&logoColor=white)](https://xgboost.ai)
[![Flask](https://img.shields.io/badge/Flask-API-000000?style=for-the-badge&logo=flask&logoColor=white)](https://flask.palletsprojects.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br/>

<img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"/>
<img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License"/>
<img src="https://img.shields.io/badge/Thesis-Project-purple?style=flat-square" alt="Thesis"/>

<br/><br/>

*A full-stack machine learning application for real-time network traffic analysis and cyber attack classification using the CICIDS2017 dataset.*

<br/>

[Features](#-features) · [Installation](#-installation) · [Usage](#-usage) · [Architecture](#-architecture) · [API Reference](#-api-reference)

</div>

---

## Overview

This Network Intrusion Detection System (NIDS) leverages advanced machine learning techniques to detect and classify **15 different types of network attacks**. Built as a comprehensive thesis project, it combines a robust Python backend with a modern React frontend, featuring an AI-powered assistant for user guidance.

<br/>

## Key Features

| Feature | Description |
|---------|-------------|
| **Multi-Class Detection** | Classifies 15 attack types including DDoS, DoS variants, Web Attacks, and more |
| **Real-Time Analysis** | Instant predictions with confidence scores for network traffic data |
| **Batch Processing** | Upload CSV files for bulk analysis of network flow records |
| **Interactive Dashboard** | Modern UI with visualizations and data exploration tools |
| **AI Assistant** | Gemini-powered chatbot for intelligent user support |
| **RESTful API** | Well-documented endpoints for seamless integration |

<br/>

## Attack Types Detected

<div align="center">

| Class | Attack Type | Description |
|:-----:|-------------|-------------|
| 0 | **BENIGN** | Normal network traffic |
| 1 | **Bot** | Botnet traffic and C&C communication |
| 2 | **DDoS** | Distributed Denial of Service |
| 3 | **DoS GoldenEye** | HTTP-based DoS attack |
| 4 | **DoS Hulk** | Hulk tool DoS attack |
| 5 | **DoS Slowhttptest** | Slow HTTP DoS attack |
| 6 | **DoS Slowloris** | Slowloris DoS attack |
| 7 | **FTP-Patator** | FTP brute force attack |
| 8 | **Heartbleed** | SSL/TLS vulnerability exploit |
| 9 | **Infiltration** | Network infiltration & lateral movement |
| 10 | **PortScan** | Network reconnaissance |
| 11 | **SSH-Patator** | SSH brute force attack |
| 12 | **Web Attack - Brute Force** | Web authentication attack |
| 13 | **Web Attack - SQL Injection** | Database injection attack |
| 14 | **Web Attack - XSS** | Cross-site scripting attack |

</div>

<br/>

## Technology Stack

<div align="center">

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white)
![XGBoost](https://img.shields.io/badge/XGBoost-FF6600?style=flat-square&logo=xgboost&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white)
![NumPy](https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white)
![scikit-learn](https://img.shields.io/badge/Scikit--Learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat-square&logo=chart.js&logoColor=white)

### AI Integration
![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=flat-square&logo=google&logoColor=white)

</div>

<br/>

## Project Structure

```
Thesis/
├── server/                          # Backend API
│   ├── main.py                      # Flask application & endpoints
│   └── requirements.txt             # Python dependencies
│
├── client/                          # Frontend Application
│   ├── src/
│   │   ├── App.jsx                  # Main application component
│   │   ├── components/
│   │   │   ├── Prediction.jsx       # Attack prediction interface
│   │   │   ├── Visualizations.jsx   # Data visualization gallery
│   │   │   └── Helper.jsx           # AI chatbot assistant
│   │   └── config/
│   │       ├── api.js               # API configuration
│   │       └── gemini.js            # Gemini AI setup
│   └── public/                      # Static assets & visualizations
│
├── jupyter_notebooks/               # Data Science Pipeline
│   ├── 1_NID_Basic_Inspection.ipynb
│   ├── 2_NID_UnderSampling_and_OverSampling.ipynb
│   ├── 3_NID_EDA_Feature_Engineering.ipynb
│   └── NID_Models.ipynb
│
├── xgboost_model.pkl               # Trained ML model
├── scaler_main.pkl                 # Feature scaler
├── sample_test_records.csv         # Sample test data
└── test_data (2).csv               # Labeled test dataset
```

<br/>

## Installation

### Prerequisites

- Python 3.9+
- Node.js 18+
- npm or yarn

### Backend Setup

```bash
# Navigate to server directory
cd server

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the Flask server
python main.py
```

The API will be available at `http://localhost:5000`

### Frontend Setup

```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

<br/>

## Usage

### Web Interface

1. **Prediction Tab**
   - *Manual Entry*: Input network flow features manually for single predictions
   - *CSV Upload*: Upload CSV files containing network flow data for batch analysis

2. **Visualizations Tab**
   - Explore pre-generated EDA visualizations
   - View correlation heatmaps, distribution plots, and model comparisons

3. **Helper Tab**
   - Interact with the AI-powered assistant
   - Get help with features, attack types, and system usage

### Sample Prediction

Upload the provided `sample_test_records.csv` or `test_data (2).csv` to test the system with real network flow data.

<br/>

## API Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Health check and model status |
| `POST` | `/predict` | Single prediction from JSON input |
| `POST` | `/predict_csv` | Batch predictions from CSV file |
| `GET` | `/attack_types` | List all detectable attack types |
| `GET` | `/model_info` | Model metadata and feature information |

### Example Request

```bash
# Single Prediction
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{"Flow Duration": 100, "Total Fwd Packets": 5, ...}'

# CSV Batch Prediction
curl -X POST http://localhost:5000/predict_csv \
  -F "file=@sample_test_records.csv"
```

### Example Response

```json
{
  "prediction": "DDoS",
  "confidence": 94.5,
  "label": 2,
  "timestamp": "2024-01-15T10:30:00Z"
}
```

<br/>

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (React + Vite)                     │
│  ┌─────────────┐  ┌─────────────────┐  ┌─────────────────────┐  │
│  │  Prediction │  │ Visualizations  │  │   Helper (Gemini)   │  │
│  └──────┬──────┘  └────────┬────────┘  └──────────┬──────────┘  │
└─────────┼──────────────────┼─────────────────────┼──────────────┘
          │                  │                     │
          │    HTTP/REST     │                     │ Gemini API
          ▼                  ▼                     ▼
┌─────────────────────────────────────┐  ┌────────────────────────┐
│         FLASK BACKEND               │  │    Google Gemini AI    │
│  ┌─────────────────────────────┐    │  └────────────────────────┘
│  │      API Endpoints          │    │
│  │  /predict  /predict_csv     │    │
│  │  /health   /attack_types    │    │
│  └──────────────┬──────────────┘    │
│                 │                    │
│  ┌──────────────▼──────────────┐    │
│  │    ML Pipeline              │    │
│  │  StandardScaler → XGBoost   │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

<br/>

## Dataset

This project uses the **CICIDS2017** dataset, a comprehensive benchmark dataset for network intrusion detection containing:

- **78 network flow features** extracted from packet captures
- **15 attack categories** plus benign traffic
- Real-world network traffic patterns

### Feature Categories

| Category | Examples |
|----------|----------|
| Flow Statistics | Duration, Packet counts, Byte counts |
| Packet Metrics | Length (min, max, mean, std), IAT statistics |
| TCP Flags | SYN, ACK, FIN, RST, PSH, URG counts |
| Flow Rates | Bytes/sec, Packets/sec |
| Timing | Active/Idle time metrics |

<br/>

## Jupyter Notebooks

The `jupyter_notebooks/` directory contains the complete data science pipeline:

| Notebook | Purpose |
|----------|---------|
| `1_NID_Basic_Inspection` | Data loading, structure exploration, missing value analysis |
| `2_NID_UnderSampling_and_OverSampling` | Class imbalance handling with SMOTE |
| `3_NID_EDA_Feature_Engineering` | Exploratory analysis and feature engineering |
| `NID_Models` | Model training, evaluation, and export |

<br/>

## Configuration

### Environment Variables

Create a `.env` file in the client directory for production:

```env
VITE_API_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_gemini_api_key
```

<br/>

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<br/>

## License

Distributed under the MIT License. See `LICENSE` for more information.

<br/>

## Acknowledgments

- [CICIDS2017 Dataset](https://www.unb.ca/cic/datasets/ids-2017.html) - Canadian Institute for Cybersecurity
- [XGBoost](https://xgboost.ai/) - Scalable and Flexible Gradient Boosting
- [Google Gemini](https://deepmind.google/technologies/gemini/) - AI Assistant Integration

<br/>

---

<div align="center">

**Built with passion for Cybersecurity & Machine Learning**

<br/>

*Thesis Project - 2024*

</div>
