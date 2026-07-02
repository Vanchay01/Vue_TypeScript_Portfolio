import { apiURL } from "./apiURL";

export const educationAPI = {
  async addEducation(data: FormData) {
    return await apiURL.post('/education', data);
  },

  async getEducation() {
    return await apiURL.get(`/education`);
  },

  async getEducationById(id: number) {
    return await apiURL.get(`/education/${id}`);
  },

  async updateEducation(id: number, data: FormData) {
    return await apiURL.patch(`/education/${id}`, data);
  },

  async deleteEducation(id: number) {
    return await apiURL.delete(`/education/${id}`);
  },
};