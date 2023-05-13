import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
 } from "react-native";
 
 
 export default function BienvenueScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image1} source={require("../assets/Cooking-easy.png")}/>
      </View>
      <Text style={styles.title}>Bienvenue</Text>
      <Image style={styles.image} source={require("../assets/Bienvenue.png")} />
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate("ConnectionScreen")}
      >
        <Text style={styles.text}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("InscriptionScreen")}
      >
        <Text style={styles.text2}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
 }
 
 
 const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  header: {
    marginTop: - 15,
  },
  image1: {
    width: 100,
    height: 25,
    resizeMode: "auto",
  },
  image: {
    width: "100%",
    height: "50%",
    resizeMode: "auto",
  },
  title: {
    fontSize: 40,
    fontWeight: '800',
    marginBottom: 15,
  },
  button1: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#f4511e",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
    marginTop: 25,
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 15,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#f4511e",
  },
 });
 