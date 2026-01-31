import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { api } from '../lib/api';
import { ArrowLeft, Save } from 'lucide-react-native';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

const AddTransactionScreen = ({ navigation }: any) => {
  const [type, setType] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCategories, setFetchingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
        const firstOfType = response.data.find((c: Category) => c.type === type);
        if (firstOfType) setCategoryId(firstOfType.id);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setFetchingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!amount || !description || !categoryId) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/transactions', {
        type,
        amount: parseFloat(amount),
        categoryId,
        description,
      });
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  const filteredCategories = categories.filter(c => c.type === type);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <ArrowLeft color="#111827" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Transaction</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.typeToggle}>
          <TouchableOpacity 
            style={[styles.typeBtn, type === 'income' && styles.activeIncome]} 
            onPress={() => {
              setType('income');
              const first = categories.find(c => c.type === 'income');
              if (first) setCategoryId(first.id);
            }}
          >
            <Text style={[styles.typeText, type === 'income' && styles.activeTypeText]}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.typeBtn, type === 'expense' && styles.activeExpense]} 
            onPress={() => {
              setType('expense');
              const first = categories.find(c => c.type === 'expense');
              if (first) setCategoryId(first.id);
            }}
          >
            <Text style={[styles.typeText, type === 'expense' && styles.activeTypeText]}>Expense</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Monthly maintenance"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Category</Text>
        {fetchingCategories ? (
          <ActivityIndicator color="#059669" />
        ) : (
          <View style={styles.categoryGrid}>
            {filteredCategories.map(cat => (
              <TouchableOpacity 
                key={cat.id} 
                style={[styles.categoryBtn, categoryId === cat.id && styles.activeCategory]}
                onPress={() => setCategoryId(cat.id)}
              >
                <Text style={[styles.categoryText, categoryId === cat.id && styles.activeCategoryText]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity 
          style={styles.saveBtn} 
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Save color="#fff" size={20} />
              <Text style={styles.saveBtnText}>Save Transaction</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backBtn: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  typeToggle: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  typeBtn: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    marginRight: 10,
  },
  activeIncome: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  activeExpense: {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  },
  typeText: {
    color: '#4b5563',
    fontWeight: '500',
  },
  activeTypeText: {
    color: '#fff',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  categoryBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
    marginBottom: 8,
  },
  activeCategory: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  categoryText: {
    fontSize: 13,
    color: '#4b5563',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: '500',
  },
  saveBtn: {
    height: 50,
    backgroundColor: '#059669',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default AddTransactionScreen;
