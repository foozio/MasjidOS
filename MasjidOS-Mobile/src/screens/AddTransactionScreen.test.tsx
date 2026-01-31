import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddTransactionScreen from './AddTransactionScreen';
import { api } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    get: jest.fn(),
    post: jest.fn(),
  },
}));

const mockNavigation = {
  goBack: jest.fn(),
};

describe('AddTransactionScreen', () => {
  const mockCategories = [
    { id: 'cat1', name: 'Donation', type: 'income' },
    { id: 'cat2', name: 'Utilities', type: 'expense' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (api.get as jest.Mock).mockResolvedValue({ data: mockCategories });
  });

  it('should render form and fetch categories', async () => {
    const { getByPlaceholderText, getByText } = render(<AddTransactionScreen navigation={mockNavigation} />);
    
    await waitFor(() => {
      expect(api.get).toHaveBeenCalledWith('/categories');
    });

    expect(getByPlaceholderText('0.00')).toBeTruthy();
    expect(getByPlaceholderText('e.g. Monthly maintenance')).toBeTruthy();
    expect(getByText('Save Transaction')).toBeTruthy();
  });

  it('should submit form correctly', async () => {
    (api.post as jest.Mock).mockResolvedValue({ data: { success: true } });

    const { getByPlaceholderText, getByText } = render(<AddTransactionScreen navigation={mockNavigation} />);
    
    await waitFor(() => expect(getByText('Donation')).toBeTruthy());

    fireEvent.changeText(getByPlaceholderText('0.00'), '1000');
    fireEvent.changeText(getByPlaceholderText('e.g. Monthly maintenance'), 'Monthly maintenance');
    fireEvent.press(getByText('Save Transaction'));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/transactions', {
        type: 'income',
        amount: 1000,
        categoryId: 'cat1',
        description: 'Monthly maintenance',
      });
      expect(mockNavigation.goBack).toHaveBeenCalled();
    });
  });
});