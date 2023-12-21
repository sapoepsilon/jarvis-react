interface MessageFieldProps {
    message: string;
    setMessage: (message: string) => void;
}

function MessageField({ message, setMessage }: MessageFieldProps) {
    return (
        <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                How can we help you?
            </label>
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
    );
}

export default MessageField;
