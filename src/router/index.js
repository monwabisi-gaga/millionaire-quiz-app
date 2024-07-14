import { createRouter, createWebHistory } from "vue-router";
import HomeScreen from "../views/HomeScreen.vue";
import GameScreen from "../views/GameScreen.vue";
import ResultScreen from "../views/ResultScreen.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeScreen,
  },
  {
    path: "/game",
    name: "Game",
    component: GameScreen,
  },
  {
    path: "/result",
    name: "Result",
    component: ResultScreen,
    props: (route) => ({
      winnings: Number(route.query.winnings) || 0,
      correctAnswers: Number(route.query.correctAnswers) || 0,
    }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
