import {useContext, useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import {GlobalContext} from "../contexts/GlobalContext";
import {MovieCard} from "../components/Movie/MovieCard";
import {MovieCardDetails} from "../components/Movie/MovieCardDetails";
import {Header} from "./Header/Header";
import {LoggedHeader} from "./LoggedHeader/LoggedHeader";
import {ErrorInfo} from "../components/common/ErrorInfo";
import {Spinner} from "../components/common/Spinner/Spinner";
import {apiURL} from "../utils/constants";

export const RootLayout = () => {

    const {movies, isLogged, setIsLogged, error, setError} = useContext(GlobalContext);
    const [selectedMovie, setSelectedMovie] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation().pathname;

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const resp = await fetch(`${apiURL}/auth/test`, {
                    credentials: "include",
                });
                const data = await resp.json();

                if ([400, 401, 500].includes(resp.status)) {

                    setError(prev => ({
                        ...prev,
                        code: resp.status,
                        message: data.message,
                    }));
                    setIsLogged(false);
                    setLoading(false);

                    return;
                }
                setIsLogged(data.authorized);
                setLoading(false);

            } catch (e: any) {

                setError({code: 500, message: "Server down, try again later!"});
                setLoading(false);
            }
        })()
    }, [isLogged, movies])

    if (loading) {
        return <Spinner/>
    }

    return (
        <>
            {isLogged ? <LoggedHeader/> : <Header/>}
            <main>
                {
                    (error && (location === "/movies" && error.code !== 401)) && <ErrorInfo message={error.message}/>
                }
                {
                    (location === "/movies") &&
                    <div className="container">
                        {
                            selectedMovie &&
                            <MovieCardDetails selectedMovie={selectedMovie} onMovieSelect={setSelectedMovie}/>
                        }
                        {
                            (isLogged && !error) || ((error && error.code === 401) && movies.length)
                                ? movies.map(obj => <MovieCard key={obj.imdbID} movie={obj}
                                                               onMovieSelect={setSelectedMovie}/>)
                                : null
                        }
                    </div>
                }
                <Outlet/>
            </main>
        </>
    );
}

