<!-- src/components/QuizTimer.vue -->
<template>
  <div>
    <p>{{ timeLeft }}</p>
  </div>
</template>

<script>
export default {
  name: 'QuizTimer',
  props: {
    duration: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      timeLeft: this.duration,
      interval: null,
    };
  },
  methods: {
    countdown() {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.$emit('timeUp');
      }
    },
    startTimer() {
      this.timeLeft = this.duration;
      this.interval = setInterval(this.countdown, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeUnmount() {
    this.stopTimer();
  },
  watch: {
    duration(newVal) {
      this.timeLeft = newVal;
    },
    timeLeft(newVal) {
      if (newVal === 0) {
        this.stopTimer(); // Optional: stop timer when timeLeft reaches 0
        this.$emit('timeUp'); // Emit event when time is up
      }
    },
  },
};
</script>
