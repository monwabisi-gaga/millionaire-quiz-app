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
    startGame({ commit, dispatch }) {
      commit("setGameInProgress", true);
      commit("setGameOver", false);
      commit("setScore", 0);
      commit("setWinnings", 0);
      dispatch("getNextQuestion");
    },
    getNextQuestion({ state, commit }) {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex <= state.questions.length - 1) {
        commit("setCurrentQuestionIndex", nextIndex);
      } else {
        commit("setGameOver", true);
        commit("setGameInProgress", false);
      }
    },
    selectAnswer({ state, commit, dispatch }, answerIndex) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion.correctIndex === answerIndex) {
        const newScore = state.score + 1;
        const newWinnings = calculateWinnings(newScore);
        commit("setScore", newScore);
        commit("setWinnings", newWinnings);
        dispatch("getNextQuestion");
      } else {
        commit("setGameOver", true);
        commit("setGameInProgress", false);
      }
    },
    walkAway({ commit }) {
      commit("setGameOver", true);
      commit("setGameInProgress", false);
    },
  },
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentQuestionIndex];
    },
    totalQuestions(state) {
      return state.questions.length;
    },
  },
});

function calculateWinnings(score) {
  return score;
}

export default store;
