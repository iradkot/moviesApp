import firestore from '@react-native-firebase/firestore';

const db = firestore();

export const getFavourites = async (userId = '123') => {
    try {
        
        const response = await db.collection('users').doc(userId+'').get();
        const data = response.data();
        console.log({ data, userId });
        return data;
    } catch (e) {
        console.log('firestore action:', {e});
        throw new Error(e);
    }
};

export const setFavourites = async (userId = '123', favourites) => {
    try {
        const response = await db.collection('users').doc(userId + '').set({ favourites });
        console.log('set response:', response);
        return response;
    } catch (e) {
        throw new Error(e);
    }
};
