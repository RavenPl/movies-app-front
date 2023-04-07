import {Movie} from "../interfaces";
import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

export interface GlobalContextInterface {
    movie: Movie[];
    setMovie: Dispatch<SetStateAction<Movie[]>>;
    isLogged: boolean;
    setIsLogged: Dispatch<SetStateAction<boolean>>
}

const defaultState = {
    movie: [],
    setMovie: (movies: Movie[]) => {
    },
    isLogged: false,
    setIsLogged: () => {
    }
} as GlobalContextInterface;

export const GlobalContext = createContext<GlobalContextInterface>(defaultState);

type GlobalProviderProps = {
    children: ReactNode;
}

export const GlobalProvider = ({children}: GlobalProviderProps) => {

    const [movie, setMovie] = useState<Movie[]>([]);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    return (
        <GlobalContext.Provider value={{movie, setMovie, isLogged, setIsLogged}}>
            {children}
        </GlobalContext.Provider>
    )
}
