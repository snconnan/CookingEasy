import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Menu from "../component/menu";

export default function FelicitationScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Menu />
      <View style={styles.textContainer}>
        <Text style={styles.title}>FELICITATIONS !</Text>
        <Text style={styles.text}>
          Vous avez gagné 45 minutes avec ce Batch Cooking
        </Text>
        <Image
        style={styles.assiette}
        source={require("../assets/logoFelicitation.gif")}
      />
        <TouchableOpacity
          style={styles.next}
          title="Bon Appétit"
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.Suivant}>Bon Appétit !</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"white",
  },
  title: {
    marginTop: 40,
    fontSize: 25,
    fontWeight: "bold",
    color: "#f4511e",
  },
  text: {
    margin: 20,
    padding: 40,
    fontSize: 20,
    textAlign: "center",
  },
  assiette: {
    height: 120,
    width: 120,
  },

  next: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#f4511e",
  },
  Suivant: {
    fontSize: 20,
    color: "#ffffff",
    padding: 10,
  },
});
