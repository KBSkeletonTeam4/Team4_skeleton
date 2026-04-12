<!-- 프레젠테이셔널 컴포넌트(Presentational Component) -->
<!-- 데이터를 스스로 조작하지 않고 부모(History.vue)에게 이벤트를 올려보냄($emit)  -->
<template>
  <div class="filter-container shadow-lg">
    <button
      v-for="tab in filterTabs"
      :key="tab.value"
      class="filter-btn"
      :class="{ active: currentFilter === tab.value }"
      @click="$emit('change-filter', tab.value)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  currentFilter: { type: String, required: true },
});
defineEmits(["change-filter"]);

// 필터 목록을 배열로 관리
const filterTabs = [
  { label: "전체", value: "all" },
  { label: "수입", value: "income" },
  { label: "지출", value: "expense" },
];
</script>

<style scoped>
.filter-container {
  display: flex;
  background-color: #e8e7f2;
  padding: 8px;
  border-radius: 40px;
  margin-bottom: 60px;
  width: 100%;
}

.filter-btn {
  flex: 1;
  padding: 20px 16px;
  border-radius: 32px;
  background: transparent;
  color: #000666;
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
