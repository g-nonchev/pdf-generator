import { ref } from 'vue';

export function useModal() {
  const isModalOpen = ref(false);
  const regNumber = ref(0);

  const toggleModal = () => {
    isModalOpen.value = !isModalOpen.value;
  }

  const addRegNumber = (id: number) => {
    regNumber.value = id;
  }

  return { isModalOpen, toggleModal, regNumber, addRegNumber };
}
