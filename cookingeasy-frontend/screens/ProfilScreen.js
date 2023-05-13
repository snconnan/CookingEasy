import {ScrollView, StyleSheet, Text, View , Image, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import Menu from '../component/menu';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function ProfilScreen({ navigation }) {
  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app/";
  const dispatch = useDispatch();

  const User = useSelector((state) => state.user.value);

  const [isPseudo, setPseudo] = useState(`${User.pseudo}`);
  const [isNom, setNom] = useState(`${User.nom}`);
  const [isPrenom, setPrenom] = useState(`${User.prenom}`);
  const [isPassword, setPassword] = useState(`${User.password}`);
  const [isEmail, setEmail] = useState(`${User.email}`);
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
    fetch(`${BACKEND_ADDRESS}/user/update`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pseudo: User.pseudo,
        nom: User.nom,
        prenom: User.prenom,
        password: User.password,
        email: User.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          login({
            pseudo: isPseudo,
            nom: isNom,
            prenom: isPrenom,
            password: isPassword,
            email: isEmail,
            token: data.token,
          })
        );
        console.log(data.token);
        setPseudo("");
        setNom("");
        setPrenom("");
        setPassword("");
        setEmail("");
        if (!EMAIL_REGEX.test(isEmail)) {
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
    if (!isPseudo || !isNom || !isPrenom || !isPassword || !isEmail) {
      setFormValid(false);
      alert("Tous les champs doivent être remplis");
    } else {
      setFormValid(true);
      handleValidation();
    }
  };
  return (
    <ScrollView style={styles.modalContainer}>
      <Menu  />
      <View style={styles.container}>
        <View style={styles.pseudoContainer}>

        <Image style={styles.logo} source={require('../assets/profil.png')} />
        <View>

          <TouchableOpacity style={styles.pseudo}>
            <TextInput style={styles.pseudoText} value={isPseudo}
                onChangeText={(value)=>setPseudo(value)} />
        </TouchableOpacity>
        </View>
        </View>

        <View style={styles.info}>
            <View style={styles.InputView}>
            <Text>Nom : </Text>
        <TouchableOpacity style={styles.button}>
              <TextInput style={styles.text} value={isNom}
                onFocus={() => handleFocus("nom")}
                onBlur={handleBlur}
                onChangeText={(value)=>setNom(value)}/>
          </TouchableOpacity>
          </View>

            <View>
              <Text>Prenom : </Text>
          <TouchableOpacity style={styles.button}>
              <TextInput style={styles.text} value={isPrenom}
                onFocus={() => handleFocus("prenom")}
                onBlur={handleBlur}
                onChangeText={(value)=>setPrenom(value)}/>
          </TouchableOpacity>
          </View>

            <View>
            <Text>Mot de passe : </Text>
          <TouchableOpacity style={styles.button}>
              <TextInput style={styles.text} value={isPassword}
                onFocus={() => handleFocus("password")}
                onChangeText={(value)=>setPassword(value)}/>
          </TouchableOpacity>
          </View>

          <View>
            <Text>Email : </Text>
          <TouchableOpacity style={styles.button}>
              <TextInput style={styles.text} value={isEmail}
                onFocus={() => handleFocus("email")}
                onChangeText={(value)=>setEmail(value)}/>
        </TouchableOpacity>
          </View>

          <View style={styles.logos}>
          <TouchableOpacity style={styles.logoText} onPress={() => navigation.navigate("FoyerScreen")}>
              <Image style={styles.image} source={require('../assets/accueil.png')} />
              <Text> Mon Foyer </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoText} onPress={() => navigation.navigate("EquipementScreen")}>
              <Image style={styles.image} source={require('../assets/micro-onde.png')} />
              <Text> Mon Equipement </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoText} onPress={() => navigation.navigate("RegimeScreen")}>
              <Image style={styles.image} source={require('../assets/regime.png')} />
              <Text>Mon Régime </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoText} onPress={() => navigation.navigate("AlimentsExcluScreen")}>
              <Image style={styles.image} source={require('../assets/glutenfree.png')} />
              <Text>Mes Aliments Exclus </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.next}
        onPress={handleFormValidation}>
              <Text style={styles.buttonText}> OK </Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  )
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },

  container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    height: 80,
    width: 80,
  },
  pseudoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  pseudoText: {
    fontSize: 25,
    fontWeight: "bold",
    height: 40,
    width: 150,
    marginLeft: 40,
    marginRight: 10,
  },
  text: {
    width: "100%",
    marginLeft: 15,
    color: "#C4C4C4",
  },  
  button: {
    height: 40,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    textAlign: 'center',
    backgroundColor:'#fafafa',
    borderColor: "#D2D2D2",
    borderWidth: 0.3,
    borderRadius: 5,
    margin: 8,
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    margin: 1,
  },
  InputView: {
    flexDirection: 'column',
  },
  logos: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin : 10,
  },
  image: {
    height: 18,
    width: 18,
    marginRight: 10,
  },
  logoText: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: "#fff",
  },
  next: {
    width: 50,
    height: 40,
    backgroundColor: "#F4511E",
    fontSize: 15,
    color: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  }
});
