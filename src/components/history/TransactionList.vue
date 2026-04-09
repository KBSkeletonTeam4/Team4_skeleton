<template>
  <div class="transaction-list d-flex flex-column gap-5">
    <section v-for="(items, date) in groupedTransactions" :key="date">
      <div
        class="d-flex align-items-center gap-3 mb-4 sticky-top py-2"
        style="z-index: 10"
      >
        <h2 class="fs-3 fw-bolder m-0" style="color: #000666">
          {{ date }}
        </h2>
        <div
          class="flex-grow-1 bg-secondary rounded-pill opacity-25"
          style="height: 4px"
        ></div>
      </div>

      <div class="d-flex flex-column gap-3">
        <TransactionItem v-for="item in items" :key="item.id" :item="item" />
      </div>
    </section>

    <div
      v-if="Object.keys(groupedTransactions).length === 0"
      class="text-center py-5 text-muted fs-4"
    >
      해당하는 거래 내역이 없습니다.
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import TransactionItem from "./TransactionItem.vue";

const props = defineProps({
  transactions: { type: Array, required: true },
});

// 전달받은 데이터를 날짜(date) 기준으로 그룹화하는 계산 로직
const groupedTransactions = computed(() => {
  return props.transactions.reduce((acc, curr) => {
    // 날짜 키가 없으면 배열 생성
    if (!acc[curr.date]) {
      acc[curr.date] = [];
    }
    acc[curr.date].push(curr);
    return acc;
  }, {});
});
</script>
