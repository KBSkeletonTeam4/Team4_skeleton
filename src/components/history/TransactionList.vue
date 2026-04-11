<template>
  <div class="transaction-list d-flex flex-column gap-5">
    <section v-for="(items, date) in groupedTransactions" :key="date">
      <div
        class="d-flex align-items-center gap-3 mb-4 sticky-top py-2 bg-gradient-to-bottom"
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
        <TransactionItem
          v-for="item in items"
          :key="item.id"
          :item="item"
          @edit="$emit('edit-transaction', $event)"
        />
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

defineEmits(["edit-transaction"]);

const props = defineProps({
  transactions: { type: Array, required: true },
});

const groupedTransactions = computed(() => {
  return props.transactions.reduce((acc, curr) => {
    const dateKey = curr.date || "날짜 없음";

    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }

    acc[dateKey].push(curr);
    return acc;
  }, {});
});
</script>

<style>
/* .bg-gradient-to-bottom:first-child {
  background: linear-gradient(to bottom, #fbf8ff 80%, rgba(255, 255, 255, 0));
} */
.bg-gradient-to-bottom {
  background: linear-gradient(to bottom, #fbf8ff 80%, rgba(255, 255, 255, 0));
}
</style>
