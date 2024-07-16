import {
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import NavigationPanel from "../Components/NavigationPanel";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { width, height } = useWindowDimensions();
  return (
    <SafeAreaView className="flex-1 bg-neutral-900">
      <NavigationPanel hidelikebtn={true} />

      <View className="flex-row justify-center z-20">
        <View
          className="overflow-hidden rounded-full flex justify-center items-center h-28 w-28 my-8 
                 shadow-orange border-4 border-neutralwhite"
          style={{
            elevation: 150,
          }}
        >
          <Ionicons name="person-outline" size={72} color="white" />
        </View>
      </View>

      <ScrollView
        className=" bg-neutralwhite rounded-t-3xl px-4 py-2"
        contentContainerStyle={{ paddingVertical: 30 }}
      >
        <View className="p-2 bg-gray-400 rounded-xl mb-4">
          <View className=" flex-row items-center gap-2 border-b-2 border-gray-500 mx-2 pb-2">
            <Ionicons name="person-outline" size={24} color="black" />
            <Text className="font-medium text-lg tracking-wide">Account</Text>
          </View>

          <View className="gap-3 m-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Edit Profile
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Change Password
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Privacy
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
          </View>
        </View>

        <View className="p-2 bg-gray-400 rounded-xl mb-4">
          <View className=" flex-row items-center gap-2 border-b-2 border-gray-500 mx-2 pb-2">
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Text className="font-medium text-lg tracking-wide">
              Notifications
            </Text>
          </View>

          <View className="gap-3 m-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                App Notifications
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Email Alerts
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
          </View>
        </View>

        <View className="p-2 bg-gray-400 rounded-xl mb-4">
          <View className=" flex-row items-center gap-2 border-b-2 border-gray-500 mx-2 pb-2">
            <Ionicons name="albums-outline" size={24} color="black" />
            <Text className="font-medium text-lg tracking-wide">More</Text>
          </View>

          <View className="gap-3 m-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Language
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Country
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
          </View>
        </View>
        <View className="p-2 bg-gray-400 rounded-xl ">
          <View className=" flex-row items-center gap-2 border-b-2 border-gray-500 mx-2 pb-2">
            <Ionicons name="albums-outline" size={24} color="black" />
            <Text className="font-medium text-lg tracking-wide">
              Aunthenticatons
            </Text>
          </View>

          <View className="gap-3 m-1">
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Language
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-800 text-base font-medium">
                Country
              </Text>
              <MaterialIcons name="navigate-next" size={24} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
