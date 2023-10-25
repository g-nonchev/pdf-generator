<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {certificates, getAllItems} from '@/services/apiService.ts';
import CrudBtn from '@/components/CrudBtn.vue';
import dayjs from 'dayjs';

onMounted(() => {
  getAllItems()
});

const certificateClicked = ref(null); // a new ref to store the clicked certificate's regNumber

const handleRowClick = (certificate: any) => {
  certificateClicked.value = certificate.regNumber; // set the clicked certificate's regNumber
};

const formatDate = (date: Date) => dayjs(date).format('DD-MM-YYYY');

</script>
  
<template>
  <div class="full flex center">
    <table v-if="certificates ">
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
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="certificate in certificates" 
        :key="certificate._id" 
        :class="{ 'edited-row': certificate.regNumber === certificateClicked }"
        @click="handleRowClick(certificate)">
          <td>{{ certificate.regNumber }}</td>
          <td>{{ certificate.name }}</td>
          <td class="bold">{{ certificate.subject }}</td>
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