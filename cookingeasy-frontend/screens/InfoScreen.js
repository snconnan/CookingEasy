import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function InfoScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Faisons connaissance</Text>
      <Text style={styles.mainText}>
        Vous vous apprêtez à compléter un formulaire en 4 étapes. Cela ne
        prendra pas plus d'une minute !
      </Text>
      <Image style={styles.image} source={require("../assets/logo-connaissance.png")} />
      <View style={styles.bottomBotton}>

        
      <TouchableOpacity
        style={styles.previousButton}
        onPress={() => navigation.navigate("InscriptionScreen")}
        >
        <FontAwesome name="arrow-left" size={15} color="#F4511E" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("FoyerScreen")}
        >
        <Text style={styles.buttonText2}>Suivant</Text>
      </TouchableOpacity>
          </View>
      <View style={{ padding: 30 }}>
        <Progress.Bar
          width={250}
          borderWidth={1}
          progress={0}
          height={15}
          color={"#f4511e"}
          indeterminateAnimationDuration={2000}
          />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 40,
    alignItems: "center",
    textAlign: "center",
  },
  mainText: {
    padding: 20,
    fontSize: 20,
    textAlign: "justify",
    color: "#949494",
  },
  image: {
    height: 80,
    width: 80,
  },
  button2: {
    width: "40%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#f4511e",
  },
  buttonText2: {
    fontSize: 20,
    color: "#ffffff",
    padding: 10,
  },
  previousButton: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f4511e",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomBotton: {
    marginTop: "15%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: "5%",
  },
});
