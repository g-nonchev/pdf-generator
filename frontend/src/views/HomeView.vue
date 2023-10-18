<script setup lang="ts">
import { ref} from 'vue';
import Modal from '@/components/Modal.vue';
import AddForm from '@/components/AddForm.vue';
import DataTable from '@/components/DataTable.vue';

const isModalOpen = ref(false);

// Method to toggle the modal's state
const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
}

</script>

<template>
  <div id="app" class="flex demo">
    <button @click="toggleModal">Add New</button>

    <Modal v-model="isModalOpen">
      <!-- Your existing form goes here -->
      <AddForm></AddForm>
    </Modal>
    <DataTable></DataTable>
  </div>
</template>
