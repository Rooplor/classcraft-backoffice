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

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
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
  <div class="home-container">
    <div class="container">
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
    <h1 class="page-title">Venue Management Test Edit</h1>
    <div class="actions">
      <input
          type="text"
          v-model="searchQuery"
          placeholder="Search venues..."
          class="search-input"
      />
      <button @click="goToCreatePage" class="create-btn">Create Venue</button>
    </div>
    <table class="venues-table">
      <thead>
      <tr>
        <th>Room</th>
        <th>Building</th>
        <th>Floor</th>
        <th>Description</th>
        <th>Capacity</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="venue in filteredVenues" :key="venue._id">
        <td>{{ venue.room }}</td>
        <td>{{ venue.location?.building || 'N/A' }}</td>
        <td>{{ venue.location?.floor || 'N/A' }}</td>
        <td>{{ venue.description || 'N/A' }}</td>
        <td>{{ venue.capacity || 'N/A' }}</td>
        <td>
          <button @click="goToEditPage(venue._id)" class="edit-btn">Edit</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.container {
  display: flex;
  justify-content: flex-end;
}

.page-title {
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
}

.search-input {
  flex: 1;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

.create-btn {
  padding: 10px 20px;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.logout-btn {
  padding: 6px 12px;
  background-color: #dc3545;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-btn:hover {
  background-color: #0056b3;
}

.venues-table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 10px;
}

.venues-table th,
.venues-table td {
  padding: 12px 15px;
  text-align: left;
}

.venues-table th {
  background-color: #f4f4f4;
  font-size: 1rem;
  font-weight: 600;
}

.venues-table td {
  border-bottom: 1px solid #ddd;
}

.venues-table tr:hover {
  background-color: #f9f9f9;
}

.edit-btn {
  padding: 6px 12px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn:hover {
  background-color: #218838;
}
</style>
