import { NextApiRequest, NextApiResponse } from "next";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const chatGPT = async (input: string) => {
    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            max_tokens: 64,
            messages: [{"role": "system", "content": "You are a helpful assistant whose name is Ismatulla Mansurov."},
                {"role": "user", "content": input}],
        });
        console.log(completion.data.choices[0]);
        return completion.data.choices[0].message;
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