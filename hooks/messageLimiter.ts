import firebase_db from "@/pages/api/.example.firebase";
const RATE_LIMIT = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour window

export const checkRateLimit = async (ip: string): Promise<boolean> => {
    const now = Date.now();
    const docRef = firebase_db.collection("rateLimits").doc(ip);

    try {
        const doc = await docRef.get();
        if (!doc.exists) {
            await docRef.set({count: 1, lastRequest: now});
            return true;
        }

        const {count, lastRequest} = doc.data()!;
        const timeElapsed = now - lastRequest;

        if (timeElapsed < WINDOW_MS && count >= RATE_LIMIT) {
            return false;
        } else {
            await docRef.update({
                count: timeElapsed < WINDOW_MS ? count + 1 : 1,
                lastRequest: now,
            });
            return true;
        }
    } catch (error) {
        console.error("Error in checkRateLimit:", error);
        return false;
    }
};
