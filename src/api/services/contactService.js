import axiosInstance from "./axiosInstance";

const contactService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/contact/create', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/contact/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default contactService
