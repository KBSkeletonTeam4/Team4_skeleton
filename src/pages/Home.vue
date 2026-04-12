<template>
  <div class="home-page component-wrapper">
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

    <FloatingAddBtn @add-click="$router.push({ name: 'transaction/add' })" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useDateStore } from "@/stores/useDateStore";

import SummaryCard from "@/components/home/SummaryCard.vue";
import RecentList from "@/components/home/RecentList.vue";
import FloatingAddBtn from "@/components/common/FloatingAddBtn.vue";

const router = useRouter();

const transactionStore = useTransactionStore();
const { monthlyIncome, monthlyExpense, monthlyBalance, recentTransactions } =
  storeToRefs(transactionStore);

const dateStore = useDateStore();
const { monthLabel } = storeToRefs(dateStore);
const { moveMonth } = dateStore;
</script>

<style scoped>
.home-page {
  padding: 0 1rem;
  /* min-height: 100vh; */
  flex: 1;
  max-width: 880px;
  margin: 0 auto;
}

.month-selector {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
  padding-top: 0.2rem;
}

.month-title {
  margin: 0;
  padding: 0 0.45rem 0.15rem;
  font-size: 1.85em;
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
  font-size: 1.55em;
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

@media (max-width: 768px) {
  .home-page {
    padding: 0.9rem;
  }

  .month-title {
    font-size: 1.55em;
  }
}
</style>
