<template>
  <div class="card border-0 shadow-sm rounded-4 hover-scale transition-all">
    <div
      class="card-body p-4 p-md-5 d-flex flex-column flex-lg-row align-items-center justify-content-between gap-4"
    >
      <div class="d-flex align-items-center gap-4 w-100">
        <div
          class="rounded-circle d-flex align-items-center justify-content-center shadow-inner"
          :class="
            isIncome
              ? 'bg-success bg-opacity-10 text-success'
              : 'bg-danger bg-opacity-10 text-danger'
          "
          style="width: 80px; height: 80px"
        >
          <i
            class="fa-solid fs-1"
            :class="['fas', getIcon(item.type, item.category)]"
          ></i>
        </div>

        <div class="d-flex flex-column">
          <span class="text-muted fw-bold fs-5">
            {{ isIncome ? "수입" : "지출" }} · {{ item.category }}
          </span>
          <span class="fs-2 fw-bold text-dark">
            {{ item.memo || "내역 없음" }}
          </span>
        </div>
      </div>

      <div
        class="d-flex flex-column flex-lg-row align-items-lg-center gap-4 w-100 justify-content-lg-end mt-3 mt-lg-0"
      >
        <span
          class="fs-1 fw-black text-nowrap"
          :class="isIncome ? 'text-success' : 'text-danger'"
        >
          {{ isIncome ? "+" : "-" }}
          {{ Number(item.amount).toLocaleString() }}원
        </span>

        <div class="d-flex gap-3">
          <button
            class="btn btn-edit fs-4 fw-bold py-3 px-4 rounded-4 d-flex align-items-center gap-2"
            type="button"
            @click="$emit('edit', item)"
          >
            <i class="fa-solid fa-pen"></i> 수정
          </button>

          <button
            class="btn btn-delete bg-opacity-10 text-danger border-0 fs-4 fw-bold py-3 px-4 rounded-4 d-flex align-items-center gap-2"
            type="button"
            @click="handleDelete"
          >
            <i class="fa-solid fa-trash"></i> 삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTransactionStore } from "@/stores/useTransactionStore";

defineEmits(["edit"]);

const props = defineProps({
  item: { type: Object, required: true },
});

const transactionStore = useTransactionStore();
const isIncome = computed(() => props.item.type === "income");

// 아이콘 가져오기 (스토어의 카테고리 데이터 활용)
const getIcon = (type, category) => {
  // 스토어에서 불러온 카테고리 배열을 사용합니다.
  const categories =
    type === "expense"
      ? transactionStore.expenseCategories
      : transactionStore.incomeCategories;

  const cat = categories.find((c) => c.name === category);

  if (cat && cat.icon) {
    return cat.icon.split(" ")[1]; // 예: 'fa-cart-shopping'
  }

  return "fa-coins"; // 기본 아이콘
};

const handleDelete = async () => {
  if (!confirm("이 내역을 정말 삭제하시겠습니까?")) return;

  try {
    await transactionStore.deleteTransaction(props.item.id);
    alert("성공적으로 삭제되었습니다.");
  } catch (err) {
    console.error(err);
    alert("삭제에 실패했습니다. 다시 시도해주세요.");
  }
};
</script>

<style scoped>
.hover-scale:hover {
  transform: translateY(-2px);
}
.fw-black {
  font-weight: 900;
}
.btn-edit {
  background-color: #e8e7f2;
  color: #1a1b23;
  transition: filter 0.2s ease;
}
.btn-edit:hover {
  background-color: #d1d0da;
  box-shadow: 0 4px 12px rgba(0, 6, 102, 0.2);
}
.btn-delete {
  background-color: #ffdad6;
  color: #ba1a1a;
  transition: filter 0.2s ease;
}
.btn-delete:hover {
  background-color: #e5c4c0;
  box-shadow: 0 4px 12px rgba(0, 6, 102, 0.2);
}
</style>
