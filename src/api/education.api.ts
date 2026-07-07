import type { apiResponse } from "../types/apiResponse";
import type { Education } from "../types/education";
import { apiURL } from "./apiURL";

export const educationAPI = {
  // add education ----------------------------------------------------------------
  async addEducation(fromData: FormData): Promise<apiResponse<Education[]>> {
    console.log("Testing in API => FormData:", fromData);
    const {data} =  await apiURL.post<apiResponse<Education[]>>('/education', fromData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("DONE: ", data);
    return data;
  },

  // get education ----------------------------------------------------------------
  async getAll(): Promise<apiResponse<Education[]>> {
    const { data } = await apiURL.get<apiResponse<Education[]>>("/education");
    console.log("Testing in API => getAll:", data);
    return data;
  },

  // get education by ID ----------------------------------------------------------
  async getEducationById(id: number): Promise<apiResponse<Education>> {
    const { data } = await apiURL.get<apiResponse<Education>>(`/education/${id}`);
    return data;
  },

  // update education -------------------------------------------------------------
  async updateEducation(id: number, data: FormData) {
    return await apiURL.patch(`/education/${id}`, data);
  },

  // delete education -------------------------------------------------------------
  async deleteEducation(id: number): Promise<apiResponse<Education>>{
    const {data} = await apiURL.delete<apiResponse<Education>>(`/education/${id}`);
    return data
  },
  
};