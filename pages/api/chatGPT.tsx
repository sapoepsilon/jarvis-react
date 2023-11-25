import playAudioFromText from "@/components/tts/play_audio_from_text";
import { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true});
 
const chatGPT = async (input: string, sendClickTime: Date) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
            max_tokens: 128
        });
        console.log(completion.choices[0].message?.content);
        console.log("sendClickTime: " + sendClickTime.getTime());
        playAudioFromText(completion.choices[0].message?.content ?? "", "alloy", sendClickTime);
        return completion.choices[0].message?.content;
    } catch (error) {
        if (error) {
            console.log(error);
            console.log(error);
        } else {
            console.log(error);
        }
    }
};

export default chatGPT;