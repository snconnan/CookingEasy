import { LogBox } from 'react-native';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './screens/index';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ingredient from './reducers/ingredient';
import user from './reducers/user';
import recette from './reducers/recette';
import Favoris from './reducers/Favoris';
LogBox.ignoreAllLogs();

//navigation attente//
import AlimentExcluScreen from './screens/AlimentExcluScreen';
import RegimeScreen from './screens/RegimeScreen';
import HomeScreen from './screens/HomeScreen';
import FoyerScreen from './screens/FoyerScreen';
import BienvenueScreen from './screens/BienvenueScreen';
import ConservationScreen from './screens/ConservationScreen';
import EquipementScreen from './screens/EquipementScreen';
import FavorisScreen from './screens/FavorisScreen';
import FelicitationsScreen from './screens/FelicitationsScreen';
import InfoScreen from './screens/InfoScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import MenuScreen from './screens/MenuScreen';
import NewRecetteScreen from './screens/NewRecetteScreen';
import PrefSemaineScreen from './screens/PrefSemaineScreen';
import ProfilScreen from './screens/ProfilScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import Menu from './component/menu';
import CuisineEtape1Screen from './screens/CuisineEtape1Screen';
import CuisineEtape2Screen from './screens/CuisineEtape2Screen';
import CuisineEtape3Screen from './screens/CuisineEtape3Screen';
import ListCourse from './screens/ListCourse';
import CuisineEtape4Screen from './screens/CuisineEtape4Screen';
import CuisineEtape5Screen from './screens/CuisineEtape5Screen';

const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: {ingredient, user, recette, Favoris},
 });

export default function App() {
  

  return (
    <Provider store={store}>
      <NavigationContainer style={styles.container}>
       <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Index" component={Index} />
       <Stack.Screen name="BienvenueScreen" component={BienvenueScreen} />
       <Stack.Screen name="Menu" component={Menu} />
       <Stack.Screen name="ListCourse" component={ListCourse} />
       <Stack.Screen name="ConnectionScreen" component={ConnectionScreen} /> 
       <Stack.Screen name="AlimentExcluScreen" component={AlimentExcluScreen} /> 
        <Stack.Screen name="RegimeScreen" component={RegimeScreen} />
        <Stack.Screen name="FoyerScreen" component={FoyerScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ConservationScreen" component={ConservationScreen} />
        <Stack.Screen name="EquipementScreen" component={EquipementScreen} />
        <Stack.Screen name="FavorisScreen" component={FavorisScreen} />
        <Stack.Screen name="FelicitationsScreen" component={FelicitationsScreen} />
        <Stack.Screen name="InfoScreen" component={InfoScreen} />
        <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="NewRecetteScreen" component={NewRecetteScreen} />
        <Stack.Screen name="PrefSemaineScreen" component={PrefSemaineScreen} />
        <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
        <Stack.Screen name="CuisineEtape1Screen" component={CuisineEtape1Screen} />
        <Stack.Screen name="CuisineEtape2Screen" component={CuisineEtape2Screen} />
        <Stack.Screen name="CuisineEtape3Screen" component={CuisineEtape3Screen} />
        <Stack.Screen name="CuisineEtape4Screen" component={CuisineEtape4Screen} />
        <Stack.Screen name="CuisineEtape5Screen" component={CuisineEtape5Screen} />
       </Stack.Navigator>
       </NavigationContainer>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

