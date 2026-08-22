// services/education.service.ts
import { educationAPI } from "../api/education.api";
import type { EducationFrom, DegreeForm } from "../types/education";

// add education ----------------------------------------------------------------
export const addEducation = (form: EducationFrom) => {
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            formData.append(key, value as any)
        }
    })
    return educationAPI.addEducation(formData)
}

// fetch education ----------------------------------------------------------------
export const getEducation = () => {
    console.log("ssssssssss")
    return educationAPI.getAll()
}

// get education by ID ----------------------------------------------------------------
export const getEducationById = (id: number) => {
    return educationAPI.getEducationById(id)
}

// update education ------------------------------------------------------
export const updateEducation = (id: number, form: EducationFrom) => {
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
        if(value !== undefined && value !== null) {
            formData.append(key, value as any)
        }
    })
    return educationAPI.updateEducation(id, formData)
}

// delete education ------------------------------------------------------
export const deleteEducation = (id: number) => {
    return educationAPI.deleteEducation(id)
}

// add degree ----------------------------------------------------------------
export const addDegree = (form: DegreeForm) => {
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
        if(value !== undefined && value !== null){
            formData.append(key, value as any)
        }
    })
    return educationAPI.addDegree(formData)
}

// delete degree ------------------------------------------------------
export const deleteDegree = (id: number) => {
    return educationAPI.deleteDegree(id)
}

