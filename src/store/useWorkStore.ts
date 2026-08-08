import { defineStore } from "pinia";
import type { Work, WorkForm } from "../types/work";
import { workService } from "../services/workService";
import type { ResponsePagination } from "../types/apiResponse";

interface WorkState {
    isLoading: boolean,
    isError: string | null,
    work: ResponsePagination<Work[]> ,
    currentWork: Work | null
    search: string 
}

export const useWorkStore = defineStore("work", {
    state: (): WorkState => ({
        isLoading: false,
        isError: null,
        work: {
            pagination: { total: 0, page: 0, limit: 0, totalPage: 0},
            data: []
        },
        currentWork: null,
        search: ""
    }),
    actions: {
        async loadForm() {
            try {
                this.isLoading = true
                console.log({page: this.work.pagination.page, limit: this.work.pagination.limit})
                const response = await workService.find({
                    page: this.work.pagination.page,
                    limit: this.work.pagination.limit,
                    search: this.search || undefined
                })
                this.work = response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // create one ------------------------------------------------------------------
        async create(form: WorkForm){
            try {
                this.isLoading = true
                const response = await workService.create(form)
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
            try {
                this.isLoading = true
                console.log("ok")
                const response = await workService.findOne(id)
                this.currentWork = response.data
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // update one ------------------------------------------------------------------
        async updateOne(id: number, form: WorkForm){
            try {
                this.isLoading = true
                const response = await workService.updateOne(id, form)
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },

        // delete one ------------------------------------------------------------------
        async deleteOne(id: number){
            try {
                this.isLoading = true
                const response = await workService.deleteOne(id)
                return response.data
            } catch (error: any) {
                this.isError = error.message
            } finally {
                this.isLoading = false
            }
        },


        // ...existing actions

        async setPage(page: number) {
            this.work.pagination.page = page
            await this.loadForm() // re-fetch immediately with new page
        },

        async setLimit(limit: number) {
            this.work.pagination.limit = limit
            this.work.pagination.page = 1 // reset to page 1 — changing page size mid-list is confusing otherwise
            await this.loadForm()
        },

        async setSearch(value: string) {
            this.search = value
            this.work.pagination.page = 1
            await this.loadForm()
        },

        async clearSearch() {
            this.search = ""
            this.work.pagination.page = 1
            await this.loadForm()
        },
    }
})