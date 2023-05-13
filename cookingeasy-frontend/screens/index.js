import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default function Index({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.menu}>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("HomeScreen")}
        >
          <Text style={styles.buttonText}>Home screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("AlimentExcluScreen")}
        >
          <Text style={styles.buttonText}>AlimentExcluScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("ConnectionScreen")}
        >
          <Text style={styles.buttonText}>ConnectionScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("FoyerScreen")}
        >
          <Text style={styles.buttonText}>Foyer Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("EquipementScreen")}
        >
          <Text style={styles.buttonText}>Equipement Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("BienvenueScreen")}
        >
          <Text style={styles.buttonText}>Bienvenue Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("RegimeScreen")}
        >
          <Text style={styles.buttonText}>RegimeScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("ConservationScreen")}
        >
          <Text style={styles.buttonText}>ConservationScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("FavorisScreen")}
        >
          <Text style={styles.buttonText}>FavorisScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("FelicitationsScreen")}
        >
          <Text style={styles.buttonText}>FelicitationsScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("InfoScreen")}
        >
          <Text style={styles.buttonText}>InfoScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("InscriptionScreen")}
        >
          <Text style={styles.buttonText}>InscriptionScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("MenuScreen")}
        >
          <Text style={styles.buttonText}>MenuScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("MenuScreen")}
        >
          <Text style={styles.buttonText}>MenuScreen2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("NewRecetteScreen")}
        >
          <Text style={styles.buttonText}>NewRecetteScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("PrefSemaineScreen")}
        >
          <Text style={styles.buttonText}>PrefSemaineScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("ProfilScreen")}
        >
          <Text style={styles.buttonText}>ProfilScreen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.next}
          onPress={() => navigation.navigate("CuisineEtape1Screen")}
        >
          <Text style={styles.buttonText}>CuisineEtape1Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('CuisineEtape2Screen')}>
          <Text style={styles.buttonText}>CuisineEtape2Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('ListCourse')}>
          <Text style={styles.buttonText}>ListCourse</Text>
        </TouchableOpacity>
        </ScrollView>
        </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    menu: {
        marginTop: 70,
        },
    next: {
        flexDirection: 'row',
        backgroundColor: '#FA8C8E',
        margin: 10,
        width: 200,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        },

  });
