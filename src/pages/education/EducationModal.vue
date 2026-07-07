<template>
  <article v-if="props.openModal" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>
    <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
      <div class="w-full flex justify-between">
        <p v-if="statusModal === 'add'" class="font-medium text-sm">Add Education</p>
        <p v-if="statusModal === 'edit'" class="font-medium text-sm">Edit Education</p>
        <p class="font-medium text-sm">ID: {{ props.selectedEducation?.id }}</p>
        <button @click="closeModal" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">X</button>
      </div>
      <div v-if="validator" class="">
          <div v-for="(validate, index) in validator" :key="index" class="text-center flex justify-start"><p class="border rounded-full px-1 font-normal text-sm my-1 text-yellow-500 bg-amber-500/10">{{ validate.message }}</p></div>
      </div>
      <form action="" @submit.prevent="addEdu" class="flex flex-col gap-1">
        <label for="">Name</label>
        <input type="text" v-model="form.name" class="border" />
        <label for="">Major</label>
        <input type="text" v-model="form.major" class="border" />
        <label for="">GPA</label>
        <input type="text" v-model="form.gpa" class="border" />
        <label for="">Data_start</label>
        <input type="date" v-model="form.date_start" class="border" />
        <label for="">Data_end</label>
        <input type="date" v-model="form.date_end" class="border" />
        <label for="">Logo</label>
        <input type="file" @change="handleLogo" class="border" /><br />
        <button v-if="statusModal === 'add'" type="submit" class="border text-blue-500 bg-blue-500/20" >Add</button>
        <button v-if="statusModal === 'edit'" type="submit" class="border text-yellow-500 bg-yellow-500/20">Edit</button>
      </form>
    </div>
  </article>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import type { EducationFrom } from "../../types/education";
import { useEducation } from "../../composables/useEducation";
import { educationSchema } from "../../validation/education.schema";

const props = defineProps({
  openModal: {
    type: Boolean,
    required: false
  },
  statusModal: {
    type: String,
    required: false
  },
  selectedEducation: {
    type: Object,
    required: false
  },

});


const emit = defineEmits(["close"]);
const closeModal = () => {
  emit("close");
};
// API --------------------------------------------------
const { addEducation } = useEducation();
const form = reactive<EducationFrom>({
  name: "",
  major: "",
  gpa: "",
  date_start: "",
  date_end: "",
  logo: null,
});
const validator = ref<{ message: string }[]>([]);
const handleLogo = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.logo = target.files[0];
  }
};
const addEdu = async () => {
  const result = educationSchema.safeParse(form);

  if (!result.success) {
    validator.value = result.error.issues;
    return;
  }
  const ok = window.confirm("Are you sure!!!");
  if (!ok) return;
  await addEducation(form as any);
  emit("close");
};
</script>