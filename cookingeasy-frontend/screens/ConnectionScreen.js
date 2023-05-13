import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../reducers/user";

export default function ConnectionScreen({ navigation }) {
  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app/";
  const dispatch = useDispatch();

  const [pseudo, setPseudo] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const [formValid, setFormValid] = useState(true);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };
  const handleBlur = () => {
    setFocusedInput("");
  };
  const handleConnection = () => {
    fetch(`${BACKEND_ADDRESS}user/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: pseudo,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              pseudo: pseudo,
              password: password,
              nom: data.nom,
              prenom: data.prenom,
              email: data.email,
              token: data.token,
              preference: data.preference,
            })
          );
          navigation.navigate("HomeScreen");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFormValidation = () => {
    if (!pseudo || !password) {
      setFormValid(false);
      alert("Tous les champs doivent être remplis");
    } else {
      setFormValid(true);
      handleConnection();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome
          name="arrow-left"
          size={20}
          color="#f4511e"
          style={styles.icon}
          onPress={() => navigation.navigate("BienvenueScreen")}
        />
        <Text style={styles.headerText}>Connexion</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Pseudo"
          onChangeText={(value) => setPseudo(value)}
          onFocus={() => handleFocus("pseudo")}
          onBlur={handleBlur}
          value={pseudo}
          style={[
            styles.input,
            focusedInput === "pseudo" && styles.focusedInput,
          ]}
        />
        <TextInput
          placeholder="Mot de passe"
          onChangeText={(value) => setPassword(value)}
          onFocus={() => handleFocus("password")}
          onBlur={handleBlur}
          value={password}
          style={[
            styles.input,
            focusedInput === "password" && styles.focusedInput,
          ]}
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity style={styles.ForgotPasswordContainer}>
        <Text style={styles.ForgotPassword}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleFormValidation}
        style={[
          styles.button2,
          { width: 150 },
          !formValid && { opacity: 0.5, backgroundColor: "grey" },
        ]}
      >
        <Text style={styles.buttonText2}>Valider</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={require("../assets/ConnexionScreen.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingVertical: 12,
    elevation: 6,
    backgroundColor: "white",
    marginTop: 6,
    marginBottom: 20,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  headerText: {
    marginLeft: 70,
    marginTop: -25,
    fontWeight: "bold",
    color: "#636363",
    fontSize: 25,
  },
  icon: {
    marginTop: 35,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    padding: 0,
    alignItems: "center",
    backgroundColor: "white",
  },
  inputContainer: {
    marginVertical: 10,
    width: 365,
  },
  input: {
    backgroundColor: "white",
    borderColor: "#F2F2F2",
    borderWidth: 1,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    margin: 8,
    fontSize: 16,
  },
  focusedInput: {
    borderColor: "#f4511e",
    borderWidth: 1.5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    elevation: 3,
    backgroundColor: "white",
    marginTop: 30,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  button2: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    elevation: 3,
    backgroundColor: "#f4511e",
    marginTop: 50,
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOpacity: 0.8,
    shadowRadius: 5,
    shadowOffset: { width: 1, height: 13 },
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "#E3C7F9",
  },
  buttonText2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  ForgotPassword: {
    fontSize: 11,
    color: "#D3D3D3",
    textDecorationLine: "underline",
  },
  ForgotPasswordContainer: {
    alignSelf: "flex-end",
    paddingEnd: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  error: {
    marginTop: 10,
    color: "red",
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 50,
  },
});
