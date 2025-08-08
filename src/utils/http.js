import { doc, getDoc, updateDoc, setDoc, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase';

export const fetchDocument = async (collectionName, documentId) => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { ...docSnap.data() };
    } else {
        throw new Error('Document not found');
    }
};

export const updateDocument = async (
    collectionName,
    documentId,
    updateData
) => {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updateData);
};

export const addStationToDestinations = async (documentId, newStation) => {
    const docRef = doc(db, 'destinations', documentId);
    await updateDoc(docRef, {
        'microbuses.destinations': arrayUnion(newStation),
    });
};

export const addStationToUsersRoutes = async (documentId, newStation) => {
    const docRef = doc(db, 'users-routes', documentId);
    await updateDoc(docRef, {
        'microbuses.destinations': arrayUnion(newStation),
    });
};

export const addStationDetails = async (documentId, newStation) => {
    const docRef = doc(db, 'stations', documentId);
    await updateDoc(docRef, {
        stations: arrayUnion(newStation.from, newStation.to),
    });
};

export const createStationObject = formData => {
    // Generate a unique destination ID (you might want to implement a better ID generation)
    const destinationId = Date.now();

    // Create the station object with the structure you specified
    return {
        destinationId: destinationId,
        distance: parseInt(formData.distance),
        duration: parseInt(formData.duration),
        endCoords: formData.endCoords || 0, // Use provided coordinates
        from: {
            name: formData.from,
            stationId: `${destinationId}`
        },
        to: {
            name: formData.to,
            stationId: `${destinationId}`
        },
        rating: 4.3, // Default rating
        startCoords: formData.startCoords || 0, // Use provided coordinates
        crossStations: formData.crossStations, // Use provided cross stations
    };
};

// Delete a specific station from destinations by destinationId
export const removeStationFromDestinations = async (
    documentId,
    destinationId
) => {
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

// Update a specific station in destinations by destinationId
export const updateStationInDestinations = async (
    documentId,
    updatedStation
) => {
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

// Get all user-suggested routes
export const fetchUsersRoutes = async documentId => {
    return fetchDocument('users-routes', documentId);
};

// Remove a suggested route from users-routes by destinationId
export const removeStationFromUsersRoutes = async (
    documentId,
    destinationOrStationId
) => {
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
