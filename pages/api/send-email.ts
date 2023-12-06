import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

export default async function handler(req: Request, res: Response) {
    if (req.method === 'POST') {
        // Destructure the data from the request body
        const { fullName, email, message } = req.body;
        // Create a transporter for nodemailer
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.CHATGENIE_EMAIL, // Your email
                pass: process.env.CHATGENIE_PASSWORD, // Your password or App Password if 2FA is enabled
            },
        });
        // Set up email options
        let mailOptions = {
            from: 'chatgenieaiassistant@gmail.com',
            to: 'chatgenieaiassistant@gmail.com',
            subject: `New message from ${fullName}`,
            text: `You have received a new message from ${fullName} (${email}):\n\n${message}`,
        };
        // Send the email
        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ success: true, message: 'Email sent successfully' });
        } catch (error) {
            console.log(error); // Log the error to see more details
            res.status(500).json({ success: false, message: error });
        }
    } else {
        // Handle any non-POST requests
        res.status(405).json({ success: false, message: 'Method not allowed' });
    }
}
