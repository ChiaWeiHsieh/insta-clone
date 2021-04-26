import { useContext } from 'react';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';
import PhotoContext from '../context/photo';

export default function TimeLine() {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);

    return (
        <div>
            {/* { user.displayName} */}
            timeLine
        </div>
    )
}