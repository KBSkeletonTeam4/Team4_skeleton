import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api/axios";

export const useTransactionStore = defineStore("transaction", () => {
  // State
  const transactions = ref([]);
  const incomeCategories = ref([]); // 수입 카테고리
  const expenseCategories = ref([]); // 지출 카테고리
  const isLoading = ref(false);

  // Getters
  const totalIncome = computed(() => {
    return transactions.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const totalExpense = computed(() => {
    return transactions.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  });

  const balance = computed(() => totalIncome.value - totalExpense.value);

  // Actions
  // 전체 거래 내역 불러오기 (GET)
  const fetchTransactions = async () => {
    // 🌟 수정 포인트 2: api.get 자체가 이미 data를 반환하므로 response.data를 안 해도 됩니다!
    // 파라미터는 두 번째 인자로 넘겨줍니다.
    const data = await api.get("/budget", {
      _sort: "-date,-time",
    });
    transactions.value = data;
  };

  // 카테고리 데이터 불러오기 (GET)
  const fetchCategories = async () => {
    const [incomeData, expenseData] = await Promise.all([
      api.get("/incomeCategory"),
      api.get("/expenseCategory"),
    ]);
    incomeCategories.value = incomeData;
    expenseCategories.value = expenseData;
  };

  // 새로운 거래 내역 추가 (POST)
  const addTransaction = async (newTransaction) => {
    await api.post("/budget", newTransaction);
    await fetchTransactions(); // 새로고침
  };

  // 거래 내역 수정 (PUT)
  const updateTransaction = async (id, updatedData) => {
    await api.put(`/budget/${id}`, updatedData);
    await fetchTransactions(); // 새로고침
  };

  // 거래 내역 삭제 (DELETE)
  const deleteTransaction = async (id) => {
    // 윤정님의 remove 함수는 두 번째 인자로 params를 받습니다. (id 자체를 URL에 붙여도 무방합니다)
    await api.remove(`/budget/${id}`);
    transactions.value = transactions.value.filter((t) => t.id !== id);
  };

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    incomeCategories,
    expenseCategories,
    fetchTransactions,
    fetchCategories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  };
});
