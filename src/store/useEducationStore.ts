import { defineStore } from "pinia";
import { addEducation, deleteEducation, getEducation, getEducationById, updateEducation } from "../services/educationService";
import type { Education, EducationFrom } from "../types/education";


interface EducationState {
    education: Education[];
    currentEducation: Education | null;
    isLoading : boolean;
    isError: string | null;
}   

export const useEducationStore = defineStore("education", {
    state: (): EducationState => ({
        education: [],
        currentEducation: null,
        isLoading: false,
        isError: null,
    }),
    actions: {

        // LoadForm ------------------------------------------------
        async LoadForm() {
            this.isLoading = true;
            try {
                const response = await getEducation();
                this.education = response.data;
            } catch (error: any) {
                this.isError = error.message || "An error occurred while fetching education data.";
            } finally {
                this.isLoading = false;
            }
        },

        // addEducation ------------------------------------------------
        async create(form: EducationFrom) {
            this.isLoading = true;
            try {
                const response = await addEducation(form);
                return response.data
            } catch (error: any) {
                console.log(error.message)
                this.isError = error.message || "An error occurred while fetching education data.";
            } finally {
                this.isLoading = false;
            }
        },

        // FindOne ------------------------------------------------
        async findOne(id: number){
            this.isLoading = true
            try {
                const response = await getEducationById(id)
                this.currentEducation = response.data
                await this.LoadForm()
                return response.data 
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // UpdateEducation ------------------------------------------------
        async updateOne(id: number, form: EducationFrom){
            console.log("useEducation on updateOne:", form)
            this.isLoading = true
            try {
                const response = await updateEducation(id, form)
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // DeleteEducation ------------------------------------------------
        async deleteOne(id: number) {
            this.isLoading = true;
            try {
                const response = await deleteEducation(id);
                return response.data 
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        }
    }
})