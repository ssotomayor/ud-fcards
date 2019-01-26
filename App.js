import React , { Component } from 'react'
import { View } from 'react-native'
import Navigation from './components/Navigator'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { setLocalNotification } from './utils/helpers'

class App extends Component {

  componentDidMount() {
    // new feature
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
        <View style={{ flex: 1, backgroundColor: '#F00' }}>
          <Navigation />
        </View>
      </Provider>
    )
  }
}

export default App