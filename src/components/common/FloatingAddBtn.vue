<template>
<div class="card card-body">
    <h5 class="card-title">Floating Add Button</h5>
    <p class="card-text">A floating button that allows users to quickly add new items or perform a primary action.</p>
    <button class="btn btn-primary">+</button>
</div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const currentRoute = useRoute();


</script>

<style scoped>

</style>