import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import { useSettingStore } from '@/stores/useSettingStore';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

const settingStore = useSettingStore(pinia);
settingStore.restoreUser();
settingStore.restoreFontSize();

app.mount('#app');
