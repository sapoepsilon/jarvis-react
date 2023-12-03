// pages/api/proxy.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const externalApiUrl = 'http://127.0.0.1:8080/inference';

    try {
        // Forwarding the request to the external API
        const serverResponse = await fetch(externalApiUrl, {
            method: 'POST',
            headers: req.headers,
                body: req.body
        });
        // Forwarding the response back to the client
        const data = await serverResponse.json();
        res.status(serverResponse.status).json(data);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: (error as Error).message });
    }
}
