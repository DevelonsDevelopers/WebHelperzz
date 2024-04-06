import axiosInstance from "./axiosInstance";

const categoryService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/categories/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default categoryService
