<template>
  <div class="container-root">
    <div class="modal-overlay" @click.self="handleClose">
      <div class="modal-card">
        <div class="modal-header">
          <h2 class="modal-title">
            {{ isEditMode ? '거래 수정' : '거래 등록' }}
          </h2>
          <button @click="handleClose" class="btn-close" type="button">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="modal-body custom-scrollbar">
          <div class="form-grid">
            <div class="form-left">
              <div class="type-toggle">
                <button
                  type="button"
                  @click="changeType('income')"
                  :class="[
                    'toggle-btn',
                    { 'income-active': transactionType === 'income' },
                  ]"
                >
                  <i class="fa-solid fa-circle-plus"></i>
                  수입
                </button>
                <button
                  type="button"
                  @click="changeType('expense')"
                  :class="[
                    'toggle-btn',
                    { 'expense-active': transactionType === 'expense' },
                  ]"
                >
                  <i class="fa-solid fa-circle-minus"></i>
                  지출
                </button>
              </div>

              <div class="input-group">
                <label class="input-label">날짜</label>
                <div class="date-selector" @click="openDatePicker">
                  <i class="fa-solid fa-calendar-day icon-primary"></i>
                  <span class="date-text">{{ formattedDate }}</span>
                  <i class="fa-solid fa-chevron-down icon-expand"></i>

                  <input
                    ref="dateInputRef"
                    type="date"
                    v-model="selectedDate"
                    class="hidden-date-input"
                  />
                </div>
              </div>

              <div class="input-group">
                <label class="input-label">금액</label>
                <input
                  v-model="amount"
                  class="amount-input"
                  placeholder="₩ 0"
                  type="text"
                />
              </div>

              <div class="input-group">
                <label class="input-label">메모</label>
                <textarea
                  v-model="memo"
                  class="memo-textarea"
                  placeholder="설명을 입력하세요..."
                ></textarea>
              </div>
            </div>

            <div class="form-right">
              <label class="input-label">카테고리</label>
              <div class="category-grid">
                <div
                  v-for="cat in currentCategories"
                  :key="cat.id"
                  @click="selectedCategoryId = cat.id"
                  :class="[
                    'category-item',
                    { selected: selectedCategoryId === cat.id },
                  ]"
                >
                  <div class="category-icon-wrapper">
                    <i :class="cat.icon"></i>
                  </div>
                  <span class="category-name">{{ cat.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="handleClose" class="btn-cancel" type="button">
            취소
          </button>
          <button @click="saveTransaction" class="btn-save" type="button">
            {{ isEditMode ? '수정하기' : '저장하기' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  mode: {
    type: String,
    default: 'create',
  },
  initialData: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(['close', 'save']);

const isEditMode = computed(() => props.mode === 'edit');

const transactionType = ref('expense');
const amount = ref('');
const memo = ref('');
const selectedCategoryId = ref('1');
const selectedDate = ref(new Date().toISOString().slice(0, 10));
const dateInputRef = ref(null);

const incomeCategory = [
  { id: '1', name: '월급', icon: 'fa-solid fa-money-bill-wave' },
  { id: '2', name: '용돈', icon: 'fa-solid fa-envelope-open-text' },
  { id: '3', name: '이자', icon: 'fa-solid fa-piggy-bank' },
  { id: '4', name: '기타', icon: 'fa-solid fa-coins' },
];

const expenseCategory = [
  { id: '1', name: '식비', icon: 'fa-solid fa-utensils' },
  { id: '2', name: '마트', icon: 'fa-solid fa-cart-shopping' },
  { id: '3', name: '교통', icon: 'fa-solid fa-bus' },
  { id: '4', name: '공과금/통신', icon: 'fa-solid fa-file-invoice-dollar' },
  { id: '5', name: '병원/약국', icon: 'fa-solid fa-notes-medical' },
  { id: '6', name: '손주/경조사', icon: 'fa-solid fa-gift' },
];

const currentCategories = computed(() => {
  return transactionType.value === 'income' ? incomeCategory : expenseCategory;
});

const formattedDate = computed(() => {
  if (!selectedDate.value) return '';

  const date = new Date(selectedDate.value);
  if (Number.isNaN(date.getTime())) return '';

  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
});

const openDatePicker = () => {
  const input = dateInputRef.value;
  if (!input) return;

  if (typeof input.showPicker === 'function') {
    input.showPicker();
  } else {
    input.click();
  }
};

const changeType = (type) => {
  transactionType.value = type;
  selectedCategoryId.value = '1';
};

const handleClose = () => {
  emit('close');
};

const resetForm = () => {
  transactionType.value = 'expense';
  amount.value = '';
  memo.value = '';
  selectedCategoryId.value = '1';
  selectedDate.value = new Date().toISOString().slice(0, 10);
};

const applyInitialData = (data) => {
  if (!data) {
    resetForm();
    return;
  }

  transactionType.value = data.type ?? 'expense';
  amount.value = data.amount != null ? String(data.amount) : '';
  memo.value = data.memo ?? '';
  selectedDate.value = data.date ?? new Date().toISOString().slice(0, 10);

  const categories =
    transactionType.value === 'income' ? incomeCategory : expenseCategory;

  const matchedCategory = categories.find((cat) => cat.name === data.category);
  selectedCategoryId.value = matchedCategory ? matchedCategory.id : '1';
};

watch(
  () => [props.mode, props.initialData],
  () => {
    if (isEditMode.value) {
      applyInitialData(props.initialData);
    } else {
      resetForm();
    }
  },
  { immediate: true, deep: true },
);

const saveTransaction = () => {
  const category = currentCategories.value.find(
    (c) => c.id === selectedCategoryId.value,
  );

  const payload = {
    ...(isEditMode.value && props.initialData?.id
      ? { id: props.initialData.id }
      : {}),
    type: transactionType.value,
    amount: Number(String(amount.value).replace(/[^0-9]/g, '')) || 0,
    category: category?.name ?? '',
    memo: memo.value,
    date: selectedDate.value,
  };

  console.log('transaction save payload:', payload);
  emit('save', payload);
};
</script>

<style scoped>
.container-root {
  --primary: #000666;
  --secondary: #1b6d24;
  --error: #ba1a1a;
  --surface: #ffffff;
  --surface-low: #f3f2fe;
  --outline: #767683;
/*   min-height: 100vh;
  background-color: var(--surface); */
}

/* Header */
/* .header {
  background: white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}
.header-inner {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  font-family: 'Lexend';
  font-size: 1.5em;
  font-weight: 900;
  color: var(--primary);
  letter-spacing: 0.05em;
}
.nav {
  display: flex;
  gap: 2rem;
}
.nav-link {
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-family: 'Lexend';
}
.nav-link.active {
  color: var(--primary);
  border-bottom: 4px solid var(--primary);
  padding-bottom: 0.25rem;
}
.profile-area {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #bdc2ff;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

/* Main Content Area */
/* .main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  transition: opacity 0.3s;
}
.content-blurred {
  opacity: 0.3;
  pointer-events: none;
}
.content-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.btn-open-modal {
  padding: 1rem 1.5rem;
  background: var(--primary);
  color: white;
  border-radius: 0.75rem;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1em;
} */

/* Modal Overlay */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(26, 27, 35, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
.modal-card {
  background: white;
  width: 100%;
  max-width: 1150px;
  max-height: 92vh;
  border-radius: 3rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
}
.modal-header {
  padding: 2.5rem 3rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.modal-title {
  font-family: 'Lexend';
  font-size: 2.5em;
  font-weight: 800;
  color: var(--primary);
}
.btn-close {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 2.5em;
  color: var(--outline);
}
.modal-body {
  padding: 0 3rem 3rem;
  overflow-y: auto;
  flex-grow: 1;
}
.form-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3rem;
}
.form-left {
  grid-column: span 5;
}
.form-right {
  grid-column: span 7;
}
.type-toggle {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 0.6rem;
  background: var(--surface-low);
  border-radius: 2rem;
  margin-bottom: 2.5rem;
}
.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: none;
  font-family: 'Lexend';
  font-size: 1.6em;
  font-weight: 700;
  cursor: pointer;
  background: transparent;
  transition: 0.3s;
  color: var(--outline);
}
.income-active {
  background: var(--secondary);
  color: white;
  box-shadow: 0 10px 20px rgba(27, 109, 36, 0.3);
}
.expense-active {
  background: var(--error);
  color: white;
  box-shadow: 0 10px 20px rgba(186, 26, 26, 0.3);
}
.input-group {
  margin-bottom: 2rem;
}
.input-label {
  display: block;
  font-size: 1.3em;
  font-weight: 700;
  color: #454652;
  margin-bottom: 0.8rem;
  margin-left: 0.5rem;
}
.date-selector {
  background: var(--surface-low);
  padding: 1.8rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
}
.date-text {
  font-family: 'Lexend';
  font-size: 1.6em;
  font-weight: 700;
}
.hidden-date-input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.icon-primary {
  color: var(--primary);
  font-size: 1.8em;
}
.icon-expand {
  color: var(--primary);
  font-size: 1.2rem;
  margin-left: auto;
}
.amount-input {
  width: 100%;
  font-family: 'Lexend';
  font-size: 4em;
  font-weight: 900;
  padding: 2rem;
  background: var(--surface-low);
  border: none;
  border-radius: 2rem;
  color: var(--primary);
  box-sizing: border-box;
}
.memo-textarea {
  width: 100%;
  height: 10rem;
  padding: 1.5rem;
  background: var(--surface-low);
  border: none;
  border-radius: 1.5rem;
  font-size: 1.4em;
  resize: none;
  box-sizing: border-box;
}
.category-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
}
.category-item {
  background: var(--surface-low);
  padding: 2rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  border: 4px solid transparent;
  transition: 0.2s;
}
.category-item.selected {
  border-color: var(--primary);
  background: rgba(226, 225, 237, 0.5);
}
.category-icon-wrapper {
  width: 4.5rem;
  height: 4.5rem;
  background: #e2e1ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  color: #454652;
}
.selected .category-icon-wrapper {
  background: var(--primary);
  color: white;
}
.category-name {
  font-size: 1.4em;
  font-weight: 900;
}
.modal-footer {
  padding: 2.5rem 3rem;
  background: var(--surface-low);
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}
.btn-cancel,
.btn-save {
  padding: 1.8rem;
  border-radius: 5rem;
  font-family: 'Lexend';
  font-size: 2em;
  font-weight: 900;
  cursor: pointer;
  border: none;
}
.btn-cancel {
  background: #e2e1ed;
  color: #454652;
}
.btn-save {
  background: linear-gradient(to right, #000666, #1a237e);
  color: white;
  box-shadow: 0 15px 30px rgba(0, 6, 102, 0.4);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #c6c5d4;
  border-radius: 10px;
}
</style>
