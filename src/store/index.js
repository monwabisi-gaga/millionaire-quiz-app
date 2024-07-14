import { createStore } from "vuex";
import axios from "axios";
import router from "../router";

export default createStore({
  state: {
    questions: [],
    currentQuestionIndex: 0,
    correctAnswers: 0,
    winnings: 0,
  },
  getters: {
    currentQuestion: (state) =>
      state.questions[state.currentQuestionIndex] || null,
    currentQuestionIndex: (state) => state.currentQuestionIndex,
    correctAnswers: (state) => state.correctAnswers,
    winnings: (state) => state.winnings,
  },
  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    incrementQuestionIndex(state) {
      state.currentQuestionIndex++;
    },
    incrementCorrectAnswers(state) {
      state.correctAnswers++;
    },
    setWinnings(state, winnings) {
      state.winnings = winnings;
    },
    resetGame(state) {
      state.questions = [];
      state.currentQuestionIndex = 0;
      state.correctAnswers = 0;
      state.winnings = 0;
    },
  },
  actions: {
    async fetchQuestions({ commit }) {
      try {
        const response = await axios.get(
          "https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions"
        );
        commit("setQuestions", response.data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    },
    async startGame({ dispatch }) {
      await dispatch("fetchQuestions");
    },
    submitAnswer({ commit, state }, answer) {
      const currentQuestion = state.questions[state.currentQuestionIndex];
      if (currentQuestion.correctAnswer === answer) {
        commit("incrementCorrectAnswers");
        commit("setWinnings", state.winnings + currentQuestion.value);
      }
      if (state.currentQuestionIndex < state.questions.length - 1) {
        commit("incrementQuestionIndex");
      } else {
        router.push("/result");
      }
    },
    walkAway({ commit, state }) {
      router.push({
        name: "Result",
        query: {
          winnings: state.winnings,
          correctAnswers: state.correctAnswers,
        },
      });
      commit("resetGame");
    },
  },
  modules: {},
});
