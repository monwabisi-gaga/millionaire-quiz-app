<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4">Game Over</h2>
      <p class="text-xl mb-4">
        You got {{ $route.query.correctAnswers }} questions correct.
      </p>
      <p class="text-xl mb-4">Your total winnings: {{ $route.query.winnings }}</p>
      <router-link to="/" class="bg-green-500 text-white px-4 py-2 rounded-lg">
        Play Again
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}
</style>
