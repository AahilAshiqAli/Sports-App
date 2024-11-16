import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TouchableHighlight,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import cricket from "../../assets/icons/cricket.png";
import test from "../../assets/icons/test.png";

const Tab = createMaterialTopTabNavigator();

const CustomTabLabel = ({ label, color }) => (
  <Text numberOfLines={1} style={[styles.tabLabel, { color }]}>
    {label}
  </Text>
);

const SeriesItem = ({ item, navigation }) => (
  <TouchableHighlight
    onPress={() =>
      navigation.navigate("FixtureDetails", { series_id: item.series_id })
    }
    underlayColor="#DDDDDD"
  >
    <View style={styles.seriesItem}>
      <Text style={styles.seriesTitle}>{item.series_name}</Text>
      <Text>Season: {item.season}</Text>
      <Text>Status: {item.status}</Text>
    </View>
  </TouchableHighlight>
);

const TypeItem = ({ item, navigation }) => (
  <View>
    <FlatList
      data={item}
      keyExtractor={(seriesItem) => seriesItem.series_id.toString()}
      renderItem={({ item }) => (
        <SeriesItem item={item} navigation={navigation} />
      )}
    />
  </View>
);

const Component = ({ data, type, navigation }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    const filtered = data.find((item) => item.type === type) || [];
    setFilteredData(filtered.series);
    setDisplayData(filtered.series);
  }, [data, type]);
  const [filterText, setFilterText] = useState("");
  useEffect(() => {
    if (filterText.trim()) {
      const display = filteredData.filter(
        (item) =>
          item.series_name &&
          item.series_name.toLowerCase().includes(filterText.toLowerCase())
      );

      setDisplayData(display);
    }
  }, [filterText]);

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textinput}
          onChangeText={setFilterText}
          value={filterText}
          placeholder="SEARCH HERE"
        />
      </View>

      <TypeItem item={displayData} navigation={navigation} />
    </View>
  );
};

const TopNavigation = ({ data, navigation }) => {
  return (
    <Tab.Navigator
      initialRouteName="Test"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#eeeee4",
        tabBarIndicatorStyle: {
          backgroundColor: "white",
        },
        tabBarStyle: {
          backgroundColor: "#0e806a",
        },
      }}
    >
      <Tab.Screen
        name="Test"
        children={() => (
          <Component data={data} type="Test" navigation={navigation} />
        )}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabLabel label="TEST" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Image source={test} style={[styles.icon, { tintColor: color }]} />
          ),
        }}
      />
      <Tab.Screen
        name="ODI"
        children={() => (
          <Component data={data} type="ODI" navigation={navigation} />
        )}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabLabel label="ODI" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Icon name="cricket" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="T20I"
        children={() => (
          <Component data={data} type="T20I" navigation={navigation} />
        )}
        options={{
          tabBarLabel: ({ color }) => (
            <CustomTabLabel label="T20I" color={color} />
          ),
          tabBarIcon: ({ color }) => (
            <Image
              source={cricket}
              style={[styles.icon, { tintColor: color }]}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TopNavigation;

const styles = StyleSheet.create({
  tabLabel: {
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  typeContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  typeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  seriesItem: {
    padding: 8,
    marginBottom: 5,
    backgroundColor: "#e8e8e8",
    borderRadius: 5,
  },
  seriesTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  textinput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
});
