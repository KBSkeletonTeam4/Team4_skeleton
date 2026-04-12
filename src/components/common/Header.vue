<template>
  <div :class="$style.topnavbar">
    <div :class="$style.titleContainer" @click="goToHome">
      <div :class="$style.titleText">내 인생 마지막 가계부</div>
    </div>

    <div :class="$style.buttonContainer">
      <button :class="$style.loginBtn" @click="handleLog">
        {{ settingStore.isLoggedIn ? "로그아웃" : "로그인" }}
      </button>

      <i
        class="fa-solid fa-gear"
        :class="$style.gearIcon"
        @click="goToSettings"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useSettingStore } from "@/stores/useSettingStore";

const router = useRouter();
const transactionStore = useTransactionStore();
const settingStore = useSettingStore();

// 라우터 이동 함수
const goToHome = () => {
  router.push("/");
};

const goToSettings = () => {
  router.push("/settings");
};

const handleLog = () => {
  if (settingStore.isLoggedIn) {
    settingStore.logout();
    router.push("/login");
  } else {
    router.push("/login");
  }
};

onMounted(() => {
  transactionStore.fetchTransactions();
});
</script>

<style module>
.topnavbar {
  /* 1. 가로가 웹 페이지 폭에 맞게 조정되도록 max-width 제거 */
  width: 100%;
  position: relative;
  background-color: #fbf8ff;
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  justify-content: space-between;
  padding: 20px 32px;
  box-sizing: border-box;
  font-family: Lexend;
  color: #000666;
  margin: 0;
}

.titleContainer {
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  cursor: pointer; /* 마우스 오버 시 손가락 모양으로 변경 */
}

.titleText {
  font-size: 3.5em;
  font-weight: 600;
  margin: 0;
  font-family: "OngleipReconstruction";
}

@font-face {
  font-family: "OngleipReconstruction";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/2405-2@1.0/Ownglyph_JAEGEONSA-Rg.woff2")
    format("woff2");
  font-weight: medium;
  font-display: swap;
}

.buttonContainer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
}

.loginBtn {
  border: none;
  border-radius: 999px;
  padding: 0.7rem 1.2rem;
  font-size: 0.95em;
  font-weight: 800;
  cursor: pointer;
  color: #ffffff;
  background-color: #000666;
  transition:
    transform 0.15s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.loginBtn:hover {
  opacity: 0.75;
}

.loginBtn:active {
  transform: scale(0.98);
}

.gearIcon {
  /* 3. 아이콘 세로 정중앙 정렬: 고정 width/height를 지우고 font-size로 크기 제어 */
  font-size: 2.25em;
  color: #000666;
  cursor: pointer; /* 마우스 오버 시 손가락 모양으로 변경 */
}

.gearIcon:hover {
  opacity: 0.75;
}

@media screen and (max-width: 1000px) {
  .titleText {
    font-size: 2.5em;
  }
}

@media screen and (max-width: 768px) {
  .titleText {
    font-size: 1.6rem;
  }
}
</style>
