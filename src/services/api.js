const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Health check
  healthCheck: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  },

  // Get cry classes
  getClasses: async () => {
    const response = await fetch(`${API_BASE_URL}/classes`);
    return response.json();
  },

  // Upload file prediction
  predictUpload: async (file, confidenceThreshold = 0.6) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('confidence_threshold', confidenceThreshold);

    const response = await fetch(`${API_BASE_URL}/predict/upload`, {
      method: 'POST',
      body: formData,
    });
    return response.json();
  },

  // Record prediction
  predictRecord: async (audioBlob, confidenceThreshold = 0.6) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        const base64Audio = reader.result.split(',')[1];
        
        const response = await fetch(`${API_BASE_URL}/predict/record`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            audio_data: base64Audio,
            format: 'base64',
            sample_rate: 16000,
            confidence_threshold: confidenceThreshold,
          }),
        });
        
        const data = await response.json();
        resolve(data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(audioBlob);
    });
  },

  // Stream prediction
  predictStream: async (audioChunks, confidenceThreshold = 0.6) => {
    const base64Chunks = await Promise.all(
      audioChunks.map(chunk => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result.split(',')[1]);
          };
          reader.readAsDataURL(chunk);
        });
      })
    );

    const response = await fetch(`${API_BASE_URL}/predict/stream`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chunks: base64Chunks,
        sample_rate: 16000,
        confidence_threshold: confidenceThreshold,
      }),
    });
    return response.json();
  },
};
