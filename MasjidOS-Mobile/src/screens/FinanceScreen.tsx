import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FinanceScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Finance Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 20 },
});

export default FinanceScreen;
