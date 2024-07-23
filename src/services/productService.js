import axiosInstance from '../config/axiosConfig';

export const getProducts = () => {
  return axiosInstance.get('/products');
};

export const updateProducts = (Id, productData) => {
    return axiosInstance.put(`/products/${Id}`, productData);
  };

export const deleteProducts = (Id) => {
  return axiosInstance.delete(`/products/${Id}`);
};
