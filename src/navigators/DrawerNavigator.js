import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AppStackNavigator from "./AppStackNavigator";

import {
  View,
  Text,
  Image,
  useWindowDimensions,
  Linking,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import HelpScreen from "../screens/HelpScreen";
import SavedScreen from "../screens/SavedScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";

export default function DrawerNavigator() {
  const { width, height } = useWindowDimensions();
  const Drawer = createDrawerNavigator();

  const drawerIcon = (type) => {
    return <MaterialIcons name={type} size={32} color="#d4d4d4" />;
  };

  const CustomDrawer = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          {/* Profile Info */}
          <View className=" m-4 py-8 flex-row items-center justify-between border-b-2 border-lightgray">
            <View className="border-2 rounded-full border-neworange p-1">
              <Image
                source={require("../assets/CardPhotos/profilePhoto.jpg")}
                className="w-12 h-12 rounded-full"
              />
            </View>
            <View>
              <Text className="font-bold text-base text-white">
                vishal paliwal
              </Text>
              <Text className=" text-xs font-semibold text-white tracking-wide">
                vishalpaliwal51@gmail.com
              </Text>
            </View>
            <MaterialIcons name="more-vert" size={28} color="#f4a261" />
          </View>

          {/* drawer list */}
          <View className="mx-4 py-4 border-b-2 border-b-lightgray">
            <DrawerItemList {...props} />
          </View>

          {/* Developer Content */}
          <View className="m-5 p-4 bg-lightgray rounded-2xl ">
            <Text className="mb-2 font-medium text-lg text-neworange">
              Developer's Contect
            </Text>
            <Pressable
              className="my-3 flex-row items-center gap-7"
              onPress={() => Linking.openURL("https://github.com/veshall")}
            >
              <MaterialCommunityIcons name="github" size={32} color="#d4d4d4" />
              <Text className="font-bold text-base text-neutralwhite">
                Github
              </Text>
            </Pressable>

            <Pressable
              className="my-3 flex-row items-center gap-7"
              onPress={() => Linking.openURL("https://twitter.com/veshall_")}
            >
              <MaterialCommunityIcons
                name="twitter"
                size={30}
                color="#d4d4d4"
              />
              <Text className=" font-bold text-base text-neutralwhite">
                Twitter
              </Text>
            </Pressable>
          </View>
        </DrawerContentScrollView>

        {/* theme and Signout */}
        <View className="m-10 flex-row justify-between items-center">
          <Entypo name="light-up" size={28} color="#d4d4d4" />
          <View className="flex-row justify-center items-center gap-1 ">
            <MaterialIcons name="logout" size={28} color="#D4D4D4" />
            <Text className="font-bold text-base text-neutralwhite">
              Signout
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEdgeWidth: width * 0.05,
        drawerActiveTintColor: "#f4a261",
        drawerInactiveTintColor: "#d4d4d4",
        drawerLabelStyle: { fontSize: 16, fontWeight: "700" },
        drawerStyle: {
          backgroundColor: "#171717",
          width: width * 0.75,
        },
        drawerType: "sliding",
      }}
    >
      <Drawer.Screen
        name="Home"
        component={AppStackNavigator}
        options={{
          drawerIcon: () => drawerIcon("home"),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerIcon: () => drawerIcon("person"),
        }}
      />
      <Drawer.Screen
        name="Search"
        component={SearchScreen}
        options={{
          drawerIcon: () => drawerIcon("search"),
        }}
      />

      <Drawer.Screen
        name="Saved"
        component={SavedScreen}
        options={{
          drawerIcon: () => drawerIcon("favorite"),
        }}
      />
      <Drawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerIcon: () => drawerIcon("help"),
        }}
      />
    </Drawer.Navigator>
  );
}
