import "./gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import FixtureDetails from "./src/screens/CricketFixtureDetails";
import Splash from "./src/screens/Splash";
import FootBallFixtureDetails from "./src/FootBallFixtureDetails";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FixtureDetails"
        component={FixtureDetails}
        options={{
          headerStyle: { backgroundColor: "#0e806a" },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="FootBallFixtureDetails"
        component={FootBallFixtureDetails}
        options={{
          headerStyle: { backgroundColor: "#0e806a" },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
