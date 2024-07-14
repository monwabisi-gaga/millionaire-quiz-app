import axios from "axios";
import router from "../../router";

const state = {
  questions: [],
  currentQuestionIndex: 0,
  score: 0,
  winnings: 0,
  gameInProgress: false,
  gameOver: false,
  error: null,
  timeLeft: 30,
};

const mutations = {
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
};

const actions = {
  async fetchQuestions({ commit }) {
    try {
      const response = await axios.get(
        "https://668bd8230b61b8d23b0b68d9.mockapi.io/api/questions"
      );
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
    dispatch("resetTimer");
  },
  getNextQuestion({ state, commit, dispatch }) {
    const nextIndex = state.currentQuestionIndex + 1;
    if (nextIndex < state.questions.length) {
      commit("setCurrentQuestionIndex", nextIndex);
      dispatch("resetTimer");
    } else {
      commit("setGameOver", true);
      commit("setGameInProgress", false);
      router.push("/result");
    }
  },
  submitAnswer({ state, commit, dispatch }, answer) {
    const currentQuestion = state.questions[state.currentQuestionIndex];
    if (currentQuestion.correctAnswer === answer) {
      const newScore = state.score + 1;
      const newWinnings = calculateWinnings(newScore);
      commit("setScore", newScore);
      commit("setWinnings", newWinnings);
      dispatch("getNextQuestion");
    } else {
      commit("setGameOver", true);
      commit("setGameInProgress", false);
      router.push({
        path: "/result",
        query: {
          score: state.score,
        },
      });
    }
  },
  walkAway({ commit }) {
    commit("setGameOver", true);
    commit("setGameInProgress", false);
    router.push({
      path: "/result",
      query: {
        score: state.score,
      },
    });
  },
  resetTimer({ commit }) {
    commit("setTimeLeft", 30);
  },
  decrementTimer({ state, commit, dispatch }) {
    if (state.timeLeft > 0) {
      commit("setTimeLeft", state.timeLeft - 1);
    } else {
      dispatch("submitAnswer", null);
    }
  },
};

const getters = {
  currentQuestion(state) {
    return state.questions[state.currentQuestionIndex];
  },
  totalQuestions(state) {
    return state.questions.length;
  },
  timeLeft(state) {
    return state.timeLeft;
  },
};

function calculateWinnings(score) {
  return score * 1000;
}

export default {
  state,
  mutations,
  actions,
  getters,
};
