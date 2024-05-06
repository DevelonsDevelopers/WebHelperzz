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
    featured: async () => {
        try {
            const response = await axiosInstance.get('/categories/featured')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    popular: async () => {
        try {
            const response = await axiosInstance.get('/categories/popular')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    categoriesContractors: async () => {
        try {
            const response = await axiosInstance.get('/categories/categoriesContractors')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    banner: async () => {
        try {
            const response = await axiosInstance.get('/categories/banner')
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
    fetchAllTopContractors: async () => {
        try {
            const response = await axiosInstance.get('/categories/topContractors')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,

}

export default categoryService
