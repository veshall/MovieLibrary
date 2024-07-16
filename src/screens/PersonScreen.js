import {
  ScrollView,
  Pressable,
  Text,
  View,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import MovieList from "../Components/MovieList";
import { StatusBar } from "expo-status-bar";
import Loading from "../Components/Loading";
import {
  fetchPersonDetails,
  fetchPersonMovies,
  image185,
  image342,
  image500,
} from "../api/movieDB";
import NavigationPanel from "../Components/NavigationPanel";

export default function PersonScreen({ navigation, route }) {
  const person = route.params;
  const { width, height } = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [personData, setPersonData] = useState(null);
  const [personMovies, setPersonMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(person.id);
    getPersonMovies(person.id);
  }, [person]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPersonData(data);
    setLoading(false);
  };
  const getPersonMovies = async (id) => {
    const data = await fetchPersonMovies(id);
    if (data?.cast) setPersonMovies(data.cast);
  };

  return (
    <>
      {/* Back button and like button */}
      <NavigationPanel
        isFavourite={isFavourite}
        setIsFavourite={setIsFavourite}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="flex-1 bg-neutral-900 pt-25 "
      >
        {/* Person Image */}
        {loading ? (
          <Loading />
        ) : (
          <View>
            <View className="flex-row justify-center ">
              <View
                className="overflow-hidden rounded-full h-72 w-72 mt-20 items-center
                 shadow-orange border-2 border-neworange "
                style={{
                  elevation: 150,
                }}
              >
                <Image
                  source={{ uri: image500(personData?.profile_path) }}
                  style={{ width: width * 0.63, height: height * 0.36 }}
                />
              </View>
            </View>

            {/* Person Name */}
            <View className="mt-6">
              <Text className="text-3xl font-bold text-center text-white ">
                {personData?.name}
              </Text>
              <Text className=" text-white text-base text-center">
                {personData?.place_of_birth}
              </Text>

              <View className="mt-6 mx-3 p-4  flex-row justify-center items-center bg-darkorange rounded-full">
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Gender</Text>
                  <Text className="text-neutral-300 ">
                    {personData?.gender === 1
                      ? "Female"
                      : personData?.gender === 2
                      ? "Male"
                      : "N/A"}
                  </Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-3 items-center">
                  <Text className="text-white font-semibold">Birthday</Text>
                  <Text className="text-neutral-300 ">
                    {personData?.birthday || "N/A"}
                  </Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                  <Text className="text-white font-semibold">Known For</Text>
                  <Text className="text-neutral-300 ">
                    {personData?.known_for_department || "N/A"}
                  </Text>
                </View>
                <View className=" px-2 items-center">
                  <Text className="text-white font-semibold">Popularity</Text>
                  <Text className="text-neutral-300 ">
                    {personData?.popularity.toFixed(2)}%
                  </Text>
                </View>
              </View>

              {/* Biography */}
              <View className="my-6 mx-4 space-y-2 ">
                <Text className="text-white text-lg">Biography</Text>
                <View className=" bg-darkorange rounded-xl p-2">
                  <Text className="  text-white font-semibold tracking-wide  ">
                    {personData?.biography || "N/A"}
                  </Text>
                </View>
              </View>

              {/* Movies */}
              <MovieList title="Movies" hideSeeAll={true} data={personMovies} />
            </View>
          </View>
        )}
        <StatusBar style="light" />
      </ScrollView>
    </>
  );
}
