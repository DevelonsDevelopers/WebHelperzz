import axiosInstance from "./axiosInstance";

const emailService = {
    forgotPassword: async (payload) => {
        try {
            const response = await axiosInstance.post('/mailer/customerForgotPassword', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default emailService
