import React, {useContext, useState} from 'react';
import {Navigate} from 'react-router-dom';

import {GlobalContext} from "../../contexts/GlobalContext";
import {apiURL} from "../../utils/constants";
import {ErrorInfo} from "../../components/common/ErrorInfo";
import {LogoutUserInfo} from "./LogoutUserInfo";
import {Spinner} from "../../components/common/Spinner/Spinner";
import {DataError} from "../../interfaces";

export const LogoutUser = () => {

    const {isLogged, setIsLogged, setMovies} = useContext(GlobalContext);
    const [error, setError] = useState<null | DataError>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const logoutUser = async () => {

        try {
            setError(null);
            setLoading(true);
            const resp = await fetch(`${apiURL}/user/logout`, {
                credentials: "include",
            });
            const data = await resp.json();

            if ([400, 401, 500].includes(resp.status)) {
                setError(prev => ({
                    ...prev,
                    code: resp.status,
                    message: data.message,
                }));
                return;
            }

            setIsLogged(false);
            setMovies([]);
        } catch (e: any) {
            console.log(e.message);
            setError({code: 500, message: "Server down, try again later!"});
        }
    };

    if (loading) {
        return <Spinner/>
    }

    if (!isLogged) {
        return <Navigate to="/movies"/>
    }

    return (
        <>
            {
                error
                    ? <ErrorInfo message={error.message}/>
                    : <LogoutUserInfo logoutUser={logoutUser}/>
            }
        </>
    )
}
