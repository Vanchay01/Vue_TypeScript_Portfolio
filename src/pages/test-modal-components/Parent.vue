<template>
    <article>
        <div v-for="(items, index) in education" :key="index" class="w-full flex justify-between border p-1">
            <p class="font-normal text-sm">Education Management</p>
             <p class="font-normal text-sm">test: {{ items.id }}</p>
            <button @click="handleViewOne(items.id)" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add</button>
            <!-- <button @click="openChildEdit" class="px-1 mx-1 border text-yellow-500 font-normal text-sm cursor-pointer">Edit</button> -->
        </div>
        <Child
            :openModal="isChildOpen"
            :educationOne="educationOne"
            @end="isChildOpen = false"
        />
    </article>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';
import { storeToRefs } from 'pinia';
import { useEducationStore } from '../../store/useEducationStore.ts';
import type { Education } from '../../types/education.ts';

// call EducationStore ----------------------------
const {education } = storeToRefs(useEducationStore())


// Child Open with add ----------------------------
const isChildOpen = ref(false)
const educationOne = ref<Education>()

const educationStore = useEducationStore()

const handleViewOne = async (id: number) => {
  isChildOpen.value = true
  educationOne.value = await educationStore.findOne(id)
}
</script>