<script setup lang="ts">
import { ref} from 'vue';
import Modal from '@/components/Modal.vue';
import AddForm from '@/components/AddForm.vue';
import DataTable from '@/components/DataTable.vue';
import { useModal } from '@/composables/useModal';
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
const modal = useModal();
</script>

<template>
  <div id="app" class="flex demo">
    {{ modalStore.regNumber }}
    <button class="success full" @click="modalStore.toggleModal">Add New</button>

    <Modal v-model="modalStore.isModalOpen">
      <!-- Your existing form goes here -->
      <AddForm></AddForm>
    </Modal>
    <DataTable></DataTable>
  </div>
</template>
