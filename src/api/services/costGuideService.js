import axiosInstance from "./axiosInstance";

const costGuideService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/costGuides/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default costGuideService
