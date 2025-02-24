import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { View, StyleSheet, Alert, ToastAndroid } from "react-native";
import { TextInput, Button, Text, PaperProvider } from "react-native-paper";
import { setLocalStorage } from "../../services/storage";
import { auth } from "../../config/FirebaseConfig";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    if (!email || !password) {
      Alert.alert("Please fill details");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("sign In user", user);
        await setLocalStorage("userDetail", user);
        router.push("/(tabs)/home");
        setLoading(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false);
        if (errorCode == "auth/invalid-credential") {
          ToastAndroid.show("Email Already in use", ToastAndroid.BOTTOM);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Login
      </Text>

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="flat"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        mode="flat"
        secureTextEntry
        style={styles.input}
      />

      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Button>
      <Button onPress={() => router.push("/signUp")} style={styles.link}>
        New User? SignUp
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#6200EE",
  },
  buttonText: {
    color: "white",
  },
  link: {
    marginTop: 10,
    alignSelf: "center",
  },
});

export default LoginPage;
