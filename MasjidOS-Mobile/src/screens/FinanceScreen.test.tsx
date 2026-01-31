import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import FinanceScreen from './FinanceScreen';
import { api } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('FinanceScreen', () => {
  it('should fetch and display transactions', async () => {
    const mockTransactions = [
      { id: '1', type: 'income', amount: 5000, description: 'Friday Donation', createdAt: '2026-01-30T10:00:00Z' },
      { id: '2', type: 'expense', amount: 200, description: 'Cleaning Supplies', createdAt: '2026-01-31T12:00:00Z' },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockTransactions });

    const { getByText } = render(<FinanceScreen />);

    await waitFor(() => {
      expect(getByText('Friday Donation')).toBeTruthy();
      expect(getByText('Cleaning Supplies')).toBeTruthy();
      expect(getByText(/5,000/)).toBeTruthy();
      expect(getByText(/200/)).toBeTruthy();
    });
  });

  it('should show error message if fetching fails', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    const { getByText } = render(<FinanceScreen />);

    await waitFor(() => {
      expect(getByText('Failed to load transactions')).toBeTruthy();
    });
  });
});