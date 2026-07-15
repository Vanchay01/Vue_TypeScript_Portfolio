import { workAPI } from "../api/work.api"
import type { QueryParams } from "../types/apiResponse"
import type { WorkForm } from "../types/work"


export const workService = {
    // create -------------------------------------------------------
      create(form: WorkForm){
        console.log("sad")
        console.log(form)
        const formData = new FormData()
        Object.entries(form).forEach(([key, value]) => {
          if(value !== undefined && value !== null){
            formData.append(key, value as any)
          }
        })
        console.log(formData)
        return workAPI.create(formData)
      },
    
      // find -------------------------------------------------------
      find(params?: QueryParams){
        return workAPI.find(params)
      },
    
      // find one -------------------------------------------------------
      findOne(id: number){
        return workAPI.findOne(id)
      },
    
      // update one -------------------------------------------------------
      updateOne(id: number, form: WorkForm){
        console.log("skillService 1-----",form)
        const formData = new FormData()
        Object.entries(form).forEach(([key, value]) => {
          if(value !== undefined && value !== null){
            formData.append(key, value as any)
          }
        })
        console.log("skillService FormData",formData)
        return workAPI.updateOne(id, formData)
      },
    
      // delete one -------------------------------------------------------
      deleteOne(id: number){
        return workAPI.deleteOne(id)
      }
}