import {Movie} from "../../../interfaces";
import "./MovieCard.css";

interface Props {
    movie: Movie
    onMovieSelect: (value: string) => void
}

export const MovieCard = ({movie, onMovieSelect}: Props) => {

    return <>
        {
            movie.Poster !== "N/A" &&
            <div className="movie_container"
                 onClick={() => {
                     onMovieSelect(movie.imdbID);
                     window.scrollTo({top: 0, behavior: "smooth"});
                 }}
            >
                <img className="movie_image" src={movie.Poster} alt={movie.Title}/>
                <div className="movie_info_box">
                    <p className="movie_title">{movie.Title}</p>
                    <p className="movie_year">Year: {movie.Year}</p>
                </div>
            </div>
        }
    </>
}
