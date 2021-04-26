import { useState } from 'react';
import useUser from '../hooks/use-user';

export default function SideBar() {
    const { user: fullName, username, userId } = useUser();
    console.log('user', fullName, username, userId);
    return (<p>SideBar</p>);
}