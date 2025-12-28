<script setup lang="ts">
const { loggedIn, user, fetch: refreshSession } = useUserSession()

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const registerData = ref<RegisterData>({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
})

async function register() {
  try {
    await $fetch('/api/register', {
      method: 'POST',
      body: registerData,
    })

    await refreshSession()
    await navigateTo('/auth/login')
  } catch {
    alert('Bad credentials')
  }
}
</script>

<template>
  <div class="flex flex-1 items-center justify-center bg-gray-200">
    <form
      @submit.prevent="register"
      class="flex flex-col gap-4 bg-gray-300 rounded max-w-100 p-4"
    >
      <input
        v-model="registerData.name"
        type="name"
        placeholder="Name"
        class="border p-2 rounded"
      />
      <input
        v-model="registerData.email"
        type="email"
        placeholder="Email"
        class="border p-2 rounded"
      />
      <input
        v-model="registerData.password"
        type="password"
        placeholder="Password"
        class="border p-2 rounded"
      /><input
        v-model="registerData.confirmPassword"
        type="password"
        placeholder="Confirm password"
        class="border p-2 rounded"
      />
      <p>
        Have an account?
        <NuxtLink to="/auth/login" class="underline">go login</NuxtLink>
      </p>

      <button
        type="submit"
        class="bg-green-400 py-2 px-1 font-bold rounded cursor-pointer"
      >
        Register
      </button>
    </form>
  </div>
</template>
