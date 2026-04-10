<template>
  <div class="home-page component-wrapper p-3">
    <!--   component-wrapper p-3 빼야 할 수도 있음   -->
    <section class="top-bar">
      <div></div>
      <button class="login-btn" @click="goToUserPage">
        {{ settingStore.isLoggedIn ? '설정' : '로그인' }}
      </button>
      <button
        v-if="settingStore.isLoggedIn"
        class="logout-btn"
        @click="handleLogout"
      >
        로그아웃
      </button>
    </section>

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

    <RouterView />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import SummaryCard from '@/components/home/SummaryCard.vue';
import { useTransactionStore } from '@/stores/useTransactionStore';
import RecentList from '@/components/home/RecentList.vue';
import { useSettingStore } from '@/stores/useSettingStore';
import FloatingAddBtn from '@/components/common/FloatingAddBtn.vue';

const router = useRouter();
const transactionStore = useTransactionStore();
const { transactions } = storeToRefs(transactionStore);
const settingStore = useSettingStore();
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

const goToUserPage = () => {
  if (settingStore.isLoggedIn) {
    router.push('/settings');
  } else {
    router.push('/login');
  }
};

onMounted(() => {
  transactionStore.fetchTransactions();
});

const handleLogout = () => {
  settingStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.home-page {
  padding: 1rem;
  background: #fbf8ff;
  min-height: 100vh;
  max-width: 880px;
  margin: 0 auto;
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.8rem;
}

.login-btn,
.logout-btn {
  border: none;
  border-radius: 999px;
  padding: 0.7rem 1.2rem;
  font-size: 0.95em;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.login-btn:hover {
  opacity: 0.92;
}

.login-btn:active,
.logout-btn:active {
  transform: scale(0.98);
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
  font-size: 1.8em;
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
  font-size: 1.05em;
  font-weight: 700;
  color: #1a1b23;
}

:deep(.date) {
  margin: 0;
  font-size: 0.88em;
  color: #6f7080;
}

:deep(.type-badge) {
  display: none;
}

:deep(.amount) {
  font-size: 1.05em;
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
    font-size: 1.55em;
  }

  :deep(.recent-title) {
    font-size: 1.5em;
  }

  :deep(.recent-item) {
    padding: 1rem 0.9rem;
  }

  :deep(.category) {
    font-size: 0.98em;
  }

  :deep(.amount) {
    font-size: 1em;
  }
  .logout-btn {
    width: 100%;
    border: none;
    border-radius: 18px;
    padding: 1rem;
    background: #000666;
    color: #ffffff;
    font-size: 1.05em;
    font-weight: 900;
    cursor: pointer;
  }
  .logout-btn {
    background: #f1f3f9;
    color: #334155;
    border: 1px solid #d9e0ee;
  }

  .logout-btn:hover {
    background: #e2e8f0;
    transform: translateY(-2px);
  }
}
</style>
