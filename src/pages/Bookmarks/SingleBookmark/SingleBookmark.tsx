import React, { useContext, useEffect, useState } from "react";
import { Bookmark, HttPMethods, MovieDetails } from "../../../interfaces";
import { InfoButton } from "../../../components/common/InfoButton/InfoButton";
import { FaHeart } from "react-icons/fa";
import { GlobalContext } from "../../../contexts/GlobalContext";
import { fetchBookmarks } from "../../../utils/fetchHandler";
import { apiURL, movieDetails } from "../../../utils/constants";

interface Props {
  bookmarkedMovie: Bookmark;
}

export const SingleBookmark = (props: Props) => {
  const { bookmarkedMovie } = props;
  const { bookmarks, setBookmarks, isLogged } = useContext(GlobalContext);
  const [bookmarkDetails, setBookmarkDetails] = useState<MovieDetails | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const resp = await fetch(movieDetails + bookmarkedMovie.movieId);
      const movie = await resp.json();
      setBookmarkDetails(movie);
    })();
  }, []);

  const removeHandler = async () => {
    const newList = bookmarks.filter(
      (movie) => movie.movieId !== bookmarkedMovie.movieId
    );

    setBookmarks(newList);

    await fetchBookmarks(
      `${apiURL}/user/bookmarks`,
      HttPMethods.DELETE,
      bookmarkedMovie.movieId
    );
  };

  return (
    bookmarkDetails && (
      <div className="movie_details_container bookmark">
        <div className="movie_details_image">
          <img src={bookmarkDetails.Poster} />
        </div>

        <div className="movie_details_info_box">
          <div className="movie_details_title">
            <span>{bookmarkDetails.Title}</span>
          </div>
          <div className="movie_details_info">
            <InfoButton title={"Director"} />{" "}
            <span>{bookmarkDetails.Director}</span>
          </div>
          <div className="movie_details_info">
            <div>
              <InfoButton title={"Actors"} />
            </div>
            <span>{bookmarkDetails.Actors}</span>
          </div>
          <div className="movie_details_info">
            <InfoButton title={"Genre"} /> <span>{bookmarkDetails.Genre}</span>
          </div>
          <div className="movie_details_info">
            <InfoButton title={"Runtime"} />
            <span>{bookmarkDetails.Runtime}</span>
          </div>
          <div className="movie_details_info">
            <InfoButton title={"Year"} /> <span>{bookmarkDetails.Year}</span>
          </div>
          <div className="movie_details_info">
            <InfoButton title={"Plot"} />
            <span>{bookmarkDetails.Plot}</span>
          </div>
          <div className="movie_details_info">
            <InfoButton title={"ImdbRating"} />{" "}
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
