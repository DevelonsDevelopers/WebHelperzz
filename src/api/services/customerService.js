import axiosInstance from "./axiosInstance";

const customerService = {
    passwordLessCreate: async (payload) => {
        try {
            const response = await axiosInstance.post('/customers/passwordLessCreate', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default customerService
