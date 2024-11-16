import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import LoadingComponent from "./Loading";

const Component = ({ item }) => {
  const color = { color: item.status === "Complete" ? "#4CAF50" : "#FF9800" };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{item.match_title}</Text>
      <Text style={styles.subtitle}>{item.match_subtitle}</Text>
      <Text style={styles.detail}>Date: {item.date}</Text>
      <Text style={styles.detail}>Away Team: {item.away.name}</Text>
      <Text style={styles.detail}>Home Team: {item.home.name}</Text>
      <Text style={styles.detail}>Venue: {item.venue}</Text>
      <Text style={[styles.status, color]}>
        {item.status === "Complete" ? "Completed" : "Upcoming"}
      </Text>
      {item.status === "Complete" && (
        <Text style={styles.result}>Result: {item.result}</Text>
      )}
    </View>
  );
};

const FixtureDetails = ({ route }) => {
  // const { series_id } = route.params;
  const series_id = 606;
  const url = `https://cricket-live-data.p.rapidapi.com/fixtures-by-series/${series_id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0980151c34msha7097e3642a64fdp169d3bjsn10c400a2e1e9",
      "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
    },
  };

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.results.length !== 0) setData(data.results);
        else alert("Series ID not found");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  console.log(data, series_id);
  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <View>
          <Text>Series ID: {series_id}</Text>
          <View>
            <FlatList
              data={data}
              renderItem={({ item }) => <Component item={item} />}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default FixtureDetails;

const styles = StyleSheet.create({
  card: {
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    elevation: 3, // For shadow on Android
    shadowColor: "#000", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  detail: {
    fontSize: 14,
    color: "#444",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  result: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 5,
  },
});
