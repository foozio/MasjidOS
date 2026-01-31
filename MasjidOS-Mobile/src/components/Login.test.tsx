import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from './Login';
import { api, setAuthToken } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    post: jest.fn(),
  },
  setAuthToken: jest.fn(),
}));

describe('Login Component', () => {
  it('should render inputs and button', () => {
    const { getByPlaceholderText, getByText } = render(<Login onLoginSuccess={() => {}} />);
    
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('should call login API and set token on success', async () => {
    const onLoginSuccess = jest.fn();
    const mockResponse = { data: { token: 'fake-token' } };
    (api.post as jest.Mock).mockResolvedValue(mockResponse);

    const { getByPlaceholderText, getByText } = render(<Login onLoginSuccess={onLoginSuccess} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(setAuthToken).toHaveBeenCalledWith('fake-token');
      expect(onLoginSuccess).toHaveBeenCalled();
    });
  });

  it('should show error message on failure', async () => {
    (api.post as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

    const { getByPlaceholderText, getByText, findByText } = render(<Login onLoginSuccess={() => {}} />);
    
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'wrong');
    fireEvent.press(getByText('Login'));

    expect(await findByText('Invalid credentials')).toBeTruthy();
  });
});
