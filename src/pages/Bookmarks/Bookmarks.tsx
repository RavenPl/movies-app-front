import React, {useContext, useEffect} from "react";

import {GlobalContext} from "../../contexts/GlobalContext";
import {SingleBookmark} from "./SingleBookmark/SingleBookmark";

export const Bookmarks = () => {
  const {bookmarks} = useContext(GlobalContext);

  useEffect(() => {
  }, [bookmarks])
  return (
      <>
        {bookmarks.map((obj) => (
            <SingleBookmark key={obj.movieId} bookmarkedMovie={obj}/>
        ))}
    </>
  );
};
