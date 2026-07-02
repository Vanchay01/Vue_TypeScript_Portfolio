<template>
  <article
    v-if="add"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
    <div
      class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
    >
      <!-- Body -->
      <form action="" @submit.prevent="addEdu" class="flex flex-col gap-1">
        <label for="">name</label>
        <input type="text" v-model="form.name" class="border" />
        <label for="">major</label>
        <input type="text" v-model="form.major" class="border" />
        <label for="">gpa</label>
        <input type="text" v-model="form.gpa" class="border" />
        <label for="">data_start</label>
        <input type="date" v-model="form.date_start" class="border" />
        <label for="">data_end</label>
        <input type="date" v-model="form.date_end" class="border" />
        <label for="">logo</label>
        <input type="file" @change="handleLogo" class="border" /><br />
        <button
          v-if="add"
          type="submit"
          class="border text-blue-500 bg-blue-500/20"
        >
          Add
        </button>
        <!-- <button v-else="edit" type="submit" class="border text-yellow-500 bg-yellow-500/20">Edit</button> -->
      </form>
    </div>
  </article>
  <article
    v-else-if="edit"
    class="fixed inset-0 z-50 flex items-center justify-center"
  >
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
    <div
      class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
    >
      <form action="" @submit.prevent="addEdu" class="flex flex-col gap-1">
        <label for="">name</label>
        <input type="text" v-model="form.name" class="border" />
        <label for="">major</label>
        <input type="text" v-model="form.major" class="border" />
        <label for="">gpa</label>
        <input type="text" v-model="form.gpa" class="border" />
        <label for="">data_start</label>
        <input type="date" v-model="form.date_start" class="border" />
        <label for="">data_end</label>
        <input type="date" v-model="form.date_end" class="border" />
        <label for="">logo</label>
        <input type="file" @change="handleLogo" class="border" /><br />
        <button
          v-if="add"
          type="submit"
          class="border text-blue-500 bg-blue-500/20"
        >
          Add
        </button>
        <button
          v-else="edit"
          type="submit"
          class="border text-yellow-500 bg-yellow-500/20"
        >
          Edit
        </button>
      </form>
    </div>
  </article>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import type { EducationFrom } from "../../types/education";

const props = defineProps({
  add: Boolean,
  edit: Boolean,
});
const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};
// API --------------------------------------------------
const form = reactive<EducationFrom>({
  name: "",
  major: "",
  gpa: "",
  date_start: "",
  date_end: "",
  logo: null,
});
const handleLogo = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.logo = target.files[0];
  }
};
const addEdu = () => {
  console.log({
    name: form.name,
    major: form.major,
    gpa: form.gpa,
    date_start: form.date_start,
    date_end: form.date_end,
    logo: form.logo,
  });
  const ok = window.confirm("Are you sure!!!");
  if (!ok) return;
  emit("close");
};
</script>
