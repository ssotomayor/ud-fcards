import React, { Component } from 'react'
import { TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions'

class NewDeck extends Component {
  state = {
    deckTitle: ''
  }

  handleChange(deckTitle) {
    this.setState(() => ({
      deckTitle
    }))
  }

  handleSubmit(deckTitle){
    const { navigation, decks } = this.props
    if(decks[deckTitle]){
      Alert.alert(`${deckTitle} already exists !`, 
      `If you continue, cards of this deck will be removed.`,
        [
          { text: 'Continue', onPress: () => this.addDeck(deckTitle)},
          { text: 'Cancel', onPress: () => navigation.goBack(), style: 'cancel'},
        ],
        { cancelable: false }
      )
    } else {
      this.addDeck(deckTitle)
    }
  }

  addDeck(title){
    const { handleDispatchSubmit, navigation } = this.props
    handleDispatchSubmit(title).then(() => {
      this.setState(() => ({
        deckTitle: ''
      }))
      navigation.goBack()      
    })    
  }

  render() {
    const { deckTitle } = this.state
    
    return (
      <KeyboardAvoidingView behavior='padding' style={[{backgroundColor: '#a732d1', flex:1}, addDeckStyles.container]}>
        <TextInput 
        onChangeText={(deckTitle) => this.handleChange(deckTitle)} 
        placeholderTextColor="#999"
        style={[addDeckStyles.input]} placeholder="Deck Title" 
        value={this.state.deckTitle}
        />
        <Button 
          disabled={!deckTitle.length} 
          title='New Deck' onPress={() => this.handleSubmit(deckTitle)} 
          buttonStyle={[addDeckStyles.button]}
          />
      </KeyboardAvoidingView>
    )
  }
}

const addDeckStyles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  input: {
    paddingTop: 10,
    borderRadius: 10,
    borderWidth: 2,
    marginLeft: 10,
    marginRight: 10,
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

const mapDispatchToProps = (dispatch) => {
  return {
      handleDispatchSubmit: (deckTitle) => {
        const newDeckObj = {
          [deckTitle]: {
            title: deckTitle,
            questions: []
          }
        }
        return dispatch(handleAddDeck(newDeckObj))
    }
  }
}

const mapStateToProps = (state) => {
  return {decks: state}
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)