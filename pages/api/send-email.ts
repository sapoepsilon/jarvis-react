import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export default async function handler(req: Request, res: Response) {
    if (req.method === 'POST') {
        const { fullName, email, message } = req.body;
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.CHATGENIE_EMAIL,
                pass: process.env.CHATGENIE_PASSWORD,
            },
        });
        const mailOptions = {
            from: 'chatgenieaiassistant@gmail.com',
            to: 'chatgenieaiassistant@gmail.com',
            subject: `New message from ${fullName}`,
            text: `You have received a new message from ${fullName} (${email}):\n\n${message}`,
        };
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: error });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
