import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DashboardScreen from './DashboardScreen';
import { api } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('DashboardScreen', () => {
  it('should fetch and display dashboard data', async () => {
    const mockDonations = [{ id: '1', amount: 500 }, { id: '2', amount: 1000 }];
    const mockEvents = [{ id: '1', title: 'Friday Prayer' }];

    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === '/donations') return Promise.resolve({ data: mockDonations });
      if (url === '/events?upcoming=true') return Promise.resolve({ data: mockEvents });
      return Promise.reject(new Error('Unknown URL'));
    });

    const { getByText } = render(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Total Donations')).toBeTruthy();
      expect(getByText('1,500')).toBeTruthy(); // Sum of donations
      expect(getByText('Upcoming Events')).toBeTruthy();
      expect(getByText('Friday Prayer')).toBeTruthy();
    });
  });

  it('should show error message if fetching fails', async () => {
    (api.get as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

    const { getByText } = render(<DashboardScreen />);

    await waitFor(() => {
      expect(getByText('Failed to load dashboard data')).toBeTruthy();
    });
  });
});
