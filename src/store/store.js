import Vue from "vue";
import Vuex from "vuex";
import { fetchQuestions } from "./services/api";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    winnings: 0,
    gameInProgress: false,
    gameOver: false,
    error: null,
    timeLeft: 30, // Time left for the timer
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setCurrentQuestionIndex(state, index) {
      state.currentQuestionIndex = index;
    },
    setScore(state, score) {
      state.score = score;
    },
    setWinnings(state, winnings) {
      state.winnings = winnings;
    },
    setGameInProgress(state, status) {
      state.gameInProgress = status;
    },
    setGameOver(state, status) {
      state.gameOver = status;
    },
    setError(state, error) {
      state.error = error;
    },
    setTimeLeft(state, time) {
      state.timeLeft = time;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      try {
        const response = await fetchQuestions();
        commit("setQuestions", response.data);
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentQuestionIndex];
    },
    totalQuestions(state) {
      return state.questions.length;
    },
    currentQuestionIndex(state) {
      return state.currentQuestionIndex;
    },
    timeLeft(state) {
      return state.timeLeft;
    },
  },
});

function calculateWinnings(score) {
  return score;
}

export default store;
