import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {  UnlikedRecette } from "../reducers/Favoris";

export default function LikedRecetteComponent(props) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [likedRecipe, setLikedRecipe] = useState(true)
    const [modalVisible, setModalVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState("2");
    const Liked = useSelector((state) => state.Favoris.value);

     // like coeur 
     const handleUnlike = () => {
        dispatch(UnlikedRecette({title : props.title, photo: props.photo}));
        setLikedRecipe(false);
        setIsVisible(false);

      };
      if (!isVisible) {
        return null;
      }
    
    
      if (likedRecipe) {
        var likeHeart = 'heart'
        var colors = 'red'
      } else {
        likeHeart = 'heart-o'
        colors = '#000'
      }



    // modal
    const toggleModal = () => {
        setModalVisible(!modalVisible);
      };

      // picker
      const handleChangePeople = (itemValue) => {
        setSelectedValue(itemValue)
        setModalVisible(!modalVisible);
        }
        

        
    return (
        <View style={styles.container}>
            <Text style={styles.titleRecipe}>{props.title}</Text>
            <Image style={styles.image} source={{ uri: props.photo }} />
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.userContainer} onPress={ () => toggleModal()}>
                    <FontAwesome name='user' size={16} color='#000' style={styles.icon}/>
                    <Text style={styles.text}>{selectedValue}</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.userContainer} onPress={handleUnlike}>
                    <FontAwesome name={likeHeart} size={16} color={colors} style={styles.icon}/>
                </TouchableOpacity>
                </View>
        
            </View>
    );
    };


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
        width: 160,
        height: 180,
        borderRadius: 10,
        marginTop: 5,
      },
    title: {
        fontSize: 15,
        marginTop: 5,
        height: 42,
        textAlign: "center",
    },
    titleRecipe: {
        fontSize: 16,
        marginLeft: 4,
        marginRight: 4,
        textAlign: "center",
        marginTop: 10,
        flexWrap: 'wrap',
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
        width: '25%',
        height: 30,
    },
    text: {
        fontSize: 16,
        marginLeft: 5,
        fontWeight: "bold",
    },
    picker: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        opacity: 0.8,
    },
    test: {
        backgroundColor: 'red',
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
        backgroundColor: 'red',
    },
    modalView: {
        marginTop: '60%',
        alignContent: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    testView: {
        backgroundColor: 'red',
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
});