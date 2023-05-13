import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Header } from 'react-native-elements'
import { useState } from 'react';
import Modal from 'react-native-modal';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../reducers/user';

export default function Menu() {
  const BACKEND_ADDRESS = 'https://cookingeasy-backend.vercel.app/';
  const navigation = useNavigation();
  const User = useSelector((state) => state.user.value);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
 

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('BienvenueScreen');
    setModalVisible(false);
  };

  const handleDeleteAccount = () => {
    const token = User.token;
    fetch(`${BACKEND_ADDRESS}user/${token}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
    console.log(data.message); 
    dispatch(logout());
    navigation.navigate('BienvenueScreen');
    setModalVisible(false);
    })
    .catch(error => {
      console.error(error);
    });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
    <Header 
        backgroundColor='#f4511e'
        leftComponent={{ icon: 'menu', color: '#fff' , style: {marginTop: 'auto', marginBottom: 'auto'}, onPress:(toggleModal) }} 
        centerComponent={
          <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
            <Image source={require('../assets/logo-orangee.png')} style={{ width: 150, height: 25, marginTop: -2}} />
          </TouchableOpacity>
        }
     />
  
     <View style={styles.container}>
    </View>
    <View style={styles.container}>
      <ScrollView>
        <Modal 
          isVisible={isModalVisible}
          backdropOpacity={0.7}
          animationType="fade"
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          animationIn="slideInLeft"
          animationOut="slideOutLeft"
          animationInTiming={500}

    >
    <View style={styles.containerModal}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/logo-noir.png')} style={{width: 150, height: 25, margin: 20}} />
      </View>
      <View style={styles.sommaireContainer}>
        <View style={styles.align}>
        <FontAwesome name='home' size={20} color='#f4511e' style={styles.icon}/>
        <Text style={{fontSize: 15, fontWeight: 'bold', margin:15, alignItems: "center"}}  onPress={() =>navigation.navigate('HomeScreen')} >Accueil</Text>
        </View>
        <View style={styles.align} >
        <FontAwesome name='spoon' size={20} color='#f4511e' style={styles.icon}/>
        <Text style={{fontSize: 15, fontWeight: 'bold', margin:15}} onPress={() => navigation.navigate("MenuScreen")} >Mon menu</Text>
        </View>
        <View style={styles.align}>
        <FontAwesome name='star' size={20} color='#f4511e' style={styles.icon}/>
        <Text style={{fontSize: 15, fontWeight: 'bold', margin:15}} onPress={() => navigation.navigate("FavorisScreen")} >Mes favoris</Text>
        </View>
        <View style={styles.align}>
        <FontAwesome name='user' size={20} color='#f4511e' style={styles.icon}/>
        <Text style={{fontSize: 15, fontWeight: 'bold', margin:15}} onPress={() => navigation.navigate("ProfilScreen")} >Mon profil</Text>
        </View>
        <View style={styles.align}>
        <FontAwesome name='book' size={20} color='#f4511e' style={styles.icon}/>
        <Text style={{fontSize: 15, fontWeight: 'bold', margin:15, marginBottom:10}} onPress={() => navigation.navigate("ListCourse")}>Ma liste de course</Text>
        </View>

      </View>
      <View style={styles.bottomContainer}>
        <Image style={styles.img} source={require('../assets/Livre.png')}  />
        </View>
        <View style={styles.deco}>
          <Text style={{fontSize: 15, margin:5, color:"#C4C9C7"}} onPress={handleLogout}>Déconnexion</Text>
          <Text style={{fontSize: 15,  margin:5, marginBottom: 15, color:"#D3D3D3"}} onPress={handleDeleteAccount}>Supprimer votre compte</Text>
        </View>
      </View>
    </Modal>
    </ScrollView>
    
</View>

  
</View>
   
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  imgContainer: {
    padding: 10,
    margin: 5,
    width: "90%",
    backgroundColor: '#fff',
    alignItems: 'center',
    //borderRadius: 10,
    //borderColor: '#f4511e',
    //borderWidth: 2,
  },

  sommaireContainer: {
    padding: 10,
    borderColor: '#f4511e',
    width: "90%",
    margin: 5,
    zIndex: 0,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: "center",
    borderRadius: 10,
  },

  containerModal: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '80%',

  },
  bottomContainer: {
    padding: 10,
    alignItems: 'center',
    //borderColor: '#f4511e',
    width: "90%",
    //borderWidth: 2,
    margin: 5,
    //borderRadius: 10,
  },
  deco: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  align: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 250,
    height: 150,
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
});