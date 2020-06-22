import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const getFavourites = async (userId = '123') => {
    try {
        
        const response = await db.collection('users').doc(userId+'').get();
        return response.data();
    } catch (e) {
        console.log('firestore action:', {e});
        throw new Error(e);
    }
};

export const setFavourites = async (userId = '123', favourites) => {
    try {
        return await db.collection('users').doc(userId + '').set({ favourites });
    } catch (e) {
        throw new Error(e);
    }
};
