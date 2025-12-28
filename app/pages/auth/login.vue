<script setup lang="ts">
const { fetch: refreshSession } = useUserSession()
const credentials = ref({
  email: '',
  password: '',
})

async function login() {
  try {
    await $fetch('/api/login', {
      method: 'POST',
      body: credentials.value,
    })

    await refreshSession()
    await navigateTo('/')
  } catch {
    alert('Bad credentials')
  }
}
</script>

<template>
  <div class="flex flex-1 items-center justify-center bg-gray-200">
    <form
      @submit.prevent="login"
      class="flex flex-col gap-4 bg-gray-300 rounded max-w-100 p-4"
    >
      <input
        v-model="credentials.email"
        type="email"
        placeholder="Email"
        class="border p-2 rounded"
      />
      <input
        v-model="credentials.password"
        type="password"
        placeholder="Password"
        class="border p-2 rounded"
      />
      <p>
        Don't have an account?
        <NuxtLink to="/auth/register" class="underline">register one</NuxtLink>
      </p>

      <button
        type="submit"
        class="bg-green-400 py-2 px-1 font-bold rounded cursor-pointer"
      >
        Login
      </button>
    </form>
  </div>
</template>
