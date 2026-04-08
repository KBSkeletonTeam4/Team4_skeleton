<template>
  <div class="settings-page">
    <h1 class="page-title">프로필 설정</h1>

    <section class="profile-card">
      <div class="profile-image-wrap">
        <div class="profile-image">👤</div>
      </div>

      <div class="profile-info" v-if="settingStore.currentUser">
        <h2 class="profile-name">{{ settingStore.currentUser.name }} 님</h2>
        <p class="profile-phone">{{ settingStore.currentUser.phone }}</p>
      </div>

      <div class="profile-form" v-if="settingStore.currentUser">
        <input v-model="editName" type="text" placeholder="이름을 입력하세요" />
        <input
          v-model="editPhone"
          type="text"
          placeholder="전화번호를 입력하세요"
        />
        <button class="profile-btn" @click="saveProfile">
          내 정보 수정하기
        </button>
      </div>

      <div v-else class="empty-box">로그인된 사용자가 없습니다.</div>
    </section>

    <section class="font-card">
      <h2 class="font-card-title">글자 크기 설정</h2>

      <button
        class="font-option"
        :class="{ active: settingStore.fontSize === 'medium' }"
        @click="changeFontSize('medium')"
      >
        <span>표준</span>
        <span class="radio-circle"></span>
      </button>

      <button
        class="font-option"
        :class="{ active: settingStore.fontSize === 'large' }"
        @click="changeFontSize('large')"
      >
        <span>크게</span>
        <span class="radio-circle"></span>
      </button>

      <button
        class="font-option"
        :class="{ active: settingStore.fontSize === 'xlarge' }"
        @click="changeFontSize('xlarge')"
      >
        <span>매우 크게</span>
        <span class="radio-circle"></span>
      </button>
    </section>

    <button class="logout-btn" @click="handleLogout">로그아웃</button>
    <button class="delete-btn" @click="handleDeleteAccount">회원탈퇴</button>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSettingStore } from '@/stores/useSettingStore';

const router = useRouter();
const settingStore = useSettingStore();

const editName = ref('');
const editPhone = ref('');

watchEffect(() => {
  if (settingStore.currentUser) {
    editName.value = settingStore.currentUser.name || '';
    editPhone.value = settingStore.currentUser.phone || '';
  }
});

const saveProfile = async () => {
  try {
    await settingStore.updateProfile({
      name: editName.value,
      phone: editPhone.value,
    });

    alert('내 정보가 수정되었습니다.');
  } catch (error) {
    alert(error.message || '수정에 실패했습니다.');
  }
};

const changeFontSize = async (size) => {
  try {
    settingStore.setFontSize(size);
    await settingStore.saveFontSizeToProfile(size);
    alert('글자 크기가 저장되었습니다.');
  } catch (error) {
    alert(error.message || '글자 크기 저장에 실패했습니다.');
  }
};

const handleLogout = () => {
  settingStore.logout();
  router.push('/login');
};
const handleDeleteAccount = async () => {
  const confirmed = window.confirm('정말 회원탈퇴 하시겠습니까?');

  if (!confirmed) return;

  try {
    await settingStore.deleteAccount();
    alert('회원탈퇴가 완료되었습니다.');
    router.push('/login');
  } catch (error) {
    alert(error.message || '회원탈퇴에 실패했습니다.');
  }
};
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: #fbf8ff;
  padding: 1rem;
  max-width: 520px;
  margin: 0 auto;
}

.page-title {
  margin: 0 0 1rem;
  font-size: 1.8rem;
  font-weight: 900;
  color: #4a4a57;
  letter-spacing: -0.03em;
}

.profile-card,
.font-card {
  background: #ffffff;
  border-radius: 30px;
  padding: 1.2rem;
  box-shadow: 0 10px 24px rgba(26, 27, 35, 0.06);
  margin-bottom: 1.2rem;
}

.profile-image-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
}

.profile-image {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: #ece9f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 6px 16px rgba(26, 27, 35, 0.08);
}

.profile-info {
  text-align: center;
  margin-bottom: 1rem;
}

.profile-name {
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
  color: #000666;
  letter-spacing: -0.04em;
}

.profile-phone {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  color: #777;
  font-weight: 600;
}

.profile-form input {
  width: 100%;
  padding: 0.95rem 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid #d8d9e8;
  border-radius: 16px;
  font-size: 1rem;
  box-sizing: border-box;
  outline: none;
}

.profile-form input:focus {
  border-color: #4c56af;
  box-shadow: 0 0 0 3px rgba(76, 86, 175, 0.12);
}

.profile-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 18px;
  background: #ece9f7;
  color: #000666;
  font-weight: 900;
  font-size: 1.05rem;
  cursor: pointer;
}

.font-card-title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 900;
  color: #2c2c76;
  letter-spacing: -0.03em;
}

.font-option {
  width: 100%;
  background: #f3f2fe;
  border: 2px solid transparent;
  border-radius: 24px;
  padding: 1.35rem 1.2rem;
  margin-bottom: 0.85rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.55rem;
  font-weight: 900;
  color: #2f2f45;
  cursor: pointer;
  text-align: left;
}

.font-option:last-child {
  margin-bottom: 0;
}

.font-option.active {
  background: #ffffff;
  border-color: #2f2fa2;
  color: #000666;
  box-shadow: 0 6px 18px rgba(47, 47, 162, 0.08);
}

.radio-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3px solid #9b9bab;
  background: transparent;
  flex-shrink: 0;
}

.font-option.active .radio-circle {
  border-color: #000666;
  box-shadow: inset 0 0 0 6px #000666;
}

.logout-btn {
  width: 100%;
  border: none;
  border-radius: 18px;
  padding: 1rem;
  background: #000666;
  color: #ffffff;
  font-size: 1.05rem;
  font-weight: 900;
  cursor: pointer;
}

.empty-box {
  text-align: center;
  color: #666;
  padding: 2rem 1rem;
}
.delete-btn {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 0.95rem 1rem;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  margin-top: 0.75rem;
  background: #fdecec;
  color: #ba1a1a;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 0.9rem;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .profile-name {
    font-size: 1.8rem;
  }

  .font-option {
    font-size: 1.35rem;
  }
}
</style>
