<template>
  <div class="history-page p-3 p-md-5">
    <div class="mb-5">
      <h1 class="history-title fw-black">거래 내역</h1>
      <p class="text-muted fs-5">수입과 지출을 한눈에 확인하세요.</p>
    </div>

    <FilterBar :currentFilter="filterType" @change-filter="setFilter" />

    <TransactionList
      :transactions="filteredTransactions"
      @edit-transaction="openEditModal"
    />

    <FloatingAddBtn @add-click="openCreateModal" />

    <Transaction
      v-if="isTransactionModalOpen"
      :mode="modalMode"
      :initialData="selectedTransaction"
      @close="closeTransactionModal"
      @save="handleSaveTransaction"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useTransactionStore } from "@/stores/useTransactionStore";
import FloatingAddBtn from "@/components/common/FloatingAddBtn.vue";
import FilterBar from "@/components/history/FilterBar.vue";
import TransactionList from "@/components/history/TransactionList.vue";
import Transaction from "@/pages/Transaction.vue";

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

// 필터 상태 관리 ('all', 'income', 'expense')
const filterType = ref("all");
const isTransactionModalOpen = ref(false);
const modalMode = ref("create");
const selectedTransaction = ref(null);

onMounted(async () => {
  if (transactions.value.length === 0) {
    await transactionStore.fetchTransactions();
  }
});

const setFilter = (type) => {
  filterType.value = type;
};

const openCreateModal = () => {
  modalMode.value = "create";
  selectedTransaction.value = null;
  isTransactionModalOpen.value = true;
};

const openEditModal = (transaction) => {
  modalMode.value = "edit";
  selectedTransaction.value = { ...transaction };
  isTransactionModalOpen.value = true;
};

const closeTransactionModal = () => {
  isTransactionModalOpen.value = false;
  selectedTransaction.value = null;
};

const handleSaveTransaction = async (payload) => {
  try {
    console.log("modalMode:", modalMode.value);
    console.log("save payload:", payload);

    if (modalMode.value === "edit") {
      await transactionStore.updateTransaction(payload);
      alert("거래가 수정되었습니다.");
    } else {
      await transactionStore.addTransaction(payload);
      alert("거래가 등록되었습니다.");
    }

    closeTransactionModal();
  } catch (error) {
    console.error("거래 저장 실패:", error);
    alert("처리 중 오류가 발생했습니다.");
  }
};

const filteredTransactions = computed(() => {
  if (filterType.value === "all") return transactions.value;
  return transactions.value.filter((t) => t.type === filterType.value);
});
</script>

<style scoped>
h1 {
  color: #000666;
}
.history-title {
  font-weight: 900;
  color: #000666;
}
</style>
