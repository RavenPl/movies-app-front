import React from 'react';
import {MovieDetails} from "../../../interfaces";
import {InfoButton} from "../../../components/common/InfoButton/InfoButton";
import {FaHeart} from "react-icons/fa";

interface Props {
    bookmarkedMovie: MovieDetails
}

export const SingleBookmark = (props: Props) => {

    const {bookmarkedMovie} = props;


    return (
        <div className="movie_details_container bookmark">

            <div className="movie_details_image">
                <img src={bookmarkedMovie.Poster}/>
            </div>

            <div className="movie_details_info_box">
                <div className="movie_details_title">
                    <span>{bookmarkedMovie.Title}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Director"}/> <span>{bookmarkedMovie.Director}</span>
                </div>
                <div className="movie_details_info">
                    <div>
                        <InfoButton title={"Actors"}/>
                    </div>
                    <span>{bookmarkedMovie.Actors}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Genre"}/> <span>{bookmarkedMovie.Genre}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Runtime"}/><span>{bookmarkedMovie.Runtime}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Year"}/> <span>{bookmarkedMovie.Year}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"Plot"}/><span>{bookmarkedMovie.Plot}</span>
                </div>
                <div className="movie_details_info">
                    <InfoButton title={"ImdbRating"}/> <span>{bookmarkedMovie.imdbRating}</span>
                </div>
                <div className="movie_icons_container">
                    <div className="movie_details_icon ">

                        <>
                            {
                                <FaHeart size="100%" className="favourite"/>
                            }
                        </>
                    </div>
                </div>
            </div>
        </div>
    );
};
