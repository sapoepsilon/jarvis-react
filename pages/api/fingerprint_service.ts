import "firebase/compat/firestore";
import firebase_db from "./firebase";
import {Fingerprint} from "@/interfaces/FingerprintModel";
import {doc, setDoc} from "firebase/firestore";
import {set} from "@firebase/database";
import {util} from "protobufjs";
import merge = util.merge;

class FingerprintService {


    public async addDateToFingerprint(fingerprint: string, date: Date, value: number): Promise<void> {
        const dateString = date.toISOString().split('T')[0]; // Convert the date to a string in the format 'YYYY-MM-DD'
        console.log("from fingerprints")
        let fingerprintValue: Fingerprint = {fingerprint, date: date, values: value};

        const fingerprintsRef =  firebase_db.collection(`fingerprints`).doc("fingerprintsData");
        await fingerprintsRef.set({
            fingerprintValue
        }, {merge: true}).catch((error) => {
            console.error("Error adding document: ", error);
        }).then(
            () => {
                console.log("Document successfully written!");
            }
        );
    }

    public async fetchFingerprintData(): Promise<Fingerprint | null> {
        const firebaseDocRef = firebase_db.collection("fingerprints").doc("fingerprintsData");
        try {
            const doc = await firebaseDocRef.get();

            if (doc.exists) {
                const data = doc.data() as Fingerprint;
                return data;
            } else {
                console.error("No fingerprint data found.");
                return null;
            }
        } catch (error) {
            console.error("Error fetching fingerprint data:", error);
            return null;
        }
    }
}

export default FingerprintService;
