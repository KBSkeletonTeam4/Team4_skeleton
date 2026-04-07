import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api';

export const useDateStore = defineStore('date', () => {
  // State
  const currentDate = ref(new Date());

  // Getters
  const currentYearMonth = computed(() => {
    const year = currentDate.value.getFullYear();
    const month = String(currentDate.value.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`; // 예: '2026-04'
  });

  // Actions
  const setMonth = (offset) => {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() + offset);
    currentDate.value = newDate;
  };

  return { currentDate, currentYearMonth, setMonth };
});