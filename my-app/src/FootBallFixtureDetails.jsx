import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import LoadingComponent from "./screens/Loading";

const FixtureCard = ({ fixture }) => {
  console.log(fixture);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: fixture.league.logo }}
          style={styles.leagueLogo}
        />
        <Text style={styles.leagueName}>
          {fixture?.league?.name ?? "Not Available"}
        </Text>
      </View>

      <Text style={styles.date}>{fixture?.date ?? "Not Available"}</Text>

      <View style={styles.teamsContainer}>
        <View style={styles.team}>
          <Image
            source={{ uri: fixture.homeTeam.logo }}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>
            {fixture?.homeTeam?.name ?? "Not Available"}
          </Text>
        </View>
        <Text style={styles.vs}>vs</Text>
        {/* Away Team */}
        <View style={styles.team}>
          <Image
            source={{ uri: fixture.awayTeam.logo }}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>
            {fixture?.awayTeam?.name ?? "Not Available"}
          </Text>
        </View>
      </View>

      <Text style={styles.state}>
        State: {fixture?.state?.description ?? "Not Available"} (
        {fixture.state.clock ?? "Not Available"} mins)
      </Text>
      <Text style={styles.score}>
        Score: {fixture?.state?.score?.current ?? "Not available"}
      </Text>
      {fixture?.state?.score?.penalties && (
        <Text style={styles.penalties}>
          Penalties: {fixture?.state?.score?.penalties}
        </Text>
      )}

      {fixture?.venue && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle ?? "Not Available"}>Venue</Text>
          <Text>Stadium: {fixture?.venue?.name ?? "Not Available"}</Text>
          <Text>City: {fixture?.venue?.city ?? "Not Available"}</Text>
          <Text>Country: {fixture?.venue?.country ?? "Not Available"}</Text>
          <Text>Capacity: {fixture?.venue?.capacity ?? "Not Available"}</Text>
        </View>
      )}

      {fixture?.forecast && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Weather Forecast</Text>
          <Text>Status: {fixture?.forecast?.status ?? "Not Available"}</Text>
          <Text>
            Temperature: {fixture?.forecast?.temperature ?? "Not Available"}
          </Text>
        </View>
      )}

      {fixture?.referee && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Referee</Text>
          <Text>Name: {fixture?.referee?.name ?? "Not Available"}</Text>
          <Text>
            Nationality: {fixture?.referee?.nationality ?? "Not Available"}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const FootBallFixtureDetails = ({ route }) => {
  //const { match_id } = route.params;
  const match_id = 986165114;
  const url = `https://sport-highlights-api.p.rapidapi.com/football/matches/${match_id}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0980151c34msha7097e3642a64fdp169d3bjsn10c400a2e1e9",
      "x-rapidapi-host": "sport-highlights-api.p.rapidapi.com",
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
        if (data.length !== 0) setData(data);
        else alert("Match ID not found");
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingComponent />
      ) : data.length !== 0 ? (
        <View>
          <Text>Match ID: {match_id}</Text>
          <FlatList
            data={data}
            renderItem={({ item }) => <FixtureCard fixture={item} />}
          />
        </View>
      ) : (
        <Text>No fixtures available.</Text>
      )}
    </>
  );
};

export default FootBallFixtureDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  leagueLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  leagueName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  countryLogo: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  countryName: {
    fontSize: 14,
    color: "#666",
  },
  date: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  teamsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  team: {
    alignItems: "center",
    marginHorizontal: 20,
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  vs: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  state: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  score: {
    fontSize: 14,
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 10,
  },
  penalties: {
    fontSize: 14,
    color: "#FF9800",
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
