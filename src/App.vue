<template>
  <div class="container" :class="`font-size-${fontSize}`">
    <Header />
    <div class="main-content">
      <router-view />
      <!-- <Loading v-if="dateStore.states.isLoading" /> -->
    </div>
  </div>
</template>

<script setup>
// 전역 설정이 필요하다면 이곳에 작성
import { storeToRefs } from "pinia";
import Header from "@/components/common/Header.vue";
// import Loading from '@/components/common/Loading.vue';
import { useSettingStore } from "@/stores/useSettingStore.js";

const settingStore = useSettingStore();
const { fontSize } = storeToRefs(settingStore);
</script>

<style>
/* 앱 전체의 기본 레이아웃과 
  시니어 맞춤형 폰트 사이즈를 제어하는 글로벌 스타일 */
* {
  margin: 0;
  padding: 0;
}

.container {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fbf8ff;
  color: #000666;
}

.main-content {
  flex: 1; /* 남은 화면 높이를 모두 차지하도록 설정 */
  width: 100%;
  margin: 0 auto;
  position: relative; /* 모달(Transaction) 위치의 기준점 역할 */
}

/* 동적 폰트 사이즈 클래스 
  - em, rem 등을 활용하여 화면 내 텍스트들이 비율에 맞게 커지도록 유도.
*/
.font-size-normal {
  font-size: 1rem; /* 약 16px */
}
.font-size-large {
  font-size: 1.25rem; /* 약 20px */
}
.font-size-xlarge {
  font-size: 1.5rem; /* 약 24px */
}
Header {
  margin: 0;
}
body {
  font-family: Lexend;
  background-color: #fbf8ff;
  color: #000666;
  margin: 0;
}
</style>
