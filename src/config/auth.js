export const doCreateUserWithEmailAndPassword = async (email, password) => {
    const [{ createUserWithEmailAndPassword }, { auth }] = await Promise.all([
        import('firebase/auth'),
        import('./firebase'),
    ]);
    return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    const [{ signInWithEmailAndPassword }, { auth }] = await Promise.all([
        import('firebase/auth'),
        import('./firebase'),
    ]);
    return signInWithEmailAndPassword(auth, email, password);
};

export const doSignInWithGoogle = async () => {
    const [{ GoogleAuthProvider, signInWithPopup }, { auth }] =
        await Promise.all([import('firebase/auth'), import('./firebase')]);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result;
};

export const doSignOut = async () => {
    const { auth } = await import('./firebase');
    return auth.signOut();
};

export const createUserDocumentIfNotExists = async (user, extraData = {}) => {
    if (!user) return;
    const [firestore, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('./firebase'),
    ]);
    const { doc, setDoc, getDoc, serverTimestamp } = firestore;

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
