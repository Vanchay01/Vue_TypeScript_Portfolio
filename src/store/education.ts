import { defineStore } from "pinia";
import { addEducation, getEducation } from "../services/educationService";
import type { Education, EducationFrom } from "../types/education";


interface EducationState {
    education: Education[];
    loading: boolean;
    error: string | null;
}

export const useEducationStore = defineStore("education", {
    state: (): EducationState => ({
        education: [],
        loading: false,
        error: null,
    }),
    actions: {
        async LoadForm() {
            this.loading = true;
            try {
                const response = await getEducation();
                console.log("Education data fetched:", response);
                this.education = response.data;
            } catch (error: any) {
                this.error = error.message || "An error occurred while fetching education data.";
            } finally {
                this.loading = false;
            }
        },
        async addEducation(newEducation: EducationFrom) {
            this.loading = true;
            try {
                const response = await addEducation(newEducation);
                console.log("Education data fetched:", response);
                this.education = response.data;
            } catch (error: any) {
                this.error = error.message || "An error occurred while fetching education data.";
            } finally {
                this.loading = false;
            }
                

        }

    }
})