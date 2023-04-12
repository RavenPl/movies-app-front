import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";
import {DataError, Movie} from "../interfaces";
import {MovieEntity} from "types";

export interface GlobalContextInterface {
    movies: Movie[];
    setMovies: Dispatch<SetStateAction<Movie[]>>;
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
    error: DataError | null;
    setError: Dispatch<SetStateAction<DataError | null>>;
    favouriteMovies: MovieEntity[];
    setFavouriteMovies: Dispatch<SetStateAction<MovieEntity[]>>;
}

const defaultState = {
    movies: [],
    setMovies: () => {
    },
    isLogged: false,
    setIsLogged: () => {
    },
    error: null,
    setError: () => {
    },
    favouriteMovies: [],
    setFavouriteMovies: () => {
    }
} as GlobalContextInterface;

export const GlobalContext = createContext<GlobalContextInterface>(defaultState);

type GlobalProviderProps = {
    children: ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [favouriteMovies, setFavouriteMovies] = useState<MovieEntity[]>([]);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [error, setError] = useState<DataError | null>(null);

    return (
        <GlobalContext.Provider
            value={{movies, setMovies, isLogged, setIsLogged, setError, error, favouriteMovies, setFavouriteMovies}}>
            {children}
        </GlobalContext.Provider>
    )
}
