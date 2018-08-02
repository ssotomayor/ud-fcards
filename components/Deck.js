import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Deck = ({title, questions, color}) => {
    return (
        <View style={styles.deck}>
          <Text style={[styles.titleTxt]}>{title}</Text>
          <Text style={[styles.cardsTxt]}><MaterialCommunityIcons name="cards" size={20} color={color} /> {questions.length} card{questions.length > 1 ? 's' : ''}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleTxt: {
      fontSize: 20, 
      color: '#FFF',
    },
    cardsTxt: {
      paddingRight: 10,
      fontSize: 16,
      color: '#CCC'
    },
    deck: {
      borderColor: '#d6d7da',
      paddingTop: 10,
      borderRadius: 10,
      borderWidth: 2,
      marginTop: 10,
      marginRight: 10,
      marginLeft: 10,
      paddingBottom: 10,
      backgroundColor: '#7d1ba0',
      flexWrap: 'wrap',
      alignItems: 'center',
      shadowOpacity: 0.25,
      shadowRadius: 3,
      shadowColor: 'black',
      shadowOffset: { height: 10, width: 5 }
    },
})

export default Deck