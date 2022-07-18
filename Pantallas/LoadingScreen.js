import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate("PantalladePanel");
      } else {
        this.props.navigation.navigate("PantalladeIniciodeSesión");
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Cargando</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});