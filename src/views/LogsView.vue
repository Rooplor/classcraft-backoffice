<script setup>
import { ref, onMounted } from 'vue'
import { getLogs } from '../services/logs'

const logs = ref([])

const fetchLogs = async () => {
  try {
    logs.value = await getLogs()
  } catch (error) {
    console.error('Error fetching logs:', error)
  }
}

onMounted(fetchLogs)
</script>

<template>
  <div class="logs-container p-5 max-w-5xl mx-auto bg-white shadow-md rounded-lg">
    <h1 class="page-title text-2xl font-semibold text-center mb-5 text-gray-800">Logs</h1>
    <table class="logs-table w-full border-collapse rounded-lg overflow-hidden mt-2">
      <thead>
        <tr>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Username</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Action</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Details</th>
          <th class="p-3 text-left bg-gray-200 text-base font-semibold">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="log in logs" :key="log._id.$oid" class="hover:bg-gray-100">
          <td class="p-3 border-b border-gray-300">{{ log.username }}</td>
          <td class="p-3 border-b border-gray-300">{{ log.action }}</td>
          <td class="p-3 border-b border-gray-300">
            <ul>
              <li v-if="log.detail && Object.keys(log.detail).length" v-for="(detail, key) in log.detail" :key="key">
                {{ key }}: from {{ detail.from }} to {{ detail.to }}
              </li>
              <li v-else>-</li>
            </ul>
          </td>
          <td class="p-3 border-b border-gray-300">{{ new Date(log.timestamp).toLocaleString() }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>