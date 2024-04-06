import axiosInstance from "./axiosInstance";

const blogService = {
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
