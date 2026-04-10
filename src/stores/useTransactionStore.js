import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const incomeCategories = ref([]);
  const expenseCategories = ref([]);
  const isLoading = ref(false);

  const totalIncome = computed(() => {
    return transactions.value
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  });

  const totalExpense = computed(() => {
    return transactions.value
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount || 0), 0);
  });

  const balance = computed(() => totalIncome.value - totalExpense.value);

  const fetchTransactions = async () => {
    try {
      isLoading.value = true;
      const data = await api.get('/budget', {
        _sort: '-date,-time',
      });
      transactions.value = Array.isArray(data) ? data : [];
    } catch (e) {
      console.error('fetchTransactions error:', e);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchCategories = async () => {
    try {
      const [incomeData, expenseData] = await Promise.all([
        api.get('/incomeCategory'),
        api.get('/expenseCategory'),
      ]);
      incomeCategories.value = incomeData;
      expenseCategories.value = expenseData;
    } catch (e) {
      console.error('fetchCategories error:', e);
    }
  };

  const addTransaction = async (newTransaction) => {
    const created = await api.post('/budget', newTransaction);

    if (created && created.id) {
      transactions.value.unshift(created);
    } else {
      await fetchTransactions();
    }
  };

  const updateTransaction = async (updatedTransaction) => {
    if (!updatedTransaction?.id) {
      throw new Error('수정할 거래 id가 없습니다.');
    }

    const updated = await api.put(
      `/budget/${updatedTransaction.id}`,
      updatedTransaction,
    );

    const index = transactions.value.findIndex(
      (t) => t.id === updatedTransaction.id,
    );

    if (index !== -1) {
      transactions.value[index] = updated?.id
        ? updated
        : { ...updatedTransaction };
      transactions.value = [...transactions.value];
    } else {
      await fetchTransactions();
    }
  };

  const deleteTransaction = async (id) => {
    await api.remove(`/budget/${id}`);
    transactions.value = transactions.value.filter((t) => t.id !== id);
  };

  return {
    transactions,
    incomeCategories,
    expenseCategories,
    isLoading,
    totalIncome,
    totalExpense,
    balance,
    fetchTransactions,
    fetchCategories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
});
