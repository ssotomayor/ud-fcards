import React, { Component } from 'react'
import { StyleSheet, TextInput,KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions'

class AddCard extends Component {

  static navigationOptions = ({ navigation }) => {
    const { deckKey } = navigation.state.params
    return {
      title: `New Card - ${deckKey}`
    }
  }

  state = {
    question: '',
    answer: ''
  }

  handleChange (key, value) {
    this.setState((state) => {
      return {
        ...state,
        [key]: value
      }
    })
  }

  handleSubmit(){
    const {question, answer} = this.state
    const {handleDispatchSubmit, navigation} = this.props

    handleDispatchSubmit({question, answer}).then(() => {
      this.setState(() => ({
        question: '',
        answer: ''
      }))
      navigation.goBack()      
    })
  }

  render() {

    const {question, answer} = this.state

    return (
      <KeyboardAvoidingView behavior='padding' style={[{backgroundColor: '#a732d1', flex:1}, addCardStyles.container]}>
        <TextInput
          style={[addCardStyles.input]}
          onChangeText={(question) => this.handleChange('question', question)}
          value={question}
          placeholderTextColor="#999"
          placeholder='Question'
        />
        <TextInput
          style={[addCardStyles.input]}
          onChangeText={(answer) => this.handleChange('answer', answer)}
          value={answer}
          placeholderTextColor="#999"
          placeholder='Answer'
        />
        <Button 
          disabled={!question.length || !answer.length} 
          title='Add Card' 
          text='Submit' 
          onPress={() => this.handleSubmit()}
          buttonStyle={[addCardStyles.button]}
          />
      </KeyboardAvoidingView>        
    )
  }
}

const addCardStyles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  input: {
    paddingTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    color: '#FFFFFF',
    borderColor: '#d6d7da', 
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#7d1ba0',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#000",
    height: 45,
    marginTop: 10,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5    
  }
})

const mapDispatchToProps = (dispatch, props) => {
  const { deckKey } = props.navigation.state.params
  return {
      handleDispatchSubmit: (cardObj) => {
        return dispatch(handleAddCard(deckKey, cardObj))
    }
  }
}

export default connect(null, mapDispatchToProps)(AddCard)