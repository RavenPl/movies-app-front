import React, {useContext, useState} from 'react';
import {Navigate} from "react-router-dom";
import {GlobalContext} from "../contexts/GlobalContext";

export const DeleteUser = () => {

    const {setIsLogged} = useContext(GlobalContext);

    const [deleted, setDeleted] = useState<boolean | null>(null);

    const confirm = async () => {
        console.log('?');
        await fetch(`http://localhost:3001/movies/auth/`, {
            method: "DELETE",
            credentials: "include"
        })
        setDeleted(true);
        setIsLogged(false)
    }

    if (deleted !== null) {
        return <Navigate to={"/movies"}/>
    }

    return (
        <div>
            <h3>Are you really want to delete your account?</h3>
            <button onClick={() => confirm()}>YES!</button>
            <button onClick={() => setDeleted(false)}>NO!</button>
        </div>
    );
};
