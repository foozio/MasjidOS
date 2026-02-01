import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ActivitiesScreen from './ActivitiesScreen';
import { api } from '../lib/api';

jest.mock('../lib/api', () => ({
  api: {
    get: jest.fn(),
  },
}));

describe('ActivitiesScreen', () => {
  it('should fetch and display events', async () => {
    const mockEvents = [
      { id: '1', title: 'Community Iftar', startDate: '2026-03-01T18:00:00Z', location: 'Main Hall' },
      { id: '2', title: 'Youth Seminar', startDate: '2026-03-05T14:00:00Z', location: 'Basement' },
    ];

    (api.get as jest.Mock).mockResolvedValue({ data: mockEvents });

    const { getByText } = render(<ActivitiesScreen />);

    await waitFor(() => {
      expect(getByText('Community Iftar')).toBeTruthy();
      expect(getByText('Youth Seminar')).toBeTruthy();
      expect(getByText('Main Hall')).toBeTruthy();
      expect(getByText('Basement')).toBeTruthy();
    });
  });

  it('should show empty message if no events found', async () => {
    (api.get as jest.Mock).mockResolvedValue({ data: [] });

    const { getByText } = render(<ActivitiesScreen />);

    await waitFor(() => {
      expect(getByText('No upcoming activities found')).toBeTruthy();
    });
  });
});
