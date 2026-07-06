<template>
  <article v-if="openModal" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
    <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
       <p v-if="result === 'add'"> add </p>
       <p v-if="result === 'edit'"> edit </p>
    </div>
    </article>
</template>
<script setup lang="ts">

// Props ----------------------------------------------------
const props = defineProps({
    openModal: {
        type: Boolean,
        required: true
    },
    result: {
        type: String,
        required: true
    }
})

console.log('props.add', props.result)
// Close Modal with Emit ----------------------------------------------------
const emit = defineEmits(["end"]);
const closeModal = () => {
    emit("end");
}

</script>
