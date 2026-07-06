<template>
    <article>
        
        <div class="w-full flex justify-between border p-1">
            <p class="font-normal text-sm">Education Management</p>
            <button @click="openChildAdd" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add</button>
            <button @click="openChildEdit" class="px-1 mx-1 border text-yellow-500 font-normal text-sm cursor-pointer">Edit</button>
        </div>
        <p>This is a simple parent component.</p>
        <Child
            :openModal="isChildOpen"
            :result="isResultOpen"
            @end="isChildOpen = false"
        />
    </article>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import Child from './Child.vue';


// Child Open with add ----------------------------
const isResultOpen = ref("")
const isChildOpen = ref(false)
const openChildAdd = () => {
  isChildOpen.value = true
  isResultOpen.value = "add"
}

// Child Open with edit ----------------------------
const openChildEdit = () => {
  isChildOpen.value = true,
  isResultOpen.value = "edit"
}


// Child Open with add ----------------------------
</script>