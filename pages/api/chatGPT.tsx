import { NextApiRequest, NextApiResponse } from "next";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const chatGPT = async (input: string) => {
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            temperature: 0.3,
            max_tokens: 128,
           prompt: input,
        });
        console.log(completion.data.choices[0].text);
        return completion.data.choices[0].text;
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