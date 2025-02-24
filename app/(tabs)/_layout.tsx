import { Tabs, useNavigation, useRouter } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Alert, BackHandler, Pressable, View } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useThemeContext } from "../../context/ThemeContext";
import { Switch, Text, useTheme } from "react-native-paper";

export default function TabLayout() {
  const navigation = useNavigation();
  const router = useRouter();
  const { isDarkMode, toggleTheme } = useThemeContext();

  const theme = useTheme();

  useEffect(() => {
    const backAction = () => {
      if (router.pathname === "/(tabs)/home") {
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default back action
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup event listener
  }, [router.pathname]);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Text style={{ marginRight: 10, color: theme.colors.text }}>
                {isDarkMode ? "Dark" : "Light"}
              </Text>
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => {
                if (router.pathname === "/(tabs)/home") {
                  BackHandler.exitApp();
                } else {
                  navigation.goBack();
                }
              }}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={28} name="user" color={color} />
          ),
          headerRight: () => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 15,
              }}
            >
              <Text style={{ marginRight: 10, color: theme.colors.text }}>
                {isDarkMode ? "Dark" : "Light"}
              </Text>
              <Switch value={isDarkMode} onValueChange={toggleTheme} />
            </View>
          ),
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 15 }}
            >
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
