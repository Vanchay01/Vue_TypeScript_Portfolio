import { skillAPI } from "../api/skill.api";
import type { skillFrom } from "../types/skill";


export const skillService = {

  // create -------------------------------------------------------
  create(form: skillFrom){
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if(value !== undefined && value !== null){
        formData.append(key, value as any)
      }
    })
    return skillAPI.create(formData)
  },

  // find -------------------------------------------------------
  find(){
    return skillAPI.find()
  },

  // find one -------------------------------------------------------
  findOne(id: number){
    return skillAPI.findOne(id)
  },

  // update one -------------------------------------------------------
  updateOne(id: number, form: skillFrom){
    const formData = new FormData()
    Object.entries(form).forEach(([key, value]) => {
      if(value !== undefined && value !== null){
        formData.append(key, value as any)
      }
    })
    return skillAPI.updateOne(id, formData)
  },

  // delete one -------------------------------------------------------
  deleteOne(id: number){
    return skillAPI.deleteOne(id)
  }
}