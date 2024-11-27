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
  try {
    await deleteVenue(route.params.id)
    router.push('/')
  } catch (error) {
    console.error('Error deleting venue:', error)
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
  <div class="venue-form-container">
    <h2 class="form-title">{{ isEditMode ? 'Edit Venue' : 'Create Venue' }}</h2>
    <form @submit.prevent="handleSubmit" class="venue-form">
      <div class="form-group">
        <label for="room">room:</label>
        <input id="room" type="text" v-model="venue.room" placeholder="Enter venue room" required/>
      </div>
      <div class="form-group">
        <label for="building">Building:</label>
        <input id="building" type="text" v-model="venue.location.building" placeholder="Enter building name" required/>
      </div>
      <div class="form-group">
        <label for="floor">Floor:</label>
        <input id="floor" type="number" v-model="venue.location.floor" placeholder="Enter floor number" required/>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="venue.description" placeholder="Enter description" required></textarea>
      </div>
      <div class="form-group">
        <label for="capacity">Capacity:</label>
        <input id="capacity" type="number" v-model="venue.capacity" placeholder="Enter capacity" required/>
      </div>
      <div class="form-group">
        <label for="imageUrl">Image URL:</label>
        <input id="imageUrl" type="text" v-model="venue.imageUrl" placeholder="Enter image URL" required/>
      </div>
      <button type="submit" class="submit-btn">{{ isEditMode ? 'Update Venue' : 'Create Venue' }}</button>
      <button v-if="isEditMode" @click="handleDeleteVenue" type="button" class="delete-btn">Delete Venue</button>
    </form>
  </div>
</template>

<style scoped>
.venue-form-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: #333;
}

.venue-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #555;
}

input[type="text"],
input[type="number"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

input:focus,
textarea:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.3);
}

.submit-btn {
  padding: 12px;
  background: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #0056b3;
}

.submit-btn:active {
  transform: scale(0.98);
}

.delete-btn {
  padding: 10px;
  background: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease;
}

.delete-btn:hover {
  background: #c82333;
}

.delete-btn:active {
  transform: scale(0.98);
}
</style>
