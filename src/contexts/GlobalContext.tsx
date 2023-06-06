import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import { Bookmark, DataError, Movie, MovieDetails } from "../interfaces";

export interface GlobalContextInterface {
  movies: Movie[];
  setMovies: Dispatch<SetStateAction<Movie[]>>;
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  error: DataError | null;
  setError: Dispatch<SetStateAction<DataError | null>>;
  bookmarks: Bookmark[];
  setBookmarks: Dispatch<SetStateAction<Bookmark[]>>;
  bookmarksWithDetails: MovieDetails[];
  setBookmarksWithDetails: Dispatch<SetStateAction<MovieDetails[]>>;
}

const defaultState = {
  movies: [],
  setMovies: () => {},
  isLogged: false,
  setIsLogged: () => {},
  error: null,
  setError: () => {},
  bookmarks: [],
  setBookmarks: () => {},
  bookmarksWithDetails: [],
  setBookmarksWithDetails: () => {},
} as GlobalContextInterface;

export const GlobalContext =
  createContext<GlobalContextInterface>(defaultState);

type GlobalProviderProps = {
  children: ReactNode;
};

export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [bookmarksWithDetails, setBookmarksWithDetails] = useState<
    MovieDetails[]
  >([]);
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [error, setError] = useState<DataError | null>(null);

  return (
    <GlobalContext.Provider
      value={{
        movies,
        setMovies,
        isLogged,
        setIsLogged,
        setError,
        error,
        bookmarks,
        setBookmarks,
        bookmarksWithDetails,
        setBookmarksWithDetails,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
