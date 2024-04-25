import axiosInstance from "./axiosInstance";

const blogService = {
    fetch: async (id) => {
        try {
            const response = await axiosInstance.get('/blogs/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByTag: async (tag) => {
        try {
            const response = await axiosInstance.get('/blogs/tag/' + tag);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/blogs/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default blogService
