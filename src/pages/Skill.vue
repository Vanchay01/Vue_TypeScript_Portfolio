<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Skill Managements</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Skill Managements</p>
      <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add Skill</button>
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
      <div v-if="errMessage" class="p-1 font-light text-sm text-center text-red-500 bg-red-500/20">{{ errMessage }}.</div>
      <Table class="min-w-full divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">Logo</th>
            <th class="p-1">Name</th>
            <th class="p-1">rating</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <tbody v-if="skillTodo" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in skillTodo.data" :key="items.id" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1"><img :src="items.logo_url" alt="logo" class="h-5"></td>
            <td class="p-1">{{items.name}}</td>
            <td class="p-1">{{items.rating}}%</td>
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
import { useSkill } from '../composables/useSkill.ts';
// Other Function ----------------------------------------------------------------------------------
const isOpen = ref(false)

// APIs ----------------------------------------------------------------------------------[]
const {isLoading, errMessage, skillTodo} = useSkill()

</script>