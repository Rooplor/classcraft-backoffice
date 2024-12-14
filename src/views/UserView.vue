<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { getUser } from "@/services/user.js";

const users = ref([]);
const searchQuery = ref('');
const router = useRouter();

const fetchUsers = async () => {
  try {
    const response = await getUser();
    users.value = Array.isArray(response) ? response : [];
  } catch (error) {
    console.error('Error fetching users:', error);
    users.value = [];
  }
};

onMounted(fetchUsers);

const filteredUsers = computed(() => {
  return users.value
    .filter(user => user.role)
    .filter(user =>
      user?.username?.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const goToEditPage = (id) => {
  router.push(`/user/${id}`);
};

const goToCreatePage = () => {
  router.push('/user');
};
</script>

<template>
  <div class="home-container p-5 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
    <h1 class="page-title text-2xl font-semibold text-center mb-5 text-gray-800">User Management</h1>
    <div class="actions flex justify-between mb-5 gap-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search users..."
        class="search-input flex-1 p-2 text-base border border-gray-300 rounded-md box-border"
      />
      <button @click="goToCreatePage" class="create-btn px-5 py-2 bg-blue-600 text-white text-base font-semibold rounded-md transition-colors duration-300 hover:bg-blue-700">Create User</button>
    </div>
    <table class="users-table w-full border-collapse rounded-lg overflow-hidden mt-2">
      <thead>
        <tr>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Username</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Role</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user._id" class="hover:bg-gray-100">
          <td class="p-3 border-b border-gray-300">{{ user.username }}</td>
          <td class="p-3 border-b border-gray-300">{{ user.role }}</td>
          <td class="p-3 border-b border-gray-300">
            <button @click="goToEditPage(user._id)" class="edit-btn px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-md transition-colors duration-300 hover:bg-green-700">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>