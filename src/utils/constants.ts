export const apiURL = process.env.REACT_APP_BASE_URL ?? "http://localhost:3001/movies";
export const movieSearch = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=`;
export const movieDetails = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=`;
