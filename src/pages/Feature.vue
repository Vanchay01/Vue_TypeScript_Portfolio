<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Feature Managements</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Feature Managements</p>
      <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add Feature</button>
    </div>
    <EducationModal
      :add="isOpen"
      :edit="isOpen"
      @close="isOpen = false"
    >
      <p>This is adding Edcation page</p>
    </EducationModal>
    <!-- Table ------------------------------------------------------ -->
    <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
      <Table class="min-w-full divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">Name</th>
            <th class="p-1">Description</th>
            <th class="p-1">work_id</th>
            <th class="p-1">work_name</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <tbody v-if="featureTodo" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in featureTodo.data" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1}}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1">{{ items.name }}</td>
            <td class="p-1">{{ items.description }}</td>
            <td class="p-1">{{ items.by_work.id }}</td>
            <td class="p-1">{{ items.by_work.name }}</td>
            <td class="p-1">{{ items.created_at }}</td>
            <td class="p-1 w-40">
              <button class="px-1 mx-1 text-green-500 border">view</button>
              <button class="px-1 mx-1 text-yellow-500 border" @click="isOpen = true">edit</button>
              <button class="px-1 mx-1 text-red-500 border">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import EducationModal from "./education/EducationModal.vue";
import { useFeature } from '../composables/useFeature.ts';

const testLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNvJTHvVkFO-miBKZ088HWzUok2IKyJZ0r02WUVCwag&s"
// Other Function ----------------------------------------------------------------------------------
const isOpen = ref(false)

// APIs ----------------------------------------------------------------------------------[]
const { isLoading, errMessage, featureTodo, loadForm} = useFeature()

onMounted(() => {
    loadForm()
})
</script>