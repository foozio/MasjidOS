import { Transaction } from '@/types'

/**
 * Calculates the total income from a list of transactions.
 * @param transactions Array of transactions
 * @returns Total income amount
 */
export function calculateTotalIncome(transactions: Transaction[]): number {
    return transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calculates the total expense from a list of transactions.
 * @param transactions Array of transactions
 * @returns Total expense amount
 */
export function calculateTotalExpense(transactions: Transaction[]): number {
    return transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Calculates the current balance (Income - Expense).
 * @param transactions Array of transactions
 * @returns Net balance
 */
export function calculateBalance(transactions: Transaction[]): number {
    return calculateTotalIncome(transactions) - calculateTotalExpense(transactions)
}

/**
 * Groups transactions by category.
 * @param transactions Array of transactions
 * @returns Record where key is categoryId and value is array of transactions
 */
export function groupTransactionsByCategory(transactions: Transaction[]): Record<string, Transaction[]> {
    return transactions.reduce((groups, tx) => {
        const categoryId = tx.categoryId
        if (!groups[categoryId]) {
            groups[categoryId] = []
        }
        groups[categoryId].push(tx)
        return groups
    }, {} as Record<string, Transaction[]>)
}
