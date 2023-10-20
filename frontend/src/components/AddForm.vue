<script setup lang="ts">
import { ref, reactive, computed, toRefs, onMounted } from 'vue';
import { certificates, createItem, editItem } from '@/services/apiService.ts';
import VueDatePicker from '@vuepic/vue-datepicker';
import { useModalStore } from '@/stores/modalStore'

const modal = useModalStore()
const regNumber = modal.regNumber;

const formData = reactive({
  name: '',
  subject: '',
  level: '',
  duration: 0,
  teacher: '',
  fromDate: '',
  toDate: '',
  isKid: false
});

if (regNumber !== 0) {
  const certificate = certificates.value.find(cert => cert.regNumber === regNumber);
  if (certificate) {
    Object.keys(certificate).forEach(key => {
      if (formData[key] !== undefined) {
        formData[key] = certificate[key];
      }
    });
  }
}

const languages = [
  {
    id: 1,
    name: 'English',
    levels: ['Elementary', 'Intermediate'],
    teachers: ['Mr. A', 'Mrs. B']
  },
  {
    id: 2,
    name: 'Spanish',
    levels: ['A1', 'A2', 'B1', 'B2'],
    teachers: ['Mr. A', 'Mrs. B']
  },
  {
    id: 3,
    name: 'Deutsch',
    levels: ['Niveau A1', 'Niveau A2'],
    teachers: ['Mr. A', 'Mrs. B']
  }
];



const dateFormat = ref('dd-MM-yyyy');

const getSelectedLanguage = computed(() => {
  const selectedLanguage = languages.find(lang => lang.name === formData.subject);
  return selectedLanguage ? selectedLanguage : languages[1];
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
  if (regNumber != 0) {
    editItem(regNumber, formData)
    modal.toggleModal();
    return;
  }
  createItem(formData)
};


const handleSubjectChange = () => {
  formData.level = ''; // Reset level when subject changes
};

</script>

<template>
  <div>
    <form @submit.prevent="submitForm">

      <!-- Name -->
      <div class="p-1 flex five">
        <h2 v-if="regNumber"><span class="label warning">{{ regNumber }}</span></h2>
        <p class="full four-fifth ">
          <label>Name: </label>
          <input v-model="formData.name" type="text" required>
        </p>
      </div>

      <!-- From Date -->
      <div class="flex three grow demo p-1">
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
          <label>Duration (in hrs): </label>
          <input type="number" v-model="formData.duration" required>
        </p>

      </div>


      <!-- Language/Subject -->
      <p class="p-1">
        <label>Language: </label>
        <select v-model="formData.subject" @change="handleSubjectChange">
          <option v-for="language in languages" :key="language.id" :value="language.name">
            {{ language.name }}
          </option>
        </select>
      </p>

      <!-- Levels -->
      <p class="p-1" v-if="getSelectedLanguage.levels.length">
        <label>Level: </label>
        <select v-model="formData.level">
          <option v-for="level in getSelectedLanguage.levels" :key="level">
            {{ level }}
          </option>
        </select>
      </p>

      <!-- Teachers Selection -->

      <p class="p-1" v-if="getSelectedLanguage.teachers.length">
        <label>Teacher: </label>
        <select v-model="formData.teacher">
          <option v-for="teacher in getSelectedLanguage.teachers" :key="teacher" :value="teacher">
            {{ teacher }}
          </option>
        </select>
      </p>

      <!-- Submit Button -->
      <div class="flex p-1">
        <p >
          <button type="submit">Save</button>
        </p>
        <label class="p-1">
          <input type="checkbox" v-model="formData.isKid">
          <span class="checkable">Kids</span>
        </label>
      </div>
    </form>
  </div>
</template>