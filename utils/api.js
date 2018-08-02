import { AsyncStorage } from 'react-native'
export const UDACI_FCARDS_KEY = 'UdaciFcards:decks'

const dummyData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}

export function formatGetDeckResults (results) {
  return results === null ? setDummyData() : JSON.parse(results)
}

export function getDecks() {
  return AsyncStorage.getItem(UDACI_FCARDS_KEY)
    .then(formatGetDeckResults)
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(UDACI_FCARDS_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title].questions.push(card)
      AsyncStorage.setItem(UDACI_FCARDS_KEY, JSON.stringify(data))
    })
}

export function setDummyData () {
  AsyncStorage.setItem(UDACI_FCARDS_KEY, JSON.stringify(dummyData))
  return dummyData
}

export function saveDeckTitle(deck) {
  return AsyncStorage.mergeItem(UDACI_FCARDS_KEY, JSON.stringify(deck))
}

export function getDeck(id) {
  return AsyncStorage.getItem(UDACI_FCARDS_KEY)
    .then((result) => {
      return JSON.parse(result)[id]
    }
  )
}