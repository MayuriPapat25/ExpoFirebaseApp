import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, Switch } from "react-native";
import { useThemeContext } from "../../context/ThemeContext";

export default function CustomDrawerContent(props) {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Theme</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
    </DrawerContentScrollView>
  );
}
