<template>
  <div class="home-page">
    <section class="month-selector">
      <button class="month-btn" @click="moveMonth(-1)">‹</button>
      <h2 class="month-title">{{ monthLabel }}</h2>
      <button class="month-btn" @click="moveMonth(1)">›</button>
    </section>

    <SummaryCard
      :month-label="monthLabel"
      :total-income="monthlyIncome"
      :total-expense="monthlyExpense"
      :balance="monthlyBalance"
      :is-loading="transactionStore.isLoading"
    />

    <RecentList :items="recentTransactions" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import SummaryCard from '@/components/home/SummaryCard.vue';
import { useTransactionStore } from '@/stores/useTransactionStore';
import RecentList from '@/components/home/RecentList.vue';

const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);

const selectedDate = ref(new Date());

const monthLabel = computed(() => {
  const year = selectedDate.value.getFullYear();
  const month = selectedDate.value.getMonth() + 1;
  return `${year}년 ${month}월`;
});

const currentMonthKey = computed(() => {
  const year = selectedDate.value.getFullYear();
  const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
});

const currentMonthTransactions = computed(() => {
  return transactions.value.filter((item) => {
    return item.date?.startsWith(currentMonthKey.value);
  });
});

const monthlyIncome = computed(() => {
  return currentMonthTransactions.value
    .filter((item) => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
});

const monthlyExpense = computed(() => {
  return currentMonthTransactions.value
    .filter((item) => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount || 0), 0);
});

const monthlyBalance = computed(() => {
  return monthlyIncome.value - monthlyExpense.value;
});

const recentTransactions = computed(() => {
  return [...currentMonthTransactions.value]
    .sort((a, b) => {
      const aDateTime = `${a.date} ${a.time || '00:00'}`;
      const bDateTime = `${b.date} ${b.time || '00:00'}`;
      return new Date(bDateTime) - new Date(aDateTime);
    })
    .slice(0, 5);
});

const moveMonth = (direction) => {
  const newDate = new Date(selectedDate.value);
  newDate.setMonth(newDate.getMonth() + direction);
  selectedDate.value = newDate;
};

onMounted(() => {
  transactionStore.fetchTransactions();
});
</script>

<style scoped>
.home-page {
  padding: 1rem;
  background: #fbf8ff;
  min-height: 100vh;
  max-width: 880px;
  margin: 0 auto;
}

.month-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1rem;
  padding-top: 0.2rem;
}

.month-title {
  margin: 0;
  padding: 0 0.45rem 0.15rem;
  font-size: 1.85rem;
  font-weight: 900;
  color: #000666;
  letter-spacing: -0.03em;
  border-bottom: 4px solid #000666;
  line-height: 1.1;
}

.month-btn {
  width: 38px;
  height: 38px;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: #767683;
  font-size: 1.55rem;
  font-weight: 900;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
}

.month-btn:hover {
  background: #f0eef8;
  color: #000666;
}

/* RecentList 쪽 카드 톤 맞추기 */
:deep(.recent-list-wrap) {
  margin-top: 1rem;
  padding: 0;
  background: transparent;
}

:deep(.recent-header) {
  margin-bottom: 0.8rem;
}

:deep(.recent-title) {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 900;
  color: #000666;
  letter-spacing: -0.03em;
}

:deep(.empty-box) {
  background: #ffffff;
  border-radius: 18px;
  padding: 1rem;
  color: #666;
  box-shadow: 0 8px 20px rgba(26, 27, 35, 0.04);
}

:deep(.recent-list) {
  list-style: none;
  margin: 0;
  padding: 0;
}

:deep(.recent-item) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.15rem 1rem;
  margin-bottom: 0.8rem;
  border: none;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(26, 27, 35, 0.04);
}

:deep(.recent-item:last-child) {
  margin-bottom: 0;
}

:deep(.category) {
  margin: 0 0 0.3rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1b23;
}

:deep(.date) {
  margin: 0;
  font-size: 0.88rem;
  color: #6f7080;
}

:deep(.type-badge) {
  display: none;
}

:deep(.amount) {
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

:deep(.amount.income) {
  color: #1b6d24;
}

:deep(.amount.expense) {
  color: #400003;
}

@media (max-width: 768px) {
  .home-page {
    padding: 0.9rem;
  }

  .month-title {
    font-size: 1.55rem;
  }

  :deep(.recent-title) {
    font-size: 1.5rem;
  }

  :deep(.recent-item) {
    padding: 1rem 0.9rem;
  }

  :deep(.category) {
    font-size: 0.98rem;
  }

  :deep(.amount) {
    font-size: 1rem;
  }
}
</style>
