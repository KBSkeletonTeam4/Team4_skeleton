<template>
  <div :class="['app-root', fontSizeClass]">
    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useSettingStore } from '@/stores/useSettingStore';

const settingStore = useSettingStore();

const fontSizeClass = computed(() => {
  if (settingStore.fontSize === 'large') return 'font-large';
  if (settingStore.fontSize === 'xlarge') return 'font-xlarge';
  return 'font-medium';
});
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  min-height: 100%;
  background: #fbf8ff;
}

body {
  font-family: 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif;
}

.app-root {
  min-height: 100vh;
  transform-origin: top center;
}

.font-medium {
  transform: scale(1);
}

.font-large {
  transform: scale(1.06);
}

.font-xlarge {
  transform: scale(1.12);
}
</style>
