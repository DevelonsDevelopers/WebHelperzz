import axiosInstance from "./axiosInstance";

const subcategoryService = {
    fetchByCategory: async (id) => {
        try {
            const response = await axiosInstance.get('/subcategories/category/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default subcategoryService
