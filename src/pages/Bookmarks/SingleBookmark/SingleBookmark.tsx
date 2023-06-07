import React, {useContext, useEffect, useState} from "react";
import {FaHeart} from "react-icons/fa";

import {GlobalContext} from "../../../contexts/GlobalContext";
import {apiURL, movieDetails} from "../../../utils/constants";
import {InfoButton} from "../../../components/common/InfoButton/InfoButton";
import {fetchBookmarks} from "../../../utils/fetchHandler";
import {Bookmark, HttPMethods, MovieDetails} from "../../../interfaces";

interface Props {
    bookmarkedMovie: Bookmark;
}

export const SingleBookmark = (props: Props) => {
    const {bookmarkedMovie} = props;
    const {bookmarks, setBookmarks} = useContext(GlobalContext);
    const [bookmarkDetails, setBookmarkDetails] = useState<MovieDetails | null>(
        null
    );

    useEffect(() => {
        (async () => {
            try {
                const resp = await fetch(movieDetails + bookmarkedMovie.movieId);
                const movie = await resp.json();
                setBookmarkDetails(movie);
            } catch (err) {
                console.error(err);
                throw new Error("Something went wrong, try again later!")
            }
        })();
    }, []);

    const removeHandler = async () => {

        const newList = bookmarks.filter(
            (movie) => movie.movieId !== bookmarkedMovie.movieId
        );
        setBookmarks(newList);

        try {
            await fetchBookmarks(
                `${apiURL}/user/bookmarks`,
                HttPMethods.DELETE,
                bookmarkedMovie.movieId
            );
        } catch (err) {
            console.error(err);
            throw new Error("Something went wrong, try again later!")
        }
    };

    return (
        bookmarkDetails && (
            <div className="movie_details_container bookmark">
                <div className="movie_details_image">
                    <img src={bookmarkDetails.Poster} alt="poster picture"/>
                </div>
                <div className="movie_details_info_box">
                    <div className="movie_details_title">
                        <span>{bookmarkDetails.Title}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Director"}/>{" "}
                        <span>{bookmarkDetails.Director}</span>
                    </div>
                    <div className="movie_details_info">
                        <div>
                            <InfoButton title={"Actors"}/>
                        </div>
                        <span>{bookmarkDetails.Actors}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Genre"}/> <span>{bookmarkDetails.Genre}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Runtime"}/>
                        <span>{bookmarkDetails.Runtime}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Year"}/> <span>{bookmarkDetails.Year}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"Plot"}/>
                        <span>{bookmarkDetails.Plot}</span>
                    </div>
                    <div className="movie_details_info">
                        <InfoButton title={"ImdbRating"}/>{" "}
                        <span>{bookmarkDetails.imdbRating}</span>
                    </div>
                    <div className="movie_icons_container">
                        <div className="movie_details_icon ">
                            <>
                                {
                                    <FaHeart
                                        onClick={removeHandler}
                                        size="100%"
                                        className="favourite"
                                    />
                                }
                            </>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};
