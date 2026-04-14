import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useDateStore = defineStore("date", () => {
  // State
  // 선택된 날짜 상태
  const selectedDate = ref(new Date());

  // Getters
  const monthLabel = computed(() => {
    const year = selectedDate.value.getFullYear();
    const month = selectedDate.value.getMonth() + 1;
    return `${year}년 ${month}월`;
  });

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    if (!date) return ""; // 데이터가 없을 때를 대비한 안전장치
    const [year, month, day] = date.split("-");
    return `${year}년 ${Number(month)}월 ${Number(day)}일`;
  };

  const smartMonthLabel = computed(() => {
    const now = new Date();
    const isSameYear = selectedDate.value.getFullYear() === now.getFullYear();
    const isSameMonth = selectedDate.value.getMonth() === now.getMonth();

    // 오늘과 연도/월이 모두 같다면 '이번 달', 아니면 'n월' 반환
    if (isSameYear && isSameMonth) {
      return "이번 달";
    } else {
      return `${selectedDate.value.getMonth() + 1}월`;
    }
  });

  const currentMonthKey = computed(() => {
    const year = selectedDate.value.getFullYear();
    const month = String(selectedDate.value.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });

  // Actions
  // 선택된 날짜를 오늘로 설정하는 함수
  const goToToday = () => {
    selectedDate.value = new Date();
  };

  // 달 이동 함수
  const moveMonth = (direction) => {
    const newDate = new Date(selectedDate.value);
    newDate.setMonth(newDate.getMonth() + direction);
    selectedDate.value = newDate;
  };

  return {
    selectedDate,
    monthLabel,
    formatDate,
    smartMonthLabel,
    currentMonthKey,
    moveMonth,
    goToToday,
  };
});
