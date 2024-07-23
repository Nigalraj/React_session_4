import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteProducts, updateProducts } from '../services/productService';

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    description: '',
  });

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`https://api.escuelajs.co/api/v1/products/${id}`); 
        setItem(response.data);
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
        });
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const response = await updateProducts(id,formData)
      setItem(response.data);
      setEditMode(false); 
      alert('Item updated successfully!');
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update item. Please try again.');
    }
  };


  const handleDelete = async () => {
    try {
      await deleteProducts(id);
      alert('Item deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching item: {error.message}</p>;

  return (
    item && (
      <div>
        {editMode ? (
          <div>
            <h1>Edit Item</h1>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Price:
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleInputChange} />
            </label>
            <br />
            <button onClick={handleUpdate}>Update Item</button>
            <button onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        ) : (
          <div>
            <h1>{item.title}</h1>
            <p>Price: ${item.price}</p>
            <p>Description: {item.description}</p>
            <p>Images:</p>
            <ul>
              {item.images.map((image, index) => (
                <li key={index}>
                  <img src={image} alt={`Item image ${index + 1}`} width="200" />
                </li>
              ))}
            </ul>
            <p>Creation At: {new Date(item.creationAt).toLocaleString()}</p>
            <p>Updated At: {new Date(item.updatedAt).toLocaleString()}</p>
            <h3>Category</h3>
            <p>ID: {item.category.id}</p>
            <p>Name: {item.category.name}</p>
            <img src={item.category.image} alt={item.category.name} width="100" />
            <p>Category Creation At: {new Date(item.category.creationAt).toLocaleString()}</p>
            <p>Category Updated At: {new Date(item.category.updatedAt).toLocaleString()}</p>
            <button onClick={() => setEditMode(true)}>Edit Item</button>
            <button onClick={handleDelete}>Delete Item</button>
          </div>
        )}
      </div>
    )
  );
};

export default ItemDetail;
