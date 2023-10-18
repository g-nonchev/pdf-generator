<template>
  <div class="flex demo">
    <button
      type="button"
      :data-number="id"
      @click="handleDownload"
      class="is-rows-el quick-btn btn success icon-download-alt"
    ></button>
    <button
      type="button"
      :data-number="id"
      @click="handleEdit"
      class="is-rows-el quick-btn btn icon-edit-alt"
    ></button>
    <button
      type="button"
      :data-number="id"
      @click="handleDelete"
      class="is-rows-el btn error quick-btn icon-trash"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { editItem, deleteItem, downloadItem } from '@/services/apiService.ts';

const { id } = defineProps({
  id: Number,
});

const handleDownload = () => {
  downloadItem(id);
  console.log(id + " Download button clicked!!");
};

const handleEdit = () => {
  console.log(id + " Edit button clicked!!");
};

const handleDelete = () => {
  console.log(id + " Delete button clicked!!");
};
</script>
