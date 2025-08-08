import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    return result;
};

export const doSignOut = () => {
    return auth.signOut();
};

export const createUserDocumentIfNotExists = async (user, extraData = {}) => {
    if (!user) return;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
        const { email, displayName, providerData } = user;
        await setDoc(userRef, {
            uid: user.uid,
            email: email || '',
            displayName: displayName || '',
            provider:
                providerData && providerData[0]
                    ? providerData[0].providerId
                    : 'password',
            createdAt: serverTimestamp(),
            ...extraData,
        });
    }
};
