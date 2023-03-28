import * as actionTypes from './actionTypes';

// Add the new action creators here
export const fetchBucket = (bucketId) => async (dispatch) => {
  const response = await fetch(`http://localhost:5001/buckets/${bucketId}`);
  const data = await response.json();
  dispatch({ type: actionTypes.FETCH_BUCKET, payload: data });
};

export const fetchCards = (bucketId) => async (dispatch) => {
  const response = await fetch(`http://localhost:5001/cards?bucketId=${bucketId}`);
  const data = await response.json();
  dispatch({ type: actionTypes.FETCH_CARDS, payload: data });
};

export const fetchBuckets = () => async (dispatch) => {
  const response = await fetch('http://localhost:5001/buckets');
  const data = await response.json();
  dispatch({ type: actionTypes.FETCH_BUCKETS, payload: data });
};

export const addCard = (name, url, bucketId) => async (dispatch) => {
  const newCard = {
    id: Date.now().toString(),
    name,
    url,
    bucketId,
  };

  await fetch('http://localhost:5001/cards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCard),
  });

  dispatch({ type: actionTypes.ADD_CARD, payload: newCard });
};

export const deleteCard = (cardId) => async (dispatch) => {
  await fetch(`http://localhost:5001/cards/${cardId}`, {
    method: 'DELETE',
  });

  dispatch({ type: actionTypes.DELETE_CARD, payload: cardId });
};

export const updateCard = (card) => async (dispatch) => {
  await fetch(`http://localhost:5001/cards/${card.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(card),
  });

  dispatch({ type: actionTypes.UPDATE_CARD, payload: card });
};

export const deleteMultipleCards = (cardIds) => async (dispatch) => {
  await Promise.all(
    cardIds.map((cardId) =>
      fetch(`http://localhost:5001/cards/${cardId}`, {
        method: 'DELETE',
      })
    )
  );

  dispatch({ type: actionTypes.DELETE_MULTIPLE_CARDS, payload: cardIds });
};
