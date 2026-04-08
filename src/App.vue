<template>
  <main class="container py-3">
    <Header />
    <router-view />
    <!-- <Loading v-if="dateStore.states.isLoading" /> -->
  </main>
</template>

<script setup>
// 전역 설정이 필요하다면 이곳에 작성
import Header from '@/components/common/Header.vue';
// import Loading from '@/components/common/Loading.vue';
// import { useDateStore } from '@/stores/useDateStore.js';
// import { useSettingStore } from '@/stores/useSettingStore.js';
// import { useTransactionStore } from '@/stores/useTransactionStore.js';


// const dateStore = useDateStore();
// const settingStore = useSettingStore();
// const transactionStore = useTransactionStore();


</script>

<style>
/* 시니어 타깃에 맞춘 앱 전체 공통 폰트 설정 등을 여기에 추가 */
body {
  font-family: 'Pretendard', sans-serif; /* 예시 */
  background-color: #f8f9fa;
}
</style>