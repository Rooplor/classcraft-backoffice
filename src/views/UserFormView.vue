<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getUserById, createUser, updateUser, deleteUser } from '@/services/user.js'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
const user = ref({
  username: '',
  password: '',
  confirmPassword: '',
  role: 'user'
})

const fetchUser = async () => {
  if (route.params.id) {
    isEditMode.value = true
    try {
      const response = await getUserById(route.params.id)
      user.value = {
        username: response.username,
        role: response.role,
        password: '',
        confirmPassword: ''
      }
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}

const handleDeleteUser = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this user?')
  if (confirmed) {
    try {
      await deleteUser(route.params.id)
      router.push('/users')
    } catch (error) {
      console.error('Error deleting user:', error)
    }
  }
}

onMounted(fetchUser)

const handleSubmit = async () => {
  if (user.value.password !== user.value.confirmPassword) {
    alert('Passwords do not match')
    return
  }
  try {
    if (isEditMode.value) {
      await updateUser(route.params.id, user.value)
    } else {
      await createUser(user.value)
    }
    router.push('/users')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<template>
  <div class="user-form-container max-w-md mx-auto my-10 p-8 rounded-lg bg-gray-100 shadow-lg">
    <h2 class="form-title text-center text-2xl mb-5 text-gray-800">{{ isEditMode ? 'Edit User' : 'Create User' }}</h2>
    <form @submit.prevent="handleSubmit" class="user-form flex flex-col gap-4">
      <div class="form-group flex flex-col">
        <label for="username" class="font-semibold mb-2 text-gray-700">Username:</label>
        <input id="username" type="text" v-model="user.username" placeholder="Enter username" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="password" class="font-semibold mb-2 text-gray-700">Password:</label>
        <input id="password" type="password" v-model="user.password" placeholder="Enter password" class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="confirmPassword" class="font-semibold mb-2 text-gray-700">Confirm Password:</label>
        <input id="confirmPassword" type="password" v-model="user.confirmPassword" placeholder="Confirm password" class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="role" class="font-semibold mb-2 text-gray-700">Role:</label>
        <select id="role" v-model="user.role" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit" class="submit-btn py-3 bg-blue-600 text-white font-bold rounded-md transition-colors duration-300 hover:bg-blue-700 active:scale-95">{{ isEditMode ? 'Update User' : 'Create User' }}</button>
      <button v-if="isEditMode" @click="handleDeleteUser" type="button" class="delete-btn py-3 bg-red-600 text-white font-bold rounded-md transition-colors duration-300 hover:bg-red-700 active:scale-95">Delete User</button>
    </form>
  </div>
</template>