<template>
  <article class="w-full bg-amber-100 relative">
    <img class="w-full h-56 rounded-md object-cover" :src="`http://localhost:5002/uploads/${degree.filename}`" alt="degree">
    <button @click="emit('delete', degree.id)" class="absolute top-1 right-1 text-ms size-6 rounded-full cursor-pointer bg-amber-100">X</button>
  </article>
</template>

<script setup lang="ts">
import type { Degree } from "../../types/education";

defineProps<{ degree: Degree }>();
const emit = defineEmits<{ (e: "delete", id: number): void }>();
</script>
