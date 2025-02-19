import React, { useState, useEffect } from "react";
import { Button, Text, View, Alert } from "react-native";
import * as AuthSession from "expo-auth-session";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./config/FirebaseConfig"; // Firebase config
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

// GitHub OAuth Configuration
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI;

const githubDiscovery = {
  authorizationEndpoint: process.env.GITHUB_AUTHORIZATION_END_POINT,
};

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

export default function App() {
  const [user, setUser] = useState(null);

  // GitHub Auth Request
  const [githubRequest, githubResponse, promptGitHubSignIn] =
    AuthSession.useAuthRequest(
      {
        clientId: GITHUB_CLIENT_ID,
        scopes: ["read:user"],
        redirectUri: REDIRECT_URI,
      },
      githubDiscovery
    );
  // Google Auth Request
  const [googleRequest, googleResponse, promptGoogleSignIn] =
    AuthSession.useAuthRequest(
      {
        clientId: GOOGLE_CLIENT_ID,
        scopes: ["openid", "profile", "email"],
        redirectUri: REDIRECT_URI,
        responseType: "code",
      },
      {
        authorizationEndpoint: process.env.GOOGLE_AUTHORIZATION_END_POINT,
      }
    );

  const exchangeGoogleCodeForToken = async (code) => {
    try {
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          client_id: GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: REDIRECT_URI,
          grant_type: "authorization_code",
        }),
      });

      const tokenData = await response.json();
      if (tokenData.access_token) {
        const credential = GoogleAuthProvider.credential(
          null,
          tokenData.access_token
        );
        await signInWithCredential(auth, credential);
      }
      // else {
      //   console.error("Error getting Google access token:", tokenData);
      // }
    } catch (error) {
      console.error("Google Token Exchange Error:", error);
    }
  };

  // Handle Google OAuth Response
  useEffect(() => {
    if (googleResponse?.type === "success") {
      const { code } = googleResponse.params;
      exchangeGoogleCodeForToken(code);
    } else if (googleResponse?.type === "dismiss") {
      console.warn("Google sign-in dismissed by user.");
      Alert.alert("Sign-in Canceled", "You dismissed the Google login.");
    }
  }, [googleResponse]);

  // Handle GitHub OAuth Response
  useEffect(() => {
    if (githubResponse?.type === "success") {
      const { code } = githubResponse.params;
      exchangeCodeForGitHubToken(code);
    } else if (githubResponse?.type === "dismiss") {
      console.warn("GitHub sign-in dismissed by user.");
      Alert.alert("Sign-in Canceled", "You dismissed the GitHub login.");
    }
  }, [githubResponse]);

  // Exchange GitHub Code for Access Token
  const exchangeCodeForGitHubToken = async (code) => {
    try {
      const tokenResponse = await fetch(
        "https://github.com/login/oauth/access_token",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            client_id: GITHUB_CLIENT_ID,
            client_secret: GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
          }),
        }
      );

      const tokenData = await tokenResponse.json();
      if (tokenData.access_token) {
        const credential = GithubAuthProvider.credential(
          tokenData.access_token
        );
        await signInWithCredential(auth, credential);
      } else {
        console.error("GitHub Access Token Error:", tokenData);
      }
    } catch (error) {
      console.error("Error exchanging GitHub code for token:", error);
    }
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {user ? (
        <Text>Welcome, {user.displayName}</Text>
      ) : (
        <>
          <Button
            title="Sign in with GitHub"
            onPress={() => promptGitHubSignIn()}
          />
          <Button
            title="Sign in with Google"
            onPress={() => promptGoogleSignIn()}
          />
        </>
      )}
    </View>
  );
}
