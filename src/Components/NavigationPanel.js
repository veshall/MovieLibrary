import React from "react";
import { View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function NavigationPanel({
  isFavourite,
  setIsFavourite,
  hidelikebtn,
}) {
  const programaticNavigation = useNavigation();
  return (
    <SafeAreaView className="absolute my-4 px-4 z-20 w-full flex-row justify-between items-center">
      <Pressable
        onPress={() => {
          programaticNavigation.goBack();
        }}
        className="bg-neworange rounded-full p-[4px]"
      >
        <View className=" left-[6px]">
          <MaterialIcons name="arrow-back-ios" size={32} color="white" />
        </View>
      </Pressable>
      {!hidelikebtn ? (
        <Pressable onPress={() => setIsFavourite(!isFavourite)}>
          <MaterialIcons
            name="favorite"
            size={36}
            color={isFavourite ? "orange" : "white"}
          />
        </Pressable>
      ) : null}
    </SafeAreaView>
  );
}
