// utils/audioConverter.ts
export function convertToWav(audioBlob: Blob): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(audioBlob);
      reader.onloadend = () => {
        const buffer = reader.result as ArrayBuffer;
        const view = new DataView(buffer);
      
        // Basic WAV container properties
        const format = 1; // PCM
        const channels = 1; // Mono
        const sampleRate = 16000; // Sample rate
        const bitsPerSample = 16; // 16-bit
      
        const blockAlign = channels * bitsPerSample / 8;
        const byteRate = sampleRate * blockAlign;
      
        // Create a new ArrayBuffer for the WAV file
        const wavBuffer = new ArrayBuffer(44 + buffer.byteLength);
        const wavView = new DataView(wavBuffer);
      
        // Write the RIFF header
        writeString(wavView, 0, 'RIFF');
        wavView.setUint32(4, 36 + buffer.byteLength, true); // File size
        writeString(wavView, 8, 'WAVE');
        writeString(wavView, 12, 'fmt ');
        wavView.setUint32(16, 16, true); // Subchunk1Size
        wavView.setUint16(20, format, true); // Audio format (PCM)
        wavView.setUint16(22, channels, true); // NumChannels
        wavView.setUint32(24, sampleRate, true); // SampleRate
        wavView.setUint32(28, byteRate, true); // ByteRate
        wavView.setUint16(32, blockAlign, true); // BlockAlign
        wavView.setUint16(34, bitsPerSample, true); // BitsPerSample
        writeString(wavView, 36, 'data');
        wavView.setUint32(40, buffer.byteLength, true); // Subchunk2Size
      
        // Append the actual audio data from the original buffer
        new Uint8Array(wavBuffer).set(new Uint8Array(buffer), 44);
      
        const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
        resolve(wavBlob);
      };
      
 
      reader.onerror = (error) => reject(error);
    });

    function writeString(view, offset, string) {
        for (let i = 0; i < string.length; i++) {
          view.setUint8(offset + i, string.charCodeAt(i));
        }
      }
      
  }
  