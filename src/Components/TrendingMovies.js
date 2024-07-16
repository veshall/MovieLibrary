import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  Switch,
} from "react-native";
import React, { useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/movieDB";

export default function TrendingMovies({ daytrending, weektrending }) {
  const { width, height } = useWindowDimensions();
  const [trendingSwitch, setTrendingSwitch] = useState("today");

  return (
    <View className="flex-1 justify-center ">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className=" text-slate-100 text-xl font-semibold">Trending</Text>

        <View
          className=" flex-row items-center bg-white rounded-xl"
          style={{ elevation: 10 }}
        >
          <Pressable
            className="p-1  rounded-l-xl"
            onPress={() => setTrendingSwitch("today")}
            style={
              trendingSwitch === "today" ? { backgroundColor: "#f4a261" } : null
            }
          >
            <Text className="font-medium text-base leading-5">Today</Text>
          </Pressable>
          <Pressable
            className="p-1 rounded-r-xl"
            onPress={() => setTrendingSwitch("week")}
            style={
              trendingSwitch === "week" ? { backgroundColor: "#f4a261" } : null
            }
          >
            <Text className="font-medium text-base leading-5 ">Week</Text>
          </Pressable>
        </View>
      </View>

      <Carousel
        data={trendingSwitch === "today" ? daytrending : weektrending}
        renderItem={({ item }) => <MovieCard item={item} />}
        mode="parallax"
        defaultIndex={0}
        modeConfig={{
          parallaxScrollingScale: 0.92,
          parallaxScrollingOffset: 155,
        }}
        width={width}
        height={height * 0.5}
      />
    </View>
  );
}

const MovieCard = ({ item }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions(item);
  return (
    <Pressable onPress={() => navigation.navigate("Movie", item)}>
      <Image
        className="rounded-3xl"
        source={{ uri: image500(item.poster_path) }}
        style={{
          width: width * 0.7,
          height: height * 0.5,
          alignSelf: "center",
        }}
      />
    </Pressable>
  );
};
