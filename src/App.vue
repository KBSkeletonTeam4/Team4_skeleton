<template>
  <main class="container py-3">
    <Header />
    <router-view />
  </main>
</template>

<script setup>
// 전역 설정이 필요하다면 이곳에 작성
</script>

<style>
/* 시니어 타깃에 맞춘 앱 전체 공통 폰트 설정 등을 여기에 추가 */
body {
  font-family: 'Pretendard', sans-serif; /* 예시 */
  background-color: #f8f9fa;
}
</style>