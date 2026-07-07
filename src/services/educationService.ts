// services/education.service.ts
import { educationAPI } from "../api/education.api";
import type { EducationFrom } from "../types/education";

// add education ----------------------------------------------------------------
export const addEducation = async (data: EducationFrom) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as any)
        }
    })
    console.log("Testing => FormData:", formData);
    return await educationAPI.addEducation(formData)
}

// fetch education ----------------------------------------------------------------
export const getEducation = () => {
    return educationAPI.getAll()
}

// get education by ID ----------------------------------------------------------------
export const getEducationById = (id: number) => {
    return educationAPI.getEducationById(id)
}

// delete education ------------------------------------------------------
export const deleteEducation = (id: number) => {
    return educationAPI.deleteEducation(id)
}