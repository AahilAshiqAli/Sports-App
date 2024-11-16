import { StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import TopNavigation from "./TopNavigation";
import LoadingComponent from "./Loading";

const url = "https://cricket-live-data.p.rapidapi.com/series";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "0980151c34msha7097e3642a64fdp169d3bjsn10c400a2e1e9",
    "x-rapidapi-host": "cricket-live-data.p.rapidapi.com",
  },
};
const Cricket = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setData(data.results);
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
      ) : (
        <TopNavigation data={data} navigation={navigation} />
      )}
    </>
  );
};

export default Cricket;

const styles = StyleSheet.create({});
