import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../reducers/user";
// Grabbed from emailregex.com
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function InscriptionScreen({ navigation }) {
  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app/";
  const dispatch = useDispatch();

  const [pseudo, setPseudo] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [focusedInput, setFocusedInput] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [formValid, setFormValid] = useState(true);

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput("");
  };

  const handleValidation = () => {
    fetch(`${BACKEND_ADDRESS}user/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: pseudo,
        nom: nom,
        prenom: prenom,
        password: password,
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          login({
            pseudo: pseudo,
            nom: nom,
            prenom: prenom,
            password: password,
            email: email,
            token: data.token,
          })
        );
        setPseudo("");
        setNom("");
        setPrenom("");
        setPassword("");
        setEmail("");
        if (!EMAIL_REGEX.test(email)) {
          setEmailError(true);
        } else {
          navigation.navigate("InfoScreen");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFormValidation = () => {
    if (!pseudo || !nom || !prenom || !password || !email) {
      setFormValid(false);
      alert("Tous les champs doivent être remplis");
    } else {
      setFormValid(true);
      handleValidation();
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
        <Text style={styles.headerText}>Inscription</Text>
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
          placeholder="Nom"
          onChangeText={(value) => setNom(value)}
          onFocus={() => handleFocus("nom")}
          onBlur={handleBlur}
          value={nom}
          style={[styles.input, focusedInput === "nom" && styles.focusedInput]}
        />
        <TextInput
          placeholder="Prenom"
          onChangeText={(value) => setPrenom(value)}
          onFocus={() => handleFocus("prenom")}
          onBlur={handleBlur}
          value={prenom}
          style={[
            styles.input,
            focusedInput === "prenom" && styles.focusedInput,
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
        <TextInput
          placeholder="Email"
          onChangeText={(value) => setEmail(value)}
          onFocus={() => handleFocus("email")}
          onBlur={handleBlur}
          value={email}
          style={[
            styles.input,
            focusedInput === "email" && styles.focusedInput,
          ]}
        />
      </View>
      {emailError && <Text style={styles.error}>Invalid email address</Text>}
      <TouchableOpacity
        onPress={handleFormValidation}
        style={[
          styles.button2,
          { width: 150 },
          !formValid && { opacity: 0.5, backgroundColor: 'grey' }
        ]}>
          <Text style={styles.buttonText2}>Valider</Text>
    </TouchableOpacity>
    <Image
        style={styles.image}
        source={require("../assets/Mobile-login.png")}
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
    resizeMode: "auto"
  },
  image: {
    width: 300,
    height: 300,
 
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
  },
  inputContainer: {
    marginVertical: 10,
    width: 365,
  },
  input: {
    backgroundColor: "white",
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
    marginTop: 30,
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
    color: "#f4511e",
  },
  buttonText2: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
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
});
