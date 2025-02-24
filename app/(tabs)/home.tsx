import { View } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import { getLocalStorage } from "../../services/storage";
import { useThemeContext } from "../../context/ThemeContext";

export default function Home() {
  const [user, setUser] = useState("");
  const { theme } = useThemeContext(); // Get theme from context

  useEffect(() => {
    GetUserDetails();
  }, []);

  const GetUserDetails = async () => {
    const userInfo = await getLocalStorage("userDetail");
    setUser(userInfo);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.colors.background, // Apply theme background
      }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          textAlign: "center",
          color: theme.colors.onBackground, // Apply theme text color
        }}
      >
        Hello, {user?.displayName}
      </Text>
    </View>
  );
}
