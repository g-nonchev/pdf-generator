import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    isModalOpen: false,
    regNumber: 0
  }),
  actions: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen
    },
    addRegNumber(id: number) {
      this.regNumber = id
    }
  }
})