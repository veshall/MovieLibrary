import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { fallbackMoviePoster, image185 } from "../api/movieDB";
import { MaterialIcons } from "@expo/vector-icons";

export default function MovieList({ title, hideSeeAll, data }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-slate-100 text-xl font-semibold">{title}</Text>
        {!hideSeeAll ? (
          <Pressable
            onPress={() => navigation.navigate("List", title)}
            className="flex-row items-center justify-center "
          >
            <Text className="text-lg text-neworange">See All </Text>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color="white"
              style={{ top: 1, left: -4 }}
            />
          </Pressable>
        ) : null}
      </View>

      {/* movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data?.map((item, index) => {
          const title = item.original_title;
          return (
            <Pressable
              key={index}
              onPress={() => {
                navigation.push("Movie", item);
              }}
            >
              <View className=" space-y-1 mr-4" key={index}>
                <Image
                  source={{
                    uri: image185(item.poster_path) || fallbackMoviePoster,
                  }}
                  className=" rounded-3xl "
                  style={{ width: width * 0.33, height: height * 0.22 }}
                />
              </View>
              <Text className="text-slate-100 ml-1">
                {title?.length > 10 ? title.slice(0, 12) + "..." : title}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}
