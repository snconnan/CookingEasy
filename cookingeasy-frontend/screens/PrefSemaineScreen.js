import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Menu from "../component/menu";
import { useSelector } from "react-redux";

export default function PrefSemaineScreen({ navigation }) {
  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app";
  const [time, setTime] = useState(0);
  const [difficult, setDifficult] = useState(0);
  const user = useSelector((state) => state.user.value);
  const handleValidationThisWeek = () => {
    fetch(`${BACKEND_ADDRESS}/preferences/thisWeek`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        duration: time,
        difficulty: difficult,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigation.navigate("MenuScreen");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Menu />
      <View style={styles.semaineContainer}>
        <Text style={styles.title}>Cette semaine...</Text>
        <View style={styles.time}>
          <Text style={styles.text}>Avez vous le temps de cuisiner ?</Text>
          <View style={styles.timeButtons}>
            <TouchableOpacity style={styles.button} onPress={() => setTime(1)}>
              <Text
                placeholder="Pas Trop"
                onFocus={() => handleFocus("Pas Trop")}
                value={1}
                style={[styles.input, time === 1 && styles.selectedButton]}
              >
                Pas Trop
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setTime(2)}>
              <Text
                placeholder="Moyen"
                onFocus={() => handleFocus("Moyen")}
                value={2}
                style={[styles.input, time === 2 && styles.selectedButton]}
              >
                Moyen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setTime(3)}>
              <Text
                placeholder="Carrement"
                onFocus={() => handleFocus("Carrement")}
                value={3}
                style={[styles.input, time === 3 && styles.selectedButton]}
              >
                Carrément
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.difficult}>
          <Text style={styles.text}>Quel niveau de difficulté ?</Text>
          <View style={styles.difficultButtons}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDifficult(1)}
            >
              <Text
                placeholder="Simple"
                onFocus={() => handleFocus("Simple")}
                value={1}
                style={[styles.input, difficult === 1 && styles.selectedButton]}
              >
                Simple
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDifficult(2)}
            >
              <Text
                placeholder="Moyen"
                onFocus={() => handleFocus("Moyen")}
                value={2}
                style={[styles.input, difficult === 2 && styles.selectedButton]}
              >
                Moyen
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setDifficult(3)}
            >
              <Text
                onFocus={() => handleFocus("Difficie")}
                value={3}
                style={[difficult === 3 && styles.selectedButton]}
              >
                Difficile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Image
          style={styles.assiette}
          source={require("../assets/logo-prefSemaine.png")}
        />
        <TouchableOpacity
          style={styles.previous}
          onPress={handleValidationThisWeek}
        >
          <FontAwesome name="arrow-right" size={15} color="#ffff" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  semaineContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    flex: 1,
    width: "100%",
    height: 40,
    alignItems: "center",
    textAlign: "center",
    justifyContent:"center",
  },

  title: {
    marginTop: 40,
    marginBottom: 50,
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  time: {
    paddingBottom: 10,
    flexDirection: "column",
    alignItems: "center",
  },

  difficult: {
    paddingTop: 15,
    flexDirection: "column",
    alignItems: "center",
  },

  timeButtons: {
    margin: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  difficultButtons: {
    margin: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  selectedButton: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    borderRadius: 20,
    fontSize: 15,
    backgroundColor: "#f4511e",
    lineHeight: 30
  },

  assiette: {
    width: 120,
    height: 120,
    marginTop: 20,
  },
  previous: {
    width: 40,
    height: 40,
    marginTop: 40,
    backgroundColor: "#f4511e",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
