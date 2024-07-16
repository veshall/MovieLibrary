import {
  View,
  Text,
  Pressable,
  useWindowDimensions,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import NavigationPanel from "../Components/NavigationPanel";
import {
  fallbackMoviePoster,
  fetchTopratedMovies,
  fetchUpcomingMovies,
  image342,
} from "../api/movieDB";
import Loading from "../Components/Loading";

export default function MoviesList({ navigation, route }) {
  const title = route.params;
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = React.useState(false);
  const [results, setResults] = React.useState([]);

  React.useEffect(() => {
    if (title === "Upcoming") {
      getUpcomingMovies();
    } else if (title === "Top Rated") {
      getTopratedMovies();
    }
  }, []);

  const getUpcomingMovies = async () => {
    setLoading(true);
    const data = await fetchUpcomingMovies();
    if (data?.results) setResults(data.results);
    setLoading(false);
  };
  const getTopratedMovies = async () => {
    setLoading(true);
    const data = await fetchTopratedMovies();
    if (data?.results) setResults(data.results);
    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <NavigationPanel hidelikebtn={true} />

      <Text
        className="mx-4 text-2xl text-slate-100 font-bold "
        style={{ top: height * 0.08 }}
      >
        {title}
      </Text>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3 top-16 my-4 py-2"
        >
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View key={index} className="space-y-2 mb-4  ">
                    <View className=" border-2 border-slate-400 rounded-2xl">
                      <Image
                        className="rounded-2xl"
                        source={{
                          uri:
                            image342(item?.poster_path) || fallbackMoviePoster,
                        }}
                        style={{ width: width * 0.44, height: height * 0.3 }}
                      />
                    </View>
                    <Text className=" text-slate-100 ml-1">
                      {item?.title?.length > 20
                        ? item?.title.slice(0, 20) + "..."
                        : item?.title}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
