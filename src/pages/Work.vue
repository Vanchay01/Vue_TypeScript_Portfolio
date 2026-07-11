<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl flex items-center gap-2"><img class="h-6" :src="projectIcon" alt="Project Icon">Project Managements</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Project Managements</p>
      <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add Project</button>
    </div>
    <EducationModal
      :add="isOpen"
      :edit="isOpen"
      @close="isOpen = false"
    >
    </EducationModal>
    <!-- Table ------------------------------------------------------ -->
    <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
      <div v-if="errMessage" class="p-1 font-light text-sm text-center text-red-500 bg-red-500/20">{{ errMessage }}.</div>
      <Table class="min-w-full divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">Name</th>
            <th class="p-1">Position</th>
            <th class="p-1">GitHub Link</th>
            <th class="p-1">Demo Link</th>
            <th class="p-1">Framework</th>
            <th class="p-1">Description</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">Action</th>
          </tr>
        </thead>
        <tbody v-if="work" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in work.data.data" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1">{{ items.name}}</td>
            <td class="p-1">{{ items.position}}</td>
            <td class="p-1">{{ items.github }}</td>
            <td class="p-1">{{ items.demo }}</td>
            <td class="p-1">{{ items.framework}}</td>
            <td class="p-1">{{ items.description}}</td>
            <td class="p-1">{{ items.created_at }}</td>
            <td class="p-1 w-40">
              <button class="px-1 mx-1 text-green-500 border">view</button>
              <button class="px-1 mx-1 text-yellow-500 border" >edit</button>
              <button class="px-1 mx-1 text-red-500 border">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </article>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useWork } from '../composables/useWork';
import projectIcon from '../icons/project.png';

const isOpen = ref(false)

// API -----------------------------------------------------------------
const {isLoading, errMessage, work} = useWork()
</script>
