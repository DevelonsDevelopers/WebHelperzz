import axiosInstance from "./axiosInstance";

const authenticationService = {
    login: async (payload) => {
        try {
            const response = await axiosInstance.post('/auth/customer/login', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    register: async (payload) => {
        try {
            const response = await axiosInstance.post('/auth/customer/register', payload);
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default authenticationService
