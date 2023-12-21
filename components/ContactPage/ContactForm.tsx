import React, {useState, FormEvent} from 'react';
import FullNameField from "@/components/ContactPage/FullNameField";
import EmailField from "@/components/ContactPage/EmailField";
import MessageField from "@/components/ContactPage/MessageField";
import SubmitButton from "@/components/ContactPage/SubmitButton";

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
            <FullNameField fullName={fullName} setFullName={setFullName} errors={errors}/>
            <EmailField email={email} setEmail={setEmail} errors={errors}/>
            <MessageField message={message} setMessage={setMessage}/>
            <SubmitButton/>
        </form>
    );
};

export default ContactForm;