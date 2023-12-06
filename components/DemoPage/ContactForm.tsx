import React, {useState, FormEvent} from 'react';

interface ContactFormProps {
    onSuccessfulSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({onSuccessfulSubmit}) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({fullName: '', email: ''});

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let newErrors = {fullName: '', email: ''};
        let isValid = true;

        if (!fullName) {
            newErrors.fullName = 'Full name is required';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await fetch('/api/send-email', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({fullName, email, message}),
                });
                const data = await response.json();
                if (data.success) {
                    onSuccessfulSubmit();
                    setFullName('');
                    setEmail('');
                    setMessage('');
                } else {
                    console.log('Email sending failed');
                }
            } catch (error) {
                console.error('Failed to send email', error);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
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
                    rows={4}
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
    );
};

export default ContactForm;