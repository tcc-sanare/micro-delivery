import api from './api';

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  localStorage.setItem('token', response.data.token);
  return response.data;
};

export const registerUser = async (userData, userType) => {
  const endpoint = {
    cliente: '/register/cliente',
    restaurante: '/register/restaurante',
    entregador: '/register/entregador'
  }[userType];

  const response = await api.post(endpoint, userData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};