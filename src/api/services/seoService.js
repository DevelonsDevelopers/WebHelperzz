import axiosInstance from "./axiosInstance";

const seoService = {
    fetchSEObyRoute: async (route) => {
        try {
            const response = await axiosInstance.get('/seo/get/' + route)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    contractorSeo: async (tag) => {
        try {
            const response = await axiosInstance.get('/seo/contractor/' + tag)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    BlogSeo: async (tag) => {
        try {
            const response = await axiosInstance.get('/seo/blog/' + tag)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    CostGuideSeo: async (id) => {
        try {
            const response = await axiosInstance.get('/seo/costguide/' + id)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    SubCategorySeo: async (tag) => {
        try {
            const response = await axiosInstance.get('/seo/subcategory/' + tag)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    CategorySeo: async (tag) => {
        try {
            const response = await axiosInstance.get('/seo/category/' + tag)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    CategoryCitySeo: async (tag) => {
        try {
            const response = await axiosInstance.get('/seo/categorycity/' + tag)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
    CostguideSeo: async (tag) => {
        try {
            const response = await axiosInstance.get('/seo/costguide/' + tag)
            return response.data
        } catch (error) {
            // throw error.response.data
            console.log('error seo' , error)
        }
    },
}
export default seoService
