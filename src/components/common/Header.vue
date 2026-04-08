<template>
  <nav class="navbar navbar-expand-sm bg-dark navbar-dark">
    <span class="navbar-brand ps-2">내 인생 마지막 가계부</span>
    <button
      class="navbar-toggler"
      type="button"
      @click="isNavShow = !isNavShow"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      :class="
        isNavShow ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'
      "
    >
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'home' }">홈</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'history' }">거래 내역</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'settings' }">설정</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue';
const isNavShow = ref(false);
</script>
