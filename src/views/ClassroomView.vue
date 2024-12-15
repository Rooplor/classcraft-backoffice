<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getClassrooms } from "@/services/classroom.js";

const classrooms = ref([])
const searchQuery = ref('')
const router = useRouter()

const fetchClassrooms = async () => {
  try {
    classrooms.value = await getClassrooms()
  } catch (error) {
    console.error('Error fetching classrooms:', error)
  }
}

const filteredClassrooms = computed(() => {
  return classrooms.value.filter(classroom =>
    classroom?.title?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const goToDetailPage = (id) => {
  router.push(`/classroom/${id}`)
}

onMounted(fetchClassrooms)
</script>

<template>
  <div class="classroom-container p-5 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
    <h1 class="page-title text-2xl font-semibold text-center mb-5 text-gray-800">Classroom List</h1>
    <div class="actions flex justify-between mb-5 gap-2">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search classrooms..."
        class="search-input flex-1 p-2 text-base border border-gray-300 rounded-md box-border"
      />
    </div>
    <table class="classroom-table w-full border-collapse rounded-lg overflow-hidden mt-2">
      <thead>
        <tr>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Title</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Details</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Type</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Format</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Capacity</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="classroom in filteredClassrooms" :key="classroom._id.$oid" class="hover:bg-gray-100">
          <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ classroom.title }}</td>
          <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ classroom.details }}</td>
          <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ classroom.type }}</td>
          <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ classroom.format }}</td>
          <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ classroom.capacity }}</td>
          <td class="p-3 border-b border-gray-300">
            <button @click="goToDetailPage(classroom._id)" class="detail-btn px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-md transition-colors duration-300 hover:bg-blue-700">View Details</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>