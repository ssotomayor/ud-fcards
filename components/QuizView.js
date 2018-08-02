import React, { Component } from 'react'
import { View, StyleSheet, Alert, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Card from './Card'
import { connect } from 'react-redux'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'
import {white} from '../utils/colors'

class QuizView extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params
    return {
      title: `Quiz - ${deckKey}`
    }
  }

  state = {
    showAnswer: false,
    correct: 0,
    current: 0
  }

  handleAnswer(){
    const amountCards = this.props.questions.length - 1
    
    if(this.state.current < amountCards){
      this.setState((prevState) => ({
        current: prevState.current + 1,
        showAnswer: false
      }))
    } else {
      clearLocalNotification().then(setLocalNotification)

      this.alert()
    }
  }

  reset(){
    this.setState({
      showAnswer: false,
      correct: 0,
      current: 0,
    })    
  }

  alert = () => {
    const { correct } = this.state
    const { navigation, questions } = this.props
    const average = Math.round((correct / questions.length) * 100)

    Alert.alert(`${average == 100 ? 'Perfect Score' : 'Average'}: ${average}% `, 
    `${correct}/${questions.length} correct questions.`,
      [
        { text: 'Retry', onPress: () => this.reset()},
        { text: 'Back', onPress: () => navigation.goBack()},
      ],
      { cancelable: false }
    )
  }  

  render() {

    const { current, showAnswer } = this.state
    const { questions } = this.props

    return (
      <View style={[{backgroundColor: '#a732d1', flex:1, justifyContent: 'flex-start'}, quizStyles.container]}>
        <Text style={[quizStyles.text]}>{current + 1}/{questions.length}</Text>
        <Card showAnswer={this.state.showAnswer} question={questions[current]} /> 
        <Button 
          color="#00F" 
          title={showAnswer ? 'Show Front' : 'Show Back'} 
          buttonStyle={{ padding: 20, backgroundColor: 'transparent' }} 
          onPress={() => this.setState({ showAnswer: !showAnswer })} 
          />

        <Button 
          color="#FFF" 
          title='Correct' 
          buttonStyle={[quizStyles.button]} 
          onPress={() => this.setState({ 
            correct: this.state.correct + 1 }, this.handleAnswer)} 
          />
        <Button 
          color="#FFF" 
          title='Incorrect' 
          buttonStyle={[quizStyles.button, {backgroundColor: '#900' }]} 
          onPress={() => this.handleAnswer()} 
          />
      </View>
    )
  }
}

function mapStateToProps(state, { navigation }){
  const { deckKey } = navigation.state.params
  const deckData = state[deckKey]
  const { questions } = deckData

  return {
    questions,
    deckData
  }
}

const quizStyles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#060',
    borderRadius: 10, 
    width: 300,
    borderColor: white,
    marginTop: 10,
    borderWidth: 1 
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 40,
    alignItems: 'center',
  }
})

export default connect(mapStateToProps)(QuizView)