<template>
  <div class="recent-wrapper">
    <div class="recent-header">
      <h3>최근 거래 내역</h3>
      <button class="more-btn" @click="goToHistory">전체보기</button>
    </div>

    <div class="recent-list">
      <div
        class="recent-item"
        v-for="item in items"
        :key="item.id"
      >
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

        <div
          class="amount"
          :class="{
            income: item.type === 'income',
            expense: item.type === 'expense',
          }"
        >
          {{ item.type === 'expense' ? '-' : '+' }}
          {{ Number(item.amount).toLocaleString() }}원
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useTransactionStore } from '@/stores/useTransactionStore'; // 🌟 db.json 대신 스토어 임포트!

// 부모 컴포넌트(Home.vue)에서 데이터를 넘겨받습니다.
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
  const categories = type === 'expense' ? transactionStore.expenseCategories : transactionStore.incomeCategories;
  
  const cat = categories.find((c) => c.name === category);

  if (cat && cat.icon) {
    return cat.icon.split(' ')[1]; // 예: 'fa-cart-shopping'
  }

  return 'fa-coins'; // 기본 아이콘
};

// 날짜 포맷팅 함수 (기존 코드 유지)
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
/* (기존의 CSS 스타일 코드는 충돌이 없으므로 그대로 두시면 됩니다!) */
.recent-wrapper { margin-top: 20px; }
.recent-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.recent-header h3 { font-size: 20px; font-weight: bold; color: #1a237e; }
.more-btn { padding: 6px 12px; border-radius: 20px; border: none; background-color: #e0e7ff; color: #1a237e; font-weight: bold; cursor: pointer; }
.recent-list { display: flex; flex-direction: column; gap: 12px; }
.recent-item { display: flex; justify-content: space-between; align-items: center; padding: 16px; border-radius: 12px; background-color: #ffffff; border: 1px solid #eee; }
.left { display: flex; align-items: center; gap: 12px; }
.icon-box { width: 48px; height: 48px; border-radius: 10px; background-color: #f3f4f6; display: flex; align-items: center; justify-content: center; }
.icon-box i { font-size: 18px; color: #4c56af; }
.info .title { font-weight: bold; font-size: 16px; }
.info .date { font-size: 13px; color: #666; }
.amount { font-weight: bold; font-size: 16px; }
.amount.income { color: #1b6d24; }
.amount.expense { color: #ba1a1a; }
</style>