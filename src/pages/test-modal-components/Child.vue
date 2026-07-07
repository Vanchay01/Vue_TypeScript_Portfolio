<template>
  <article v-if="openModal" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
    <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
       <div>Test: {{educationOne?.name}}</div>
    </div>
    </article>
</template>
<script setup lang="ts">
import type { Education } from '../../types/education';

interface Props {
  openModal: boolean;
  educationOne?: Education;
}

// Close Modal with Emit ----------------------------------------------------
const emit = defineEmits(["end"]);
const closeModal = () => {
    emit("end");
}

// Props ----------------------------------------------------
const props = defineProps<Props>()


</script>
