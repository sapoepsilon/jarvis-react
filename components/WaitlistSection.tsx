import React, { useEffect, useRef, useState, FormEvent } from 'react';
import supabase from '@/hooks/supabaseClient';

const JoinWaitlistSection: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleJoinWaitlist = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (!email.trim()) {
            setMessage('Please enter a valid email address.');
            return;
        }

        try {
            const { data: existingEmails, error: fetchError } = await supabase
                .from('waitlist')
                .select('email')
                .eq('email', email);

            if (fetchError) {
                setMessage('Error checking waitlist. Please try again later.');
                console.error('Error checking waitlist:', fetchError);
                return;
            }

            if (existingEmails && existingEmails.length > 0) {
                setMessage('Email already exists in the waitlist.');
                return;
            }

            const { error } = await supabase.from('waitlist').insert([{ email }]);
            if (error) {
                setMessage('Error joining waitlist. Please try again later.');
                console.error('Error joining waitlist:', error);
            } else {
                setMessage('Successfully joined the waitlist!');
                setEmail(''); // Clear the email input field
            }
        } catch (error) {
            setMessage('An unexpected error occurred. Please try again later.');
            console.error('Unexpected error:', error);
        }
    };

    return (
        <section id="join-waitlist" className="h-screen w-full bg-black flex items-center justify-center z-0">
            <div className="flex flex-col items-center justify-center p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Join Our Waitlist</h2>
                <form onSubmit={handleJoinWaitlist} className="w-full max-w-sm">
                    <input
                        ref={inputRef}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white w-full rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500"
                    >
                        Join Waitlist
                    </button>
                </form>
                {message && <p className="text-sm mt-2 text-white">{message}</p>}
            </div>
        </section>
    );
};

export default JoinWaitlistSection;