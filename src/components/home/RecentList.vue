<template>
  <div class="component-wrapper p-3">
    <h2>최근 거래 내역</h2>
    <ul>
      <li v-for="item in recentTransactions" :key="item.id">
        <div>{{ item }}</div>
        <div>category: {{ item.category }}</div>
        <div>memo: {{ item.memo }}</div>
        <div>date: {{ item.date }} {{ item.time }}</div>
        <div>type: {{ item.type }}</div>
        <div>amount: {{ item.amount }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup>
/**
 * 1. 외부 모듈 및 컴포넌트 Import
 */
import { ref, computed, onMounted } from 'vue';
import database from '@/../db.json';
// import { useRouter, useRoute } from 'vue-router';
// import { useTransactionStore } from '@/stores/useTransactionStore';

/**
 * 2. Props 및 Emits 정의 (부모-자식 간 데이터 전달이 필요할 때 사용)
 */
// const props = defineProps({
//   item: { type: Object, required: true }
// });
// const emit = defineEmits(['update', 'delete']);

/**
 * 3. 스토어(Pinia) 및 라우터(Vue Router) 초기화
 */
// const router = useRouter();
// const transactionStore = useTransactionStore();

/**
 * 4. 반응형 상태(State) 정의
 */
const isLoading = ref(false);

// 선택 월 변수. 다른 컴포넌트에서 선택한 값 추가 예정
const selectedMonth = ref('2026-04');

// db.json에서 필요 데이터 추출
const budget = database.budget;
const expenseCategory = database.expenseCategory;
const incomeCategory = database.incomeCategory;
// const localData = ref('');

/**
 * 5. 계산된 속성(Computed) 정의
 */
// const formattedData = computed(() => { return ... });

// 선택월 최근 5개 거래내역 필터링
const recentTransactions = computed(() => {
  const monthFilteredTransactions = budget.filter((item) =>
    item.date.startsWith(selectedMonth.value),
  );
  monthFilteredTransactions.sort(
    (a, b) => new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`),
  );

  return monthFilteredTransactions.slice(0, 5);
});

/**
 * 6. 주요 함수(Methods) 및 이벤트 핸들러
 */
const handleAction = () => {
  // 클릭 등의 이벤트 발생 시 실행될 로직
  console.log('Action triggered!');
};

/**
 * 7. 생명주기 훅(Lifecycle Hooks)
 */
onMounted(() => {
  // 컴포넌트가 화면에 마운트된 직후 실행 (예: API 데이터 Fetching)
  // console.log('Component is mounted!');
});
</script>

<style scoped>
/**
 * scoped 속성: 이 곳에 작성된 CSS는 해당 컴포넌트에만 적용되어 스타일 충돌을 방지합니다.
 * 시니어 타깃에 맞춘 글씨 크기나 명확한 색상 대비 등을 이곳에 추가하세요.
 */
.component-wrapper {
  /* 예: 배경색, 둥근 모서리 등 개별 컴포넌트 스타일 */
  background-color: #ffffff;
  border-radius: 8px;
}
</style>
