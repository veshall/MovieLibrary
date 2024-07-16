import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View className=" w-screen h-screen flex-row justify-center items-center">
      <ActivityIndicator
        animating
        color="#f4a261"
        hidesWhenStopped
        size="large"
      />
    </View>
  );
}
