<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Education Management</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Education Management</p>
      <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add education</button>
    </div>
    <!-- Table ------------------------------------------------------ -->
    <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
      <div v-if="error" class="p-1 font-light text-sm text-center text-red-500 bg-red-500/20">Error: {{ error }}</div>
      <div v-else-if="education.length <= 0" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Education Is Empty!!!.</div>
      <table class="min-w-full divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">Logo</th>
            <th class="p-1">Name</th>
            <th class="p-1">Major</th>
            <th class="p-1">GPA</th>
            <th class="p-1">Date_Start</th>
            <th class="p-1">Date_End</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <tbody v-if="education" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in education" :key="items.id" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1"><img :src="`http://localhost:5002/uploads/${items.logo}`"  alt="" class="h-5"></td>
            <td class="p-1">{{ items.name }}</td>
            <td class="p-1">{{ items.major }}</td>
            <td class="p-1">{{ items.gpa }}</td>
            <td class="p-1">{{ items.date_start }}</td>
            <td class="p-1">{{ items.date_end }}</td>
            <td class="p-1">{{ items.created_at }}</td>
            <td class="p-1 w-40">
                <button @click="handleFindOne(items.id)" class="px-1 mx-1 text-green-500 border cursor-pointer">view</button>
                <button @click="handleEdit(items)" class="px-1 mx-1 text-yellow-500 border cursor-pointer">edit</button>
                <button @click="handleDelete(items.id)" class="px-1 mx-1 text-red-500 border cursor-pointer">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="loading" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Loading...</div>
    </div>
    <!-- Add_modal-------------------------------------------------------------------- -->
    <section v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div @click="handleCancel" class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
      <div class="w-full flex justify-between">
        <p v-if="editId" class="font-medium text-sm">Edit Education</p>
        <p v-else class="font-medium text-sm">Add Education</p>
        <button @click="handleCancel" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">X</button>
      </div>
      <div v-if="validator" class="">
          <div v-for="(validate, index) in validator" :key="index" class="text-center flex justify-start"><p class="border rounded-full px-1 font-normal text-sm my-1 text-yellow-500 bg-amber-500/10">{{ validate.message }}</p></div>
      </div>
      <form action="" @submit.prevent="handleSumbit" class="flex flex-col gap-1">
        <label for="nameId">Name</label>
        <input type="text" v-model="form.name" class="border" />
        <label for="majorId">Major</label>
        <input type="text" v-model="form.major" class="border" />
        <label for="gpaId">GPA</label>
        <input type="text" v-model="form.gpa" class="border" />
        <label for="dateStartId">Data_start</label>
        <input type="date" v-model="form.date_start" class="border" />
        <label for="dateEndId">Data_end</label>
        <input type="date" v-model="form.date_end" class="border" />
        <label for="logoId">Logo</label>
        <input id="logoId" type="file" @change="handleLogo" class="hidden" /><br />
        <label for="logoId" className="border border-[#22223A] bg-gray-500/20 p-4 rounded-md border-dashed flex flex-col justify-center items-center cursor-pointer"> 
          <img   
            v-if="previewLogo"
            :src="previewLogo"
            alt="No Image"
            className="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"
          />
          <img
            v-else-if="editId"
            :src="previewLogo"
            alt="No Image"
            className="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"
          /> 
          <span v-else className="text-gray-500 text-[10px] font-bold flex flex-col justify-center items-center">Click to upload</span>
        </label>
        <button type="submit" class="border text-blue-500 bg-blue-500/20" >Add</button>
        <button @click="handleCancel" type="button" class="border text-yellow-500 bg-yellow-500/20" >Cancel</button>
      </form>
    </div>
  </section>
  <!-- View_model --------------------------------------------------------------------------- -->
  <section v-if="isOpenView" class="fixed inset-0 z-50 flex items-center justify-center">
      <div @click="handleCancel" class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
      <div class="w-full flex justify-between">
        <p v-if="editId" class="font-medium text-sm">Edit Education</p>
        <p v-else class="font-medium text-sm">Add Education</p>
        <button @click="handleCancel" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">X</button>
      </div>
      <div v-if="validator" class="">
          <div v-for="(validate, index) in validator" :key="index" class="text-center flex justify-start"><p class="border rounded-full px-1 font-normal text-sm my-1 text-yellow-500 bg-amber-500/10">{{ validate.message }}</p></div>
      </div>
      <p>{{ currentEducation?.name }}</p>
    </div>
  </section>
  
  </article>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEducationStore } from "../../store/education.ts";
import type { Education, EducationFrom } from "../../types/education.ts";
import { educationSchema } from "../../validation/education.schema.ts";
import { addEducation } from "../../services/educationService.ts";


// Event Open Modal -------------------------------------------------------
const isOpen = ref<boolean>(false);
const isOpenView = ref<boolean>(false);
 

// API -------------------------------------------------------
const educationStore = useEducationStore();
const { education, currentEducation, loading, error } = storeToRefs(useEducationStore());

// Swap to Edit Modal -------------------------------------------------------
const editId = ref<number | null>(null);
const previewLogo = ref<string>(""); 
const handleEdit = (education: Education) => {
  isOpen.value = true;
  previewLogo.value = education.logo ? `http://localhost:5002/uploads/${education.logo}` : "";
  editId.value = education.id;
  form.name = education.name;
  form.major = education.major;
  form.gpa = education.gpa;
  form.date_start = education.date_start;
  form.date_end = education.date_end;
  // form.logo = education.logo; 
  
};
// handleCancel -------------------------------------------------------
const handleCancel = () => {
  isOpen.value = false;
  isOpenView.value = false
  editId.value = null;
  previewLogo.value = "";
  form.name = "";
  form.major = "";
  form.gpa = "";
  form.date_start = "";
  form.date_end = "";
  form.logo = null;
};

// handleSubmit -------------------------------------------------------
const form = reactive<EducationFrom>({
  name: "School of Information Technology",
  major: "Computer Science",
  gpa: "3.5",
  date_start: "2020-09-19",
  date_end: "2024-10-19",
  logo: null,
});
const validator = ref<{ message: string }[]>([]);
const handleLogo = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.logo = target.files[0];
    previewLogo.value = URL.createObjectURL(target.files[0]);
  }
};

// ---
const handleSumbit = async () => {
  const result = educationSchema.safeParse(form);
  if (!result.success) {
    validator.value = result.error.issues;
    return;
  }
  // const ok = window.confirm("Are you sure!!!");
  // if (!ok) return;
  const res = await addEducation(form);
  if (res) {
    await educationStore.LoadForm();
    handleCancel();
  }
};

// handle_delete --------------------------------------------------
const handleDelete = async (id: number) => {
  await educationStore.deleteEducation(id)
}

// handle_delete --------------------------------------------------
const handleFindOne = async (id: number) => {
  isOpenView.value = true
  await educationStore.findOne(id)
}

// onMounted -------------------------------------------------------
onMounted(() => {
  educationStore.LoadForm()
});
</script>