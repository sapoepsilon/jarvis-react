import axios, { AxiosResponse } from 'axios';
import * as https from "https";

export async function elevenlabs_request(inputeText: string, voice_id: string) {
    const API_URL = 'https://api.elevenlabs.io/v1/text-to-speech/'+voice_id;
    const API_KEY = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;


    interface SynthesizeSpeechData {
        "text": string;
    }

    const headers = {
        'x-api-key':'e7881881399d94d0d9938b04bbd27693',
        'Content-Type': 'application/json'
    };

    const data: SynthesizeSpeechData = {
        text: inputeText,
    }

        console.log("input text: " + data.text);

    const response = await axios.post(
        'https://api.elevenlabs.io/v1/text-to-speech/PjOz2N4u2h6AEZecKtW6',
        {
            text: 'Hello, does this work?',
            voice_settings: {
                stability: 0,
                similarity_boost: 0,
            },
        },
        {
            headers: {
                accept: '*/*',
                'xi-api-key': process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY,
                'Content-Type': 'application/json',
            },
        }
    ).then(function (response) {
        console.log("response", response);
        console.log("request", response.request);
        return response;
    }).catch(function (error) {
        console.log(error);
        throw error;
    });

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
