import axiosInstance from "./axiosInstance";

const reviewService = {
    category: async (category) => {
        try {
            const response = await axiosInstance.get('/reviews/category/' + category)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
}

export default reviewService
