import type { apiResponse, QueryParams, ResponsePagination } from "../types/apiResponse"
import type { Work } from "../types/work"
import { apiURL } from "./apiURL"

export const workAPI = {

    // create -------------------------------------------------------------------
    async create(form: FormData): Promise<apiResponse<Work>> {
        const {data} = await apiURL.post<apiResponse<Work>>("/work", form, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log(data)
        return data
    },
    
    // find -------------------------------------------------------------------
    async find(params?: QueryParams): Promise<apiResponse<ResponsePagination<Work[]>>>{
        const {data} = await apiURL.get<apiResponse<ResponsePagination<Work[]>>>(`/work`, {
            params
        })
        console.log("work.api-find: ", data)
        return data
    },

    // findOne -------------------------------------------------------------------
    async findOne(id: number): Promise<apiResponse<Work>>  {
        const {data} = await apiURL.get<apiResponse<Work>>(`/work/${id}`);
        return data
    },

    // updateOne -------------------------------------------------------------------
    async updateOne(id: number, form: FormData): Promise<apiResponse<Work>>  {
        console.log("skill.api",form)
        const {data} = await apiURL.patch<apiResponse<Work>>(`/work/${id}`, form, {
            headers: {
            'Content-Type': 'application/json'
            }
        });
        return data
    },

    // deleteOne -------------------------------------------------------------------
    async deleteOne(id: number): Promise<apiResponse<Work>>  {
        const {data} = await apiURL.delete<apiResponse<Work>> (`/work/${id}`);
        return data
    },
}