import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Cricket from "./Cricket";
import FootBall from "./FootBall";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

const CustomTabLabel = ({ label, color }) => (
  <Text numberOfLines={1} style={[styles.tabLabel, { color }]}>
    {label}
  </Text>
);

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Cricket"
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#b0c4de",
        tabBarStyle: {
          backgroundColor: "#0e806a", // Green background
          height: 60,
          paddingBottom: 5,
        },
        headerStyle: {
          backgroundColor: "#0e806a", // Header background color
        },
        headerTitleStyle: {
          color: "#ffffff",
          fontWeight: "bold",
          fontSize: 22,
          paddingHorizontal: 10,
        },
      }}
    >
      <Tab.Screen
        name="Cricket"
        component={Cricket}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabLabel label="Cricket" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="cricket" color={color} size={24} />
          ),
          headerTitle: "Cricket Series",
          headerRight: () => (
            <Icon
              name="cricket"
              size={30}
              color="white"
              style={{ marginRight: 35 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FootBall"
        component={FootBall}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabLabel label="Football" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="soccer" color={color} size={24} />
          ),
          headerTitle: "Football Fixtures",
          headerRight: () => (
            <Icon
              name="soccer"
              size={30}
              color="white"
              style={{ marginRight: 35 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
  headerStyle: {},
});
