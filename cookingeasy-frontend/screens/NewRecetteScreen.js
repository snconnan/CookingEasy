import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Menu from '../component/menu';

export default function NewRecetteScreen({ navigation}) {
  return (
    <View style={styles.container}>
      <Menu  />
     <View style={styles.container}>
      <Text>NewRecettesScreen</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});