import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { api } from '../lib/api';
import { Calendar, MapPin } from 'lucide-react-native';

interface MosqueEvent {
  id: string;
  title: string;
  startDate: string;
  location: string | null;
}

const ActivitiesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<MosqueEvent[]>([]);

  const fetchEvents = async () => {
    try {
      setError(null);
      const response = await api.get('/events?upcoming=true');
      setEvents(response.data);
    } catch (err) {
      setError('Failed to load activities');
      console.error(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents();
  };

  const renderItem = ({ item }: { item: MosqueEvent }) => (
    <View style={styles.eventItem}>
      <View style={styles.dateBadge}>
        <Text style={styles.dateDay}>{new Date(item.startDate).getDate()}</Text>
        <Text style={styles.dateMonth}>
          {new Date(item.startDate).toLocaleString('default', { month: 'short' })}
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.infoRow}>
          <MapPin color="#6b7280" size={14} />
          <Text style={styles.infoText}>{item.location || 'No location set'}</Text>
        </View>
      </View>
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
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#059669" />}
        ListEmptyComponent={<Text style={styles.emptyText}>No upcoming activities found</Text>}
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
  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dateBadge: {
    backgroundColor: '#ecfdf5',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginRight: 15,
  },
  dateDay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  dateMonth: {
    fontSize: 12,
    color: '#059669',
    textTransform: 'uppercase',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginLeft: 4,
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

export default ActivitiesScreen;