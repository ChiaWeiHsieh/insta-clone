import { useContext } from 'react';
import { Link } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';
import * as ROUTES from '../constants/routes';

export default function Header() {
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    return (
        <header className="h-16 bg-white border-b border-grey-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Instagram logo">
                                <img className="mt-2 w-6/12" src="/images/logo.png" alt="instagram" />
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {
                            user ? (
                                <>
                                    <Link to={ROUTES.DASHBOARD} aria-label="dashboard">
                                        <svg  xmlns="http://www.w3.org/2000/svg" className="w-8 mr-6 text-black-light cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </Link>

                                    <button
                                        type="button"
                                        title="Sign Out"
                                        onClick={() => firebase.auth().signOut()}
                                        onKeyDown={event => {
                                            if (event.key === 'Enter') {
                                                firebase.auth().signOut();
                                            }
                                        }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 mr-6 text-black-light cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                    </button>
                                    <div className="flex items-center cursor-pointer">
                                        <Link to={`/p/${user.displayName}`}>
                                            <img
                                                className="rounded-full h-8 w-8 flex"
                                                src={`/images/avatar/${user.displayName}.jpg`}
                                                alt={`${user.displayName} profile's`}
                                            />
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link  to={ROUTES.LOGIN}>
                                        <button className="bg-blue-medium font-bold text-sm rounded text-white w-20 h-8"
                                            type="button"
                                        >登入</button>
                                    </Link>
                                    <Link to={ROUTES.SIGN_UP}>
                                        <button className=" font-bold text-sm rounded text-blue-medium w-20 h-8"
                                            type="button"
                                        >註冊</button>
                                    </Link>

                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </header >
    );
}