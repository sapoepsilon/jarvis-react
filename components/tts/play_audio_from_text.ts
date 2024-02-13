async function playAudioFromText(
  text: string,
  voice: string = "alloy",
  sendClickTime: Date,
): Promise<void> {
  const requestStartTime = new Date();
  console.log(`Request start time: ${requestStartTime.toISOString()}`);

  try {
    const fetchStartTime = new Date();
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: text, voice }),
    });
    const fetchEndTime = new Date();
    console.log(`Fetch start time: ${fetchStartTime.toISOString()}`);
    console.log(`Fetch end time: ${fetchEndTime.toISOString()}`);
    console.log(
      `Fetch duration: ${fetchEndTime.getTime() - fetchStartTime.getTime()}ms`,
    );

    if (!response.ok) {
      throw new Error(`Error from server: ${response.status}`);
    }

    if (!window.MediaSource) {
      console.error("MediaSource API is not available in this browser.");
      return;
    }

    const mediaSource = new MediaSource();
    const audio = document.createElement("audio");
    audio.src = URL.createObjectURL(mediaSource);

    // Log when audio starts playing
    audio.addEventListener("play", () => {
      console.log(
        `Audio playback started at: ${new Date().getTime() - requestStartTime.getTime()}ms`,
      );
      console.log(
        `Send click time: ${new Date().getTime() - sendClickTime.getTime()}ms`,
      );
    });

    audio.play().catch((e) => console.error("Error playing audio:", e));

    mediaSource.onsourceopen = () => {
      const sourceBuffer = mediaSource.addSourceBuffer("audio/mpeg"); // adjust MIME type as needed
      const reader = response.body?.getReader();
      const read = () => {
        reader?.read().then(({ done, value }) => {
          if (done) {
            mediaSource.endOfStream();
            return;
          }
          if (value) {
            sourceBuffer.appendBuffer(value);
          }
        });
      };

      sourceBuffer.addEventListener("updateend", read);
      read(); // Start reading
    };
  } catch (error) {
    console.error("Error fetching or playing audio:", error);
  }
}

export default playAudioFromText;
