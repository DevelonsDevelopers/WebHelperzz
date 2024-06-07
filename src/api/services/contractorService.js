import axiosInstance from "./axiosInstance";

const contractorService = {
    join: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/join', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    create: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    createDetails: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createDetails', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    filters: async () => {
        try {
            const response = await axiosInstance.get('/contractors/filters')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    fetchAllActive: async () => {
        try {
            const response = await axiosInstance.get('/contractors/allActive')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    featured: async () => {
        try {
            const response = await axiosInstance.get('/contractors/featured')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    },
    category: async (category, data) => {
        try {
            const response = await axiosInstance.post('/contractors/category/' + category, data)
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
    detailsTag: async (id) => {
        try {
            const response = await axiosInstance.get('/contractors/detailsTag/' + id)
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
    createDocument: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/createDocument', payload)
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
    } ,
    addContractorRequest: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractorRequests/create', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,
    checkContractor: async (payload) => {
        try {
            const response = await axiosInstance.post('/contractors/check', payload)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,
    contractorGallery: async (id) => {
        try {
            const response = await axiosInstance.get(`/contractors/gallery/${id}`)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,
    contractorBySubcategory: async (id) => {
        try {
            const response = await axiosInstance.post(`/contractors/subcategory/${id}`)
            return response.data
        } catch (error) {
            throw error.response.data
        }
    } ,


}

export default contractorService
