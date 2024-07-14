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
  },
  mounted() {
    this.interval = setInterval(this.countdown, 1000);
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
};
</script>
