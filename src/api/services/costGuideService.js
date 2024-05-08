import axiosInstance from "./axiosInstance";

const costGuideService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/costGuides/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByID: async (id) => {
        try {
            const response = await axiosInstance.get('/costGuides/single/' + id);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByTag: async (tag) => {
        try {
            const response = await axiosInstance.get('/costGuides/tag/' + tag);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default costGuideService
