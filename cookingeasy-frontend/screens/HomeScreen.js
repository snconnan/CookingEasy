import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import Menu from "../component/menu";

export default function HomeScreen({ navigation }) {
  const User = useSelector((state) => state.user.value);

  return (
    <View style={styles.container}>
      <Menu />

      <View style={styles.container}>
        <Text style={styles.title}>Bonjour {User.pseudo} !</Text>
        <TouchableOpacity
          style={styles.butomTop}
          onPress={() => navigation.navigate("PrefSemaineScreen")}
        >
          <Text style={styles.topText}>Créer un nouveau menu</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.butomMiddle}
          onPress={() => navigation.navigate("MenuScreen")}
        >
          <Text style={styles.middleText}>Mon menu enregistré</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.butomMiddle}
          onPress={() => navigation.navigate("ListCourse")}
        >
          <Text style={styles.middleText}>Ma liste de course</Text>
        </TouchableOpacity>
        <View>
          <Image style={styles.image} source={require("../assets/penne.jpg")} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "center",
  },
  butomMiddle: {
    backgroundColor: "#f4511e",
    margin: 22,
    width: 230,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  butomTop: {
    margin: 20,
    width: 230,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#f4511e",
    borderWidth: 1,
  },
  title: {
    marginTop: 60,
    fontSize: 25,
    fontWeight: "bold",
    margin: 15,
    textAlign: "center",
  },
  image: {
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    height: "100%",
    borderRadius: 20,
    borderTopLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  middleText: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 15,
    textAlign: "center",
    color: "white",
  },
  topText: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 15,
    textAlign: "center",
    color: "#f4511e",
  },
});
