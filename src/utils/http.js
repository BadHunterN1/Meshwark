import { doc, getDoc, updateDoc, arrayUnion, GeoPoint } from 'firebase/firestore';
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

export const updateDocument = async (collectionName, documentId, updateData) => {
    const docRef = doc(db, collectionName, documentId);
    await updateDoc(docRef, updateData);
};

export const addStationToDestinations = async (documentId, newStation) => {
    const docRef = doc(db, 'destinations', documentId);
    await updateDoc(docRef, {
        'microbuses.destinations': arrayUnion({ station: newStation })
    });
};

export const addStationToUsersRoutes = async (documentId, newStation) => {
    const docRef = doc(db, 'users-routes', documentId);
    await updateDoc(docRef, {
        'microbuses.destinations': arrayUnion({ station: newStation })
    });
};

export const createStationObject = (formData) => {
    // Generate a unique destination ID (you might want to implement a better ID generation)
    const destinationId = Date.now();

    // Create the station object with the structure you specified
    return {
        destinationId: destinationId,
        distance: parseInt(formData.distance),
        duration: parseInt(formData.duration),
        endCoords: formData.endCoords || 0, // Use provided coordinates
        fromTo: {
            from: {
                name: formData.from,
                stationId: `from_${destinationId}`
            },
            to: {
                name: formData.to,
                stationId: `to_${destinationId}`
            }
        },
        rating: 4.3, // Default rating
        startCoords: formData.startCoords || 0, // Use provided coordinates
        crossStations: formData.crossStations // Use provided cross stations
    };
};