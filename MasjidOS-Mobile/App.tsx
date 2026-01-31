import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import { useCallback, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/components/Login';
import MainNavigation from './src/components/MainNavigation';
import { getStoredToken } from './src/lib/api';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = await getStoredToken();
    setIsAuthenticated(!!token);
    setIsLoading(false);
  };

  if (isAuthenticated === null || (isLoading && isAuthenticated === false)) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <SafeAreaView style={styles.container}>
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      </SafeAreaView>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <MainNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
});
