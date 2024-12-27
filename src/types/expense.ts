export type Category = 'Food' | 'Transportation' | 'Entertainment' | 'Shopping' | 'Bills' | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: Category;
}

export interface ExpenseFormData {
  title: string;
  amount: string;
  date: string;
  category: Category;
}