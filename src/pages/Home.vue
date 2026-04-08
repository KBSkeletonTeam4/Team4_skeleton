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
  background: #f7f5fb;
  min-height: 100vh;
}

.month-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.month-title {
  margin: 0;
  font-size: 1.8rem;
  font-weight: 800;
  color: #161c7a;
}

.month-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  background: #ece9f7;
  color: #161c7a;
  font-size: 1.4rem;
  font-weight: 800;
  cursor: pointer;
}
</style>
