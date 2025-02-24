import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { router } from "expo-router";
import FirebaseAuthComp from "../../component/FirebaseAuthComp";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/FirebaseConfig";
import { setLocalStorage } from "../../services/storage";

export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");

  const handleSignUp = () => {
    if (!email || !password || !userName) {
      Alert.alert("PLEASE FILL ALL DETAILS");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;

        await updateProfile(user, {
          displayName: userName,
        });
        await setLocalStorage("userDetail", user);
        router.push("/(tabs)/home");
        // ...
      })
      .catch((error) => {
        console.log("error", error);
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/email-already-in-use") {
          Alert.alert("Login", "Email Already in use", [
            { text: "Cancel", style: "cancel" },
            { text: "login", onPress: () => router.push("/login") },
          ]);
        }
        // ..
      });
  };

  return (
    <View style={styles.container}>
      <FirebaseAuthComp />
      <Text variant="headlineMedium" style={styles.title}>
        Sign Up
      </Text>

      <TextInput
        label="UserName"
        value={userName}
        onChangeText={(value) => setUserName(value)}
        autoCapitalize="none"
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={(value) => setEmail(value)}
        autoCapitalize="none"
        keyboardType="email-address"
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={(value) => setPassword(value)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(value) => setConfirmPassword(value)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button
        mode="contained"
        onPress={handleSignUp}
        loading={loading}
        disabled={loading}
        style={styles.button}
        buttonColor="red"
      >
        Sign Up
      </Button>

      <Button onPress={() => router.push("/login")} style={styles.link}>
        Already have an account? Log In
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
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
  },
  link: {
    marginTop: 10,
    alignSelf: "center",
  },
});
