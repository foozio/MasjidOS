import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { api } from '../lib/api';
import { Heart } from 'lucide-react-native';

interface Donation {
  id: string;
  donorName: string | null;
  amount: number;
  isAnonymous: boolean;
  createdAt: string;
}

const DonationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);

  const fetchDonations = async () => {
    try {
      setError(null);
      const response = await api.get('/donations');
      setDonations(response.data);
    } catch (err) {
      setError('Failed to load donations');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDonations();
  };

  const renderItem = ({ item }: { item: Donation }) => (
    <View style={styles.donationItem}>
      <View style={styles.iconContainer}>
        <Heart color="#059669" size={24} fill="#059669" fillOpacity={0.1} />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.donorName}>
          {item.isAnonymous ? 'Anonymous Donor' : (item.donorName || 'Unknown Donor')}
        </Text>
        <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.amount}>{item.amount.toLocaleString()}</Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <FlatList
        data={donations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#059669" />}
        ListEmptyComponent={<Text style={styles.emptyText}>No donations found</Text>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 15,
  },
  donationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  iconContainer: {
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  donorName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 40,
  },
  errorContainer: {
    margin: 15,
    padding: 10,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
  },
});

export default DonationScreen;
