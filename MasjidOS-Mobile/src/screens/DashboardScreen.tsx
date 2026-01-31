import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { api } from '../lib/api';
import { LayoutDashboard, Wallet, Calendar } from 'lucide-react-native';

interface Donation {
  id: string;
  amount: number;
}

interface MosqueEvent {
  id: string;
  title: string;
  startDate: string;
}

const DashboardScreen = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [events, setEvents] = useState<MosqueEvent[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      setError(null);
      const [donationsRes, eventsRes] = await Promise.all([
        api.get('/donations'),
        api.get('/events?upcoming=true')
      ]);
      setDonations(donationsRes.data);
      setEvents(eventsRes.data);
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#059669" />}
    >
      <View style={styles.statsGrid}>
        <TouchableOpacity style={styles.statCard} onPress={() => navigation.navigate('Donations')}>
          <Wallet color="#059669" size={24} />
          <Text style={styles.statLabel}>Total Donations</Text>
          <Text style={styles.statValue}>{totalDonations.toLocaleString()}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar color="#059669" size={20} />
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
        </View>
        
        {events.length === 0 ? (
          <Text style={styles.emptyText}>No upcoming events</Text>
        ) : (
          events.map(event => (
            <View key={event.id} style={styles.eventItem}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventDate}>
                {new Date(event.startDate).toLocaleDateString()}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  statsGrid: {
    padding: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginTop: 4,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  eventDate: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 20,
  },
  errorContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fee2e2',
    borderRadius: 8,
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
  },
});

export default DashboardScreen;