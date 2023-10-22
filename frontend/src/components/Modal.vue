<template>
    <transition name="modal-fade">
      <div v-if="modelValue" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <slot></slot>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  
  const props = defineProps({
    modelValue: Boolean
  });
  
  const emit = defineEmits(['update:modelValue']);
  
  const closeModal = () => {
    emit('update:modelValue', false);
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 50%;
    max-height: 80%;
    overflow: auto;
  }
  
  .modal-fade-enter-active, .modal-fade-leave-active {
    transition: opacity 0.5s;
  }
  
  .modal-fade-enter, .modal-fade-leave-to {
    opacity: 0;
  }
  </style>
  