import React from 'react'
import { Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Home from './Home'
import NewDeck from './NewDeck'
import DeckView from './DeckView'
import AddCard from './AddCard'
import QuizView from './QuizView'
import { white, black, purple } from '../utils/colors'

const tabNavigator = (Platform.OS === 'ios' ? createBottomTabNavigator : createMaterialTopTabNavigator)({
    Decks: {
      screen: Home,
      navigationOptions: {
        headerMode:'none',
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
      }
    },
    AddDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      }
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : black,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? black : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const Navigation = createStackNavigator({
  Home: {
      screen: tabNavigator
    },
    DeckView: {
      screen: DeckView,
    },
    AddCard: {
      screen: AddCard
    },
    QuizView: {
      screen: QuizView,
    }    
  },{
      navigationOptions: {
        headerMode:'none',
        paddingTop: 0,
        marginTop:0,
        headerBackTitle: null,
        headerTintColor: white,
        headerStyle: {
          backgroundColor: purple,
          height: Platform.OS === 'ios' ? 56 : 0
        }
  },
})

export default Navigation