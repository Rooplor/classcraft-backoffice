<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getVenue, createVenue, updateVenue, deleteVenue } from '../services/venue'

const route = useRoute()
const router = useRouter()
const isEditMode = ref(false)
const venue = ref({
  room: '',
  location: {
    building: '',
    floor: 0
  },
  description: '',
  capacity: 0,
  imageUrl: ''
})

const fetchVenue = async () => {
  if (route.params.id) {
    isEditMode.value = true
    try {
      const response = await getVenue(route.params.id)
      venue.value = response
    } catch (error) {
      console.error('Error fetching venue:', error)
    }
  }
}

const handleDeleteVenue = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this venue?')
  if (confirmed) {
    try {
      await deleteVenue(route.params.id)
      router.push('/')
    } catch (error) {
      console.error('Error deleting venue:', error)
    }
  }
}

onMounted(fetchVenue)

const handleSubmit = async () => {
  try {
    if (isEditMode.value) {
      await updateVenue(route.params.id, venue.value)
    } else {
      await createVenue(venue.value)
    }
    router.push('/')
  } catch (error) {
    console.error('Error submitting form:', error)
  }
}
</script>

<template>
  <div class="venue-form-container max-w-md mx-auto my-10 p-8 rounded-lg bg-gray-100 shadow-lg">
    <h2 class="form-title text-center text-2xl mb-5 text-gray-800">{{ isEditMode ? 'Edit Venue' : 'Create Venue' }}</h2>
    <form @submit.prevent="handleSubmit" class="venue-form flex flex-col gap-4">
      <div class="form-group flex flex-col">
        <label for="room" class="font-semibold mb-2 text-gray-700">Room:</label>
        <input id="room" type="text" v-model="venue.room" placeholder="Enter venue room" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="building" class="font-semibold mb-2 text-gray-700">Building:</label>
        <input id="building" type="text" v-model="venue.location.building" placeholder="Enter building name" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="floor" class="font-semibold mb-2 text-gray-700">Floor:</label>
        <input id="floor" type="number" v-model="venue.location.floor" placeholder="Enter floor number" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="description" class="font-semibold mb-2 text-gray-700">Description:</label>
        <textarea id="description" v-model="venue.description" placeholder="Enter description" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-vertical min-h-20"></textarea>
      </div>
      <div class="form-group flex flex-col">
        <label for="capacity" class="font-semibold mb-2 text-gray-700">Capacity:</label>
        <input id="capacity" type="number" v-model="venue.capacity" placeholder="Enter capacity" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <div class="form-group flex flex-col">
        <label for="imageUrl" class="font-semibold mb-2 text-gray-700">Image URL:</label>
        <input id="imageUrl" type="text" v-model="venue.imageUrl" placeholder="Enter image URL" required class="p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"/>
      </div>
      <button type="submit" class="submit-btn py-3 bg-blue-600 text-white font-bold rounded-md transition-colors duration-300 hover:bg-blue-700 active:scale-95">{{ isEditMode ? 'Update Venue' : 'Create Venue' }}</button>
      <button v-if="isEditMode" @click="handleDeleteVenue" type="button" class="delete-btn py-3 bg-red-600 text-white font-bold rounded-md transition-colors duration-300 hover:bg-red-700 active:scale-95">Delete Venue</button>
    </form>
  </div>
</template>