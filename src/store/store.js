import Vue from "vue";
import Vuex from "vuex";
import quizModule from "./modules/quiz";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    quiz: quizModule,
  },
});

export default store;
