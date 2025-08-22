export const fetchDocument = async (collectionName, documentId) => {
    const [{ doc, getDoc }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data() };
    } else {
        throw new Error('Document not found');
    }
};

export const updateDocument = async (collectionName, documentId, updateData) => {
    const [{ doc, updateDoc }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updateData);
};

export const addStationToDestinations = async (documentId, newStation) => {
    const [{ doc, updateDoc, arrayUnion }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'destinations', documentId);
    await updateDoc(docRef, {
        'microbuses.destinations': arrayUnion(newStation),
    });
};

export const addStationToUsersRoutes = async (documentId, newStation) => {
    const [{ doc, updateDoc, arrayUnion }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'users-routes', documentId);
    await updateDoc(docRef, {
        'microbuses.destinations': arrayUnion(newStation),
    });
};

export const addStationDetails = async (documentId, newStation) => {
    const [{ doc, updateDoc, arrayUnion }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'stations', documentId);
    await updateDoc(docRef, {
        stations: arrayUnion(newStation.from, newStation.to),
    });
};

export const createStationObject = formData => {
    const destinationId = Date.now();

    return {
        destinationId: destinationId,
        distance: parseInt(formData.distance),
        duration: parseInt(formData.duration),
        from: {
            name: formData.from,
            stationId: `${destinationId}`
        },
        to: {
            name: formData.to,
            stationId: `${destinationId}`
        },
        rating: 4.3,
        totalFee: Number(formData.totalFee),
        crossStations: formData.crossStations,
        available: true, // Default to available
    };
};

export const removeStationFromDestinations = async (
    documentId,
    destinationId
) => {
    const [{ doc, getDoc, updateDoc }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'destinations', documentId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Document not found');

    const data = snap.data();
    const current = data?.microbuses?.destinations || [];
    const updated = current.filter(
        station => String(station?.destinationId) !== String(destinationId)
    );

    await updateDoc(docRef, { 'microbuses.destinations': updated });
};

export const toggleStationAvailability = async (
    documentId,
    destinationId
) => {
    const [{ doc, getDoc, updateDoc }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'destinations', documentId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Document not found');

    const data = snap.data();
    const current = data?.microbuses?.destinations || [];
    const updated = current.map(station =>
        String(station?.destinationId) === String(destinationId)
            ? { ...station, available: !(station.available !== false) }
            : station
    );

    await updateDoc(docRef, { 'microbuses.destinations': updated });
};

export const updateStationInDestinations = async (
    documentId,
    updatedStation
) => {
    const [{ doc, getDoc, updateDoc }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'destinations', documentId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Document not found');

    const data = snap.data();
    const current = data?.microbuses?.destinations || [];
    const updated = current.map(station =>
        String(station?.destinationId) === String(updatedStation?.destinationId)
            ? { ...station, ...updatedStation }
            : station
    );

    await updateDoc(docRef, { 'microbuses.destinations': updated });
};

export const fetchUsersRoutes = async documentId => {
    return fetchDocument('users-routes', documentId);
};

export const removeStationFromUsersRoutes = async (
    documentId,
    destinationOrStationId
) => {
    const [{ doc, getDoc, updateDoc }, { db }] = await Promise.all([
        import('firebase/firestore'),
        import('../config/firebase'),
    ]);
    const docRef = doc(db, 'users-routes', documentId);
    const snap = await getDoc(docRef);
    if (!snap.exists()) throw new Error('Document not found');

    const data = snap.data();
    const current = data?.microbuses?.destinations || [];
    const idStr = String(destinationOrStationId);
    const updated = current.filter(station => {
        const byDestinationId =
            station?.destinationId != null &&
            String(station.destinationId) === idStr;
        const byFromStationId =
            String(station?.from?.stationId || '') === idStr;
        const byToStationId = String(station?.to?.stationId || '') === idStr;
        return !(byDestinationId || byFromStationId || byToStationId);
    });

    await updateDoc(docRef, { 'microbuses.destinations': updated });
};
