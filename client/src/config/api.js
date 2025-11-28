// API Configuration
export const API_BASE_URL = 'http://127.0.0.1:5000/'

export const API_ENDPOINTS = {
  PREDICT: `${API_BASE_URL}/predict`,
  PREDICT_CSV: `${API_BASE_URL}/predict_csv`,
  HEALTH: `${API_BASE_URL}/health`,
  ATTACK_TYPES: `${API_BASE_URL}/attack_types`,
  MODEL_INFO: `${API_BASE_URL}/model_info`,
  DATASET_INFO: `${API_BASE_URL}/dataset_info`,
  DATASET_SAMPLE: `${API_BASE_URL}/dataset_sample`,
  DATASET_STATS: `${API_BASE_URL}/dataset_stats`
}

export default API_ENDPOINTS