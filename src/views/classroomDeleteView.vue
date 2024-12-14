<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getClassroom, deleteClassroom } from '@/services/classroom.js'

const route = useRoute()
const router = useRouter()
const classroom = ref(null)

const fetchClassroom = async () => {
  if (route.params.id) {
    try {
      classroom.value = await getClassroom(route.params.id)
      console.log(classroom.value.coOwners)
    } catch (error) {
      console.error('Error fetching classroom:', error)
    }
  }
}

const handleDeleteClassroom = async () => {
  const confirmed = window.confirm('Are you sure you want to delete this classroom?')
  if (confirmed) {
    try {
      await deleteClassroom(route.params.id)
      router.push('/classroom')
    } catch (error) {
      console.error('Error deleting classroom:', error)
    }
  }
}

onMounted(fetchClassroom)
</script>

<template>
  <div class="classroom-container max-w-4xl mx-auto my-10 p-8 rounded-lg bg-white shadow-md">
    <h2 class="form-title text-center text-3xl mb-8 font-bold text-gray-800">Classroom Details</h2>
    <div v-if="classroom" class="classroom-details space-y-4 max-h-[calc(100vh-22rem)] overflow-y-auto">
      <table class="w-full border-collapse border border-gray-300 text-left">
        <tbody>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Title</th>
          <td class="p-4">{{ classroom.title }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Details</th>
          <td class="p-4">{{ classroom.details }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Target</th>
          <td class="p-4">{{ classroom.target }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Prerequisite</th>
          <td class="p-4">{{ classroom.prerequisite }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Type</th>
          <td class="p-4">{{ classroom.type }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Format</th>
          <td class="p-4">{{ classroom.format }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Capacity</th>
          <td class="p-4">{{ classroom.capacity }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Dates</th>
          <td class="p-4">
            <ul class="list-disc ml-4">
              <li v-for="date in classroom.dates" :key="date.dates.startDateTime.$date">
                <span class="font-medium">Start:</span> {{ new Date(date.dates.startDateTime.$date).toLocaleString() }},
                <span class="font-medium">End:</span> {{ new Date(date.dates.endDateTime.$date).toLocaleString() }},
                <span class="font-medium">Venue ID:</span> {{ date.venueId.join(', ') }}
              </li>
            </ul>
          </td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Stepper Status</th>
          <td class="p-4">{{ classroom.stepperStatus }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Registration Status</th>
          <td class="p-4">{{ classroom.registrationStatus ? 'Open' : 'Closed' }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Published</th>
          <td class="p-4">{{ classroom.isPublished ? 'Yes' : 'No' }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Venue Status</th>
          <td class="p-4">{{ classroom.venueStatus }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Instructor Name</th>
          <td class="p-4">{{ classroom.instructorName }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Instructor Bio</th>
          <td class="p-4">{{ classroom.instructorBio }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Instructor Avatar</th>
          <td class="p-4">
            <img :src="classroom.instructorAvatar" alt="Instructor Avatar" class="w-20 h-20 rounded-full border-2 border-gray-300">
          </td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Instructor Familiarity</th>
          <td class="p-4">{{ classroom.instructorFamiliarity }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Cover Image</th>
          <td class="p-4">
            <img :src="classroom.coverImage" alt="Cover Image" class="w-full h-auto rounded-md border border-gray-300">
          </td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Created When</th>
          <td class="p-4">{{ new Date(classroom.createdWhen.$date).toLocaleString() }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Updated When</th>
          <td class="p-4">{{ new Date(classroom.updatedWhen.$date).toLocaleString() }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Owner</th>
          <td class="p-4">{{ classroom.owner }}</td>
        </tr>
        <tr class="border-b border-gray-300">
          <th class="p-4 bg-gray-100 font-medium">Co-Owners</th>
          <td class="p-4">{{ classroom.coOwners?.join(', ') }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-center text-gray-600">
      <p>Loading...</p>
    </div>
    <button @click="handleDeleteClassroom" type="button" class="py-3 px-6 bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300 hover:bg-red-700 active:scale-95 mt-6">Delete Classroom</button>
  </div>
</template>
