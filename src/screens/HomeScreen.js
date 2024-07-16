import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import TrendingMovies from "../Components/TrendingMovies";
import MovieList from "../Components/MovieList";
import { StatusBar } from "expo-status-bar";
import Loading from "../Components/Loading";
import {
  fetchTrendingdayMovies,
  fetchTrendingweekMovies,
  fetchTopratedMovies,
  fetchUpcomingMovies,
} from "../api/movieDB";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const [daytrending, setdayTrending] = useState([]);
  const [weektrending, setweekTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    setLoading(true);
    getTrendingdayMovies();
    getTrendingweekMovies();
    getUpcomingMovies();
    getTopratedMovies();
    setLoading(false);
  }, []);

  const getTrendingdayMovies = async () => {
    const data = await fetchTrendingdayMovies();
    if (data?.results) setdayTrending(data.results);
  };
  const getTrendingweekMovies = async () => {
    const data = await fetchTrendingweekMovies();
    if (data?.results) setweekTrending(data.results);
  };
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if (data?.results) setUpcoming(data.results);
  };
  const getTopratedMovies = async () => {
    const data = await fetchTopratedMovies();
    if (data?.results) setTopRated(data.results);
  };

  return (
    <>
      <View className="flex-1 ">
        <LinearGradient
          colors={["#6E381B", "#000"]}
          style={{ width, height }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
        <SafeAreaView>
          <View className="flex-row justify-between items-center m-4">
            <View className="flex-row items-center justify-between">
              <MaterialIcons
                onPress={() => navigation.openDrawer()}
                name="menu"
                size={30}
                color="white"
              />

              {/* Logo */}
              <View className="left-5 flex-row items-center justify-center">
                <View className=" bg-neworange rounded-lg">
                  <Text className="  text-3xl font-bold pl-1 text-darkorange ">
                    Mo
                  </Text>
                </View>
                <Text className="  text-3xl font-bold text-neworange ">
                  vies
                </Text>
              </View>
            </View>

            <View className="flex-row gap-4">
              <Pressable onPress={() => navigation.navigate("Search")}>
                <MaterialIcons name="search" size={30} color="white" />
              </Pressable>
              <Pressable onPress={() => navigation.navigate("Profile")}>
                <MaterialIcons name="person" size={30} color="white" />
              </Pressable>
            </View>
          </View>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* Trending Moview Crousel */}
            {
              <TrendingMovies
                daytrending={daytrending}
                weektrending={weektrending}
              />
            }

            {/*  upcoming movies row */}
            {upcoming.length > 0 ? (
              <MovieList title="Upcoming" data={upcoming} />
            ) : null}

            {/*  topRated movies row */}
            {topRated.length > 0 ? (
              <MovieList title="Top Rated" data={topRated} />
            ) : null}
          </ScrollView>
        )}

        <StatusBar style="light" />
      </View>
    </>
  );
}
