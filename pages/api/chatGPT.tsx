// /pages/api/chatGPT.ts
import playAudioFromText from "@/components/tts/play_audio_from_text";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

// Correctly define the API route handler
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Ensure the input is a string
        const { input, sendClickTime } = req.body;
        if (typeof input !== 'string') {
            return res.status(400).json({ error: 'Input must be a string.' });
        }

        console.log("input:", input);

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
            max_tokens: 128
        });

        console.log(completion.choices[0].message?.content);
        console.log("sendClickTime:", new Date(sendClickTime).getTime());

        await playAudioFromText(completion.choices[0].message?.content ?? "", "alloy", new Date(sendClickTime));

        // Send response back
        res.status(200).json({ response: completion.choices[0].message?.content });
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: error.message || 'An unknown error occurred.' });
    }
}


// import playAudioFromText from "@/components/tts/play_audio_from_text";
// import { NextApiRequest, NextApiResponse } from "next";
// import OpenAI from "openai";
//
// const openai = new OpenAI({
//     apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
//
// const chatGPT = async (input: string, sendClickTime: Date) => {
//     try {
//         console.log("input: " + input);
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: "user", content: input }],
//             max_tokens: 128
//         });
//         console.log(completion.choices[0].message?.content);
//         console.log("sendClickTime: " + sendClickTime.getTime());
//         await playAudioFromText(completion.choices[0].message?.content ?? "", "alloy", sendClickTime);
//         return completion.choices[0].message?.content;
//     } catch (error) {
//         if (error) {
//             console.log(error);
//             console.log(error);
//         } else {
//             console.log(error);
//         }
//     }
// };
//
// export default chatGPT;