import axios, {AxiosResponse} from 'axios';

export async function elevenlabs_request(inputText: string, voice_id: string) {
    const headers = new Headers({
        accept: '*/*',
        'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY as string,
        'Content-Type': 'application/json',
    });

    const sentences = inputText.split('.');
    const audioBuffers: ArrayBuffer[] = [];

    for (const sentence of sentences) {
        if (sentence.trim() !== '') {
            const response = await fetch(
                'https://api.elevenlabs.io/v1/text-to-speech/'+ voice_id + '/stream',
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        text: sentence.trim(),
                        voice_settings: {
                            stability: 0,
                            similarity_boost: 1,
                        },
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            } else {
                console.log("response ok: " + sentence);
            }

            const buffer = await response.arrayBuffer();
            audioBuffers.push(buffer);
        }
    }

    // Play the audio buffers in FIFO order
    for (const buffer of audioBuffers) {
        await playAudio(buffer);
    }
}

async function playAudio(buffer: ArrayBuffer) {
    const AudioContext = (window.AudioContext || (window as any).webkitAudioContext) as typeof window.AudioContext;

    if (!AudioContext) {
        alert('AudioContext is not supported by your browser. Please try using a different browser.');
        return;
    }

    const audioContext = new AudioContext();
    const audioBuffer = await audioContext.decodeAudioData(buffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
    await new Promise(resolve => setTimeout(resolve, audioBuffer.duration * 1000));
}

export async function elevenlabs_getVoices(inputeText: string, voice_id: string) {
    const API_URL = 'https://api.elevenlabs.io/v1/text-to-speech/yoZ06aMxZJJ28mfd3POQ';
    const API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;


    interface SynthesizeSpeechData {
        "text": string;
    }

    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    };

    const data: SynthesizeSpeechData = {
        text: inputeText,
    }

    try {
        console.log("input text: " + data.text);
        const response = await axios({method: 'get', url: 'https://api.elevenlabs.io/v1/voices', headers: headers,});

        console.log("response", response);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
