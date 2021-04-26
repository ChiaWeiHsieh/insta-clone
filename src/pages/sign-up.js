import { useEffect, useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { doesUsernameExist } from '../services/firebase';
import FirebaseContext from '../context/firebase';


export default function SignUp() {
    const history = useHistory();
    const { firebase } = useContext(FirebaseContext);

    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('');
    const isInvalid = password === '' || email === '' || username === '' || fullname === '';


    const handleSignUp = async (event) => {
        event.preventDefault();
        
        const usernameExists = await doesUsernameExist(username);
        
        if (!usernameExists.length) {
            try {
                const createUserResult = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        email, password);
                await createUserResult.user.updateProfile({
                    displayName: username
                });

                await firebase.firestore().collection('users').add({
                    userId: createUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullname,
                    email: email.toLowerCase(),
                    following: [],
                    dateCreated: Date.now()
                });
                history.push(ROUTES.DASHBOARD);

                // firebase user collection (create a document)
            } catch (error) {
                setEmail('');
                setPassword('');
                setError(error.message);
            }
        }

    };

    useEffect(() => {
        document.title = "註冊 - Instagram";
    });

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app" />
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <div className="flex flex-col items-center bg-white p-4  mb-4 rounded">
                        <h1 className="flex justify-center w-full">
                            <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4" />
                        </h1>

                        {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                        <form onSubmit={handleSignUp} method="POST">
                            <input className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                aria-label="輸入使用者名稱"
                                type="text"
                                placeholder="輸入使用者名稱..."
                                onChange={({ target }) => {
                                    setUsername(target.value);
                                }}
                                value={username}
                            />

                            <input className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                aria-label="輸入全名"
                                type="text"
                                placeholder="請輸入全名..."
                                onChange={({ target }) => {
                                    setFullname(target.value);
                                }}
                                value={fullname}
                            />
                            <input className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                aria-label="輸入電子信箱"
                                type="text"
                                placeholder="輸入電子郵件..."
                                onChange={({ target }) => {
                                    setEmail(target.value);
                                }}
                                value={email}
                            />
                            <input
                                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                                aria-label="輸入密碼"
                                type="password"
                                placeholder="輸入密碼..."
                                onChange={({ target }) => {
                                    setPassword(target.value);
                                }}
                                value={password}
                            />
                            <button
                                disabled={isInvalid}
                                type="submit"
                                className={`bg-blue-medium text-white w-full rounded h-8 font-bold
                                ${isInvalid && 'opacity-50'}`}
                            >註冊</button>
                        </form>
                    </div>
                    <div className="flex justify-center rounded items-center flex-col w-full bg-white p-4 border border-gray-primary">
                        <p className="text-sm">已經有帳號了嗎？{`  `}
                            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">登入</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}