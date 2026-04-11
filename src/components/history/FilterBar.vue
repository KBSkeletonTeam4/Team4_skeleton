<template>
  <div class="filter-container shadow-lg">
    <button
      class="filter-btn"
      :class="{ active: currentFilter === 'all' }"
      @click="$emit('change-filter', 'all')"
    >
      전체
    </button>
    <button
      class="filter-btn"
      :class="{ active: currentFilter === 'income' }"
      @click="$emit('change-filter', 'income')"
    >
      수입
    </button>
    <button
      class="filter-btn"
      :class="{ active: currentFilter === 'expense' }"
      @click="$emit('change-filter', 'expense')"
    >
      지출
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentFilter: { type: String, required: true },
});
defineEmits(["change-filter"]);
</script>

<style scoped>
.filter-container {
  display: flex;
  background-color: #e8e7f2; /* 연한 회보라색 배경 */
  padding: 8px;
  border-radius: 40px;
  margin-bottom: 60px; /* 기존 40px에서 수정 */
  width: 100%;
}

.filter-btn {
  flex: 1;
  padding: 20px 16px;
  border-radius: 32px;
  background: transparent;
  color: #000666; /* 메인 남색 */
  font-size: 1.25em;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  background-color: rgba(202, 198, 219, 0.637);
  color: #000666;
  box-shadow: 0 4px 12px rgba(0, 6, 102, 0.2);
}

.filter-btn.active {
  background-color: #000666;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 6, 102, 0.2);
}
</style>
