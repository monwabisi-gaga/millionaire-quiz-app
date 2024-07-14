<template>
  <div class="flex flex-col items-center justify-center h-screen bg-gray-100">
    <div v-if="currentQuestion" class="text-center">
      <h2 class="text-2xl font-bold mb-4">
        {{ currentQuestion.question }}
        <span class="text-slate-400">{{ currentQuestion.difficulty }}</span>
      </h2>
      <ul class="space-y-2">
        <li v-for="(answer, index) in currentQuestion.options" :key="index">
          <AnswerOption
            :option="answer"
            @answerSelected="submitAnswerHandler(answer)"
          />
        </li>
      </ul>
      <div class="mt-4">
        <p v-if="remainingTime > 0">Time remaining: {{ remainingTime }} seconds</p>
        <p v-else>Time's up!</p>
      </div>
    </div>
    <div v-else>
      <p>Loading questions...</p>
    </div>
    <button
      v-if="currentQuestion"
      @click="walkAwayHandler"
      class="bg-red-500 text-white px-4 py-2 rounded mt-4"
    >
      Walk Away
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AnswerOption from "../components/AnswerOption.vue";

export default {
  components: {
    AnswerOption,
  },
  computed: {
    ...mapGetters(["currentQuestion", "correctAnswers"]),
  },
  data() {
    return {
      remainingTime: 30,
      timer: null,
    };
  },
  methods: {
    ...mapActions(["fetchQuestions", "submitAnswer", "walkAway"]),
    async submitAnswerHandler(answer) {
      await this.submitAnswer(answer);
      this.remainingTime = 30;
    },
    handleTimeUp() {
      this.walkAwayHandler();
    },
    async walkAwayHandler() {
      await this.walkAway();
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
        } else {
          clearInterval(this.timer);
          this.handleTimeUp();
        }
      }, 1000);
    },
  },
  mounted() {
    this.fetchQuestions();
    this.startTimer();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
