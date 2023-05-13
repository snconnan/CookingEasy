import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import Menu from '../component/menu';

export default function CuisineEtape1Screen({ navigation}) {

  const BACKEND_ADDRESS = "https://cookingeasy-backend.vercel.app/";
  const recette = useSelector((state) => state.recette.value);
  const [steps, setSteps] = useState([]);

 let titleList = []
 for (let x = 0 ; x < recette.length; x++) {
    titleList.push(recette[x].title)
  }
  titleList = titleList.map((e) => JSON.stringify(e));

  useEffect(() => {
   fetch(`${BACKEND_ADDRESS}menuTer/miseenoeuvre?recettesList=[${titleList}]`)
    .then((response) => response.json())
    .then((data) => {
      for (let x = 0 ; x < 5; x++) {
      const Recipe = {
        action: data.steps.prep[x].step.action,
        duration: data.steps.prep[x].step.duration,
        target: data.steps.prep[x].step.target[0],
        title: data.steps.prep[x].recette_title,
      }
      console.log(data.steps);
      if (steps.find((steps) => steps.target === Recipe.target)) {
        return;
      } else {
        setSteps((prev) => [...prev, Recipe]);
      }
    }
    })
    .catch((error) => {
      console.error(error);
    });
  }, []); 

    const renderSteps = steps.map((step,i) => {
      return (
        <View key={i} style={styles.steps} backgroundColor={steps.colors}>
          <Text style={styles.titleComponent}>{step.title}</Text>
          <Text style={styles.texte}>{step.action} {step.target}</Text>
          <Text style={styles.texte}>{step.duration} min</Text>
        </View>
      )
      
    })

  return (
    <ScrollView style={styles.container}>
      <Menu  />
         <View style={styles.generalContainer}>
             <Text style={styles.title}>Je cuisine</Text>
             <Text style={styles.title}>Préparation </Text>
                 {renderSteps}
         <TouchableOpacity style={styles.nextBtn} onPress={() => navigation.navigate("CuisineEtape2Screen")}>
             <Text style={styles.textWhite}>Etape suivante </Text>
        </TouchableOpacity>
     </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  generalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    margin:20,
    textAlign: 'center',
  },
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    height: 50,
    backgroundColor: '#f4511e',
    margin: 15,
  },
  textWhite: {
    color: '#fff',
    fontSize: 15,
  },
  steps: {
    width: 300,
    borderRadius: 15,
    borderColor: '#f4511e',
    borderWidth: 2,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texte: {
    fontSize: 20,
    margin: 10,
  },
  titleComponent: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
});