interface EmailFieldProps {
    email: string;
    setEmail: (email: string) => void;
    errors: { email?: string };
}

function EmailField({ email, setEmail, errors }: EmailFieldProps) {
    return (
        <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={`mt-1 p-2 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>
    );
}

export default EmailField;
