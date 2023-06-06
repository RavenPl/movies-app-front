import React, { useContext } from "react";

import { SingleBookmark } from "./SingleBookmark/SingleBookmark";
import { GlobalContext } from "../../contexts/GlobalContext";

export const Bookmarks = () => {
  const { bookmarks } = useContext(GlobalContext);

  return (
    <>
      {bookmarks.map((obj) => (
        <SingleBookmark key={obj.movieId} bookmarkedMovie={obj} />
      ))}
    </>
  );
};
