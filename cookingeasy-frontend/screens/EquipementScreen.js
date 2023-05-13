import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Progress from "react-native-progress";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useSelector } from "react-redux";

const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app";

export default function EquipementScreen({ navigation }) {
  const [isFourClicked, setIsFourClicked] = useState(false); // Ajout d'un état local pour indiquer si l'image du four a été cliquée ou non
  const [isFriteuseClicked, setIsFriteuseClicked] = useState(false);
  const [isMicroOndesClicked, setIsMicroOndesClicked] = useState(false);
  const [isMixeurClicked, setIsMixeurClicked] = useState(false);
  const [isPlaqueClicked, setIsPlaqueClicked] = useState(false);
  const [isRobotClicked, setIsRobotClicked] = useState(false);
  const user = useSelector((state) => state.user.value);

  const selectedEquipements = [];

  if (isFourClicked) selectedEquipements.push("four");
  if (isFriteuseClicked) selectedEquipements.push("friteuse");
  if (isMicroOndesClicked) selectedEquipements.push("microOndes");
  if (isMixeurClicked) selectedEquipements.push("mixeur");
  if (isPlaqueClicked) selectedEquipements.push("plaque");
  if (isRobotClicked) selectedEquipements.push("robot");

  const handleNextPress = () => {
    fetch(`${BACKEND_ADDRESS}/preferences/equipement)`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        four: isFourClicked,
        mixeur: isMixeurClicked,
        plaque: isPlaqueClicked,
        friteuse: isFriteuseClicked,
        robot: isRobotClicked,
        microondes: isMicroOndesClicked,
        token: user.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
      })
      .catch((error) => {
        console.error(error);
      });

navigation.navigate("RegimeScreen");
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Mes équipements</Text>
      </View>

  <View style={styles.equipement}>

     <TouchableOpacity
      style={[styles.four, isFourClicked && styles.fourClicked]}
      onPress={() => setIsFourClicked(!isFourClicked)}
    >
          <Image style={{ width: 110, height: 110 }}
            source={require("../assets/four.png")} />
      <Text style={styles.appareil}>Four</Text>
    </TouchableOpacity> 

    <TouchableOpacity style={[styles.friteuse, isFriteuseClicked && styles.friteuseClicked]} onPress={() => setIsFriteuseClicked(!isFriteuseClicked)}>
      <Image
       style={{ width: 110, height: 110 }}
        source={require("../assets/friteuse.png")}
      />
      <Text style={styles.appareil}>Friteuse</Text>
    </TouchableOpacity>


    <TouchableOpacity 
    style={[styles.microOndes, isMicroOndesClicked && styles.microOndesClicked]}
    onPress={() => setIsMicroOndesClicked(!isMicroOndesClicked)}
    >
          <Image style={{ width: 110, height: 110 }}
            source={require("../assets/micro-ondes.png")} />
      <Text style={styles.appareil}>Micro-ondes</Text>
    </TouchableOpacity>

    <TouchableOpacity  style={[styles.mixeur, isMixeurClicked && styles.MixeurClicked]} onPress={() => setIsMixeurClicked(!isMixeurClicked)}>
          <Image
            style={{ width: 110, height: 110 }}
        source={require("../assets/mixeur.png")}
      />
      <Text style={styles.appareil}>Mixeur</Text>
    </TouchableOpacity>

    <TouchableOpacity style={[styles.plaque, isPlaqueClicked && styles.PlaqueClicked]} onPress={() => setIsPlaqueClicked(!isPlaqueClicked)}>
      <Image
       style={{ width: 110, height: 110 }}
        source={require("../assets/plaquesCuisson.png")}
      />
      <Text style={styles.appareil}>Plaques</Text>
    </TouchableOpacity>


    <TouchableOpacity style={[styles.robot, isRobotClicked && styles.RobotClicked]} onPress={() => setIsRobotClicked(!isRobotClicked)}>
      <Image
            style={{ width: 110, height: 110 }}
        source={require("../assets/robot.png")}
      />
      <Text style={styles.appareil}>Robot</Text>
    </TouchableOpacity>
    
  </View>
  <View style={styles.boutonsbasContainer}>
    <View style={styles.boutonsbas}>
      <TouchableOpacity style={styles.previous} onPress={() => navigation.navigate("FoyerScreen")}>
        <FontAwesome name="arrow-left" size={15} color="#f4511e" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.suivant} activeOpacity={0.8} onPress={handleNextPress}>
        <Text style={styles.textButton}>Suivant</Text>
      </TouchableOpacity>
    </View>
  </View>

  <View>
    <Progress.Bar
      width={250}
      borderWidth={1}
      progress={0.5}
      height={15}
      color={"#F4511E"}
      indeterminateAnimationDuration={2000}
    />
  </View>
</View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    marginTop: 50,
    marginBottom: 40,
  },
 
  fourClicked: {
    // Ajout du style pour la bordure ombrée
    borderColor: "#f4511e",
    borderWidth: 2,
    borderRadius: 10,
  },
  
  microOndesClicked: {
    // Ajout du style pour la bordure ombrée
    borderColor: "#f4511e",
    borderWidth: 2,
    borderRadius: 10,
  },

  friteuseClicked: {
    // Ajout du style pour la bordure ombrée
    borderColor: "#f4511e",
    borderWidth: 2,
    borderRadius: 10,
  },

  MixeurClicked: {
    // Ajout du style pour la bordure ombrée
    borderColor: "#f4511e",
    borderWidth: 2,
    borderRadius: 10,
  },

  PlaqueClicked: {
    // Ajout du style pour la bordure ombrée
    borderColor: "#f4511e",
    borderWidth: 2,
    borderRadius: 10,
  },

  RobotClicked: {
    // Ajout du style pour la bordure ombrée
    borderColor: "#f4511e",
    borderWidth: 2,
    borderRadius: 10,
  },

  four: {
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",
  },

  microOndes: {
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",

  },

  friteuse: {
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",

  },

  mixeur: {
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",

  },
  plaque: {
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",

  },
  robot: {
    padding: 10,
    margin: 2,
    borderWidth: 2,
    borderColor: "white",

  },
  equipement: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  appareil: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  suivant: {
    width: "40%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#F4511E",
  },
  textButton: {
    fontSize: 20,
    color: "white",
    padding: 10,
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
  boutonsbas: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    margin: 5,
  },
  boutonsbasContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
});