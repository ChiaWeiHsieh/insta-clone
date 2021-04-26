import { firebase, FieldValue } from '../lib/firebase';


export async function doesUsernameExist(username) {
    const result = await firebase.
        firestore().
        collection('users').
        where('username', '==', username).
        get();
    return result.docs.map((user) => user.data().length);
}

/**
 * 
 * @param {string} userId 使用者ID 
 * @param {string} following 追隨者才能看圖片
 * @return 青菜隨緣
 */

export async function getPhotos(userId, following) {
    const res = await firebase
        .firestore()
        .collection('photos')
        .where('userId', "in", following)
        .get();
    const userFollowedPhotos = res.docs.map(photo => ({
        ...photo.data(),
        docId: photo.Id
    }));

    const photosWithUserDetails = await Promise.all(
        //有按讚的顯示出來就對了啦。然後畫面就會出現紅心，代表已經按過讚了。
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto };
        })

    )
}

/**
 * 
 * @param {string} userId 
 * @returns {documentData } 
 */

export async function getUserByUserId(userId) {
    const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();
    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));

    return user;
}

// export async function getUserObjByUserId(userId) {
//     const result = await firebase
//         .firestore()
//         .collection('users')
//         .where('users', '==', userId)
//         .get();
//     const user = result.user.map((item) => ({
//         ...item.data(),
//         docId: item.id
//     }));
// }


