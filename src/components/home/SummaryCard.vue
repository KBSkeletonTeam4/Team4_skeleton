<template>
  <section class="summary-wrap">
    <div class="balance-card">
      <p class="balance-label">이번 달 남은 생활비</p>
      <h1 class="balance-amount">{{ formatCurrency(balance) }}</h1>
      <p class="today-text">
        오늘 {{ today.getMonth() + 1 }}월 {{ today.getDate() }}일
      </p>
    </div>

    <div class="summary-row">
      <div class="summary-box income">
        <div class="summary-top">
          <p class="summary-label">총 수입</p>
          <span class="summary-icon">↗</span>
        </div>
        <strong class="summary-amount">
          {{ formatCurrency(totalIncome) }}
        </strong>
      </div>

      <div class="summary-box expense">
        <div class="summary-top">
          <p class="summary-label">총 지출</p>
          <span class="summary-icon">↘</span>
        </div>
        <strong class="summary-amount">
          {{ formatCurrency(totalExpense) }}
        </strong>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  monthLabel: {
    type: String,
    default: '이번 달',
  },
  totalIncome: {
    type: Number,
    default: 0,
  },
  totalExpense: {
    type: Number,
    default: 0,
  },
  balance: {
    type: Number,
    default: 0,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
});
const today = new Date();
const formatCurrency = (value) => {
  return `${new Intl.NumberFormat('ko-KR').format(value)}원`;
};
</script>

<style scoped>
.summary-wrap {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.balance-card {
  background: #f3f2fe;
  border-radius: 24px;
  padding: 2.25rem 1.5rem 1.75rem;
  text-align: center;
  box-shadow: 0 8px 24px rgba(26, 27, 35, 0.05);
  border: 1px solid rgba(198, 197, 212, 0.35);
}

.balance-label {
  margin: 0 0 0.9rem;
  font-size: 1.45rem;
  color: #5c5f73;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.balance-amount {
  margin: 0;
  font-size: 3.4rem;
  line-height: 1.08;
  font-weight: 900;
  color: #000666;
  letter-spacing: -0.05em;
}

.balance-sub {
  margin: 1rem auto 0;
  display: inline-block;
  padding: 0.45rem 0.9rem;
  font-size: 0.95rem;
  color: #5c5f73;
  background: #e2e1ed;
  border-radius: 999px;
  font-weight: 600;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.summary-box {
  background: #f3f2fe;
  border-radius: 20px;
  padding: 1.35rem 1.2rem;
  box-shadow: 0 8px 20px rgba(26, 27, 35, 0.04);
  border: 1px solid rgba(198, 197, 212, 0.28);
}

.summary-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.15rem;
}

.summary-label {
  margin: 0;
  font-size: 1.35rem;
  color: #454652;
  font-weight: 600;
  letter-spacing: -0.02em;
}

.summary-icon {
  font-size: 1.2rem;
  font-weight: 900;
}

.summary-amount {
  display: block;
  font-size: 2.1rem;
  font-weight: 900;
  text-align: right;
  letter-spacing: -0.03em;
  line-height: 1.15;
}

.income .summary-icon,
.income .summary-amount {
  color: green;
}

.expense .summary-icon,
.expense .summary-amount {
  color: red;
}

@media (max-width: 768px) {
  .balance-label {
    font-size: 1.2rem;
  }

  .balance-amount {
    font-size: 2.6rem;
  }

  .balance-sub {
    font-size: 0.85rem;
  }

  .summary-row {
    grid-template-columns: 1fr;
  }

  .summary-label {
    font-size: 1.15rem;
  }

  .summary-amount {
    font-size: 1.8rem;
  }
}
</style>
