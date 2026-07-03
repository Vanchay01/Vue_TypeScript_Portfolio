import { apiURL } from "./apiURL";

export const educationAPI = {
  // add education ----------------------------------------------------------------
  async addEducation(data: FormData) {
    return await apiURL.post('/education', data);
  },

  // get education ----------------------------------------------------------------
  async getEducation() {
    return await apiURL.get(`/education`);
  },

  // get education by ID ----------------------------------------------------------
  async getEducationById(id: number) {
    return await apiURL.get(`/education/${id}`);
  },

  // update education -------------------------------------------------------------
  async updateEducation(id: number, data: FormData) {
    return await apiURL.patch(`/education/${id}`, data);
  },

  // delete education -------------------------------------------------------------
  async deleteEducation(id: number) {
    return await apiURL.delete(`/education/${id}`);
  },
};