import { ref } from 'vue';

interface rowData {
    _id: String,
    regNumber: Number,
    name: String,
    fromDate: Date,
    toDate: Date,
    subject: String,
    level: String,
    duration: Number,
    teacher: String
}

const certificates = ref<rowData[]>([]);

const API_URL = 'http://localhost:4621/certificates';

const createItem = async (formData: any) => {
    try {
        const response = await fetch(`${API_URL}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData })
        });
        const data = await response.json();
        certificates.value = [data, ...certificates.value];
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}


const editItem = async (id: string, formData: any) => {
    try {
        const response = await fetch(`${API_URL}/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ...formData })
        });

        const data = await response.json();

        // If the edit was successful, update the local state.
        // Assuming the API returns the updated item when the edit is successful.
        if (data && data._id) {
            const index = certificates.value.findIndex(cert => cert._id === id);
            if (index !== -1) {
                certificates.value[index] = data;
                console.log(`Item with ID ${id} updated!`);
            }
        } else {
            console.error("Error editing item:", data.message);
        }
    } catch (error) {
        console.error("Error editing item:", error);
    }
};

const deleteItem = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/delete/${id}`, {
            method: 'DELETE'
        });

        const data = await response.json();

        // Check if deletion was successful before updating the local state.
        // Assuming the API returns { success: true } when deletion is successful.
        if (data && data.success) {
            certificates.value = certificates.value.filter(cert => cert._id !== id);
            console.log(`Item with ID ${id} deleted!`);
        } else {
            console.error("Error deleting item:", data.message);
        }
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

const downloadItem = async (id: number) => {
    try {
        // Make a GET request to fetch the file associated with the certificate.
        const response = await fetch(`${API_URL}/download/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/octet-stream', // Assuming you're downloading binary data.
            },
        });

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error('Failed to download file.');
        }

         // Convert the response to a blob
         const blob = await response.blob();

         // Create a blob URL for the blob object
         const url = window.URL.createObjectURL(blob);
 
         // Use an anchor (<a>) element to trigger the download
         const a = document.createElement("a");
         a.href = url;
         a.download = `${id}.pdf`;  // You can name the file as you wish
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a);
 
         // Revoke the URL after its use to free up resources
         window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading certificate:', error);
    }
};

const getAllItems = async () => {
    try {
        const response = await fetch(`${API_URL}/all`);

        const data = await response.json();
        certificates.value = data;
    } catch (error) {
        console.error('Error fetching certificates:', error);
    }
};

const useCertificates = () => {
    getAllItems();
    return certificates;
};

export { certificates, useCertificates, createItem, getAllItems, editItem , deleteItem, downloadItem};