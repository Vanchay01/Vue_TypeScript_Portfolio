
<template>
  <article class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="closeDetail"></div>
    <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
       okok
    </div>
    </article>
</template>
<script setup>

    // CloseDetail ------------------------------------------------
    const emit = defineEmits(["close"]);
    const v = () => {
    emit("close");
};
</script>