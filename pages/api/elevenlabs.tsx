import axios, {AxiosResponse} from 'axios';
let audioBuffers: ArrayBuffer[] = [];  // global variable to store audioBuffers
let isPlaying = false;  // global flag to check if audio is playing
// Event system to listen for changes to audioBuffers
class Emitter {
    listeners: { [key: string]: Function[] } = {};
    on(message: string, listener: Function) {
        if (!this.listeners[message]) {
            this.listeners[message] = [];
        }
        this.listeners[message].push(listener);
    }

    emit(message: string, payload: any) {
        if (this.listeners[message]) {
            for (const listener of this.listeners[message]) {
                listener(payload);
            }
        }
    }
}

const emitter = new Emitter();
emitter.on('bufferReady', playNextAudio);
export async function elevenlabs_request(inputText: string, voice_id: string) {
    const headers = new Headers({
        accept: '*/*',
        'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY as string,
        'Content-Type': 'application/json',
    });

    const sentences = processText(inputText);
    let sentenceNumber = 0;
    for (const sentence of sentences) {
        if (sentence.trim() !== '') {
            const response = await fetch(
                'https://api.elevenlabs.io/v1/text-to-speech/' + voice_id,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        text: sentence.trim(),
                    }),
                }
            );
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const buffer = await response.arrayBuffer();
            audioBuffers.push(buffer);

            // Emit event to indicate buffer is ready
            emitter.emit('bufferReady', buffer);
            sentenceNumber += 1;
        }
    }
}

function processText(text: string): string[] {
    console.log("processing text: " + text + "");
    const rawSentences = text.split(".");
    const processedSentences: string[] = [];

    let buffer = "";
    for (let i = 0; i < rawSentences.length; i++) {
        const sentence = rawSentences[i].trim();
        if (buffer) {
            const combinedSentence = `${buffer}. ${sentence}`;
            buffer = "";
            if (combinedSentence.split(" ").length < 3) {
                buffer = combinedSentence;
                continue;
            }
            processedSentences.push(combinedSentence);
        } else {
            if (sentence.split(" ").length < 3) {
                buffer = sentence;
                continue;
            }
            processedSentences.push(sentence);
        }
    }
    if (buffer) {
        processedSentences.push(buffer);
    }
    return processedSentences;
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

    isPlaying = true; // set flag to true when audio starts

    source.onended = function() {
        isPlaying = false; // set flag back to false when audio finishes
        setTimeout(playNextAudio,  500); // half second delay before playing next audio
    };
}

async function playNextAudio() {
    if (!isPlaying && audioBuffers.length > 0) {
        await playAudio(audioBuffers.shift()!); // play next audio if any
    }
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
