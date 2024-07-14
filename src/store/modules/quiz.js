import axios from "axios";
import router from "../../router";

// Initial state for the quiz module
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

// Mutations to update the state
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

// Actions to perform asynchronous operations and update state
const actions = {
  // Fetch questions from an API
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

  // Start the quiz game
  startGame({ commit, dispatch }) {
    commit("setGameInProgress", true);
    commit("setGameOver", false);
    commit("setScore", 0);
    commit("setWinnings", 0);
    dispatch("getNextQuestion");
    dispatch("resetTimer");
  },

  // Move to the next question
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

  // Submit an answer to the current question
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

  // End the game and navigate to the result page
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

  // Reset the timer to its initial value
  resetTimer({ commit }) {
    commit("setTimeLeft", 30);
  },

  // Decrement the timer every second
  decrementTimer({ state, commit, dispatch }) {
    if (state.timeLeft > 0) {
      commit("setTimeLeft", state.timeLeft - 1);
    } else {
      dispatch("submitAnswer", null);
    }
  },
};

// Getters to retrieve state information
const getters = {
  // Get the current question object
  currentQuestion(state) {
    return state.questions[state.currentQuestionIndex];
  },

  // Get the total number of questions
  totalQuestions(state) {
    return state.questions.length;
  },

  // Get the remaining time on the timer
  timeLeft(state) {
    return state.timeLeft;
  },
};

// Function to calculate winnings based on the score
function calculateWinnings(score) {
  return score * 1000;
}

// Export the quiz module with its state, mutations, actions, and getters
export default {
  state,
  mutations,
  actions,
  getters,
};
