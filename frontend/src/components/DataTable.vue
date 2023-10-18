<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {certificates, getAllItems} from '@/services/apiService.ts';
import CrudBtn from '@/components/CrudBtn.vue';
import dayjs from 'dayjs';

onMounted(() => {
  getAllItems()
});

const formatDate = (date: Date) => dayjs(date).format('DD-MM-YYYY');

</script>
  
<template>
  <div>
    <table class="full center" v-if="certificates ">
      <thead>
        <tr>
          <th>N</th>
          <th>Name</th>
          <th>Subject</th>
          <th>Level</th>
          <th>Hr</th>
          <th>From_Date</th>
          <th>To_Date__</th>
          <th>Teacher</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="certificate in certificates" :key="certificate._id">
          <td>{{ certificate.regNumber }}</td>
          <td>{{ certificate.name }}</td>
          <td>{{ certificate.subject }}</td>
          <td>{{ certificate.level }}</td>
          <td>{{ certificate.duration }}</td>
          <td>{{ formatDate(certificate.fromDate) }}</td>
          <td>{{ formatDate(certificate.toDate) }}</td>
          <td>{{ certificate.teacher }}</td>
          <td><CrudBtn :id="certificate.regNumber" /></td>
        </tr>
      </tbody>
    </table>
    <p v-else>Loading certificates...</p>
  </div>
</template>