<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="offset-0 h-full flex flex-col justify-center items-center gap-4">
    <h2 class="text-2xl">Welcome to note easy app</h2>
    <button
      class="bg-green-400 px-4 py-2 rounded font-bold cursor-pointer"
      @click="navigateTo('/notes?page=1')"
    >
      Start to note now
    </button>
  </div>
</template>
