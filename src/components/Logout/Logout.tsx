import React, {useContext, useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {GlobalContext} from "../../contexts/GlobalContext";
import {DataError} from "../../interfaces";
import {ErrorInfo} from "../comon/ErrorInfo";

import "./Logout.css"

export const Logout = () => {

    const {isLogged, setIsLogged} = useContext(GlobalContext);
    const [error, setError] = useState<null | DataError>(null);


    useEffect(() => {

        (async () => {
            try {
                const resp = await fetch(`http://localhost:3001/movies/auth/logout`, {
                    credentials: "include",
                });
                const data = await resp.json();
                setIsLogged(false);

                if ([400, 401, 500].includes(resp.status)) {
                    setError({
                        code: resp.status,
                        message: data.message,
                    });
                    return;
                }

            } catch (e: any) {
                console.log(e.message);
                setError({code: 500, message: e.message});
            }
        })()

    }, [])

    if (!isLogged) {
        return <Navigate to="/movies/login"/>
    }

    return (
        <div className={"modified"}>
            {error && <ErrorInfo message={error.message} style={{position: "absolute", width: "100%"}}/>}
        </div>
    )
}
