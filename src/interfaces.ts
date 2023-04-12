export interface DataError {
    code: number;
    message: string;
}

export interface Movie {
    imdbID: string;
    Title: string;
    Year: string;
    Type: string;
    Poster: string;
}

export interface MovieDetails {
    imdbID: string;
    Actors: string;
    Title: string;
    Director: string;
    Year: string;
    Runtime: string;
    Genre: string;
    Plot: string;
    Poster: string;
    Type: string;
    imdbRating: string;
    imdbVotes: string;
}

export interface Bookmarks {
    movieId: string;
    isFavourite: boolean;
}