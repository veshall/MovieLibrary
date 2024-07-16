import {
  View,
  Text,
  useWindowDimensions,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import {
  fallbackMoviePoster,
  fetchMovieImages,
  image500,
} from "../api/movieDB";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationPanel from "../Components/NavigationPanel";
import { ScrollView } from "react-native-gesture-handler";

export default function GalleryScreen({ route }) {
  const item = route.params;
  const { movieId, movie } = item;
  const { width, height } = useWindowDimensions();
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    const getMovieImages = async (id) => {
      const data = await fetchMovieImages(id);
      if (data) setImages(data.backdrops);
    };
    getMovieImages(movieId);
  }, [movieId]);

  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <NavigationPanel />
      <Text
        className="mx-4 text-2xl text-white font-bold"
        style={{ top: height * 0.08 }}
      >
        Gallery
      </Text>

      <View className="flex justify-center items-start">
        <Text
          className="mx-3 mt-2 mb-6 text-sm text-white font-semibold border p-2 rounded-xl text-center bg-zinc-600"
          style={{ top: height * 0.08 }}
        >
          Movie : {movie}
        </Text>
      </View>

      {/* Gallery */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 15 }}
        className=" my-14 p-1"
        style={{ width: width }}
      >
        <View className="flex-row justify-center items-center gap-1 flex-wrap">
          {images.map((item, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate("Movie", item)}
              >
                <View key={index}>
                  <Image
                    source={{
                      uri: image500(item?.file_path) || fallbackMoviePoster,
                    }}
                    style={{ width: 135, height: 135 }}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
