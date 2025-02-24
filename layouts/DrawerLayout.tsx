import { Drawer } from "expo-router/drawer";
import CustomDrawerContent from "../component/CustomDrawer/index";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{ headerShown: true }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="(tabs)" options={{ title: "Home" }} />
    </Drawer>
  );
}
