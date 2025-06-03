// src/config/configService.js
export const fetchConfig = async () => {
    try {
      const response = await fetch('/config.json');

      console.log('response', response);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const config = await response.json(); // Parse JSON only if it's the correct content type
        return config.apiBaseUrl;
      } else {
        throw new Error('Response is not JSON');
      }
    } catch (error) {
      console.error('Failed to fetch configuration:', error);
      throw error;
    }
  };
  