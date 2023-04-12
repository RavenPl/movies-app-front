import React, {useContext, useEffect, useState} from 'react';

import {SingleBookmark} from "./SingleBookmark/SingleBookmark";
import {GlobalContext} from "../../contexts/GlobalContext";
import {movieDetails} from "../../utils/constants";
import {MovieDetails} from "../../interfaces";

export const Bookmarks = () => {

    const {bookmarks, setBookmarks} = useContext(GlobalContext);
    const [bookmarkDetails, setBookmarkDetails] = useState<MovieDetails[]>([]);

    const bookmarkRefresh = async () => {
        const resp = await fetch("http://localhost:3001/movies/user/bookmarks", {
            credentials: "include"
        });
        const data = await resp.json();
        setBookmarks([...data.bookmarks]);
    }

    useEffect(() => {
        bookmarkRefresh()

        bookmarks.forEach(async (obj) => {
            const resp = await fetch(movieDetails + obj.movieId);
            const movie = await resp.json();
            bookmarkDetails.push(movie)
            setBookmarkDetails([...bookmarkDetails]);
        })

    }, [])


    return (
        <>
            {
                bookmarkDetails.map(obj => <SingleBookmark key={obj.imdbID} bookmarkedMovie={obj}/>)
            }
        </>
    );
};
