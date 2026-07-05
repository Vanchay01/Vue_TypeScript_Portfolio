<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Technology Managements</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Technology Managements</p>
      <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add Technology</button>
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
            <th class="p-1">Work_ID</th>
            <th class="p-1">Work_Name</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <tbody v-if="technology" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in technology.data" :key="index" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1">{{ items.name }}</td>
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
import { ref } from 'vue';import EducationModal from "./education/EducationModal.vue";
import { useTechnology } from '../composables/useTechnology.ts';
const testLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMNvJTHvVkFO-miBKZ088HWzUok2IKyJZ0r02WUVCwag&s"
// Other Function ----------------------------------------------------------------------------------
const isOpen = ref(false)

// APIs ----------------------------------------------------------------------------------[]
const {isLoading, errMessage, technology} = useTechnology()

</script>