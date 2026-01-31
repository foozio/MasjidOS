import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// In a real app, this would come from an environment variable
const BASE_URL = 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setAuthToken = async (token: string) => {
  try {
    await SecureStore.setItemAsync('auth_token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } catch (error) {
    console.error('Error saving auth token:', error);
  }
};

export const clearAuthToken = async () => {
  try {
    await SecureStore.deleteItemAsync('auth_token');
    delete api.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Error clearing auth token:', error);
  }
};

export const getStoredToken = async () => {
  try {
    return await SecureStore.getItemAsync('auth_token');
  } catch (error) {
    console.error('Error getting stored token:', error);
    return null;
  }
};

// Initialize token if it exists
getStoredToken().then((token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
});
