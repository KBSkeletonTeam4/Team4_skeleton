<template>
  <button
    class="btn btn-primary position-fixed rounded-pill shadow-lg d-flex align-items-center gap-2 btn-fab"
    style="
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 2rem;
      background-color: #000666;
    "
    @click="$emit('add-click')"
  >
    <i class="fa-solid fa-circle-plus fs-2 fab-icon"></i>
    <span class="fs-4 fw-bold fab-text">거래 내역 추가</span>
  </button>
</template>

<script setup>
// 클릭 이벤트를 부모에게 전달하기 위한 설정
defineEmits(["add-click"]);
</script>

<style scoped>
.btn-fab {
  position: fixed;
  bottom: 40px;
  right: 40px;
  background: linear-gradient(135deg, #000666, #1a237e);
  color: #ffffff;
  border: none;
  border-radius: 60px;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 12px 32px rgba(0, 6, 102, 0.3);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  z-index: 50;
}
.btn-fab:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 40px rgba(0, 6, 102, 0.4);
}
.fab-icon {
  font-size: 2.5rem;
}
.fab-text {
  font-size: 1.75rem;
  font-weight: 900;
}
</style>
