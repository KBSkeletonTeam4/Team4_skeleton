<template>
  <div class="recent-wrapper">
    <!-- 헤더 -->
    <div class="recent-header">
      <h3>최근 거래 내역</h3>
      <button class="more-btn" @click="goToHistory">전체보기</button>
    </div>

    <!-- 리스트 -->
    <div class="recent-list">
      <div
        class="recent-item"
        v-for="item in recentTransactions"
        :key="item.id"
      >
        <!-- 왼쪽 -->
        <div class="left">
          <div class="icon-box">
            <i :class="['fas', getIcon(item.type, item.category)]"></i>
          </div>

          <div class="info">
            <div class="title">{{ item.memo }}</div>
            <div class="date">
              {{ formatDateTime(item.date, item.time) }}
            </div>
          </div>
        </div>

        <!-- 오른쪽 -->
        <div
          class="amount"
          :class="{
            income: item.type === 'income',
            expense: item.type === 'expense',
          }"
        >
          {{ item.type === 'expense' ? '-' : '+' }}
          {{ item.amount.toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import database from '@/../db.json';

const router = useRouter();

// 선택월. 홈화면에서 선택한 것이 적용되도록 수정 예정
const selectedMonth = ref('2026-04');

// 데이터 import
const budget = database.budget;
const expenseCategory = database.expenseCategory;
const incomeCategory = database.incomeCategory;

// 선택월 최근 5개 거래내역 필터링
const recentTransactions = computed(() => {
  return budget
    .filter((item) => item.date.startsWith(selectedMonth.value))
    .sort(
      (a, b) =>
        new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`),
    )
    .slice(0, 5);
});

// 아이콘 가져오기
const getIcon = (type, category) => {
  const categories = type === 'expense' ? expenseCategory : incomeCategory;

  const cat = categories.find((c) => c.name === category);

  if (cat && cat.icon) {
    return cat.icon.split(' ')[1]; // fa-cart-shopping
  }

  return 'fa-coins';
};

// 연월일시 출력 방식 수정
const formatDateTime = (date, time) => {
  const d = new Date(`${date} ${time}`);

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');

  const period = hours < 12 ? '오전' : '오후';
  hours = hours % 12 || 12;

  return `${year}년 ${month}월 ${day}일 ${period} ${hours}시 ${minutes}분`;
};

// 전체보기 이동
const goToHistory = () => {
  router.push('/history');
};
</script>

<style scoped>
.recent-wrapper {
  margin-top: 20px;
}

/* 헤더 */
.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.recent-header h3 {
  font-size: 20px;
  font-weight: bold;
  color: #1a237e;
}

.more-btn {
  padding: 6px 12px;
  border-radius: 20px;
  border: none;
  background-color: #e0e7ff;
  color: #1a237e;
  font-weight: bold;
  cursor: pointer;
}

/* 리스트 */
.recent-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;
  border: 1px solid #eee;
}

/* 왼쪽 */
.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-box i {
  font-size: 18px;
  color: #4c56af;
}

.info .title {
  font-weight: bold;
  font-size: 16px;
}

.info .date {
  font-size: 13px;
  color: #666;
}

/* 금액 */
.amount {
  font-weight: bold;
  font-size: 16px;
}

.amount.income {
  color: #1b6d24;
}

.amount.expense {
  color: #ba1a1a;
}
</style>
