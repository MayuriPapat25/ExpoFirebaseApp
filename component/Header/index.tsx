import { useRouter } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Text } from "react-native-paper";

const Header = ({ title }: { title: string }) => {
  const router = useRouter();

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={() => router.back()} />
      <Text style={styles.title}>{title}</Text>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6200EE",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
});

export default Header;
