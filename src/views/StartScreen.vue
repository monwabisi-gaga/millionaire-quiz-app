<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-8">Who Wants to Be a Millionaire?</h1>
      <button @click="startGame" class="bg-green-500 text-white px-4 py-2 rounded-lg">Start Game</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['startGame']),
    startGame() {
      this.startGame().then(() => {
        this.$router.push('/game');
      });
    },
  },
};
</script>
