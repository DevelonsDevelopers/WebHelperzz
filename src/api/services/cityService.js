import axiosInstance from "./axiosInstance";

const cityService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/cities/all');
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByTag: async (tag) => {
        try {
            const response = await axiosInstance.get('/cities/tag/' + tag)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default cityService