import { useState, useEffect } from "react";
import { useRouter, Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";
import { auth } from "../config/FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import DrawerLayout from "../layouts/DrawerLayout";

export default function RootLayout() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.replace("/signUp");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider>
      {user ? (
        <DrawerLayout />
      ) : (
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="signUp" />
        </Stack>
      )}
    </ThemeProvider>
  );
}
