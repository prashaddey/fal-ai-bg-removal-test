import axios from 'axios';

const FAL_AI_API_KEY = 'YOUR_FAL_AI_API_KEY'; // Replace with your actual API key

export const processImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(
      'https://api.fal.ai/background-removal',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${FAL_AI_API_KEY}`,
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'arraybuffer',
      }
    );

    const blob = new Blob([response.data], { type: 'image/png' });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
};