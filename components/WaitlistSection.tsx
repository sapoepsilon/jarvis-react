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
        <div id="waitlist" className="flex flex-col h-screen z-0">
            {/* Header */}
            <header className="w-full py-4 bg-black text-white flex justify-center">
                <h2 className="text-4xl font-bold">Waitlist</h2>
            </header>

            {/* Form Section */}
            <section className="flex-grow flex items-center justify-center bg-black">
                <div className="w-full max-w-sm flex flex-col items-center justify-center p-6">
                    <p className='text-white mb-4'>As we are continuing to improve our AI offerings, and working to make it production ready, we invite you to join our waitlist.</p>
                    <form onSubmit={handleJoinWaitlist} className="w-full">
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
                            style={{ backgroundImage: 'linear-gradient(to right, #3498db, #8e44ad)' }}
                            className="mt-4 px-4 py-2 text-white w-full rounded-md hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
                        >
                            Join Waitlist
                        </button>
                    </form>
                    {message && <p className="text-sm mt-2 text-white">{message}</p>}
                </div>
            </section>
        </div>
    );
};

export default JoinWaitlistSection;