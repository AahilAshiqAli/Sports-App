import React from "react";
import { StyleSheet, Text, View, Animated, Easing } from "react-native";

const LoadingComponent = () => {
  const spinValue = React.useRef(new Animated.Value(0)).current;

  // Animation for spinning the loader
  React.useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.spinner, { transform: [{ rotate: spin }] }]}
      >
        <View style={styles.innerCircle} />
      </Animated.View>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
};

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  spinner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 5,
    borderColor: "#0e806a",
    borderRightColor: "transparent",
    borderTopColor: "#0e806a",
    marginBottom: 20,
  },
  innerCircle: {
    width: 20,
    height: 20,
    backgroundColor: "#0e806a",
    borderRadius: 10,
    position: "absolute",
    top: 15,
    left: 15,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0e806a",
  },
});
