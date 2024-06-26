import axiosInstance from "./axiosInstance";

const customerService = {
    passwordLessCreate: async (payload) => {
        try {
            const response = await axiosInstance.post('/customers/passwordLessCreate', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    updatePassword: async (payload) => {
        try {
            const response = await axiosInstance.put('/customers/updatePassword', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    setPassword: async (payload) => {
        try {
            const response = await axiosInstance.put('/customers/setPassword', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    verifyEmail: async (payload) => {
        try {
            const response = await axiosInstance.put('/customers/verifyEmail', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    checkToken: async (token) => {
        try {
            const response = await axiosInstance.get('/customers/checkToken/' + token)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,
    getProfile: async () => {
        try {
            const response = await axiosInstance.get('/customers/profile')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,
    getReviews: async (id) => {
        try {
            const response = await axiosInstance.get('/customers/reviews')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,
    getRequest: async (id) => {
        try {
            const response = await axiosInstance.get('/customers/requests')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,

}

export default customerService
