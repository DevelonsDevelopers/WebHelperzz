import axiosInstance from "./axiosInstance";

const successStoriesService = {
    fetchSuccessStories: async (id) => {
        try {
            const response = await axiosInstance.get('successStory/all')
            return response.data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default successStoriesService
