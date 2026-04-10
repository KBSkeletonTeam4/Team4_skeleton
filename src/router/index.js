import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import History from '@/pages/History.vue';
import Transaction from '@/pages/Transaction.vue';
import Settings from '@/pages/Settings.vue';
import Login from '@/pages/Login.vue';
import Signup from '@/pages/Signup.vue';

const router = createRouter({
  // Vite 환경에서의 기본 History 모드 설정
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      // 메인 대시보드 (윤정님 / 혜근님 / 돈녕님 / 수빈님 컴포넌트 조합)
      component: Home,
      // Home 화면 위에서 띄울 모달 (새 거래 등록)
      children: [
        {
          // URL: /transaction/add
          path: "transaction/add",
          name: "transaction/add",
          // 새 거래 등록 (수빈님)
          component: Transaction,
        },
      ],
    },
    {
      path: "/history",
      name: "history",
      // 거래 내역 조회 (돈녕님)
      component: History,
      // History 화면 위에서 띄울 모달 (기존 거래 수정 및 추가)
      children: [
        {
          // URL: /history/transaction/:id
          path: "transaction/:id",
          name: "transaction/id",
          // 기존 거래 수정 (수빈님 - :id 파라미터로 데이터 바인딩)
          component: Transaction,
        },
        {
          // URL: /history/transaction/add
          path: "transaction/add",
          name: "transaction/add",
          // 새 거래 등록 (수빈님)
          component: Transaction,
        },
      ],
    },
    {
      path: "/settings",
      name: "settings",
      // 설정 및 프로필 (혜근님)
      component: Settings,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ],
});

export default router;
