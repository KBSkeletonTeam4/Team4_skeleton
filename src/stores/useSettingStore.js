// stores/useSettingsStore.js
import { ref } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api';

export const useSettingsStore = defineStore('settings', () => {
  // State
  const profile = ref({ name: '김형석', email: '' });
  const fontSize = ref('large'); // 'normal', 'large', 'xlarge'

  // Actions
  const updateFontSize = (size) => {
    fontSize.value = size;
    // 실제 DOM(body 등)에 클래스를 주입하여 전역 폰트 크기를 변경하는 로직 추가 가능
  };

  return { profile, fontSize, updateFontSize };
});