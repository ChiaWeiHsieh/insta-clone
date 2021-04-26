import { useState, useEffect, useContext } from 'react';

import UserContext from '../context/user';
import { getUserByUserId } from '../services/firebase';

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState();

    useEffect(() => {
        async function getUserObjByUserId() {
            //呼叫firebase裡的資料byId
            const [res] = await getUserByUserId(userId);
            setActiveUser(res || {});
        }
        if (userId) {
            getUserObjByUserId(userId);
        }
    }, [userId]);

    return { user: activeUser };

}

