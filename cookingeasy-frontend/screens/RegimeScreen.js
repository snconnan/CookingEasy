import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Progress from "react-native-progress";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useSelector } from "react-redux";

//import CheckBox from '@react-native-community/checkbox';

export default function RegimeScreen({ navigation }) {
  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app";

  const user = useSelector((state) => state.user.value);
  const [isVegetarien, setVegetarien] = useState(false);
  const [isVegetalien, setVegetalien] = useState(false);
  const [isPescetarien, setPescetarien] = useState(false);
  const [isPorc, setPorc] = useState(false);
  const [isLactose, setLactose] = useState(false);
  const [isGluten, setGluten] = useState(false);
  const [isAlcool, setAlcool] = useState(false);
  const [isNone, setNone] = useState(false);

  const handleValidation = () => {
    fetch(`${BACKEND_ADDRESS}/preferences/regime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        vegetarien: isVegetarien,
        vegetalien: isVegetalien,
        pescetarien: isPescetarien,
        gluten: isGluten,
        porc: isPorc,
        alcool: isAlcool,
        lactose: isLactose,
        sansRegimeParticulier: isNone,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        navigation.navigate("AlimentExcluScreen");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Mon Régime Alimentaire</Text>
      <Text style={styles.h1}>Sélectionnez votre régime alimentaire :</Text>
      <View style={styles.CheckBoxContainer}>

      <BouncyCheckbox
          text="Sans régime particulier"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => setNone(!false)}
        />
        
        <BouncyCheckbox
          text="Vegetarien"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => setVegetarien(!false)}
        />
        
        <BouncyCheckbox
          text="Vegetalien"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => setVegetalien(!false)}
      />
      
      <BouncyCheckbox
          text="Pescetarien"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => setPescetarien(!false)}
        />

        <BouncyCheckbox
          text="Sans porc"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => setPorc(!false)}
      />
      <BouncyCheckbox
          text="Sans lactose"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
        onPress={() => setLactose(!false)}
      />
      <BouncyCheckbox
          text="Sans gluten"
          fillColor="red"
          marginBottom={15}
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
          onPress={() => setGluten(!false)}
      />
      <BouncyCheckbox
          text="Sans alcool"
          fillColor="red"
          iconStyle={{ borderColor: "red" }}
          textStyle={{ textDecorationLine: 'none' }}
         onPress={() => setAlcool(!false)}
      />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity
          style={styles.previous}
          onPress={() => navigation.navigate("EquipementScreen")}
        >
          <FontAwesome name="arrow-left" size={15} color="#F4511E" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.next}
          title="Suivant"
          onPress={handleValidation}>
          <Text style={styles.Suivant}>Suivant</Text>
        </TouchableOpacity>
      </View>

      <Progress.Bar
        width={250}
        borderWidth={1}
        progress={0.75}
        height={15}
        color={"#f4511e"}
        indeterminateAnimationDuration={2000}
      />
    </KeyboardAvoidingView>
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
  //Style des text (hors titre)
  h1: {
    display: "flex",
    fontSize: 15,
    marginTop: -50,
  },

  //Style container Checkbox
  CheckBoxContainer: {
    justifyContent: "space-around",
  },

  //Style des CheckBox
  BouncyCheckbox: {
    size: 20,
    unfillColor: "white",
    borderColor: "red",
    borderWidth: 1,
    textDecorationLine: "none",
  },

  //Style du bouton Suivant
  next: {
    width: "40%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#f4511e",
  },

  //Style du text "suivant"
  Suivant: {
    fontSize: 20,
    color: "#ffffff",
    padding: 10,
  },

  //Style du bouton précedent
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

  //Style des boutons inférieurs
  bottomButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 5,
  },
});
