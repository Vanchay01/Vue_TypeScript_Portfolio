<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Education Management</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Education Management</p>
      <button @click="openAdd" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add education</button>
    </div>
    <!-- Table ------------------------------------------------------ -->
    <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
      <table class="min-w-full divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">Logo</th>
            <th class="p-1">Name</th>
            <th class="p-1">Major</th>
            <th class="p-1">GPA</th>
            <th class="p-1">Date_Start</th>
            <th class="p-1">Date_End</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <tbody v-if="educationTodo" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in educationTodo.data" :key="items.id" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1"><img :src="`http://localhost:5002/uploads/${items.logo}`"  alt="" class="h-5"></td>
            <td class="p-1">{{ items.name }}</td>
            <td class="p-1">{{ items.major }}</td>
            <td class="p-1">{{ items.gpa }}</td>
            <td class="p-1">{{ items.date_start }}</td>
            <td class="p-1">{{ items.date_end }}</td>
            <td class="p-1">{{ items.created_at }}</td>
            <td class="p-1 w-40">
                <button class="px-1 mx-1 text-green-500 border" @click="openDetail">view</button>
                <button @click="openEdit(items)" class="px-1 mx-1 text-yellow-500 border">edit</button>
                <button class="px-1 mx-1 text-red-500 border">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- EducationModal-------------------------------------------------------------------- -->
    <EducationModal
      :add="isOpen"
      :edit="isOpen"
      :education="selectedEducation"
      @close="isOpen = false">
    </EducationModal>
    <!-- EducationModal-------------------------------------------------------------------- -->
    <EducationDetail
      @close="isDetail = false">
    </EducationDetail>
  </article>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useEducation } from "../../composables/useEducation";
import type { Education } from "../../types/education";
import EducationModal from "./EducationModal.vue";
import EducationDetail from "./EducationDetail.vue";

const { isLoading, errMessage, educationTodo, loadEducation } = useEducation();
const selectedEducation = ref<Education | null>(null)
// Edu_Modals ----------------------------------------------------
const isOpen = ref(false);
const openAdd = () => {
  selectedEducation.value = null
  isOpen.value = true
}
const openEdit = (items: Education) => {
  selectedEducation.value = items
  isOpen.value = true
}

// Edu_Details ----------------------------
const isDetail = ref(false)
const openDetail = () => {
  isDetail.value = true
}

// onMounted -------------------------------------------------------
onMounted(() => {
  loadEducation();
});
</script>