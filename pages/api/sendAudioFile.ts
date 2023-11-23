// api/sendAudioFile.ts
export async function sendAudioFile(audioBlob: Blob): Promise<void> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('temperature', '0.2');
    formData.append('response-format', 'json');
  
    try {
      const response = await fetch('http://127.0.0.1:8080/inference', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Handle the response as needed
      const data = await response.json();
      console.log("response from whisper: " + data);
    } catch (error) {
      console.error('Error sending audio file:', error);
    }
  }
  