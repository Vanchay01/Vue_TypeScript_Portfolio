import type { apiResponse } from "../types/apiResponse";
import type { Education } from "../types/education";
import { apiURL } from "./apiURL";

export const educationAPI = {
  // add education ----------------------------------------------------------------
  async addEducation(form: FormData): Promise<apiResponse<Education>> {
    const {data} =  await apiURL.post<apiResponse<Education>>('/education', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return data;
  },

  // get education ----------------------------------------------------------------
  async getAll(): Promise<apiResponse<Education[]>> {
    const { data } = await apiURL.get<apiResponse<Education[]>>("/education");
    return data;
  },

  // get education by ID ----------------------------------------------------------
  async getEducationById(id: number): Promise<apiResponse<Education>> {
    const { data } = await apiURL.get<apiResponse<Education>>(`/education/${id}`);
    return data;
  },

  // update education -------------------------------------------------------------
  async updateEducation(id: number, form: FormData): Promise<apiResponse<Education>> {
    console.log("education.api",form)
    const {data} = await apiURL.patch<apiResponse<Education>>(`/education/${id}`, form);
    return data
  },

  // delete education -------------------------------------------------------------
  async deleteEducation(id: number): Promise<apiResponse<Education>>{
    const {data} = await apiURL.delete<apiResponse<Education>>(`/education/${id}`);
    return data
  },
  
};