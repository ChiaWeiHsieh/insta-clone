import { useEffect } from 'react';
import Header from '../components/Header';
import TimeLine from '../components/TimeLine';
import SideBar from '../components/SideBar';


export default function Dashboard() {
    useEffect(() => {
        document.title = "Instagram";
    }, []);

    return (
        <div className="bg-gray-background">
            <Header />
            <div
                className="grid grid-cols-3 gap-4 
                justify-between mx-auto 
                max-w-screen-lg"
            >
                <TimeLine />
                <SideBar />
            </div>
        </div>
    )

}
