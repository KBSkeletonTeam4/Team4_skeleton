<template>
  <div :class="$style.topnavbar">
    <div :class="$style.titleContainer" @click="goToHome">
      <div :class="$style.titleText">내 인생 마지막 가계부</div>
    </div>
    
    <i 
      class="fa-solid fa-gear" 
      :class="$style.gearIcon" 
      @click="goToSettings"
    ></i>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

// 라우터 이동 함수
const goToHome = () => {
  router.push('/');
};

const goToSettings = () => {
  router.push('/settings');
};
</script>

<style module>
.topnavbar {
  /* 1. 가로가 웹 페이지 폭에 맞게 조정되도록 max-width 제거 */
  width: 100%;
  position: relative;
  background-color: #fbf8ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  box-sizing: border-box;
  font-family: Lexend;
  color: #000666;
  margin: 0;
}

.titleContainer {
  display: flex;
  align-items: center;
  cursor: pointer; /* 마우스 오버 시 손가락 모양으로 변경 */
}

.titleText {
  /* 불필요한 고정 width, height를 제거하여 텍스트가 자연스럽게 위치하도록 수정 */
  font-size: 32px;
  font-weight: 900;
  margin: 0;
}

.gearIcon {
  /* 3. 아이콘 세로 정중앙 정렬: 고정 width/height를 지우고 font-size로 크기 제어 */
  font-size: 36px; 
  color: #000666;
  cursor: pointer; /* 마우스 오버 시 손가락 모양으로 변경 */
}
</style>