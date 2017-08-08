import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ScrollSwagger from "./src/ScrollSwagger.js";

export default class App extends React.Component {
  render() {
    return <ScrollSwagger />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
