<template>
  <article class="w-full h-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Skill Management</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Skill Management</p>
      <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add new skill</button>
    </div>
    <!-- isLoading ------------------------------------------------------ -->
    <div v-if="isLoading" class="w-full h-full"><LoadingForm /></div>

    <!-- isError ------------------------------------------------------ -->
    <div v-else-if="isError" class="p-1 font-light text-sm text-center text-red-500 bg-red-500/20">Error: {{ isError }}</div>

    <!-- Empty ------------------------------------------------------ -->
    <div v-else-if="skill.length <= 0" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Skill Is Empty!!!.</div>
    <!-- Table ------------------------------------------------------ -->
    <div v-else class="overflow-x-auto  rounded border border-gray-300 shadow-sm">
      <table class="min-w-full f;ec divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">Logo</th>
            <th class="p-1">Name</th>
            <th class="p-1">Rating</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <tbody v-if="skill" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in skill" :key="items.id" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1"><img v-if="items.logo_url" :src="`${items.logo_url}`"  alt="no" class="h-5 rounded-full"></td>
            <td class="p-1">{{ items.name }}</td>
            <td class="p-1">{{ items.rating }}</td>
            <td class="p-1">{{ items.created_at }}</td>
            <td class="p-1 w-40">
                <button @click="handleFindOne(items.id)" class="px-1 mx-1 text-green-500 border cursor-pointer">view</button>
                <button @click="handleEdit(items)" class="px-1 mx-1 text-yellow-500 border cursor-pointer">edit</button>
                <button @click="handleDelete(items.id)" class="px-1 mx-1 text-red-500 border cursor-pointer">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Add_modal-------------------------------------------------------------------- -->
    <section v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <div @click="handleCancel" class="absolute inset-0 bg-black/50"></div>
      <div class="relative z-10 w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
      <!-- Body ------------------------------------------------------------------------->
      <div class="w-full flex justify-between">
        <p v-if="editId" class="font-medium text-sm text-yellow-500 bg-yellow-500/20 border px-2 rounded-full">Edit Education</p>
        <p v-else class="font-medium text-sm text-blue-500 bg-blue-500/20 border px-2 rounded-full">Add Education</p>
        <button @click="handleCancel" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">X</button>
      </div>
      <div v-if="validator" class="">
          <div v-for="(validate, index) in validator" :key="index" class="text-center flex justify-start"><p class="border rounded-full px-1 font-normal text-sm my-1 text-yellow-500 bg-amber-500/10">{{ validate.message }}</p></div>
      </div>
      <form action="" @submit.prevent="handleSumbit" class="flex flex-col gap-1">
        <label for="nameId">Name</label>
        <select v-model="form.name" @change="handleSkillChange" class="border py-1">
          <option value="" v-if="!editId" >Select a skill</option>
          <option :value="form.name" >{{form.name}}</option>
          <option v-for="(skill, index) in skillOption" :key="index" :value="skill.name">{{ skill.name }}</option>
        </select>
        <label for="nameId">Rating</label>
        <select v-model="form.rating" class="border py-1">
          <option value="" v-if="!editId" disabled>0</option>
          <option :value="form.rating" v-if="editId" >{{form.rating}} %</option>
          <option v-for="(rating, index) in ratingOption" :key="index" :value="rating">{{ rating }} %</option>
        </select>
         <label for="ratingId">Logo</label>
        <div for="logoId" class="border border-[#22223A] bg-gray-500/5 p-4 rounded-md border-dashed flex flex-col justify-center items-center">
          <img   
            v-if="form.logo_url"
            :src="form.logo_url"
            alt="No Image"
            class="h-11 object-cover rounded-md text-[#66668A] text-[10px] font-bold flex flex-col justify-center items-center"
          />
           <p v-if="!form.logo_url" class="text-[#66668A] text-[13px] font-bold py-3" >No Preview</p>
        </div>
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
        <p class="font-medium text-sm text-green-500 bg-green-500/20 border px-2 rounded-full">View a skill</p>
        <button @click="handleCancel" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">X</button>
      </div>
      <!-- body 01 -->
      <div class="flex items-center justify-start gap-2 font-medium text-sm py-4">
        <div class="h-16"><img  v-if="currentSkill?.logo_url" :src="`${currentSkill?.logo_url}`"  alt="no" class="m-auto h-16 "></div>
        <div class="flex flex-col">
          <p>Program Record ID.  {{ currentSkill?.id }}</p>
          <h1 class=" font-bold text-3xl">{{ currentSkill?.name }}</h1>
          <p><span class="text-purple-500 bg-purple-500/20 border px-2 rounded-full">GPA {{ currentSkill?.rating}} %</span></p>
        </div>
      </div>
      <hr class="text-gray-400">
      <!-- body 02-->
       <div class=" w-full flex justify-between font-medium text-sm gap-4 pt-4">
        <!-- Record MetaData -->
        <div class="w-full">
          <p class="pb-2">Record Metadata</p>
          <div class="border rounded-xl border-gray-400">
            <p class="flex justify-between border-b border-gray-400 p-2"><span>Record ID</span><span>{{ currentSkill?.id }}</span></p>
            <p class="flex justify-between border-b border-gray-400 p-2"><span>GPA</span><span>{{ currentSkill?.rating }} %</span></p>
            <p class="flex justify-between p-2"><span>Created at</span><span>{{ currentSkill?.created_at }}</span></p>
          </div>
        </div>
       </div>
    </div>
  </section>
  
  </article>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { storeToRefs } from "pinia";
import { useSkillStore } from "../../store/useSkillStore.ts";
import type { Skill, skillFrom } from "../../types/skill.ts";
import LoadingForm from "../../components/LoadingForm.vue";

// JSON SKILL Option ----------------------------------------------------------
const skillOption = [
  {name: "React.js", logo: "https://explore-feed.github.com/topics/react/react.png"},
  {name: "Node.js", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2u7IvnmBKp74I_WfxKvWPekm1LaofWO_wU8sDOuw41g&s=10"},
  {name: "Vue.js", logo: "https://avatars.githubusercontent.com/u/6128107?s=200&v=4"},
  {name: "Express.js", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP46CpCUJFglJg8KwkaFgkXfzp8TFSaMl5q_DRJK5gnw&s=10"},
  {name: "Tailwind SCC", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX9fZzRj7BuQAtuf6RSuqIjWEaai2Vl7sFq2Y6tKq5hA&s"},
  {name: "TypeScript", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDqK8Z2GePLjD4yUzFQInkEyz6Yr_c96ej24CcA72VnQ&s=10"},
  {name: "JavaScript", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/960px-JavaScript-logo.png"},
]
// JSON Rating Option ----------------------------------------------------------
const ratingOption = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

// handleSkillChange ----------------------------------------------------------
const handleSkillChange = () => {
  const seleted = skillOption.find((s) => s.name === form.name)
  if(seleted) {form.logo_url = seleted.logo}
}

// Event Open Modal -------------------------------------------------------
const isOpen = ref<boolean>(false);
const isOpenView = ref<boolean>(false);

// API -------------------------------------------------------
const skillStore = useSkillStore();
const { skill, currentSkill, isLoading, isError } = storeToRefs(useSkillStore());

// Swap to Edit Modal -------------------------------------------------------
const editId = ref<number | null>(null);
const previewLogo = ref<string | null>(""); 

// handleEdit -------------------------------------------------------
const handleEdit = (skill: Skill) => {
  isOpen.value = true;
  previewLogo.value = skill.logo_url
  editId.value = skill.id;
  form.name = skill.name;
  form.rating = skill.rating;
  form.logo_url = skill.logo_url;
};

// handleCancel -------------------------------------------------------
const handleCancel = () => {
  isOpen.value = false;
  isOpenView.value = false
  editId.value = null;
  previewLogo.value = "";

  form.name = "";
  form.rating = "";
  form.logo_url = "";
};

// handleSubmit -------------------------------------------------------
// const form = reactive<skillFrom>({
//   name: "Svay Reing University",
//   rating: 50,
//   logo_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWB6UYyBFdi6TpU5aOLuKM8WZU6rhJxNkiyth3K-2aYxJG1xhyriKSGDQ&s=10",
// });
const form = reactive<skillFrom>({
  name: "",
  rating: "",
  logo_url: "",
});
const validator = ref<{ message: string }[]>([]);
// ---
const handleSumbit = async () => {
  console.log(form)
  // Swap to Edit by id
  if(editId.value !== null && editId.value !== undefined){

    // const ok = window.confirm("Do you want to update this education?.");
    // if (!ok) return; 

    await skillStore.updateOne(editId.value, form)
    await skillStore.loadForm();
    handleCancel(); 
    return
  }

  await skillStore.create(form);
  await skillStore.loadForm();
  handleCancel(); 
};
// handle_delete --------------------------------------------------
const handleDelete = async (id: number) => {
  // const ok = window.confirm("Are you sure? You want to delete this education.");
  // if (!ok) return;
  await skillStore.deleteOne(id)
  await skillStore.loadForm();
  console.log(id)
}

// handle_delete --------------------------------------------------
const handleFindOne = async (id: number) => {
  isOpenView.value = true
  await skillStore.findOne(id)
}

// onMounted -------------------------------------------------------
onMounted(() => {
  skillStore.loadForm()
});
</script>