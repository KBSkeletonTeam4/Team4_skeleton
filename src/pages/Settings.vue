<template>
  <div class="settings-page">
    <div class="mb-5">
      <h1 class="fw-black" style="font-weight: 900; color: #000666">
        프로필 설정
      </h1>
    </div>

    <div class="settings-grid">
      <section class="profile-card">
        <div class="profile-image-wrap">
          <div class="profile-image">👤</div>
        </div>

        <div class="profile-info" v-if="settingStore.currentUser">
          <h2 class="profile-name">{{ settingStore.currentUser.name }} 님</h2>
          <p class="profile-phone">{{ settingStore.currentUser.phone }}</p>
        </div>

        <div class="profile-action" v-if="settingStore.currentUser">
          <button class="profile-btn" type="button" @click="openEditModal">
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
          type="button"
          @click="changeFontSize('medium')"
        >
          <span class="font-m">표준</span>
          <span class="radio-circle"></span>
        </button>

        <button
          class="font-option"
          :class="{ active: settingStore.fontSize === 'large' }"
          type="button"
          @click="changeFontSize('large')"
        >
          <span class="font-l">크게</span>
          <span class="radio-circle"></span>
        </button>

        <button
          class="font-option"
          :class="{ active: settingStore.fontSize === 'xlarge' }"
          type="button"
          @click="changeFontSize('xlarge')"
        >
          <span class="font-xl">매우 크게</span>
          <span class="radio-circle"></span>
        </button>
      </section>
    </div>

    <div class="bottom-actions">
      <button class="logout-btn" type="button" @click="handleLogout">
        로그아웃
      </button>
      <button class="delete-btn" type="button" @click="handleDeleteAccount">
        회원탈퇴
      </button>
    </div>

    <div v-if="isEditModalOpen" class="modal-overlay" @click="closeEditModal">
      <div class="edit-modal" @click.stop>
        <h3 class="modal-title">내 정보 수정</h3>

        <form @submit.prevent="saveProfile">
          <input
            v-model="editName"
            type="text"
            placeholder="이름을 입력하세요"
          />

          <input
            :value="editPhone"
            type="text"
            maxlength="13"
            inputmode="numeric"
            placeholder="전화번호를 입력하세요"
            @input="onEditPhoneInput"
          />

          <div class="modal-actions">
            <button
              class="modal-cancel-btn"
              type="button"
              @click="closeEditModal"
            >
              취소
            </button>
            <button class="modal-save-btn" type="submit">저장</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { useSettingStore } from "@/stores/useSettingStore";

const router = useRouter();
const settingStore = useSettingStore();

const editName = ref("");
const editPhone = ref("");
const isEditModalOpen = ref(false);

const onlyNumbers = (value) => {
  return String(value)
    .replace(/[^0-9]/g, "")
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

const onEditPhoneInput = (event) => {
  editPhone.value = formatPhoneNumber(event.target.value);
};

watchEffect(() => {
  if (settingStore.currentUser) {
    editName.value = settingStore.currentUser.name || "";
    editPhone.value = formatPhoneNumber(settingStore.currentUser.phone || "");
  }
});

const openEditModal = () => {
  if (settingStore.currentUser) {
    editName.value = settingStore.currentUser.name || "";
    editPhone.value = formatPhoneNumber(settingStore.currentUser.phone || "");
  }
  isEditModalOpen.value = true;
};

const closeEditModal = () => {
  isEditModalOpen.value = false;
};

const saveProfile = async () => {
  try {
    await settingStore.updateProfile({
      name: editName.value,
      phone: editPhone.value,
    });

    alert("내 정보가 수정되었습니다.");
    closeEditModal();
  } catch (error) {
    alert(error.message || "수정에 실패했습니다.");
  }
};

const changeFontSize = async (size) => {
  try {
    settingStore.setFontSize(size);
    await settingStore.saveFontSizeToProfile(size);
    alert("글자 크기가 저장되었습니다.");
  } catch (error) {
    alert(error.message || "글자 크기 저장에 실패했습니다.");
  }
};

const handleLogout = () => {
  settingStore.logout();
  router.push("/login");
};

const handleDeleteAccount = async () => {
  const confirmed = window.confirm("정말 회원탈퇴 하시겠습니까?");

  if (!confirmed) return;

  try {
    await settingStore.deleteAccount();
    alert("회원탈퇴가 완료되었습니다.");
    router.push("/login");
  } catch (error) {
    alert(error.message || "회원탈퇴에 실패했습니다.");
  }
};
</script>

<style scoped>
.settings-page {
  /* min-width: 100vw; */
  flex: 1;
  background: linear-gradient(180deg, #fbf8ff 0%, #f4f6ff 100%);
  padding: 1rem;
  max-width: 520px;
  margin: 0 auto;
}

.page-title {
  margin: 0 0 1rem;
  font-size: 1.8em;
  font-weight: 900;
  color: #4a4a57;
  letter-spacing: -0.03em;
}

.settings-grid {
  display: block;
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
  font-size: 2em;
  box-shadow: 0 6px 16px rgba(26, 27, 35, 0.08);
}

.profile-info {
  text-align: center;
  margin-bottom: 0.25rem;
}

.profile-name {
  margin: 0;
  font-size: 2em;
  font-weight: 900;
  color: #000666;
  letter-spacing: -0.04em;
}

.profile-phone {
  margin: 0.5rem 0 0;
  font-size: 1em;
  color: #777;
  font-weight: 600;
}

.profile-action {
  margin-top: 1rem;
}

.profile-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 18px;
  background: #ece9f7;
  color: #000666;
  font-weight: 900;
  font-size: 1.05em;
  cursor: pointer;
}

.font-card-title {
  margin: 0 0 1rem;
  font-size: 1.5em;
  font-weight: 900;
  color: #2c2c76;
  letter-spacing: -0.03em;
}

.font-m {
  font-size: 24px;
}
.font-l {
  font-size: 28px;
}
.font-xl {
  font-size: 32px;
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
  /* font-size: 1.55em; */
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

.bottom-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.logout-btn {
  width: 100%;
  border: none;
  border-radius: 18px;
  padding: 1rem;
  background: #000666;
  color: #ffffff;
  font-size: 1.05em;
  font-weight: 900;
  cursor: pointer;
}

.delete-btn {
  width: 100%;
  border: none;
  border-radius: 14px;
  padding: 0.95rem 1rem;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
  background: #d92d20;
  color: white;
}

.empty-box {
  text-align: center;
  color: #666;
  padding: 2rem 1rem;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(26, 27, 35, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  z-index: 999;
}

.edit-modal {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 24px;
  padding: 1.4rem;
  box-shadow: 0 18px 40px rgba(26, 27, 35, 0.18);
}

.modal-title {
  margin: 0 0 1rem;
  font-size: 1.4em;
  font-weight: 900;
  color: #000666;
}

.edit-modal input {
  width: 100%;
  padding: 0.95rem 1rem;
  margin-bottom: 0.75rem;
  border: 1px solid #d8d9e8;
  border-radius: 16px;
  font-size: 1em;
  box-sizing: border-box;
  outline: none;
}

.edit-modal input:focus {
  border-color: #4c56af;
  box-shadow: 0 0 0 3px rgba(76, 86, 175, 0.12);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

.modal-cancel-btn,
.modal-save-btn {
  flex: 1;
  border: none;
  border-radius: 16px;
  padding: 0.95rem 1rem;
  font-size: 1em;
  font-weight: 800;
  cursor: pointer;
}

.modal-cancel-btn {
  background: #ece9f7;
  color: #000666;
}

.modal-save-btn {
  background: #000666;
  color: #ffffff;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 0.9rem;
  }

  .page-title {
    font-size: 1.6em;
  }

  .profile-name {
    font-size: 1.8em;
  }

  .font-option {
    font-size: 1.35em;
  }
}

@media (min-width: 1024px) {
  .settings-page {
    max-width: 1180px;
    padding: 2rem 2rem 3rem;
  }

  .page-title {
    font-size: 2.4em;
    margin-bottom: 1.5rem;
  }

  .settings-grid {
    display: grid;
    grid-template-columns: 1fr 1.15fr;
    gap: 1.5rem;
    align-items: start;
    margin-bottom: 1.5rem;
  }

  .profile-card,
  .font-card {
    margin-bottom: 0;
    padding: 2rem;
    min-height: 100%;
    box-shadow: 0 16px 34px rgba(26, 27, 35, 0.08);
  }

  .profile-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .profile-image {
    width: 138px;
    height: 138px;
    font-size: 2.7em;
  }

  .profile-name {
    font-size: 2.3em;
  }

  .profile-phone {
    font-size: 1.1em;
  }

  .profile-btn {
    max-width: 260px;
    margin: 0 auto;
    display: block;
  }

  .font-card-title {
    font-size: 1.8em;
    margin-bottom: 1.2rem;
  }

  .font-option {
    font-size: 1.35em;
    padding: 1.4rem 1.3rem;
  }

  .bottom-actions {
    flex-direction: row;
    justify-content: flex-end;
    gap: 1rem;
  }

  .logout-btn,
  .delete-btn {
    width: 220px;
  }

  .edit-modal {
    max-width: 560px;
    padding: 2rem;
  }
}
</style>
