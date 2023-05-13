import { StyleSheet, Text, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Progress from "react-native-progress";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addIngredientToStore,
  removeIngredientFromStore,
} from "../reducers/ingredient";
import {
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function AlimentExcluScreen({ navigation }) {
  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app";
  const User = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const TabIngredients = useSelector((state) => state.ingredient.value);
  const [ingredients, setIngredients] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const data = [
    "Pomme",
    "Poire",
    "Banane",
    "Citron",
    "Orange",
    "Kiwi",
    "Ananas",
    "Mangue",
    "Pêche",
    "Fraise",
    "Framboise",
    "Cerise",
    "Raisin",
    "Melon",
    "Pastèque",
    "Tomate",
    "Courgette",
    "Aubergine",
    "Poivron",
    "Carotte",
    "Oignon",
    "Ail",
    "Poireau",
    "Chou",
    "Brocoli",
    "Champignon",
    "Pomme de terre",
    "Haricot",
    "Laitue",
    "Salade",
    "Choux",
    "Chou-fleur",
    "Navet",
    "Betterave",
    "Radis",
    "Concombre",
    "Asperge",
    "Épinard",
    "Cresson",
    "Mâche",
    "Endive",
    "Chicorée",
    "Cresson",
    "Ciboulette",
    "Persil",
    "Basilic",
    "Thym",
    "Romarin",
    "Sauge",
    "Menthe",
    "Coriandre",
    "Piment",
    "Poivre",
    "Sel",
    "Sucre",
    "Farine",
    "Riz",
    "Pâtes",
    "Pâte",
    "Pomme de terre",
    "Oeuf",
    "Lait",
    "Beurre",
    "Crème",
    "Fromage",
    "Yaourt",
    "Jambon",
    "Saucisse",
    "Viande",
    "Poisson",
    "Thon",
    "Saumon",
    "Sardine",
    "Huile",
    "Vinaigre",
    "Vin",
    "Bière",
    "Chocolat",
    "Cacao",
    "Café",
  ];

  const handleClick = () => {
    dispatch(addIngredientToStore(ingredients));
    setIngredients("");
  };

  const next = () => {
    const listIngredients = TabIngredients.join();

    fetch(`${BACKEND_ADDRESS}/preferences/alimentexclus`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        exclus: listIngredients,
        token: User.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    navigation.navigate("HomeScreen");
  };

 
  let newIngredient = (
    <Text style={styles.exemple}>
      Exemples : Oeuf, ail, fruits sec, etc ...
    </Text>
  );
  if (TabIngredients.length > 0) {
    newIngredient = TabIngredients.map((data, i) => {
      //console.log(data);
      return (
        <TouchableOpacity
          key={i}
          style={styles.item}
          onPress={() => dispatch(removeIngredientFromStore(data))}
        >
          <View>
            <Text style={styles.dataText}>{data}</Text>
          </View>
          <FontAwesome style={styles.cross} color="white" name="times" />
        </TouchableOpacity>
      );
    });
  }

  //fonction pour l'autocomplete
  const matche = data.filter((ingredient) =>
    ingredient.toLowerCase().includes(ingredients.toLowerCase())
  );

  return (
    // <KeyboardAvoidingView
    //   style={styles.container}
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    // >
    <View style={styles.container}>
      <Text style={styles.title}>Aliments à exclure</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher un ingrédient"
          onChangeText={(value) => {
            setIngredients(value), setSuggestions(matche);
          }}
          value={ingredients}
        />
        <TouchableOpacity style={styles.validateContainer}>
          <Text style={styles.validate} onPress={() => handleClick()}>
            {" "}
            OK
          </Text>
        </TouchableOpacity>
      </View>
      {ingredients.length > 2 && (
        <View style={styles.containerList}>
          {suggestions.map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => {
                setIngredients(suggestion);
                setSuggestions([]);
              }}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={styles.items}>{newIngredient}</View>
      <Image
        style={styles.assiette}
        source={require("../assets/Peach-pana.png")}
      />
      <View style={styles.botomContainer}>
        <View style={styles.botomButon}>
          <TouchableOpacity
            style={styles.previous}
            onPress={() => navigation.navigate("RegimeScreen")}
          >
            <FontAwesome name="arrow-left" size={15} color={"#f4511e"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.next} onPress={() => next()}>
            <Text style={styles.buttonText}>Fin</Text>
            <FontAwesome name="arrow-right" size={15} color={"#fff"} />
          </TouchableOpacity>
        </View>
        <Progress.Bar
          width={250}
          borderWidth={1}
          progress={1}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 65,
    textAlign: 'center',
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 1,
    borderWidth: 0.5,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  assiette: {
    width: 250,
    height: 250,
  },
  next: {
    flexDirection: "row",
    backgroundColor: "#f4511e",
    boxShadow:
      "0px 1px 2px rgba(0, 0, 0, 0.16), 0px 2px 4px rgba(0, 0, 0, 0.12), 0px 1px 8px rgba(0, 0, 0, 0.1)",
    width: 100,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  botomButon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    margin: 30,
  },

  buttonText: {
    marginRight: 10,
    fontSize: 15,
    color: "#fff",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0.5,
    width: 300,
    padding: 10,
    borderRadius: 5,
    borderColor: "#f4511e"
  },
  previous: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#f4511e",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  botomContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  validateContainer: {
    backgroundColor: "#f4511e",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    textAlign: "center",
    color: "#fff",
    margin: 5,
  },
  validate: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
  },
  exemple: {
    fontSize: 16,
    color: "#ccc",
    margin: 10,
  },
  items: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 18,
    backgroundColor: "#f4511e",
    margin: 10,
    padding: 5,
    borderRadius: 15,
  },
  cross: {
    margin: 5,
    fontSize: 16,
  },
  dataText: {
    fontSize: 18,
    margin: 2,
    color: "white",
  },
  containerList: {
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "scroll",
  },
});
