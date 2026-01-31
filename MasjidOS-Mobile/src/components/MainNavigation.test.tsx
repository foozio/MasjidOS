import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

// Mock expo-secure-store before any imports that use it (like api.ts)
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

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

jest.mock('@react-navigation/native-stack', () => {
  return {
    createNativeStackNavigator: jest.fn(() => ({
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
  Plus: () => 'PlusIcon',
}));

describe('MainNavigation', () => {
  it('should render all tabs', () => {
    const { getByText } = render(
      <NavigationContainer>
        <MainNavigation />
      </NavigationContainer>
    );

    expect(getByText('Dashboard Screen')).toBeTruthy();
    expect(getByText('FinanceTab Screen')).toBeTruthy();
    expect(getByText('Activities Screen')).toBeTruthy();
  });
});