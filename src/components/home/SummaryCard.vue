<template>
  <section class="summary-wrap">
    <div class="balance-card">
      <p class="balance-label">이번 달 남은 생활비</p>
      <h1 class="balance-amount">{{ formatCurrency(balance) }}</h1>
    </div>

    <div class="summary-row">
      <div class="summary-box income">
        <p class="summary-label">총 수입</p>
        <strong class="summary-amount">{{
          formatCurrency(totalIncome)
        }}</strong>
      </div>

      <div class="summary-box expense">
        <p class="summary-label">총 지출</p>
        <strong class="summary-amount">{{
          formatCurrency(totalExpense)
        }}</strong>
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
  background: #f1eff7;
  border-radius: 20px;
  padding: 2rem 1.5rem;
  text-align: center;
}

.balance-label {
  margin: 0 0 0.8rem;
  font-size: 1.8rem;
  color: #555;
  font-weight: 500;
}

.balance-amount {
  margin: 0;
  font-size: 3.2rem;
  font-weight: 900;
  color: #000666;
}

.summary-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.summary-box {
  background: #f1eff7;
  border-radius: 20px;
  padding: 1.4rem;
}

.summary-label {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  color: #4a4a4a;
  font-weight: 500;
}

.summary-amount {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  text-align: right;
}

.income .summary-amount {
  color: green;
}

.expense .summary-amount {
  color: red;
}

@media (max-width: 768px) {
  .balance-label {
    font-size: 1.4rem;
  }

  .balance-amount {
    font-size: 2.4rem;
  }

  .summary-row {
    grid-template-columns: 1fr;
  }

  .summary-label {
    font-size: 1.2rem;
  }

  .summary-amount {
    font-size: 1.7rem;
  }
}
</style>
