import axios from 'axios';

// Mock before imports that might trigger side effects
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    defaults: {
      headers: {
        common: {},
      },
    },
  })),
}));

import * as SecureStore from 'expo-secure-store';
import { api, setAuthToken, clearAuthToken, getStoredToken } from './api';

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    api.defaults.headers.common = {};
  });

  it('should set auth token in SecureStore and axios headers', async () => {
    const token = 'test-token';
    await setAuthToken(token);

    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('auth_token', token);
    expect(api.defaults.headers.common['Authorization']).toBe(`Bearer ${token}`);
  });

  it('should handle error when setting auth token', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (SecureStore.setItemAsync as jest.Mock).mockRejectedValue(new Error('Store error'));
    
    await setAuthToken('token');
    expect(consoleSpy).toHaveBeenCalledWith('Error saving auth token:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should clear auth token from SecureStore and axios headers', async () => {
    api.defaults.headers.common['Authorization'] = 'Bearer some-token';
    await clearAuthToken();

    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('auth_token');
    expect(api.defaults.headers.common['Authorization']).toBeUndefined();
  });

  it('should handle error when clearing auth token', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (SecureStore.deleteItemAsync as jest.Mock).mockRejectedValue(new Error('Delete error'));
    
    await clearAuthToken();
    expect(consoleSpy).toHaveBeenCalledWith('Error clearing auth token:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should get stored token', async () => {
    (SecureStore.getItemAsync as jest.Mock).mockResolvedValue('stored-token');
    const token = await getStoredToken();
    expect(token).toBe('stored-token');
  });

  it('should handle error when getting stored token', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (SecureStore.getItemAsync as jest.Mock).mockRejectedValue(new Error('Get error'));
    
    const token = await getStoredToken();
    expect(token).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith('Error getting stored token:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});