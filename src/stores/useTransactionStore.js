import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api';

export const useTransactionStore = defineStore('transaction', () => {
  // State
  const transactions = ref([]);
  const isLoading = ref(false);

  // Getters
  const totalIncome = computed(() => {
    return transactions.value
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const totalExpense = computed(() => {
    return transactions.value
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  });
  
  const balance = computed(() => totalIncome.value - totalExpense.value);

  // Actions
// Actions: 1. 데이터 불러오기 (GET)
  const fetchTransactions = async () => {
    isLoading.value = true;
    try {
      // json-server의 _sort 파라미터를 활용해 날짜, 시간 내림차순(최신순) 정렬 [cite: 169-173]
      const response = await api.get('/budget?_sort=-date,-time');
      transactions.value = response.data;
    } catch (error) {
      console.error('거래 내역을 불러오지 못했습니다.', error);
    } finally {
      isLoading.value = false;
    }
  };

  // Actions: 2. 새로운 거래 추가 (POST)
  const addTransaction = async (newTransaction) => {
    try {
      const response = await api.post('/budget', newTransaction);
      // 서버 저장 성공 후, 로컬 상태 배열에도 즉시 추가하여 화면 갱신
      transactions.value.unshift(response.data); 
    } catch (error) {
      console.error('거래 내역 저장에 실패했습니다.', error);
      throw error; // 컴포넌트 단에서 에러 처리를 할 수 있도록 던짐
    }
  };

  return { transactions, totalIncome, totalExpense, balance, fetchTransactions, addTransaction };
});