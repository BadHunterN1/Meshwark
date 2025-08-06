import { doc, getDoc } from 'firebase/firestore';
import db from '../config/firebase';

export const fetchDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data() };
    } else {
        throw new Error('Document not found');
    }
};