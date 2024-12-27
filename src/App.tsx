import React, { useState } from 'react';
import { Wallet } from 'lucide-react';
import { ExpenseForm } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseCharts } from './components/ExpenseCharts';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Expense, ExpenseFormData } from './types/expense';

function App() {
  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = (data: ExpenseFormData) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(), // Ensure your environment supports this
      ...data,
      amount: Number(data.amount),
    };
    setExpenses([...expenses, newExpense]);
  };

  const handleUpdateExpense = (data: ExpenseFormData) => {
    if (!editingExpense) return;
    
    const updatedExpenses = expenses.map((expense) =>
      expense.id === editingExpense.id
        ? { ...expense, ...data, amount: Number(data.amount) }
        : expense
    );
    setExpenses(updatedExpenses);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm">
            <span className="text-sm text-gray-500">Total Expenses</span>
            <p className="text-lg font-semibold text-gray-900">${totalExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <ExpenseForm
              onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
              initialData={editingExpense ? {
                title: editingExpense.title,
                amount: String(editingExpense.amount),
                date: editingExpense.date,
                category: editingExpense.category,
              } : undefined}
              isEditing={!!editingExpense}
            />
          </div>
          
          <div className="lg:col-span-2 space-y-8">
            <ExpenseList
              expenses={expenses}
              onDelete={handleDeleteExpense}
              onEdit={handleEditExpense}
            />
            
            {expenses.length > 0 && <ExpenseCharts expenses={expenses} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;