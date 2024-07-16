import {
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Loading from "../Components/Loading";
import { fallbackMoviePoster, image342, searchMovies } from "../api/movieDB";

export default function SearchScreen() {
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  React.useEffect(() => {
    if (input?.length > 2) {
      setLoading(true);
      const fetchTerm = setTimeout(async () => {
        const response = await searchMovies({
          query: input,
          include_adult: "false",
          language: "en-US",
          page: "1",
        });
        return setResults(response.results);
      }, 600);
      setLoading(false);
      return () => clearTimeout(fetchTerm);
    }
  }, [input]);

  return (
    <SafeAreaView className=" bg-neutral-900 flex-1">
      {/* SearchBar */}
      <View className="m-4 flex-row justify-center items-center border border-neworange rounded-full">
        <Pressable onPress={() => navigation.goBack()} className=" ml-4">
          <MaterialIcons name="arrow-back-ios" size={24} color="white" />
        </Pressable>
        <TextInput
          cursorColor={"lightgray"}
          autoFocus
          autoCapitalize="none"
          value={input}
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          onChangeText={(text) => setInput(text)}
          className=" px-3 flex-1 text-base font-semibold text-white tracking-wider"
        />
        <Pressable
          onPress={() => setInput("")}
          className=" rounded-full p-3 m-1 bg-neutral-500"
        >
          <MaterialIcons name="clear" size={24} color="white" />
        </Pressable>
      </View>

      {/* Results */}

      {loading ? (
        <Loading />
      ) : results.length > 0 ? (
        <ScrollView
          className="space-y-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
        >
          <View className="flex-row items-start">
            <View className="border border-neutral-500 rounded-full p-2 ">
              <Text className="text-white font-semibold ml-1">
                Results ({results.length})
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => navigation.navigate("Movie", item)}
                >
                  <View key={index} className="space-y-2 mb-4">
                    <Image
                      className=" rounded-3xl"
                      source={{
                        uri: image342(item?.poster_path) || fallbackMoviePoster,
                      }}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className=" text-neutral-300 ml-1">
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
      ) : (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/CardPhotos/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      )}
    </SafeAreaView>
  );
}
