<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>