import OpenAI from 'openai';
import type { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type Run = {
  thread_id: string;
  id: string;
};

export default async function chatGPT(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { input, intervalSeconds, assistant_id } = req.body;

    if (
      typeof input !== 'string' ||
      typeof intervalSeconds !== 'number' ||
      typeof assistant_id !== 'string'
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid input, intervalSeconds, or assistant_id.' });
    }

    const run: Run = await openai.beta.threads.createAndRun({
      assistant_id: assistant_id,
      thread: {
        messages: [{ role: 'user', content: input }],
      },
    });

    const message = await waitForFirstMessage(
      run.thread_id,
      run.id,
      intervalSeconds,
    );
    res.status(200).json({ response: message });
  } catch (e) {
    if (e instanceof Error) {
      console.error('API error:', e.message);
      res.status(500).json({ error: e.message });
    } else {
      console.error('API error: An unknown error occurred.');
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  }
}

const waitForFirstMessage = async (
  threadId: string,
  runId: string,
  intervalSeconds: number,
): Promise<string | null> => {
  while (true) {
    const status = await openai.beta.threads.runs.retrieve(threadId, runId);
    console.log(status.status);
    if (status.status === 'completed') {
      const messages = await openai.beta.threads.messages.list(threadId);
      console.log(messages.data);
      if (messages && messages.data && messages.data.length > 0) {
        return extractFirstPartOfMessage(messages.data[0]);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, intervalSeconds * 1000));
  }
};

const extractFirstPartOfMessage = (message: any): string | null => {
  if (
    message.content &&
    Array.isArray(message.content) &&
    message.content.length > 0
  ) {
    console.log(message.content);
    const firstPart = message.content[0];
    if (firstPart.type === 'text' && firstPart.text && firstPart.text.value) {
      return firstPart.text.value;
    }
  }
  return null;
};
