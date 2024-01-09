interface ChatGPTRequest {
    input: string;
    intervalSeconds: number;
  }
  
  interface ChatGPTResponse {
    response?: string;
    error?: string;
  }
  
  export async function callChatGPT(input: string, intervalSeconds: number): Promise<ChatGPTResponse> {
    try {
      const apiEndpoint = '/api/chatGPT';
      const payload: ChatGPTRequest = { input, intervalSeconds };
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      return response.json();
    } catch (error) {
      if (error instanceof Error) {
        console.error('Network error:', error.message);
        return { error: error.message };
      }
      return { error: 'An unknown error occurred.' };
    }
  }