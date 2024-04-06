import axiosInstance from "./axiosInstance";

const contractorService = {
    featured: async () => {
        try {
            const response = await axiosInstance.get('/contractors/featured')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    category: async (category) => {
        try {
            const response = await axiosInstance.get('/contractors/category/' + category)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    details: async (id) => {
        try {
            const response = await axiosInstance.get('/contractors/details/' + id)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createReview: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createReview', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    addImage: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/addReviewImage', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default contractorService
