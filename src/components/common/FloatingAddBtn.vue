<template>
  <div class="floating-container">
    <button class="add-btn" @click="goToAddPage">
      <span class="plus-icon">+</span>
      <span class="btn-text">거래 내역 추가</span>
    </button>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const currentRoute = useRoute();

const goToAddPage = () => {
  router.push({
    name: "transaction/add",
  });
};
// const gotoaddpage 추가
</script>

<style scoped>
.floating-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}
</style>
