import React, {useContext, useState} from 'react';
import {Navigate} from "react-router-dom";

import {GlobalContext} from "../../../contexts/GlobalContext";
import {DeleteUserInfo} from "./DeleteUserInfo/DeleteUserInfo";
import {Spinner} from "../Spinner/Spinner";
import {ErrorInfo} from "../ErrorInfo";
import {DataError} from "../../../interfaces";

export const DeleteUser = () => {

        const {setIsLogged, setMovies} = useContext(GlobalContext);
        const [error, setError] = useState<null | DataError>(null);
        const [confirmed, setConfirmed] = useState<boolean | null>(null);
        const [loading, setLoading] = useState<boolean>(false);

        const deleteUser = async () => {

            try {
                setLoading(true);
                const resp = await fetch(`http://localhost:3001/movies/auth/`, {
                    method: "DELETE",
                    credentials: "include"
                })
                const data = await resp.json();

                if ([400, 401, 500].includes(resp.status)) {

                    setError(prev => ({
                        ...prev,
                        code: resp.status,
                        message: data.message,
                    }));
                    setLoading(false);
                    return;
                }
                setConfirmed(true);
                setIsLogged(false);
                setMovies([]);
                setLoading(false);

            } catch (e) {
                console.log(e);
                setError({code: 500, message: "Server down, try again later!"});
                setLoading(false);
            }
        }

        if (confirmed !== null) {
            return <Navigate to={"/movies"}/>
        }

        if (loading) {
            return <Spinner/>
        }

        return (<>
                {
                    error
                        ? <ErrorInfo message={error.message}/>
                        : <DeleteUserInfo setConfirmed={setConfirmed} deleteUser={deleteUser}/>
                }
            </>
        );
    }
;
