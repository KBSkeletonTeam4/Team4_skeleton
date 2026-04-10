<template>
  <div class="history-page p-3 p-md-5">
    <div class="mb-5">
      <h1 class="fw-black" style="font-weight: 900; color: #000666">
        거래 내역
      </h1>
      <p class="text-muted fs-5">
        지난 한 달간의 수입과 지출을 한눈에 확인하세요.
      </p>
    </div>

    <FilterBar :currentFilter="filterType" @change-filter="setFilter" />

    <TransactionList :transactions="filteredTransactions" />

    <!-- <div class="load-more-container">
      <button class="btn-load-more">이전 내역 더보기 ▼</button>
    </div> -->

    <!-- <div class="d-flex justify-content-center mt-5">
      <button
        class="btn btn-light btn-lg rounded-pill shadow-sm px-5 py-3 fw-bold text-primary"
      >
        이전 내역 더보기 ▼
      </button>
    </div> -->

    <FloatingAddBtn @add-click="$router.push({ name: 'transaction/add' })" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useTransactionStore } from '@/stores/useTransactionStore';

import FilterBar from '@/components/history/FilterBar.vue';
import TransactionList from '@/components/history/TransactionList.vue';
import FloatingAddBtn from '@/components/common/FloatingAddBtn.vue';

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

// 필터 상태 관리 ('all', 'income', 'expense')
const filterType = ref('all');

onMounted(() => {
  // 스토어에 데이터가 없다면 불러오기
  if (transactions.value.length === 0) {
    transactionStore.fetchTransactions();
  }
});

// 필터 변경 함수 (자식 컴포넌트에서 emit으로 호출됨)
const setFilter = (type) => {
  filterType.value = type;
};

// 필터링된 데이터 계산 (Computed)
const filteredTransactions = computed(() => {
  if (filterType.value === 'all') return transactions.value;
  return transactions.value.filter((t) => t.type === filterType.value);
});
</script>
<style scoped>
* {
  font-family: 'Lexend', sans-serif;
}
h1 {
  color: #000666;
}
/* 더보기 버튼 */
.load-more-container {
  display: flex;
  justify-content: center;
  margin-top: 64px;
}
/* .btn-load-more {
  background-color: #ffffff;
  color: #000666;
  font-size: 1.5rem;
  font-weight: 900;
  padding: 20px 48px;
  border-radius: 40px;
  border: none;
  box-shadow: 0 8px 24px rgba(26, 27, 35, 0.08);
  cursor: pointer;
  transition: background-color 0.2s ease;
} */
/* .btn-load-more:hover {
  background-color: #f3f2fe;
} */
/* 하단 플로팅 액션 버튼 (FAB) */
.btn-fab {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: linear-gradient(135deg, #000666, #1a237e);
  color: #ffffff;
  border: none;
  border-radius: 60px;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 12px 32px rgba(0, 6, 102, 0.3);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  z-index: 50; /* 항상 다른 요소들보다 위에 떠 있도록 설정 */
}
.btn-fab:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 40px rgba(0, 6, 102, 0.4);
}
.fab-icon {
  font-size: 2.5em;
}
.fab-text {
  font-size: 1.75em;
  font-weight: 900;
}
</style>
