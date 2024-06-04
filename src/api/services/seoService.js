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
    }
}
export default seoService
