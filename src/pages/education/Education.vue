<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Education Management</h1>
    <div class="bg-[url('https://wallpapercave.com/wp/wp12702602.jpg')] bg-cover bg-center w-full flex justify-between items-center border p-1">
      <p class="font-normal text-white  text-md">Education Management</p>
      <button @click="isOpen = true"
      >
<!--        <GlassSurface-->
<!--            :height="25"-->
<!--            :border-radius="24"-->
<!--        >-->
<!--          <h2 class="text-white/70 group-hover:text-white transition-colors duration-200">Add Education</h2>-->
<!--        </GlassSurface>-->
        <SpecularButton
            size="md"
            :radius="20"
            tint="#ffffff"
            :tint-opacity="0"
            :blur="10"
            text-color="#f5f5f5"
            line-color="#ffffff"
            base-color="#525252"
            :intensity="1"
            :shine-size="10"
            :shine-fade="40"
            :thickness="1"
            :speed="0.35"
            follow-mouse
            :proximity="250"
            :auto-animate="false"
        >
          Add Education
        </SpecularButton>
      </button>
    </div>
    <!-- Table ------------------------------------------------------ -->
    <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
      <div v-if="isError" class="p-1 font-light text-sm text-center text-red-500 bg-red-500/20">Error: {{ isError }}</div>
      <div v-else-if="education.length <= 0" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Education Is Empty!!!.</div>
      <table class="min-w-full f;ec divide-y-2 divide-gray-200">
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
            <td class="p-1"><img v-if="items.logo" :src="`http://localhost:5002/uploads/${items.logo}`"  alt="no" class="size-5 rounded-full"></td>
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
      <div v-if="isLoading" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Loading...</div>
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
      <form action="" @submit.prevent="handleSubmit" class="flex flex-col gap-1">
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
        <label for="logoId" class="border border-[#22223A] bg-gray-500/20 p-4 rounded-md border-dashed flex flex-col justify-center items-center cursor-pointer">
          <img   
            v-if="previewLogo"
            :src="previewLogo"
            alt="No Image"
            class="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"
          />
          <img
            v-else-if="editId"
            :src="previewLogo ? previewLogo : ``"
            alt="No Image"
            class="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"
          /> 
          <span v-else class="text-gray-500 text-[10px] font-bold flex flex-col justify-center items-center">Click to upload</span>
        </label>
        <button v-if="!editId" type="submit" class="border text-blue-500 bg-blue-500/20 cursor-pointer" >Add</button>
        <button v-if="editId" type="submit" class="border text-yellow-500 bg-yellow-500/20 cursor-pointer" >Update</button>
        <button @click="handleCancel" type="button" class="border text-gray-500 bg-gray-500/20 cursor-pointer" >Cancel</button>
      </form>
    </div>
  </section>
  <!-- View_model --------------------------------------------------------------------------- -->
  <section v-if="isOpenView" class="fixed inset-0 z-50 flex items-center justify-center">
    <div @click="handleCancel" class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 w-full max-w-2xl rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
       <!-- header -->
      <div class="w-full flex justify-between">
        <p class="font-medium text-sm">View Education</p>
        <button @click="handleCancel" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">X</button>
      </div>
      <!-- body 01 -->
      <div class="flex items-center justify-start gap-2 font-medium text-sm py-4">
        <div class="size-16 rounded-full bg-gray-200"><img  v-if="currentEducation?.logo" :src="`http://localhost:5002/uploads/${currentEducation?.logo}`"  alt="no" class="m-auto size-16 rounded-full"></div>
        <div class="flex flex-col">
          <p>Program Record ID.  {{ currentEducation?.id }}</p>
          <h1 class=" font-bold text-3xl">{{ currentEducation?.name }}</h1>
          <p><span class="text-purple-500 bg-purple-500/20 border px-2 rounded-full">{{ currentEducation?.major }}</span></p>
        </div>
      </div>
      <hr class="text-gray-400">
      <!-- body 02-->
       <div class=" w-full flex justify-between font-medium text-sm gap-4 py-4">
        <!-- time line -->
        <div class="w-1/2 flex flex-col justify-between items">
          <p>Term of study</p>
          <div class="py-2">
            <p class="flex justify-between"><span>Date Start</span><span>Date End</span></p>
            <hr class="text-gray-400">
            <p class="flex justify-between"><span>{{currentEducation?.date_start}}</span><span>{{currentEducation?.date_end}}</span></p>
            <p class="text-center"> {{ yearTerm }} </p>
          </div>
          <p class="text-center flex justify-center "><span class="flex flex-col font-bold text-3xl text-green-500 bg-green-500/20 border rounded-full px-7">{{currentEducation?.gpa}}<span class="font-medium text-sm text-gray-500">GPA</span></span></p>
        </div>
        <!-- Record MetaData -->
        <div class="w-1/2">
          <p class="pb-2">Record Metadata</p>
          <div class="border rounded-xl border-gray-400">
            <p class="flex justify-between border-b border-gray-400 p-2"><span>Record ID</span><span>{{ currentEducation?.id }}</span></p>
            <p class="flex justify-between border-b border-gray-400 p-2"><span>Major</span><span>{{ currentEducation?.major }}</span></p>
            <p class="flex justify-between p-2"><span>Created at</span><span>{{ currentEducation?.created_at }}</span></p>
          </div>
        </div>
       </div>
        <hr class="text-gray-400">
        <div class="w-full  grid grid-cols-4 gap-4 font-medium text-sm  py-4">
          <CardDegree />
          <CardDegree />
          <CardDegree />
<!--          <form >-->
<!--            <input type="text" :value="currentEducation.id" class="border hidden" />-->
<!--            <input id="logoId" type="file" @change="handleImages" class="hidden" />-->
<!--            <label for="logoId" class=" border border-[#22223A] h-56 bg-gray-500/20 p-4 rounded-md border-dashed flex flex-col justify-center items-center cursor-pointer">-->
<!--              <img-->
<!--                  v-if="previewLogo"-->
<!--                  :src="previewLogo"-->
<!--                  alt="No Image"-->
<!--                  class="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"-->
<!--              />-->
<!--              <img-->
<!--                  v-else-if="editId"-->
<!--                  :src="previewLogo ? previewLogo : ``"-->
<!--                  alt="No Image"-->
<!--                  class="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"-->
<!--              />-->
<!--              <span v-else class="text-gray-500 text-[10px] font-bold flex flex-col justify-center items-center text-center">Click to upload the degree</span>-->
<!--            </label>-->
<!--          </form>-->
        </div>
    </div>
  </section>

  </article>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useEducationStore } from "../../store/useEducationStore.ts";
import type {Education, EducationFrom} from "../../types/education.ts";
import { educationSchema } from "../../validation/education.schema.ts";
import CardDegree from "./CardDegree.vue";
import GlassSurface from "../../components/GlassSurface.vue";
import SpecularButton from "../../components/SpecularButton.vue"

// Event Open Modal -------------------------------------------------------
const isOpen = ref<boolean>(false);
const isOpenView = ref<boolean>(false);
 

// API -------------------------------------------------------
const educationStore = useEducationStore();
const { education, currentEducation, isLoading, isError } = storeToRefs(useEducationStore());

// Swap to Edit Modal -------------------------------------------------------
const editId = ref<number | null>(null);
const previewLogo = ref<string | null>(""); 

const handleEdit = (education: Education) => {
  isOpen.value = true;
  previewLogo.value = education.logo ? `http://localhost:5002/uploads/${education.logo}` : '';
  editId.value = education.id;

  form.name = education.name;
  form.major = education.major;
  form.gpa = education.gpa;
  form.date_start = education.date_start;
  form.date_end = education.date_end;
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


// from create -------------------------------------------------------
const form = reactive<EducationFrom>({
  name: "Svay Reing University",
  major: "Computer Science",
  gpa: "3.49",
  date_start: "2020-09-19",
  date_end: "2024-10-19",
  logo: null,
});

// form degree -------------------------------------------------------
// const degree = reactive<DegreeForm>({
//   by_education: null,
//   images: null,
// });

const validator = ref<{ message: string }[]>([]);

// handle logo -------------------------------------------------------
const handleLogo = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.logo = target.files[0];
    previewLogo.value = URL.createObjectURL(target.files[0]);
  }
};

// handle degree -------------------------------------------------------
// const handleImages = (event: Event) => {
//   const target = event.target as HTMLInputElement;
//   if (target.files && target.files.length > 0) {
//     degree.images = target.files[0];
//     previewLogo.value = URL.createObjectURL(target.files[0]);
//   }
// };

// ---
const handleSubmit = async () => {
  const result = educationSchema.safeParse(form);
  if (!result.success) {
    validator.value = result.error.issues;
    return;
  }
  console.log("outSide Edit:", JSON.parse(JSON.stringify(form)));

  // Swap to Edit by id
  if(editId.value !== null && editId.value !== undefined){

    // const ok = window.confirm("Do you want to update this education?.");
    // if (!ok) return;
    console.log("Inside Edit", JSON.parse(JSON.stringify(form)));
    await educationStore.updateOne(editId.value, form)
    await educationStore.LoadForm();
    handleCancel(); 
    return
  }

  // const ok = window.confirm("Are you sure? You want to add new Education.");
  // if (!ok) return;

  await educationStore.create(form);
  await educationStore.LoadForm();
  handleCancel();
  return
};
console.log("asdasd",editId.value)
// handle_delete --------------------------------------------------
const handleDelete = async (id: number) => {
  const ok = window.confirm("Are you sure? You want to delete this education.");
  if (!ok) return;
  await educationStore.deleteOne(id)
  await educationStore.LoadForm();
  console.log(id)
}

// handle find one--------------------------------------------------
const handleFindOne = async (id: number) => {
  isOpenView.value = true
  await educationStore.findOne(id)
}

// handle_delete --------------------------------------------------
// const handleDegree = async () => {
//   await educationStore.addDegree(degree)
// }


// onMounted -------------------------------------------------------
onMounted(() => {
  educationStore.LoadForm()
});

// Count Terms  -------------------------------------------------------
const yearTerm = computed(() => {
  if (!currentEducation.value) return "";

  const start = new Date(currentEducation.value.date_start);
  const end = new Date(currentEducation.value.date_end);

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  if (end.getDate() < start.getDate()) {
    months--;
  }

  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (remainingMonths === 0) {
    return `${years} years`;
  }

  return `${years} years ${remainingMonths} months`;
});
</script>