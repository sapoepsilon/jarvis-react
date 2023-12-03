import { response } from "express";

// api/sendAudioFile.ts
export async function sendAudioFile(audioBlob: Blob): Promise<string> {
    const formData = new FormData();
    formData.append('file', audioBlob, 'recording.wav');
    formData.append('temperature', '0.2');
    formData.append('response-format', 'json');
    var responseMessage = "";
    try {
      const response = await fetch('http://127.0.0.1:8080/inference', {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        console.log('Audio file sent successfully');
      }else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      // Handle the response as needed
      const data = await response.json();
      console.log("response from whisper: " + data.text);
      responseMessage =  data.text;
    } catch (error) {
      responseMessage = "error: " + error;
      console.error('Error sending audio file:', error);
    }
    return responseMessage;
  }
