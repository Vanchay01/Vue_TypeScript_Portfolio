import { defineStore } from "pinia";
import type { Skill, skillFrom } from "../types/skill";
import { skillService } from "../services/skillService";

interface SkillState{
    isLoading: boolean,
    isError: string | null
    skill: Skill[],
    currentSkill: Skill | null
}

export const useSkillStore = defineStore("skill", {
    state: (): SkillState => ({
        isLoading: false,
        isError: null,
        skill: [],
        currentSkill: null
    }),
    actions: {

        // loadForm ------------------------------------------------------------------
        async loadForm(){
            this.isLoading = true
            try {
                const response = await skillService.find()
                this.skill = response.data                                                       
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // create one ------------------------------------------------------------------
        async create(form: skillFrom){
            this.isLoading = true
            try {   
                const response = await skillService.create(form)
                console.log("ok useSkill", response.data)
                return response.data
            } catch (error: any) {
                console.log(error.message)
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // find one ------------------------------------------------------------------
        async findOne(id: number){
            this.isLoading = true
            try {   
                console.log("ok")
                const response = await skillService.findOne(id)
                this.currentSkill = response.data
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // update one ------------------------------------------------------------------
        async updateOne(id: number, form: skillFrom){
            this.isLoading = true
            try {   
                const response = await skillService.updateOne(id, form)
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // delete one ------------------------------------------------------------------
        async deleteOne(id: number){
            this.isLoading = true
            try {   
                const response = await skillService.deleteOne(id)
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        }
    }
})