import { defineStore } from "pinia";
import type { Work, WorkForm } from "../types/work";
import { workService } from "../services/workService";
import type { ResponsePagination } from "../types/apiResponse";

interface WorkState {
    loading: boolean,
    error: string | null,
    work: ResponsePagination<Work[]> ,
    currentWork: Work | null
    search: string 
}

export const useWorkStore = defineStore("work", {
    state: (): WorkState => ({
        loading: false,
        error: null,
        work: {
            pagination: { total: 0, page: 0, limit: 0, totalPage: 0},
            data: []
        },
        currentWork: null,
        search: ""
    }),
    actions: {
        async loadForm() {
            this.loading = true
            try {
                console.log({page: this.work.pagination.page, limit: this.work.pagination.limit})
                const response = await workService.find({
                    page: this.work.pagination.page,
                    limit: this.work.pagination.limit,
                    search: this.search || undefined
                })
                this.work = response.data
            } catch (error: any) {
                this.error = error.message 
            } finally {
                this.loading = false
            }
        },

        // create one ------------------------------------------------------------------
        async create(form: WorkForm){
            this.loading = true
            try {   
                const response = await workService.create(form)
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
                console.log("ok")
                const response = await workService.findOne(id)
                this.currentWork = response.data
                return response.data
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },

        // update one ------------------------------------------------------------------
        async updateOne(id: number, form: WorkForm){
            this.loading = true
            try {   
                const response = await workService.updateOne(id, form)
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
                const response = await workService.deleteOne(id)
                return response.data
            } catch (error: any) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },


        // ...existing actions

        setPage(page: number) {
            this.work.pagination.page = page
            this.loadForm() // re-fetch immediately with new page
        },

        setLimit(limit: number) {
            this.work.pagination.limit = limit
            this.work.pagination.page = 1 // reset to page 1 — changing page size mid-list is confusing otherwise
            this.loadForm()
        },

        setSearch(value: string) {
            this.search = value
            this.work.pagination.page = 1
            this.loadForm()
        },

            clearSearch() {
            this.search = ""
            this.work.pagination.page = 1
            this.loadForm()
        },
    }
})