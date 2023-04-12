import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

import {Bookmarks, DataError, Movie} from "../interfaces";

export interface GlobalContextInterface {
    movies: Movie[];
    setMovies: Dispatch<SetStateAction<Movie[]>>;
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>;
    error: DataError | null;
    setError: Dispatch<SetStateAction<DataError | null>>;
    bookmarks: Bookmarks[];
    setBookmarks: Dispatch<SetStateAction<Bookmarks[]>>;
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
    bookmarks: [],
    setBookmarks: () => {
    }
} as GlobalContextInterface;

export const GlobalContext = createContext<GlobalContextInterface>(defaultState);

type GlobalProviderProps = {
    children: ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [bookmarks, setBookmarks] = useState<Bookmarks[]>([]);
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [error, setError] = useState<DataError | null>(null);

    return (
        <GlobalContext.Provider
            value={{movies, setMovies, isLogged, setIsLogged, setError, error, bookmarks, setBookmarks}}>
            {children}
        </GlobalContext.Provider>
    )
}
