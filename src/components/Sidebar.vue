<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
</script>

<template>
  <div class="h-screen bg-gray-200 text-black shadow-lg">
    <div class="flex items-center justify-center py-6 px-7 border-b border-gray-300">
      <h1 class="text-2xl font-semibold">Rooplor Backoffice</h1>
    </div>

    <div class="flex flex-col flex-grow">
      <router-link
          to="/"
          class="p-4 text-lg font-medium hover:bg-gray-300 hover:text-blue-500 transition"
          exact-active-class="bg-blue-500 text-white"
      >
        Venue
      </router-link>
      <router-link
          to="/classroom"
          class="p-4 text-lg font-medium hover:bg-gray-300 hover:text-blue-500 transition"
          exact-active-class="bg-blue-500 text-white"
      >
        Classroom
      </router-link>
      <router-link
          to="/user"
          class="p-4 text-lg font-medium hover:bg-gray-300 hover:text-blue-500 transition"
          exact-active-class="bg-blue-500 text-white"
      >
        User
      </router-link>
      <router-link
          to="/logs"
          class="p-4 text-lg font-medium hover:bg-gray-300 hover:text-blue-500 transition"
          exact-active-class="bg-blue-500 text-white"
      >
        Logs
      </router-link>
    </div>

    <div class="mt-auto border-t border-gray-300">
      <button
          @click="logout"
          class="w-full p-4 text-lg font-medium text-left hover:bg-red-500 hover:text-white transition"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>