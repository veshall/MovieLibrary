import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { fallbackPersonImage, image185 } from "../api/movieDB";

export default function Cast({ cast, navigation }) {
  const charaterName = "John Wick";
  const personName = "keanu reevs";
  return (
    <View className="my-6">
      <Text className="text-slate-100 text-xl font-semibold mx-4 mb-5">
        Cast
      </Text>
      <View className=" mx-4 border-2 border-darkorange rounded-3xl">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="m-2"
        >
          {cast?.map((person, index) => {
            return (
              <Pressable
                key={index}
                onPress={() => navigation.navigate("Person", person)}
                className="mr-4 items-center"
              >
                <View className="overflow-hidden rounded-full h-20 w-20  items-center border-2 border-slate-400 ">
                  <Image
                    className=" rounded-full h-24 w-20"
                    source={{
                      uri:
                        image185(person?.profile_path) || fallbackPersonImage,
                    }}
                  />
                </View>

                <Text className="text-slate-100 text-sm ">
                  {person?.character?.length > 10
                    ? person.character.slice(0, 10) + "..."
                    : person.character}
                </Text>

                <Text className="text-slate-100 text-xs mt-1">
                  {person?.name?.length > 10
                    ? person.name.slice(0, 10) + "..."
                    : person.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
