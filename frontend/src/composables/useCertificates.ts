import { ref } from 'vue';

const certificates = ref([]);

const fetchCertificates = async () => {
  try {
    const response = await fetch('http://localhost:4621/certificates/all');
    const data = await response.json();
    certificates.value = data;
  } catch (error) {
    console.error('Error fetching certificates:', error);
  }
};

export { certificates, fetchCertificates };