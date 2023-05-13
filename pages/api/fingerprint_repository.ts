import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import db from "./firebase";
import {Fingerprint} from "@/interfaces/FingerprintModel";

export const addDateToFingerprint = async (fingerprint: string, date: Date, value: number): Promise<void> => {
    const docRef = db.collection("fingerprints").doc("fingerprintsData");

    const dateString = date.toISOString().split('T')[0]; // Convert the date to a string in the format 'YYYY-MM-DD'

    try {
        const doc = await docRef.get();

        if (doc.exists) {
            // If the document exists, update the fingerprint and date with the new value
            await docRef.set({
                [`${fingerprint}.${dateString}`]: value,
            }, { merge: true });
        } else {
            // If the document does not exist, create a new document with the fingerprint and the new date and value
            const newFingerprintData: Fingerprint = {
                [fingerprint]: {
                    [dateString]: value,
                },
            };
            await docRef.set(newFingerprintData);
        }
    } catch (error) {
        console.error("Error updating fingerprint:", error);
    }
};
