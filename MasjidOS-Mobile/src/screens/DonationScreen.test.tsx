import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DonationScreen from './DonationScreen';
import { api } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('DonationScreen', () => {
  it('should fetch and display donations', async () => {
    const mockDonations = [
      { id: '1', donorName: 'John Doe', amount: 1000, isAnonymous: false, createdAt: '2026-01-30T10:00:00Z' },
      { id: '2', donorName: null, amount: 500, isAnonymous: true, createdAt: '2026-01-31T12:00:00Z' },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockDonations });

    const { getByText } = render(<DonationScreen />);

    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
      expect(getByText('Anonymous Donor')).toBeTruthy();
      expect(getByText(/1,000/)).toBeTruthy();
      expect(getByText(/500/)).toBeTruthy();
    });
  });
});
