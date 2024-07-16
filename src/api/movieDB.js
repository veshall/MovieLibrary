import axios from "axios";

const _TMDB_API_KEY = "f87d49b906631c30884c81093b971d81";

// endpoints

const apiBaseURL = "https://api.themoviedb.org/3";

const trendingdayURL = `${apiBaseURL}/trending/movie/day?api_key=${_TMDB_API_KEY}`;
const trendingweekURL = `${apiBaseURL}/trending/movie/week?api_key=${_TMDB_API_KEY}`;
const upcomingURL = `${apiBaseURL}/movie/upcoming?api_key=${_TMDB_API_KEY}`;
const topratedURL = `${apiBaseURL}/movie/top_rated?api_key=${_TMDB_API_KEY}`;
const searchMovieURL = `${apiBaseURL}/search/movie?api_key=${_TMDB_API_KEY}`;

// Dynamic Endpoints

const movieDetailsURL = (id) =>
  `${apiBaseURL}/movie/${id}?api_key=${_TMDB_API_KEY}`;

const movieCreditsURL = (id) =>
  `${apiBaseURL}/movie/${id}/credits?api_key=${_TMDB_API_KEY}`;

const similarMoviesURL = (id) =>
  `${apiBaseURL}/movie/${id}/similar?api_key=${_TMDB_API_KEY}`;

const personDetailsURL = (id) =>
  `${apiBaseURL}/person/${id}?api_key=${_TMDB_API_KEY}`;

const personMoviesURL = (id) =>
  `${apiBaseURL}/person/${id}/movie_credits?api_key=${_TMDB_API_KEY}`;

const movieImagesURL = (id) =>
  `${apiBaseURL}/movie/${id}/images?api_key=${_TMDB_API_KEY}`;

// Image fetch

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

// Fallback Images
export const fallbackMoviePoster =
  "https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg";
export const fallbackPersonImage =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU";

const apiCall = async (endpoints, params) => {
  const options = {
    url: endpoints,
    method: "GET",
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log("error", err);
    return {};
  }
};

export const fetchTrendingdayMovies = () => {
  return apiCall(trendingdayURL);
};
export const fetchTrendingweekMovies = () => {
  return apiCall(trendingweekURL);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingURL);
};
export const fetchTopratedMovies = () => {
  return apiCall(topratedURL);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsURL(id));
};
export const fetchMovieCredits = (id) => {
  return apiCall(movieCreditsURL(id));
};
export const fetchSimilarMovies = (id) => {
  return apiCall(similarMoviesURL(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsURL(id));
};
export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesURL(id));
};
export const fetchMovieImages = (id) => {
  return apiCall(movieImagesURL(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMovieURL, params);
};
