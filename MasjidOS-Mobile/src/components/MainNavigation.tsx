import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LayoutDashboard, Wallet, Calendar, Plus } from 'lucide-react-native';
import { TouchableOpacity } from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import FinanceScreen from '../screens/FinanceScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import DonationScreen from '../screens/DonationScreen';
import ActivitiesScreen from '../screens/ActivitiesScreen';

const Tab = createBottomTabNavigator();
const FinanceStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();

const DashboardStackScreen = () => (
  <DashboardStack.Navigator>
    <DashboardStack.Screen 
      name="DashboardHome" 
      component={DashboardScreen} 
      options={{ title: 'MasjidOS', headerTintColor: '#059669' }}
    />
    <DashboardStack.Screen 
      name="Donations" 
      component={DonationScreen} 
      options={{ title: 'Donations' }}
    />
  </DashboardStack.Navigator>
);

const FinanceStackScreen = () => (
  <FinanceStack.Navigator>
    <FinanceStack.Screen 
      name="FinanceList" 
      component={FinanceScreen} 
      options={({ navigation }) => ({
        title: 'Finance',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate('AddTransaction')}>
            <Plus color="#059669" size={24} />
          </TouchableOpacity>
        ),
      })}
    />
    <FinanceStack.Screen 
      name="AddTransaction" 
      component={AddTransactionScreen} 
      options={{ title: 'Add Transaction', headerShown: false }}
    />
  </FinanceStack.Navigator>
);

const MainNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6b7280',
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#059669',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="DashboardTab" 
        component={DashboardStackScreen} 
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="FinanceTab" 
        component={FinanceStackScreen} 
        options={{
          title: 'Finance',
          headerShown: false,
          tabBarIcon: ({ color, size }) => <Wallet color={color} size={size} />,
        }}
      />
      <Tab.Screen 
        name="Activities" 
        component={ActivitiesScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigation;
