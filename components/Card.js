import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Card = ({
  showAnswer,
  question
}) => (
  <View style={[quizStyles.card]}>
    {showAnswer ? 
      <Text style={[quizStyles.text]}>{question.answer}</Text> : 
      <Text style={[quizStyles.text]}>{question.question}</Text>
    }
  </View>
)

const quizStyles = StyleSheet.create({
  card: {
    borderWidth: 1, 
    borderColor: '#FFF', 
    borderRadius: 10, 
    marginTop: 5,
    shadowOpacity: 0.85,
    shadowRadius: 5,
    shadowColor: 'black',
    shadowOffset: { height: 5, width: 5 },
  },
  text: {
    fontSize: 18,
    paddingRight: 15,
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 30,
    color: '#FFFFFF',
    justifyContent: 'center',
  }
})

export default Card
