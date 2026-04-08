<template>
  <div class="auth-page">
    <div class="auth-card">
      <h1 class="auth-title">로그인</h1>
      <p class="auth-subtitle">전화번호와 비번입력하게나/p></p>

      <div class="form-group">
        <label for="phone">전화번호</label>
        <input
          id="phone"
          v-model="phone"
          type="text"
          placeholder="010-1234-5678"
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
        />
      </div>

      <button class="primary-btn" @click="handleLogin">로그인</button>
      <button class="sub-btn" @click="goToSignup">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '@/stores/useSettingStore';

const router = useRouter();
const settingStore = useSettingStore();

const phone = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    await settingStore.login({
      phone: phone.value,
      password: password.value,
    });

    alert('로그인 성공');
    router.push('/');
  } catch (error) {
    alert(error.message || '로그인 실패');
  }
};

const goToSignup = () => {
  router.push('/signup');
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
  font-size: 2rem;
  font-weight: 900;
  color: #000666;
}

.auth-subtitle {
  margin: 0 0 1.5rem;
  text-align: center;
  font-size: 1rem;
  color: #666b7a;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.45rem;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1a1b23;
}

.form-group input {
  width: 100%;
  padding: 0.95rem 1rem;
  border: 1px solid #d8d9e8;
  border-radius: 14px;
  font-size: 1rem;
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
  font-size: 1rem;
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
