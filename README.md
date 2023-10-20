# Voice Chat Application with React

This project is a React-based web application that integrates speech-to-text features, GPT-based chat, and fingerprinting services. It serves as a simple voice-activated chat application where users can interact with a conversational agent. Additionally, it uses fingerprinting to limit the number of requests a user can make within a day.

## Features

- Speech Recognition for voice-based input
- Conversation logging displayed in a scrollable view
- Microphone sensitivity bar
- Real-time response from GPT
- Device fingerprinting for rate-limiting
- Usage of Tailwind CSS for styling

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Dependencies

- React
- Tailwind CSS
- Custom hooks for microphone volume (`useMicrophoneVolume`)
- API services for chat (`chatGPT`) and fingerprinting (`FingerprintService`)

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your_repository_url.git
   ```

2. Navigate to the project directory:

   ```
   cd voice-chat-application
   ```

3. Install the required npm packages:

   ```
   npm install
   ```

4. Start the development server:

   ```
   npm start
   ```

Now, the application should be running on `http://localhost:3000/`.

## How to Use

1. Allow microphone access when prompted.
2. Press and hold the microphone button to start speaking.
3. Release the microphone button to send the text.
4. Use the "Clear" button to clear the transcript.
5. Use the "Send" button to manually send the text.

## Files and Structure

- `Home.tsx`: Main component that orchestrates the voice chat application.
- `MicrophoneButton.tsx`: Component for the microphone UI.
- `SendButton.tsx`: Component for the send button.
- `MessageList.tsx`: Component to display messages.
- `/hooks/useMicrophoneVolume.ts`: Custom hook for accessing microphone volume.
- `/api/chatGPT.ts`: API for interaction with GPT-4.
- `/api/elevenlabs.ts`: API for voice to text services.
- `/api/fingerprint_service.ts`: API for device fingerprinting.
  
## Troubleshooting

- Make sure your browser supports SpeechRecognition (Chrome and Safari are supported).
- If you hit a rate limit, you'll need to wait until the next day to make additional requests.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to open issues or pull requests if you want to contribute to this project.