// pages/contact.js
import React, {useState} from 'react';
import Navbar from "@/components/navbar/NavBar"; // Assuming you have a Navbar component
import Image from "next/image";
import Logo from "../public/logo-svg.svg"; // Update the path as necessary
import ModalWindow from "@/components/DemoPage/ModalWindow";

const ContactPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({fullName: '', email: ''});
    const [isModalVisible, setIsModalVisible] = useState(false);

    // rest of your code...

    const handleSubmit = async (event) => {
        event.preventDefault();
        let newErrors = { fullName: '', email: '' };
        let isValid = true;

        // Validate full name
        if (!fullName) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (isValid) {
            try {
                // Call the API to send the email
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fullName, email, message }),
                });
                const data = await response.json();
                if (data.success) {
                    console.log('Email sent successfully');
                    setIsModalVisible(true);
                    // Reset form fields
                    setFullName('');
                    setEmail('');
                    setMessage('');
                } else {
                    console.log('Email sending failed');
                    // Handle failure
                }
            } catch (error) {
                console.error('Failed to send email', error);
                // Handle error
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
            <div
                className="min-h-screen bg-gradient-to-b from-linear-gradient-start to-linear-gradient-end flex flex-col">
                <Navbar/>
                <ModalWindow isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
                <div className="flex flex-grow flex-col items-center justify-center pt-16 pb-6">
                    <Image src={Logo} alt="Logo" width={50} height={50}/>
                    <div className="mt-10 w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center">Contact Us</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Full Name field */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full
                                    Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                    className={`mt-1 p-2 block w-full border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}/>
                                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                            </div>

                            {/* Email field */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className={`mt-1 p-2 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}/>
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>
                            {/* Message field */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">How can we
                                    help you?</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                ></textarea>
                            </div>
                            <button type="submit"
                                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-accent-purple hover:from-blue-700 hover:to-accent-purple">Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
);
};

export default ContactPage;
