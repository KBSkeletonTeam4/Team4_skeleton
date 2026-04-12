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

  const currentMonthKey = computed(() => {
    const year = selectedDate.value.getFullYear();
    const month = String(selectedDate.value.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  });

  // Actions
  // 달 이동 함수
  const moveMonth = (direction) => {
    const newDate = new Date(selectedDate.value);
    newDate.setMonth(newDate.getMonth() + direction);
    selectedDate.value = newDate;
  };

  return { selectedDate, monthLabel, currentMonthKey, moveMonth };
});
