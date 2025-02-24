import { View, Switch } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { router } from "expo-router";
import { removeLocalStorage } from "../../services/storage";
import { Button, Text, useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext";

export default function SettingScreen() {
  const { isDarkMode, toggleTheme, theme } = useThemeContext(); // Use theme from context

  const handleLogout = () => {
    removeLocalStorage();
    signOut(auth);
    router.push("/login");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background, // Apply dynamic background color
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          color: theme.colors.onBackground, // Apply theme text color
        }}
      >
        Settings
      </Text>

      <Button
        mode="contained"
        onPress={handleLogout}
        style={{ backgroundColor: theme.colors.primary }}
      >
        Logout
      </Button>
    </View>
  );
}
