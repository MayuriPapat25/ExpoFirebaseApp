import { View, Switch } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { router } from "expo-router";
import { removeLocalStorage } from "../../services/storage";
import { Button, Text, useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext";

export default function SettingScreen() {
  const { isDarkMode, toggleTheme, theme } = useThemeContext();

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await signOut(auth);
      await removeLocalStorage();
      console.log("Logout successful");

      setTimeout(() => {
        router.replace("/login");
      }, 100);
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        variant="headlineMedium"
        style={{
          color: theme.colors.onBackground,
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
