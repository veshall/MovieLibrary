import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../Components/Cast";
import MovieList from "../Components/MovieList";
import Loading from "../Components/Loading";
import {
  fallbackMoviePoster,
  fetchMovieCredits,
  fetchMovieDetails,
  fetchMovieImages,
  fetchSimilarMovies,
  image500,
} from "../api/movieDB";
import NavigationPanel from "../Components/NavigationPanel";
import MovieImages from "../Components/MovieImages";

export default function MovieScreen({ navigation, route }) {
  const item = route.params;
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [isFavourite, setIsFavourite] = React.useState();
  const [cast, setCast] = useState([]);
  const [images, setImages] = React.useState([]);
  const [similarMovies, setSimilarmovies] = useState([]);

  React.useEffect(() => {
    getMovieDetails(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    setLoading(true);
    const movie = await fetchMovieDetails(id);
    if (movie) setMovie(movie);

    const credits = await fetchMovieCredits(id);
    if (credits?.cast) setCast(credits.cast);

    const similar = await fetchSimilarMovies(id);
    if (similar?.results) setSimilarmovies(similar.results);

    const images = await fetchMovieImages(id);
    if (images) setImages(images.backdrops);

    setLoading(false);
  };

  return (
    <>
      {/* back button and movie poster */}
      <NavigationPanel
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
      />

      {/* Movie content */}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        className="flex-1 bg-neutral-900 "
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <View className="w-full">
              <View>
                <Image
                  source={{
                    uri: image500(movie?.poster_path) || fallbackMoviePoster,
                  }}
                  style={{ width, height: height * 0.55 }}
                />
                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(23, 23, 23, 0.8)",
                    "rgba(23,23,23, 1)",
                  ]}
                  style={{ width, height: height * 0.4 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  className="absolute bottom-0"
                />
              </View>
            </View>

            {/* movie details */}

            <View
              style={{ marginTop: -(height * 0.15) }}
              className="space-y-3 mx-2"
            >
              {/* title */}
              <Text className="text-slate-100 text-center text-3xl font-bold tracking-widest">
                {movie?.title}
              </Text>

              {/* status, release year, runtime */}
              {movie?.id ? (
                <Text className="text-slate-100 font-semibold text-base text-center">
                  {movie?.status} •{" "}
                  {movie?.release_date?.split("-")[0] || "N/A"} •
                  {movie?.runtime} min
                </Text>
              ) : null}

              {/* genres  */}
              <View className="flex-row justify-center mx-4 space-x-2">
                {movie?.genres?.map((genre, index) => {
                  let showDot = index + 1 != movie.genres.length;
                  return (
                    <Text
                      key={index}
                      className="text-slate-100 font-semibold text-base text-center"
                    >
                      {genre?.name} {showDot ? "•" : null}
                    </Text>
                  );
                })}
              </View>

              {/* description */}
              <Text className="text-slate-100 mx-4 tracking-wide text-center">
                {movie?.overview}
              </Text>
            </View>

            {/* cast */}
            {movie?.id && cast.length > 0 && (
              <Cast navigation={navigation} cast={cast} />
            )}

            {/* movie images */}
            {images?.length > 0 && (
              <MovieImages
                images={images}
                movieId={item.id}
                movie={movie?.title}
              />
            )}

            {/* similar movies section */}
            {movie?.id && similarMovies.length > 0 && (
              <MovieList
                title={"Similar Movies"}
                hideSeeAll={true}
                data={similarMovies}
              />
            )}
          </>
        )}
      </ScrollView>
    </>
  );
}
