<template>
  <div class="recent-wrapper">
    <div class="recent-header">
      <h3>최근 거래 내역</h3>
      <button class="more-btn" @click="goToHistory">전체보기</button>
    </div>

    <div class="recent-list">
      <div class="recent-item" v-for="item in items" :key="item.id">
        <div class="left">
          <div class="icon-box">
            <i :class="['fas', getIcon(item.type, item.category)]"></i>
          </div>

          <div class="info">
            <div class="title">{{ item.memo }}</div>
            <div class="date">
              {{ formatDateTime(item.date) }}
            </div>
          </div>
        </div>

        <div
          class="amount"
          :class="{
            income: item.type === 'income',
            expense: item.type === 'expense',
          }"
        >
          {{ item.type === "expense" ? "-" : "+" }}
          {{ Number(item.amount).toLocaleString() }}원
        </div>
      </div>
    </div>

    <div v-if="items.length === 0" class="empty-box">
      <p>아직 기록이 없습니다.</p>
      <p>아래 "+ 거래 내역 추가" 버튼을 눌러 첫 지출을 등록해 보세요!</p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useTransactionStore } from "@/stores/useTransactionStore";

// 부모 컴포넌트(Home.vue)에서 데이터를 넘겨받음
const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
const transactionStore = useTransactionStore();

// 아이콘 가져오기 (스토어의 카테고리 데이터 활용)
const getIcon = (type, category) => {
  // 스토어에서 불러온 카테고리 배열을 사용합니다.
  const categories =
    type === "expense"
      ? transactionStore.expenseCategories
      : transactionStore.incomeCategories;

  const cat = categories?.find((c) => c.name === category);

  if (cat && cat.icon) {
    return cat.icon.split(" ")[1]; // 예: 'fa-cart-shopping'
  }

  return "fa-coins"; // 기본 아이콘
};

// 날짜 포맷팅 함수
const formatDateTime = (date) => {
  if (!date) return ""; // 데이터가 없을 때를 대비한 안전장치
  const [year, month, day] = date.split("-");
  return `${year}년 ${month}월 ${day}일`;
};

// 전체보기 이동
const goToHistory = () => {
  router.push("/history");
};
</script>

<style scoped>
.recent-wrapper {
  margin-top: 20px;
}
.recent-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.recent-header h3 {
  font-size: 1.5em;
  font-weight: bold;
  color: #1a237e;
  margin-bottom: 0 !important;
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
.more-btn:hover {
  opacity: 0.75;
}
.recent-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
}
.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: none;
  border-radius: 18px;
  background-color: #ffffff;
  border: 1px solid #eee;
  box-shadow: 0 8px 20px rgba(26, 27, 35, 0.04);
}
.recent-item:last-child {
  margin-bottom: 1rem;
}
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
  font-size: 1.5em;
  color: #4c56af;
}
.info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.info .title {
  font-weight: bold;
  font-size: 1.25em;
}
.info .date {
  font-size: 1.15em;
  color: #666;
}
.amount {
  font-weight: bold;
  font-size: 1.05em;
  letter-spacing: -0.02em;
}
.amount.income {
  color: #1b6d24;
  font-size: 1.5em;
}
.amount.expense {
  color: #ba1a1a;
  font-size: 1.5em;
}
.empty-box {
  background: #ffffff;
  border-radius: 18px;
  padding: 1rem;
  color: #666;
  font-size: 1.2em;
  box-shadow: 0 8px 20px rgba(26, 27, 35, 0.04);
}
.empty-box p {
  margin: 0.5rem;
}
</style>
