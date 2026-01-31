import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './MainNavigation';

// Mock navigation
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    NavigationContainer: ({ children }: any) => <>{children}</>,
  };
});

jest.mock('@react-navigation/bottom-tabs', () => {
  return {
    createBottomTabNavigator: jest.fn(() => ({
      Navigator: ({ children }: any) => <>{children}</>,
      Screen: ({ name }: any) => {
        const { Text } = require('react-native');
        return <Text>{name} Screen</Text>;
      },
    })),
  };
});

jest.mock('lucide-react-native', () => ({
  LayoutDashboard: () => 'LayoutDashboardIcon',
  Wallet: () => 'WalletIcon',
  Calendar: () => 'CalendarIcon',
}));

describe('MainNavigation', () => {
  it('should render all tabs', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    );

    expect(getByText('Dashboard Screen')).toBeTruthy();
    expect(getByText('Finance Screen')).toBeTruthy();
    expect(getByText('Activities Screen')).toBeTruthy();
  });
});