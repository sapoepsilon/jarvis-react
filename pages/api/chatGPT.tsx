import { NextApiRequest, NextApiResponse } from "next";
import {Configuration, OpenAIApi} from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { prompt } = req.body;
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: prompt,
            max_tokens: 150,
            n: 1,
            stop: null,
            temperature: 0.7
        });
        res.status(200).json(response.data.choices[0].text);
    } catch (error) {
        console.log(error);
        // @ts-ignore
        res.status(500).json({ error: error.message });
    }
};

export default handler;