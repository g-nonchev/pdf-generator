<script setup lang="ts">
import LoginComponent from '@/components/LoginComponent.vue';
import { isAuthenticated } from '@/stores/authStore';
import Modal from '@/components/Modal.vue';
import AddForm from '@/components/AddForm.vue';
import DataTable from '@/components/DataTable.vue';
import { useModal } from '@/composables/useModal';
import { useModalStore } from '@/stores/modalStore'

const modalStore = useModalStore()
const modal = useModal();

const openModal = () => {
  modalStore.toggleModal();
  modalStore.addRegNumber(0);
}
</script>

<template>
  <div class="flex demo">
    <LoginComponent v-if="!isAuthenticated" />
    <template v-else>
      <div class="p-1 full">
        <button class="success full" @click="openModal">Add New</button>
      </div>
      <Modal v-model="modalStore.isModalOpen">
        <!-- Your existing form goes here -->
        <AddForm></AddForm>
      </Modal>
      <DataTable></DataTable>
    </template>
  </div>
</template>
