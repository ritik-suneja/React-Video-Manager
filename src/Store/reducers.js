import {
    FETCH_BUCKET,
    FETCH_CARDS,
    FETCH_BUCKETS,
    ADD_CARD,
    DELETE_CARD,
    UPDATE_CARD,
    DELETE_MULTIPLE_CARDS,
  } from './actionTypes';
  
  const initialState = {
    bucket: null,
    cards: [],
    buckets: [],
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BUCKET:
        return {
          ...state,
          bucket: action.payload,
        };
  
      case FETCH_CARDS:
        return {
          ...state,
          cards: action.payload,
        };
  
      case FETCH_BUCKETS:
        return {
          ...state,
          buckets: action.payload,
        };
  
      case ADD_CARD:
        return {
          ...state,
          cards: [...state.cards, action.payload],
        };
  
      case DELETE_CARD:
        return {
          ...state,
          cards: state.cards.filter((card) => card.id !== action.payload),
        };
  
      case UPDATE_CARD:
        return {
          ...state,
          cards: state.cards.map((card) => (card.id === action.payload.id ? action.payload : card)),
        };
  
      case DELETE_MULTIPLE_CARDS:
        return {
          ...state,
          cards: state.cards.filter((card) => !action.payload.includes(card.id)),
        };
  
      default:
        return state;
    }
  };
  
  export default rootReducer;
  