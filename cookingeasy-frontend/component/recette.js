import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { useDispatch } from "react-redux";
import { LikedRecette, UnlikedRecette } from "../reducers/Favoris";

export default function Recette(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [likedRecipe, setLikedRecipe] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(props.NbrPersonne);
  const [modalRecipeVisible, setModalRecipeVisible] = useState(false);

  const handleLike = () => {
    dispatch(LikedRecette({ title: props.title, photo: props.photo }));
    setLikedRecipe(true);
  };

  const handleUnlike = () => {
    dispatch(UnlikedRecette({ title: props.title, photo: props.photo }));
    setLikedRecipe(false);
  };

  if (props.isliked === true) {
    var likeHeart = "heart";
    var colors = "red";
  } else {
    likeHeart = "heart-o";
    colors = "#000";
  }

 
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
 
  const toggleModalRecipe = () => {
    setModalRecipeVisible(!modalRecipeVisible);
  };


  const handleChangePeople = (itemValue) => {
    setSelectedValue(itemValue);
    setModalVisible(!modalVisible);
  };

 
  //ajout fonctionalité pour changer le nombre de personnes et donc le nombre d'ingrédients
  let ingredient = [];
  for (let i = 0; i < props.ingredients.length; i++) {
    let ingredientWeith = Math.floor(
      (props.ingredients[i].quantity / 4) * selectedValue
    );
    ingredient.push(
      props.ingredients[i].name +
        " " +
        ingredientWeith +
        " " +
        props.ingredients[i].unit +
        "  "
    );
  }
  // .map pour afficher les ingredients ligne par lignes
  const Ingredients = ingredient.map((ingredient, i) => {
    return (
      <View key={i} style={styles.text}>
        <Text style={styles.ingredients}>{ingredient}</Text>
      </View>
    );
  });

  // voir la liste entiere des etapes et faire en sorte qu'il ni est pas de doublons
  let etapeRecipe = [];
  for (let i = 0; i < props.steps.length; i++) {
    for (let j = 0; j < props.steps.length; j++)
      if (
        !etapeRecipe.includes(
          props.steps[i].action + " " + props.steps[i].target + "  "
        )
      ) {
        etapeRecipe.push(
          props.steps[i].action + " " + props.steps[i].target + "  "
        );
      }
  }
  // .map pour afficher les etapes ligne par lignes
  const Steps = etapeRecipe.map((step, i) => {
    return (
      <View key={i} style={styles.text}>
        <Text style={styles.ingredients}>{step}</Text>
      </View>
    );
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <TouchableOpacity onPress={() => toggleModalRecipe()}>
        <Image style={styles.image} source={{ uri: props.photo }} />
      </TouchableOpacity>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.userContainer}
          onPress={() => toggleModal()}
        >
          <FontAwesome name="user" size={16} color="#000" style={styles.icon} />
          <Text style={styles.text}>{selectedValue}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.userContainer}>
          <FontAwesome
            name="refresh"
            size={16}
            color="#000"
            style={styles.icon}
            onPress={() => navigation.navigate("NewRecetteScreen")}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.userContainer}
          onPress={likedRecipe ? handleUnlike : handleLike}
        >
          <FontAwesome
            name={likeHeart}
            size={16}
            color={colors}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.userContainer}>
          <FontAwesome
            name="close"
            size={16}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
          onValueChange={(itemValue) => setSelectedValue(itemValue)}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
        >
          <View style={styles.modalView}>
            <Picker
              numberOfLines={3}
              style={styles.picker}
              onValueChange={(itemValue) => handleChangePeople(itemValue)}
            >
              <Picker.Item label="Nombre de personnes pour cette recette :" />
              <Picker.Item label="1" value="1" />
              <Picker.Item label="2" value="2" />
              <Picker.Item label="3" value="3" />
              <Picker.Item label="4" value="4" />
              <Picker.Item label="5" value="5" />
              <Picker.Item label="6" value="6" />
              <Picker.Item label="7" value="7" />
              <Picker.Item label="8" value="8" />
            </Picker>
          </View>
        </Modal>
        <View>
          <Modal
            visible={modalRecipeVisible}
            animationType="slide"
            transparent={false}
            onRequestClose={() => setModalRecipeVisible(false)}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            onBackdropPress={toggleModalRecipe}
            onBackButtonPress={toggleModalRecipe}
          >
            <ScrollView>
              <View style={styles.modalViewRecipe}>
                <Text style={styles.titleRecipe}>{props.title}</Text>
                <Image
                  style={styles.imageRecipe}
                  source={{ uri: props.photo }}
                />
                <Text style={styles.description}>{props.description}</Text>
                <View style={styles.containerTemps}>
                  <Text style={styles.temps}>
                    Temps de préparation : {props.cook_duration} min
                  </Text>
                  <Text style={styles.temps}>
                    Temps de cuisson : {props.cook_duration} min
                  </Text>
                </View>
                <View style={styles.ingredientContainer}>
                  <Text style={styles.titleRecipe}>Ingrédients</Text>
                  <View style={styles.ingredients}>{Ingredients}</View>
                </View>
                <View style={styles.ingredientContainer}>
                  <Text style={styles.titleRecipe}>Recette</Text>
                  <View style={styles.ingredients}>{Steps}</View>
                </View>
              </View>
            </ScrollView>
          </Modal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "47%",
    height: 270,
    alignItems: "center",
    backgroundColor: "#fff",
    opacity: 0.8,
    margin: 5,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 180,
    borderRadius: 10,
    marginTop: 5,
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    height: 42,
    textAlign: "center",
  },
  titleRecipe: {
    fontSize: 18,
    marginTop: 5,
    height: 42,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 10,
    height: 50,
  },
  description: {
    fontSize: 16,
    marginTop: 5,
    height: 42,
    textAlign: "center",
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "25%",
    height: 30,
  },
  text: {
    fontSize: 16,
    marginLeft: 5,
    fontWeight: "bold",
  },
  picker: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    opacity: 0.8,
  },
  centeredView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "red",
  },
  modalView: {
    marginTop: "60%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalViewRecipe: {
    marginTop: "5%",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageRecipe: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginTop: 5,
  },
  containerTemps: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 40,
    marginTop: 15,
  },
  temps: {
    fontSize: 12,
    marginLeft: 5,
  },
  ingredientContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 10,
    textAlign: "center",
  },
  ingredients: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
    width: 320,
  },
});
