<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">회원가입</h1>
      <p class="auth-subtitle">이름, 전화번호, 비밀번호 4자리를 입력하세요</p>

      <form @submit.prevent="handleSignup">
        <div class="form-group">
          <label for="name">이름</label>
          <input id="name" v-model="name" type="text" placeholder="이름 입력" />
        </div>

        <div class="form-group">
          <label for="phone">전화번호</label>
          <input
            id="phone"
            :value="phone"
            type="text"
            maxlength="13"
            placeholder="010-1234-5678"
            inputmode="numeric"
            @input="onPhoneInput"
          />
        </div>

        <div class="form-group">
          <label for="password">비밀번호</label>
          <input
            id="password"
            v-model="password"
            type="password"
            maxlength="4"
            placeholder="숫자 4자리"
            inputmode="numeric"
          />
        </div>

        <button class="primary-btn" type="submit">회원가입</button>
      </form>

      <button class="sub-btn" type="button" @click="goToLogin">
        로그인으로 이동
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '@/stores/useSettingStore';

const router = useRouter();
const settingStore = useSettingStore();

const name = ref('');
const phone = ref('');
const password = ref('');

const onlyNumbers = (value) => {
  return String(value)
    .replace(/[^0-9]/g, '')
    .slice(0, 11);
};

const formatPhoneNumber = (value) => {
  const numbers = onlyNumbers(value);

  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 7) {
    return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
  }
  return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

const onPhoneInput = (event) => {
  phone.value = formatPhoneNumber(event.target.value);
};

const handleSignup = async () => {
  try {
    await settingStore.signup({
      name: name.value,
      phone: phone.value,
      password: password.value,
    });

    alert('회원가입 완료');
    router.push('/login');
  } catch (error) {
    alert(error.message || '회원가입 실패');
  }
};

const goToLogin = () => {
  router.push('/login');
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  background: #fbf8ff;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 12px 28px rgba(26, 27, 35, 0.08);
  border: 1px solid rgba(198, 197, 212, 0.35);
}

.auth-title {
  margin: 0 0 0.5rem;
  text-align: center;
  font-size: 2em;
  font-weight: 900;
  color: #000666;
}

.auth-subtitle {
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1em;
  color: #666b7a;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.95em;
  font-weight: 700;
  color: #1a1b23;
}

.form-group input {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid #d8d9e8;
  border-radius: 14px;
  font-size: 1em;
  outline: none;
  background: #ffffff;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #4c56af;
  box-shadow: 0 0 0 3px rgba(76, 86, 175, 0.12);
}

.primary-btn,
.sub-btn {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 0.95rem 1rem;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
}

.primary-btn {
  margin-top: 0.5rem;
  background: #000666;
  color: #ffffff;
}

.sub-btn {
  margin-top: 0.75rem;
  background: #ece9f7;
  color: #000666;
}
</style>
