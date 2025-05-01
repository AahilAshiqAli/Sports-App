import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import LoadingComponent from "./Loading";

const url =
  "https://sport-highlights-api.p.rapidapi.com/football/matches?countryCode=SE&offset=0&countryName=Sweden&awayTeamId=1907875&date=2023-08-06&homeTeamId=5700782&awayTeamName=Vasteras%20SK%20FK&leagueName=Superettan&timezone=Europe%2FLondon&leagueId=97798&season=2023&homeTeamName=Sk%C3%B6vde%20AIK&limit=100";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "0980151c34msha7097e3642a64fdp169d3bjsn10c400a2e1e9",
    "x-rapidapi-host": "sport-highlights-api.p.rapidapi.com",
  },
};

const FootBall = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.data);
        setData(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const renderTypeItem = ({ item }) => (
    <TouchableHighlight
      onPress={() =>
        navigation.navigate("FootBallFixtureDetails", { match_id: item.id })
      }
      underlayColor="#DDDDDD"
    >
      <View style={styles.typeContainer}>
        <View style={styles.logoContainer}>
          <Image source={{ uri: item.awayTeam.logo }} style={styles.teamLogo} />
          <Image source={{ uri: item.homeTeam.logo }} style={styles.teamLogo} />
        </View>
        <Text style={styles.matchText}>
          {item.awayTeam.name} vs {item.homeTeam.name}
        </Text>
        <Text style={styles.date}> Date: {item.date}</Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <View style={styles.container}>
          <FlatList data={data} renderItem={renderTypeItem} />
        </View>
      )}
    </>
  );
};

export default FootBall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },

  typeContainer: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  matchText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  date: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
