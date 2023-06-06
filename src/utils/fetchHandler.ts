import { Form, HttPMethods } from "src/interfaces";

export const fetchBookmarks = async (
  path: string,
  method: HttPMethods,
  selectedMovie: string
) => {
  await fetch(path, {
    method: method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      movieId: selectedMovie,
      isFavourite: true,
    }),
  });
};

export const fetchForm = async (
  path: string,
  method: HttPMethods,
  data: Form
) => {
  return await fetch(path, {
    method: method,
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
