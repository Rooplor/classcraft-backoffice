<script setup>
import {computed, onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import {getVenues} from '../services/venue'

const venues = ref([])
const searchQuery = ref('')
const router = useRouter()

const fetchVenues = async () => {
  try {
    venues.value = await getVenues()
  } catch (error) {
    console.error('Error fetching venues:', error)
  }
}

onMounted(fetchVenues)

const filteredVenues = computed(() => {
  return venues.value.filter(venue =>
      venue?.room?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const goToEditPage = (id) => {
  router.push(`/venue/${id}`)
}

const goToCreatePage = () => {
  router.push('/venue')
}
</script>

<template>
  <div class="home-container p-5 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
    <h1 class="page-title text-2xl font-semibold text-center mb-5 text-gray-800">Venue Management</h1>
    <div class="actions flex justify-between mb-5 gap-2">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Search venues..."
          class="search-input flex-1 p-2 text-base border border-gray-300 rounded-md box-border"
      />
      <button @click="goToCreatePage" class="create-btn px-5 py-2 bg-blue-600 text-white text-base font-semibold rounded-md transition-colors duration-300 hover:bg-blue-700">Create Venue</button>
    </div>
    <table class="venues-table w-full border-collapse rounded-lg overflow-hidden mt-2">
      <thead>
      <tr>
        <th class="p-3 text-left bg-gray-200 text-base font-semibold">Room</th>
        <th class="p-3 text-left bg-gray-200 text-base font-semibold">Building</th>
        <th class="p-3 text-left bg-gray-200 text-base font-semibold">Floor</th>
        <th class="p-3 text-left bg-gray-200 text-base font-semibold">Description</th>
        <th class="p-3 text-left bg-gray-200 text-base font-semibold">Capacity</th>
        <th class="p-3 text-left bg-gray-200 text-base font-semibold">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="venue in filteredVenues" :key="venue._id" class="hover:bg-gray-100">
        <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ venue.room }}</td>
        <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ venue.location?.building || 'N/A' }}</td>
        <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ venue.location?.floor || 'N/A' }}</td>
        <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ venue.description || 'N/A' }}</td>
        <td class="p-3 border-b border-gray-300 truncate max-w-xs">{{ venue.capacity || 'N/A' }}</td>
        <td class="p-3 border-b border-gray-300">
          <button @click="goToEditPage(venue._id)" class="edit-btn px-3 py-2 bg-green-600 text-white text-sm font-semibold rounded-md transition-colors duration-300 hover:bg-green-700">Edit</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>