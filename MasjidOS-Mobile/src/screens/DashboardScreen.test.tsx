import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import DashboardScreen from './DashboardScreen';
import { api } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

const mockNavigation = {
  navigate: jest.fn(),
};

describe('DashboardScreen', () => {
  it('should fetch and display dashboard data', async () => {
    const mockDonations = [{ id: '1', amount: 500 }, { id: '2', amount: 1000 }];
    const mockEvents = [{ id: '1', title: 'Friday Prayer', startDate: '2026-01-30T10:00:00Z' }];

    (api.get as jest.Mock).mockImplementation((url: string) => {
      if (url === '/donations') return Promise.resolve({ data: mockDonations });
      if (url === '/events?upcoming=true') return Promise.resolve({ data: mockEvents });
      return Promise.reject(new Error('Unknown URL'));
    });

    const { getByText } = render(<DashboardScreen navigation={mockNavigation} />);

    await waitFor(() => {
      expect(getByText('Total Donations')).toBeTruthy();
      expect(getByText('1,500')).toBeTruthy();
      expect(getByText('Upcoming Events')).toBeTruthy();
      expect(getByText('Friday Prayer')).toBeTruthy();
    });
  });

  it('should navigate to Donations on card press', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [] });
    const { getByText } = render(<DashboardScreen navigation={mockNavigation} />);
    
    await waitFor(() => expect(getByText('Total Donations')).toBeTruthy());
    fireEvent.press(getByText('Total Donations'));
    
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Donations');
  });
});