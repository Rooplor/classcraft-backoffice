<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '../services/auth'

const username = ref('')
const password = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await login(username.value, password.value)
    if (response.token) {
      router.push('/')
    } else {
      alert('Login failed')
    }
  } catch (error) {
    alert('Login failed')
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="login-container max-w-md mx-auto p-5 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 class="text-center mb-5 text-2xl font-semibold">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-4">
          <label for="username" class="block mb-2">Username:</label>
          <input type="text" v-model="username" required class="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <div class="form-group mb-4">
          <label for="password" class="block mb-2">Password:</label>
          <input type="password" v-model="password" required class="w-full p-2 border border-gray-300 rounded-md" />
        </div>
        <button type="submit" class="login-button w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">Login</button>
      </form>
    </div>
  </div>
</template>