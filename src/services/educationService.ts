// services/education.service.ts
import { educationAPI } from "../api/education.api";
import type { Education } from "../types/education";

// add education ----------------------------------------------------------------
export const addEducation = async (data: Education) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key,value])=>{
        if(value !== undefined && value !== null){
            formData.append(key,value as any)
        }
    })
    console.log(formData)
    return 
    // await educationAPI.addEducation(formData)
}

// fetch education ----------------------------------------------------------------
export const getEducation = async() => {
    return await educationAPI.getEducation()
}