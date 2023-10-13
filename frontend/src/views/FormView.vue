<script setup lang="ts">
import { ref, reactive, computed, toRefs } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';

const formData = reactive({
  name: '',
  subject: '',
  level: '',
  duration: 0,
  teacher: '',
  fromDate: '',
  toDate: ''
});

const languages = [
  { id: 1, name: 'English', levels: ['Elementary', 'Intermediate'] },
  { id: 2, name: 'Spanish', levels: ['A1', 'A2', 'B1', 'B2'] },
  { id: 3, name: 'Deutsch', levels: ['Niveau A1', 'Niveau A2'] }
];

const teachers = ['Mr. Smith', 'Mrs. Johnson', 'Ms. Lee'];

const dateFormat = ref('dd-mm-yyyy');

const selectedLanguageLevels = computed(() => {
  const selectedLanguage = languages.find(lang => lang.name === formData.subject);
  return selectedLanguage ? selectedLanguage.levels : [];
});

const isValidDates = () => {
  if (formData.fromDate && formData.toDate) {
    return new Date(formData.fromDate) <= new Date(formData.toDate);
  }
  return true;
};

const submitForm = async () => {
  if (!isValidDates()) {
    alert('Invalid dates: "To" date cannot be before "From" date.');
    return;
  }

  try {
    const response = await fetch('http://localhost:4621/certificates/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...formData })
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSubjectChange = () => {
  formData.level = ''; // Reset level when subject changes
};

</script>

<template>
  <div id="app" class="flex two center">
    <div>
      <h2>Language Certificate Form</h2>
      <form @submit.prevent="submitForm">

        <!-- Name -->
        <p>
          <label>Name: </label>
          <input v-model="formData.name" type="text" required>
        </p>

        <!-- Language/Subject -->
        <p>
          <label>Language: </label>
          <select v-model="formData.subject" @change="handleSubjectChange">
            <option v-for="language in languages" :key="language.id" :value="language.name">
              {{ language.name }}
            </option>
          </select>
        </p>

        <!-- Levels -->
        <p v-if="selectedLanguageLevels.length">
          <label>Level: </label>
          <select v-model="formData.level">
            <option v-for="level in selectedLanguageLevels" :key="level">
              {{ level }}
            </option>
          </select>
        </p>

        <!-- From Date -->
        <p>
          <label>From: </label>
          <VueDatePicker v-model="formData.fromDate" :format="dateFormat" auto-apply :enable-time-picker="false">
          </VueDatePicker>
        </p>

        <!-- To Date -->
        <p>
          <label>To: </label>
          <VueDatePicker v-model="formData.toDate" :format="dateFormat" auto-apply :enable-time-picker="false">
          </VueDatePicker>
        </p>

        <!-- Duration -->
        <p>
          <label>Duration (in weeks): </label>
          <input type="number" v-model="formData.duration" required>
        </p>

        <!-- Teachers Selection -->
        <p>
          <label>Teacher: </label>
          <select v-model="formData.teacher">
            <option v-for="teacher in teachers" :key="teacher" :value="teacher">
              {{ teacher }}
            </option>
          </select>
        </p>

        <!-- Submit Button -->
        <p>
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  </div>
</template>


