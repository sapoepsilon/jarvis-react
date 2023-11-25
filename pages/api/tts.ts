// pages/api/tts.js
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const startTime = new Date(); // Start time
    try {
      const { input, voice = 'alloy', model = 'tts-1' } = req.body;
      const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      });

      const response = await openai.audio.speech.create({
        model,
        voice,
        input,
        response_format: 'mp3',
        speed: 1.1,
      });

      if (response.status !== 200) {
        throw new Error(`OpenAI Error: ${response.statusText}`);
      }

      // Set header for the audio content
      res.setHeader('Content-Type', 'audio/mpeg');

      // Stream the response to the client
      const readableStream = response.body as unknown as NodeJS.ReadableStream;
      readableStream.pipe(res);
      const endTime = new Date();
      const timeTaken = endTime.getTime() - startTime.getTime();
      console.log(`Time taken: ${timeTaken}ms`);
      
    } catch (error) {
      console.error('Error in text-to-speech streaming:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}
