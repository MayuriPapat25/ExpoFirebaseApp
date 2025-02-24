import { Redirect } from "expo-router";

export default function Index() {
  const userLoggedIn = false;
  if (!userLoggedIn) {
    return <Redirect href="/signUp" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
