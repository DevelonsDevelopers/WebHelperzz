import axiosInstance from "./axiosInstance";

const subcategoryService = {
    fetchByCategory: async (id) => {
        try {
            const response = await axiosInstance.get('/subcategories/category/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchContractorBySubcategory: async (id) => {
        try {
            const response = await axiosInstance.get('/subcategories/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByTag: async (tag) => {
        try {
            const response = await axiosInstance.get('/subcategories/tag/' + tag)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default subcategoryService
