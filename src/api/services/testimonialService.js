import axiosInstance from "./axiosInstance";

const testimonialService = {
    fetchAll: async () => {
        try {
            const response = await axiosInstance.get('/testimonials/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    featured: async () => {
        try {
            const response = await axiosInstance.get('/testimonials/featured')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default testimonialService
