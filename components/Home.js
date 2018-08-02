import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, FlatList, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import Deck from './Deck'
import {purple} from '../utils/colors'

class Home extends Component {
  componentDidMount(){
    getDecks().then((result) => {
      this.props.dispatch(receiveDecks(result))
    })
  }
  
  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate(
      'DeckView',
      { deckKey: item.title }
    )}>
    <Deck 
    title={item.title} 
    questions={item.questions}
    color={`rgb(${(Math.floor(Math.random() * 256))}, 
      ${(Math.floor(Math.random() * 256))},
      ${(Math.floor(Math.random() * 256))})`
    }
     />
    </TouchableOpacity>
  )
  
  render() {
    const { decks } = this.props
    
    return (
      <View style={{backgroundColor: purple, flex:1}}>
        <FlatList 
          data={Object.values(decks)}
          renderItem={this.renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    )
  }
}

function mapStateToProps(decks){
  return {
    decks
  }
}

export default connect(mapStateToProps)(Home)