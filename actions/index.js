import { saveDeckTitle, getDecks, addCardToDeck } from "../utils/api";
export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks
})

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck
})

export const addCard = (card) => ({
  type: ADD_CARD,
  card
})

export function handleAddDeck(deckObj){
  return (dispatch) => {
      dispatch(addDeck(deckObj))
      return saveDeckTitle(deckObj)
      .catch((e) => {
        console.warn('Add deck error: ', e)
        alert('There was an adding the Deck. Try again.')            
      })
  }
}

export function handleAddCard(deck, card){
  return (dispatch) => {
      dispatch(addCard(card))
      return addCardToDeck(deck, card)
      .then(() => {
        getDecks()
          .then(( decks ) => dispatch(receiveDecks(decks)))
      })
      .catch((e) => {
        console.warn('Add card error: ', e)
        alert('There was a problem adding the Card. Try again.')            
      })
  }
}