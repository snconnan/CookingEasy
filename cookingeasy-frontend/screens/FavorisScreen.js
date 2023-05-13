import { View, Text, StyleSheet, ScrollView} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import Menu from '../component/menu';
import LikedRecetteComponent from '../component/LikedRecette';


export default function FavorisScreen({ navigation }) {

  const Liked = useSelector((state) => state.Favoris.value);
  let Recipes = <Text style={{ marginTop: 200,}}>Vous n'avez encore rien enregistré.</Text>;
  if (Liked.length > 0) {
  Recipes = Liked.map((data, i) => {
  return <LikedRecetteComponent key={i} title={data.title} photo={data.photo} isliked />;
});
}
  return (
    <View style={styles.container}>
      <ScrollView>
      <Menu/>
     <View style={styles.content}>
      <Text style={styles.title}>Mes recettes préférées</Text>
      {Recipes}
      </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  content: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '800',
    textAlign: 'center',
  },
});