import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";

const Splash = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // Use replace to prevent going back to the splash screen
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);
  // we pass using return statement when we want to call the function, in this case clearTimeout, when we are unmounting the
  // component like when navigating away from that component. Arrow function is used because we will not call now but when react
  // unmounts the component which means remove memory of that component.
  // The function we use with return statement are called cleanup functions

  return (
    <View style={styles.splashScreen}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/icons/logo.webp")}
          style={styles.logo}
        />
        <Text style={styles.appName}>Sports Fixtures</Text>
      </View>
      <Text style={styles.tagline}>Catch every game, every time!</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  splashScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0e806a", // Deep blue for cricket theme
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  tagline: {
    fontSize: 16,
    color: "#FFFFFF", // Light blue for contrast
    marginTop: 10,
  },
});
