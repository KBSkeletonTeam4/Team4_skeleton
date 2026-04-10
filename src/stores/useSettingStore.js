import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/api/axios';

export const useSettingStore = defineStore('setting', () => {
  const currentUser = ref(null);
  const fontSize = ref('medium');

  const isLoggedIn = computed(() => !!currentUser.value);

  const normalizePhone = (phone) => {
    return String(phone || '').replace(/[^0-9]/g, '');
  };

  const formatPhone = (phone) => {
    const onlyNum = normalizePhone(phone);

    if (onlyNum.length === 11) {
      return `${onlyNum.slice(0, 3)}-${onlyNum.slice(3, 7)}-${onlyNum.slice(7)}`;
    }

    return phone;
  };

  const signup = async ({ name, phone, password }) => {
    if (!name || !phone || !password) {
      throw new Error('모든 항목을 입력해주세요.');
    }

    if (!/^\d{4}$/.test(password)) {
      throw new Error('비밀번호는 숫자 4자리입니다.');
    }

    const formattedPhone = formatPhone(phone);
    const profiles = await api.get('/profile');

    const exists = profiles.find(
      (item) => normalizePhone(item.phone) === normalizePhone(formattedPhone),
    );

    if (exists) {
      throw new Error('이미 가입된 전화번호요.');
    }

    const newProfile = await api.post('/profile', {
      name,
      phone: formattedPhone,
      password,
      fontSize: 'medium',
    });

    return newProfile;
  };

  const login = async ({ phone, password }) => {
    if (!phone || !password) {
      throw new Error('전화번호와 비밀번호를 입력해주세요.');
    }

    const profiles = await api.get('/profile');

    const matchedUser = profiles.find(
      (item) =>
        normalizePhone(item.phone) === normalizePhone(phone) &&
        String(item.password) === String(password),
    );

    if (!matchedUser) {
      throw new Error('전화번호 또는 비밀번호가 틀림');
    }

    currentUser.value = matchedUser;
    fontSize.value = matchedUser.fontSize || 'medium';

    localStorage.setItem('currentUser', JSON.stringify(matchedUser));
    localStorage.setItem('fontSize', fontSize.value);
  };

  const restoreUser = () => {
    const savedUser = localStorage.getItem('currentUser');

    if (savedUser) {
      currentUser.value = JSON.parse(savedUser);

      if (currentUser.value?.fontSize) {
        fontSize.value = currentUser.value.fontSize;
      }
    }
  };

  const setFontSize = (size) => {
    fontSize.value = size;
    localStorage.setItem('fontSize', size);
  };

  const restoreFontSize = () => {
    const savedFontSize = localStorage.getItem('fontSize');

    if (savedFontSize) {
      fontSize.value = savedFontSize;
      return;
    }

    if (currentUser.value?.fontSize) {
      fontSize.value = currentUser.value.fontSize;
    }
  };

  const saveFontSizeToProfile = async (size) => {
    if (!currentUser.value) return;

    const updatedUser = await api.put(`/profile/${currentUser.value.id}`, {
      ...currentUser.value,
      fontSize: size,
    });

    currentUser.value = updatedUser;
    fontSize.value = updatedUser.fontSize || size;

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('fontSize', fontSize.value);
  };

  const logout = () => {
    currentUser.value = null;
    fontSize.value = 'medium';

    localStorage.removeItem('currentUser');
    localStorage.removeItem('fontSize');
  };

  const updateProfile = async (payload) => {
    if (!currentUser.value) return;

    const nextPhone = payload.phone
      ? formatPhone(payload.phone)
      : currentUser.value.phone;

    const profiles = await api.get('/profile');

    const duplicatedUser = profiles.find(
      (item) =>
        item.id !== currentUser.value.id &&
        normalizePhone(item.phone) === normalizePhone(nextPhone),
    );

    if (duplicatedUser) {
      throw new Error('이미 사용 중인 전화번호입니다.');
    }

    const updatedUser = await api.put(`/profile/${currentUser.value.id}`, {
      ...currentUser.value,
      ...payload,
      phone: nextPhone,
      fontSize:
        payload.fontSize || currentUser.value.fontSize || fontSize.value,
    });

    currentUser.value = updatedUser;
    fontSize.value = updatedUser.fontSize || 'medium';

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    localStorage.setItem('fontSize', fontSize.value);
  };
  const deleteAccount = async () => {
    if (!currentUser.value) return;

    await api.remove(`/profile/${currentUser.value.id}`);

    currentUser.value = null;
    fontSize.value = 'medium';

    localStorage.removeItem('currentUser');
    localStorage.removeItem('fontSize');
  };
  return {
    currentUser,
    fontSize,
    isLoggedIn,
    signup,
    login,
    restoreUser,
    logout,
    updateProfile,
    setFontSize,
    restoreFontSize,
    saveFontSizeToProfile,
    deleteAccount,
  };
});
