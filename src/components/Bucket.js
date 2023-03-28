import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { List, Input, Button, Typography, Modal, message, Select, Checkbox } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBucket,
  fetchBuckets,
  fetchCards,
  addCard,
  deleteCard,
  updateCard,
  deleteMultipleCards,
} from '../Store/actions';


export default function Bucket() {
  const { bucketId } = useParams();
  const dispatch = useDispatch();
  const [newCardName, setNewCardName] = useState('');
  const [newCardUrl, setNewCardUrl] = useState('');
  const [selectedCards, setSelectedCards] = useState([]);
  const [editCard, setEditCard] = useState(null);
  const [editedCardName, setEditedCardName] = useState('');
  const [editedCardUrl, setEditedCardUrl] = useState('');
  const [editedCardBucketId, setEditedCardBucketId] = useState('');


  const bucket = useSelector((state) => state.bucket);
  const cards = useSelector((state) => state.cards);
  const buckets = useSelector((state) => state.buckets);

  useEffect(() => {
    dispatch(fetchBucket(bucketId));
    dispatch(fetchCards(bucketId));
    dispatch(fetchBuckets());
  }, [dispatch, bucketId]);

  const handleAddCard = async () => {
    if (newCardName.trim() !== '' && newCardUrl.trim() !== '') {
      dispatch(addCard(newCardName, newCardUrl, bucketId));
      message.success('Added successfully');
      setNewCardName('');
      setNewCardUrl('');
    } else {
      message.error('Please enter both card name and URL');
    }
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId));
    message.success('Deleted successfully');

  };

  const handleSaveEditedCard = () => {
    if (editedCardName.trim() !== '' && editedCardUrl.trim() !== '') {
      dispatch(
        updateCard({
          ...editCard,
          name: editedCardName,
          url: editedCardUrl,
          bucketId: editedCardBucketId,
        })
      );
      setEditCard(null);
    } else {
      message.error('Please enter both card name and URL');
    }
  };

  const handleCancelEditCard = () => {
    setEditCard(null);
  };



  const handleCardClick = (card) => {
    saveCardHistory(card);

    Modal.info({
      title: 'Video Player',
      width: 720,
      content: (
        <iframe
          title="video-player"
          width="100%"
          height="400px"
          src={`${card.url}?autoplay=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      ),
    });
  };


  const handleEditCard = (card) => {
    setEditCard(card);
    setEditedCardName(card.name);
    setEditedCardUrl(card.url);
    setEditedCardBucketId(card.bucketId);
  };


  const handleDeleteMultipleCards = () => {
    if (selectedCards.length > 0) {
      dispatch(deleteMultipleCards(selectedCards));
      message.success('Deleted successfully');
      setSelectedCards([]);
    } else {
      message.error("Please select at least one card to delete");
    }
  };

  const handleCardCheckboxChange = (e, cardId) => {
    if (e.target.checked) {
      setSelectedCards([...selectedCards, cardId]);
    } else {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    }
  };

  const saveCardHistory = async (card) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: card.name,
        url: card.url,
        timePlayed: new Date().toISOString(),
      }),
    };

    try {
      const response = await fetch('http://localhost:5001/history', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to save history');
      }
    } catch (error) {
      message.error(error.message);
    }
  };


  if (!bucket) {
    return <div>Loading...</div>;
  }

  return (
      <div>
        <Typography.Title level={2}>{bucket.name}</Typography.Title>
        <Input
          placeholder="Card name"
          value={newCardName}
          onChange={(e) => setNewCardName(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Input
          placeholder="Card URL"
          value={newCardUrl}
          onChange={(e) => setNewCardUrl(e.target.value)}
          style={{ marginBottom: '8px' }}
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddCard}
          style={{ marginBottom: '8px' }}
        >
          Add Card
        </Button>
        <Button
          type="primary"
          danger
          onClick={handleDeleteMultipleCards}
          style={{ marginBottom: "16px" }}
        >
          Delete Multiple Cards
        </Button>
  
        <List
          style={{ marginTop: '16px' }}
          bordered
          dataSource={cards}
          renderItem={(card) => (
            <List.Item
            itemProps={{ key: card.id }}
            onClick={() => {
              if (selectedCards.includes(card.id)) {
                setSelectedCards(selectedCards.filter((id) => id !== card.id));
              } else {
                setSelectedCards([...selectedCards, card.id]);
              }
            }}
            style={{ backgroundColor: selectedCards.includes(card.id) ? "#f0f0f0" : "transparent" }}
            actions={[
              <Button type="link" onClick={() => handleCardClick(card)}>
                Play
              </Button>
              ,
              <Button type="link" onClick={() => handleEditCard(card)}>
                Edit
              </Button>,
              <Button type="link" onClick={() => handleDeleteCard(card.id)}>
                Delete
              </Button>,
            ]}
          >
            <Checkbox
              checked={selectedCards.includes(card.id)}
              onChange={(e) => handleCardCheckboxChange(e, card.id)}
              style={{ marginRight: '8px' }}
            />
            {card.name}
            </List.Item>
        )}
      />
      {editCard && (
        <Modal
          title="Edit Card"
          visible={!!editCard}
          onOk={handleSaveEditedCard}
          onCancel={handleCancelEditCard}
        >
          <Input
            placeholder="Card name"
            value={editedCardName}
            onChange={(e) => setEditedCardName(e.target.value)}
            style={{ marginBottom: '8px' }}
          />
          <Input
            placeholder="Card URL"
            value={editedCardUrl}
            onChange={(e) => setEditedCardUrl(e.target.value)}
            style={{ marginBottom: '8px' }}
          />
          <Select
            value={editedCardBucketId}
            onChange={(value) => setEditedCardBucketId(value)}
            style={{ marginTop: '8px', width: '100%' }}
          >
            {buckets.map((bucket) => (
              <Select.Option key={bucket.id} value={bucket.id}>
                {bucket.name}
              </Select.Option>
            ))}
          </Select>
        </Modal>
      )}

    </div>
  )
}

