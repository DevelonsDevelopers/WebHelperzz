import axiosInstance from "./axiosInstance";

const categoryService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/categories/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchCategoriesSubcategories: async () => {
        try {
            const response = await axiosInstance.get('/categories/categorySubcategories')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchByTag: async (tag) => {
        try {
            const response = await axiosInstance.get('/categories/tag/' + tag)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    
}

export default categoryService
