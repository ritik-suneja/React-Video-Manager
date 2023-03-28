import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';

function History() {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const response = await fetch('/api/server.js/history');
    const data = await response.json();
    setHistoryData(data);
  };

  const columns = [
    {
      title: 'Card Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Time Played',
      dataIndex: 'timePlayed',
      key: 'timePlayed',
      render: (timePlayed) => {
        const date = new Date(timePlayed);
        const formattedDate = new Intl.DateTimeFormat('en-IN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Asia/Kolkata',
        }).format(date);
        return <span>{formattedDate}</span>;
      },
    },
  ];

  return (
    <div>
      <Typography.Title level={2}>History</Typography.Title>
      <Table columns={columns} dataSource={historyData} rowKey="id" />
    </div>
  );
}

export default History;

