import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { image500 } from "../api/movieDB";
import { useNavigation } from "@react-navigation/native";

export default function MovieImages({ images, movieId, movie }) {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const item = { movieId, movie };

  return (
    <View className="mb-8 space-y-4">
      <View className=" mx-4 flex-row justify-between items-center">
        <Text className="text-slate-100 text-xl font-semibold">Images</Text>
        <Pressable
          onPress={() => navigation.navigate("Gallery", item)}
          className="flex-row items-center"
        >
          <Text className="text-lg text-yellow">See All</Text>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={24}
            color="white"
            style={{ top: 1, left: -4 }}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {images.map((item, index) => {
          return (
            <View key={index} className="space-y-1 mr-4">
              <Image
                source={{ uri: image500(item.file_path) }}
                className="rounded-2xl"
                style={{ width: width * 0.34, height: height * 0.18 }}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
