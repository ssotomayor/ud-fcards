import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'
import { purple, white } from '../utils/colors'

class DeckView extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params
  
    return {
      title: deckId,
      headerLeft: <HeaderBackButton tintColor={white} onPress={() => navigation.navigate('Home')} />,
    }
  }
  
  render() {
    const {title, questions} = this.props.deckInfo
    const { navigation } = this.props
    return (
      <View style={{backgroundColor: purple, flex:1, alignItems: 'center'}}>
          <Text style={{ fontSize: 24, color: '#FFF', marginTop: 20 }}>{title}</Text>
          <Text style={{ fontSize: 18, color: '#CCC' }}>{questions.length} card{questions.length > 1 ? 's' : ''}</Text>

          {!!questions.length && 
          <Button 
            title="Start Quiz"
            onPress={() => navigation.navigate('QuizView', { deckKey: title })}  
            buttonStyle={[deckViewStyles.button]}
            />
            }
          <Button 
            title="Add Card"
            onPress={() => navigation.navigate('AddCard', { deckKey: title })} 
            buttonStyle={[deckViewStyles.button]}
            />
      </View>
    )
  }
}

const deckViewStyles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    height: 45,
    marginTop: 10,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5    
  }
})

function mapStateToProps (state, { navigation }) {
  const { deckKey } = navigation.state.params
  const deckInfo = state[deckKey]

  return {
    deckKey,
    deckInfo
  }
}

export default connect(mapStateToProps)(DeckView)