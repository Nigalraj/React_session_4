// src/components/DataFetcher.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.escuelajs.co/api/v1/products')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>;

  return (
    <div>
    <h1>Fetched Data</h1>
    <ul>
      {data.map(item => (
        <li key={item.id}>
          <Link to={`/item/${item.id}`}>
            <h2>{item.title}</h2>
          </Link>
          <p>Category Name: {item.category.name}</p>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default DataFetcher;
