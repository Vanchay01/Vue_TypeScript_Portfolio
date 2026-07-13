import { defineStore } from "pinia";
import type { Skill, skillFrom } from "../types/skill";
import { skillService } from "../services/skillService";

interface SkillState{
    loading: boolean,
    error: string | null
    skill: Skill[],
    currentSkill: Skill | null
}

export const useSkillState = defineStore("skill", {
    state: (): SkillState => ({
        loading: false,
        error: null,
        skill: [],
        currentSkill: null
    }),
    actions: {

        // loadForm ------------------------------------------------------------------
        async loadForm(){
            this.loading = true
            try {
                const response = await skillService.find()
                this.skill = response.data                                                       
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // create one ------------------------------------------------------------------
        async create(form: skillFrom){
            this.loading = true
            try {   
                const response = await skillService.create(form)
                console.log("ok useSkill", response.data)
                return response.data
            } catch (error: any) {
                console.log(error.message)
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // find one ------------------------------------------------------------------
        async findOne(id: number){
            this.loading = true
            try {   
                const response = await skillService.findOne(id)
                this.currentSkill = response.data
                return response.data
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // update one ------------------------------------------------------------------
        async updateOne(id: number, form: skillFrom){
            this.loading = true
            try {   
                const response = await skillService.updateOne(id, form)
                return response.data
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // delete one ------------------------------------------------------------------
        async deleteOne(id: number){
            this.loading = true
            try {   
                const response = await skillService.deleteOne(id)
                return response.data
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        }
    }
})