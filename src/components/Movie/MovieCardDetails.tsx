import {useEffect, useState} from 'react';
import {MdAddCircleOutline} from "react-icons/md";
import {FaHeart, FaRegHeart} from "react-icons/fa"

import {movieDetails} from "../../utils/api";
import {MovieDetails} from "../../interfaces";
import {InfoButton} from "../comon/InfoButton/InfoButton";
import './MovieCardDetails.css'

interface Props {
    selectedMovie: string;
    onMovieSelect: (value: string) => void;
}

export const MovieCardDetails = (props: Props) => {

    const {selectedMovie} = props;
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [favourite, setFavourite] = useState<boolean>(false);

    const getMovieDetails = async () => {

        const resp = await fetch(`${movieDetails}${selectedMovie}`);
        const data = await resp.json();
        setMovie(data);
    }

    const favouriteHandler = () => {
        setFavourite(!favourite);
    }

    useEffect(() => {
        getMovieDetails()
    }, [selectedMovie])

    return (

        movie && <div className="movie_details_container">

            <div className="movie_details_image">
                <img src={movie.Poster}/>
            </div>

            <div className="movie_details_info_box">
                <div className="movie_details_title">
                    <span>{movie.Title}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Director"}/> <span>{movie.Director}</span>
                </div>
                <div className="movie_details_info">
                    <div>
                        <InfoButton title={"Actors"}/>
                    </div>
                    <span>{movie.Actors}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Genre"}/> <span>{movie.Genre}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Runtime"}/><span>{movie.Runtime}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Year"}/> <span>{movie.Year}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Plot"}/><span>{movie.Plot}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"ImdbRating"}/> <span>{movie.imdbRating}</span>
                </div>
                <div className="movie_icons_container">
                    <div className="movie_details_icon ">

                        {
                            favourite
                                ? <FaHeart size="100%" className="favourite" onClick={favouriteHandler}/>
                                : <FaRegHeart size="100%" className="not-favourite" onClick={favouriteHandler}/>
                        }
                    </div>
                    <div className="movie_details_icon" onClick={() => props.onMovieSelect("")}>
                        <MdAddCircleOutline size="100%"/>
                    </div>
                </div>
            </div>
        </div>

    );
}
