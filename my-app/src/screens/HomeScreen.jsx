import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Navigation from "./Navigation";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Navigation navigation={navigation} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
