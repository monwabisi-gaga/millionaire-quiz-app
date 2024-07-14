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
      <Timer @timeUp="handleTimeUp" />
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
import Timer from "../components/QuizTimer.vue";
import AnswerOption from "../components/AnswerOption.vue";

export default {
  components: {
    Timer,
    AnswerOption,
  },
  computed: {
    ...mapGetters(["currentQuestion", "correctAnswers"]),
  },
  methods: {
    ...mapActions(["fetchQuestions", "submitAnswer", "walkAway"]),
    async submitAnswerHandler(answer) {
      await this.submitAnswer(answer);
      if (!this.currentQuestion) {
        this.$router.push("/result");
      }
    },
    handleTimeUp() {
      this.walkAwayHandler();
    },
    async walkAwayHandler() {
      await this.walkAway();
    },
  },
  mounted() {
    this.fetchQuestions();
  },
};
</script>
