import React, { useState, useEffect } from 'react';
import { List, Input, Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBuckets } from '../Store/actions';
import { message } from 'antd';


function BucketsList() {
  const buckets = useSelector((state) => state.buckets);
  const dispatch = useDispatch();
  const [bucketName, setBucketName] = useState('');

  useEffect(() => {
    dispatch(fetchBuckets());
  }, [dispatch]);

  const handleCreateBucket = async () => {
    if (bucketName.trim() !== '') {
      const newBucket = {
        id: Date.now().toString(),
        name: bucketName,
      };

      await fetch('http://localhost:5001/buckets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBucket),
      });

      setBucketName('');
      message.success('Bucket created successfully');
      dispatch(fetchBuckets()); // Refetch buckets to update the list
    }
  };

  return (
    <div>
      <Typography.Title level={2}>Buckets</Typography.Title>
      <Input
        placeholder="Enter bucket name"
        value={bucketName}
        onChange={(e) => setBucketName(e.target.value)}
        style={{ marginBottom: '8px' }}
      />
      <Button type="primary" onClick={handleCreateBucket} style={{ marginBottom: '16px' }}>
        Create Bucket
      </Button>
      <List
        bordered
        dataSource={buckets}
        renderItem={(bucket) => (
          <List.Item>
            <Link to={`/bucket/${bucket.id}`}>{bucket.name}</Link>
          </List.Item>
        )}
      />
    </div>
  );
}

export default BucketsList;
