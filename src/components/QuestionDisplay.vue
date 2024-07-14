<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white">
    <h2 class="text-2xl font-bold mb-4">Question {{ currentIndex + 1 }}</h2>
    <p class="text-xl mb-6">{{ question.question }}</p>
    <div class="grid grid-cols-2 gap-4">
      <button
        v-for="(option, index) in question.options"
        :key="index"
        @click="submitAnswer(option)"
        class="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {{ option }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuestionDisplay',
  props: {
    question: {
      type: Object,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    submitAnswer(answer) {
      this.$emit('answer-selected', answer);
    },
  },
};
</script>

<style scoped></style>
