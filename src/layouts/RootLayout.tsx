import {useContext, useEffect, useState} from 'react';
import {Outlet, useLocation} from 'react-router-dom';

import {GlobalContext} from "../contexts/GlobalContext";
import {DataError} from "../interfaces";
import {MovieCard} from "../components/Movie/MovieCard";
import {MovieCardDetails} from "../components/Movie/MovieCardDetails";
import {Header} from "./Header/Header";
import {LoggedHeader} from "./LoggedHeader/LoggedHeader";
import {ErrorInfo} from "../components/comon/ErrorInfo";
import {Spinner} from "../components/comon/Spinner/Spinner";

export const RootLayout = () => {

    const {movie, setMovie, isLogged, setIsLogged} = useContext(GlobalContext);
    const [error, setError] = useState<null | DataError>(null);
    const [selectedMovie, setSelectedMovie] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const location = useLocation().pathname;

    useEffect(() => {
        (async () => {
            setLoading(true);
            setError(null);
            try {
                const resp = await fetch(`http://localhost:3001/movies/auth/test`, {
                    credentials: "include",
                });
                const data = await resp.json();
                const error: DataError = {
                    code: resp.status,
                    message: data.message,
                };

                if ([400, 401, 500].includes(resp.status)) {
                    setError(error);
                    setLoading(false);
                    return;
                }
                setIsLogged(data.authorized);
                setLoading(false);

            } catch (e: any) {
                console.log(e.message);
                setError({code: 500, message: "Sorry, try again later!"});
                setLoading(false);
            }
        })()
    }, [isLogged])

    if (loading) {
        return <Spinner/>
    }

    return (
        <>
            {isLogged ? <LoggedHeader/> : <Header/>}
            <main>
                {(location === "/movies") && <div className="container">
                    {selectedMovie &&
                    <MovieCardDetails selectedMovie={selectedMovie} onMovieSelect={setSelectedMovie}/>}
                    {
                        movie.length
                            ? movie.map(obj => <MovieCard key={obj.imdbID} movie={obj}
                                                          onMovieSelect={setSelectedMovie}/>)
                            : null
                    }
                    {
                        error && <ErrorInfo message={error.message}/>
                    }

                </div>}
                <Outlet/>
            </main>

        </>
    );
}

