<template>
    <div>
      <table v-if="certificates.length">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Level</th>
            <th>Duration</th>
            <th>Teacher</th>
            <th>From Date</th>
            <th>To Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="certificate in certificates" :key="certificate._id">
            <td>{{ certificate._id }}</td>
            <td>{{ certificate.name }}</td>
            <td>{{ certificate.subject }}</td>
            <td>{{ certificate.level }}</td>
            <td>{{ certificate.duration }}</td>
            <td>{{ certificate.teacher }}</td>
            <td>{{ certificate.fromDate }}</td>
            <td>{{ certificate.toDate }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Loading certificates...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const certificates = ref([]);
  
  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:4621/certificates/all');
      certificates.value = await response.json();
    } catch (error) {
      console.error("Failed to fetch certificates:", error);
    }
  });
  </script>
  