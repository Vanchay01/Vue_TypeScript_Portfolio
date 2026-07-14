import { defineStore } from "pinia";
import { addEducation, deleteEducation, getEducation, getEducationById, updateEducation } from "../services/educationService";
import type { Education, EducationFrom } from "../types/education";


interface EducationState {
    education: Education[];
    currentEducation: Education | null;
    loading: boolean;
    error: string | null;
}   

export const useEducationStore = defineStore("education", {
    state: (): EducationState => ({
        education: [],
        currentEducation: null,
        loading: false,
        error: null,
    }),
    actions: {

        // LoadForm ------------------------------------------------
        async LoadForm() {
            this.loading = true;
            try {
                const response = await getEducation();
                this.education = response.data;
            } catch (error: any) {
                this.error = error.message || "An error occurred while fetching education data.";
            } finally {
                this.loading = false;
            }
        },

        // addEducation ------------------------------------------------
        async create(form: EducationFrom) {
            this.loading = true;
            try {
                const response = await addEducation(form);
                return response.data
            } catch (error: any) {
                console.log(error.message)
                this.error = error.message || "An error occurred while fetching education data.";
            } finally {
                this.loading = false;
            }
        },

        // FindOne ------------------------------------------------
        async findOne(id: number){
            this.loading = true
            try {
                const response = await getEducationById(id)
                this.currentEducation = response.data
                await this.LoadForm()
                return response.data 
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // UpdateEducation ------------------------------------------------
        async updateOne(id: number, form: EducationFrom){
            console.log("useEducation on updateOne:", form)
            this.loading = true
            try {
                const response = await updateEducation(id, form)
                return response.data
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // DeleteEducation ------------------------------------------------
        async deleteOne(id: number) {
            this.loading = true;
            try {
                const response = await deleteEducation(id);
                return response.data 
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        }
    }
})