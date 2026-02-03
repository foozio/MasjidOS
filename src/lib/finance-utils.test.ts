import { 
    calculateTotalIncome, 
    calculateTotalExpense, 
    calculateBalance, 
    groupTransactionsByCategory 
} from './finance-utils'
import { Transaction } from '@/types'

// Mock data
const mockTransactions: Transaction[] = [
    {
        id: '1',
        tenantId: 'tenant-1',
        type: 'income',
        amount: 1000000,
        categoryId: 'cat-income-1',
        description: 'Infaq',
        createdBy: 'user-1',
        createdAt: new Date()
    },
    {
        id: '2',
        tenantId: 'tenant-1',
        type: 'income',
        amount: 500000,
        categoryId: 'cat-income-2',
        description: 'Donasi',
        createdBy: 'user-1',
        createdAt: new Date()
    },
    {
        id: '3',
        tenantId: 'tenant-1',
        type: 'expense',
        amount: 200000,
        categoryId: 'cat-expense-1',
        description: 'Listrik',
        createdBy: 'user-1',
        createdAt: new Date()
    },
    {
        id: '4',
        tenantId: 'tenant-1',
        type: 'expense',
        amount: 300000,
        categoryId: 'cat-expense-1', // Same category as above
        description: 'Air',
        createdBy: 'user-1',
        createdAt: new Date()
    }
]

describe('Finance Utils', () => {
    test('calculateTotalIncome correctly sums income transactions', () => {
        const total = calculateTotalIncome(mockTransactions)
        expect(total).toBe(1500000)
    })

    test('calculateTotalExpense correctly sums expense transactions', () => {
        const total = calculateTotalExpense(mockTransactions)
        expect(total).toBe(500000)
    })

    test('calculateBalance correctly subtracts expense from income', () => {
        const balance = calculateBalance(mockTransactions)
        expect(balance).toBe(1000000) // 1.5M - 0.5M
    })

    test('calculateBalance returns negative if expenses exceed income', () => {
        const debtTransactions: Transaction[] = [
            { ...mockTransactions[2], amount: 2000000 } // Expense 2M
        ]
        const balance = calculateBalance(debtTransactions)
        expect(balance).toBe(-2000000)
    })

    test('groupTransactionsByCategory correctly groups by categoryId', () => {
        const groups = groupTransactionsByCategory(mockTransactions)
        
        expect(groups['cat-income-1']).toHaveLength(1)
        expect(groups['cat-expense-1']).toHaveLength(2)
        expect(groups['cat-expense-1'][0].amount).toBe(200000)
        expect(groups['cat-expense-1'][1].amount).toBe(300000)
    })

    test('Handles empty transaction list', () => {
        expect(calculateTotalIncome([])).toBe(0)
        expect(calculateTotalExpense([])).toBe(0)
        expect(calculateBalance([])).toBe(0)
        expect(groupTransactionsByCategory([])).toEqual({})
    })
})
