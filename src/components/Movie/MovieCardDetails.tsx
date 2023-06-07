import {useContext, useEffect, useState} from "react";
import {MdAddCircleOutline} from "react-icons/md";
import {FaHeart, FaRegHeart} from "react-icons/fa";

import {apiURL, movieDetails} from "../../utils/constants";
import {GlobalContext} from "../../contexts/GlobalContext";
import {InfoButton} from "../common/InfoButton/InfoButton";
import {fetchBookmarks} from "../../utils/fetchHandler";
import {HttPMethods, MovieDetails} from "../../interfaces";
import "./MovieCardDetails.css";

interface Props {
    selectedMovie: string;
    onMovieSelect: (value: string) => void;
}

export const MovieCardDetails = (props: Props) => {
    const {bookmarks, setBookmarks, isLogged} = useContext(GlobalContext);

    const {selectedMovie} = props;
    const [movie, setMovie] = useState<MovieDetails | null>(null);
    const [favourite, setFavourite] = useState<boolean>(false);

    const getMovieDetails = async () => {

        try {
            const resp = await fetch(`${movieDetails}${selectedMovie}`);
            const data = await resp.json();
            setMovie(data);
        } catch (err) {
            console.error(err);
            throw new Error("Something went wrong, try again later!")
        }
    };

    const isFavourite = async () => {
        const found = bookmarks.some((obj) => obj.movieId === selectedMovie);
        setFavourite(found);
    };

    const favouriteHandler = async () => {
        if (!favourite) {
            bookmarks.push({movieId: selectedMovie, isFavourite: true});
            setBookmarks([...bookmarks]);
            setFavourite(true);

            try {
                await fetchBookmarks(
                    `${apiURL}/user/bookmarks`,
                    HttPMethods.POST,
                    selectedMovie
                );
            } catch (err) {
                console.error(err);
                throw new Error("Something went wrong, try again later!")
            }

        } else {
            const filtered = bookmarks.filter((obj) => obj.movieId !== selectedMovie);
            setBookmarks([...filtered]);
            setFavourite(false);

            try {
                await fetchBookmarks(
                    `${apiURL}/user/bookmarks`,
                    HttPMethods.DELETE,
                    selectedMovie
                );
            } catch (err) {
                console.error(err);
                throw new Error("Something went wrong, try again later!")
            }
        }
    };

    useEffect(() => {
        getMovieDetails();
        isFavourite();
    }, [selectedMovie, favourite]);

    return (
        movie && (
            <div className="movie_details_container">
                <div className="movie_details_image">
                    <img src={movie.Poster} alt="movie_image"/>
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
                        <InfoButton title={"Runtime"}/>
                        <span>{movie.Runtime}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Year"}/> <span>{movie.Year}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Plot"}/>
                        <span>{movie.Plot}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"ImdbRating"}/> <span>{movie.imdbRating}</span>
                    </div>
                    <div className="movie_icons_container">
                        <div className="movie_details_icon ">
                            <>
                                {isLogged ? (
                                    favourite ? (
                                        <FaHeart
                                            size="100%"
                                            className="favourite"
                                            onClick={favouriteHandler}
                                        />
                                    ) : (
                                        <FaRegHeart
                                            size="100%"
                                            className="not-favourite"
                                            onClick={favouriteHandler}
                                        />
                                    )
                                ) : null}
                            </>
                        </div>
                        <div
                            className="movie_details_icon"
                            onClick={() => props.onMovieSelect("")}
                        >
                            <MdAddCircleOutline size="100%"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
