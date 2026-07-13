import type { apiResponse } from "../types/apiResponse";
import type { Skill } from "../types/skill";
import { apiURL } from "./apiURL";

export const skillAPI = {

  // create -------------------------------------------------------------------
  async create(form: FormData): Promise<apiResponse<Skill>> {
    const {data} = await apiURL.post<apiResponse<Skill>>("/skill", form);
    return data
  },

  // find -------------------------------------------------------------------
  async find(): Promise<apiResponse<Skill>> {
    const {data} = await apiURL.get<apiResponse<Skill>>("/skill");
    return data
  },

  // findOne -------------------------------------------------------------------
  async findOne(id: number): Promise<apiResponse<Skill>>  {
    const {data} = await apiURL.get<apiResponse<Skill>>(`/skill${id}`);
    return data
  },

  // updateOne -------------------------------------------------------------------
  async updateOne(id: number, form: FormData): Promise<apiResponse<Skill>>  {
    const {data} = await apiURL.patch<apiResponse<Skill>>(`/skill/${id}`, form);
    return data
  },

  // deleteOne -------------------------------------------------------------------
  async deleteOne(id: number): Promise<apiResponse<Skill>>  {
    const {data} = await apiURL.delete<apiResponse<Skill>> (`/skill${id}`);
    return data
  },
};
