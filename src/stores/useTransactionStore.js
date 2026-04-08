import { ref } from 'vue';
import { defineStore } from 'pinia';
import * as api from '@/api/axios';

export const useTransactionStore = defineStore('transaction', () => {
  const transactions = ref([]);
  const isLoading = ref(false);

  const fetchTransactions = async () => {
    isLoading.value = true;
    try {
      const data = await api.get('/budget');
      console.log('불러온 데이터:', data);
      transactions.value = Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('거래 내역 조회 실패:', error);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    transactions,
    isLoading,
    fetchTransactions,
  };
});
