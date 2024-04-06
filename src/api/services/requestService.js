import axiosInstance from "./axiosInstance";

const requestService = {
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/serviceRequests/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default requestService
