<template>
  <article class="w-full flex flex-col gap-4 p-4">
    <h1 class="font-normal text-2xl">Project Management</h1>
    <div class="w-full flex justify-between border p-1">
      <p class="font-normal text-sm">Project Management</p>
      <div class="flex justify-between items-center gap-4">
        <div class="search-bar">
            <input v-model="searchInput" placeholder="Search work..." />
            <button v-if="searchInput" @click="clearSearch">Clear</button>
        </div>
        <select :value="workStore.work.pagination.limit" @change="workStore.setLimit(Number(($event.target as HTMLSelectElement).value))">
            <option :value="1">1 / page</option>
            <option :value="10">10 / page</option>
            <option :value="25">25 / page</option>
            <option :value="50">50 / page</option>
            <option :value="100">100 / page</option>
        </select>
        <button @click="isOpen = true" class="px-1 mx-1 border text-blue-500 font-normal text-sm cursor-pointer">Add new project</button>
      </div>
    </div>
    
    
    <!-- Table ------------------------------------------------------ -->
    <div class="overflow-x-auto rounded border border-gray-300 shadow-sm">
      <div v-if="isError" class="p-1 font-light text-sm text-center text-red-500 bg-red-500/20">Error: {{ isError }}</div>
      <div v-else-if="work.data.length <= 0" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Project is empty!!!.</div>
      <table class="min-w-full f;ec divide-y-2 divide-gray-200">
        <thead class="ltr:text-left rtl:text-right"> 
          <tr class="*:font-medium *:text-gray-500 bg-gray-500/20 text-sm">
            <th class="p-1">No.</th>
            <th class="p-1">Id</th>
            <th class="p-1">name</th>
            <th class="p-1">position</th>
            <th class="p-1">framework</th>
            <th class="p-1">description</th>
            <th class="p-1">github</th>
            <th class="p-1">demo</th>
            <th class="p-1">Created_at</th>
            <th class="p-1">action</th>
          </tr>
        </thead>
        <LoadingForm v-if="isLoading = true"/>
        <tbody v-if="work" class="divide-y divide-gray-200">
          <tr v-for="(items, index) in work.data" :key="items.id" class="*:text-gray-900 *:first:font-medium font-light text-sm">
            <td class="p-1">{{ index + 1 }}</td>
            <td class="p-1">{{ items.id }}</td>
            <td class="p-1">{{ items.name }}</td>
            <!-- <td class="p-1"><img v-if="items.logo_url" :src="`${items.logo_url}`"  alt="no" class="h-5 rounded-full"></td> -->
            <td class="p-1">{{ items.position }}</td>
            <td class="p-1">{{ items.framework }}</td>
            <td class="p-1">{{ items.description }}</td>
            <td class="p-1">{{ items.github }}</td>
            <td class="p-1">{{ items.demo }}</td>
            <td class="p-1">{{ items.created_at }}</td>
            <td class="p-1 w-40">
                <button @click="handleFindOne(items.id)" class="px-1 mx-1 text-green-500 border cursor-pointer">view</button>
                <button @click="handleEdit(items)" class="px-1 mx-1 text-yellow-500 border cursor-pointer">edit</button>
                <button @click="handleDelete(items.id)" class="px-1 mx-1 text-red-500 border cursor-pointer">delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div>
    </div>
      <div v-if="isLoading" class="p-1 font-light text-sm text-center text-green-500 bg-green-500/20">Loading...</div>
    </div>
    <div class="">
      <button 
        :disabled="workStore.work.pagination.page === 1" 
        @click="goToPage(workStore.work.pagination.page - 1)"
        class="px-1 mx-1 text-red-500 border cursor-pointer"
      >
        Prev
      </button>
      <span class="px-1 mx-1 text-red-500 border cursor-pointer">Page {{ workStore.work.pagination.page }} of {{ workStore.work.pagination.totalPage }}</span>
      <button
        :disabled="workStore.work.pagination.page === workStore.work.pagination.totalPage"
        @click="goToPage(workStore.work.pagination.page + 1)"
        class="px-1 mx-1 text-red-500 border cursor-pointer"
      >
        Next
      </button>
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
      <form action="" @submit.prevent="handleSubmit" class="flex flex-col gap-1">
        <label for="nameId">Name</label>
        <input type="text" v-model="form.name" class="border" />
        <label for="nameId">position</label>
        <input type="text" v-model="form.position" class="border" />
        <label for="nameId">framework</label>
        <input type="text" v-model="form.framework" class="border" />
        <label for="nameId">description</label>
        <input type="text" v-model="form.description" class="border" />
        <label for="nameId">github</label>
        <input type="text" v-model="form.github" class="border" />
        <label for="nameId">demo</label>
        <input type="text" v-model="form.demo" class="border" />
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
        <!-- <div class="h-16"><img  v-if="currentWork?.logo_url" :src="`${currentSkill?.logo_url}`"  alt="no" class="m-auto h-16 "></div> -->
        <div class="flex flex-col">
          <p>Program Record ID.  {{ currentWork?.id }}</p>
          <h1 class=" font-bold text-3xl">{{ currentWork?.name }}</h1>
          <p><span class="text-purple-500 bg-purple-500/20 border px-2 rounded-full">GPA {{ currentWork?.position}} %</span></p>
        </div>
      </div>
      <hr class="text-gray-400">
      <!-- body 02-->
       <div class=" w-full flex justify-between font-medium text-sm gap-4 pt-4">
        <!-- Record MetaData -->
        <div class="w-full">
          <p class="pb-2">Record Metadata</p>
          <div class="border rounded-xl border-gray-400">
            <p class="flex justify-between border-b border-gray-400 p-2"><span>Record ID</span><span>{{ currentWork?.id }}</span></p>
            <p class="flex justify-between border-b border-gray-400 p-2"><span>GPA</span><span>{{ currentWork?.position }}</span></p>
            <p class="flex justify-between p-2"><span>Created at</span><span>{{ currentWork?.created_at }}</span></p>
          </div>
        </div>
       </div>
    </div>
  </section>
  
  </article>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useWorkStore } from "../../store/useWorkStore.ts";
import type { Work, WorkForm } from "../../types/work.ts";
import LoadingForm from "../../components/LoadingForm.vue";

// Event Open Modal -------------------------------------------------------
const isOpen = ref<boolean>(false);
const isOpenView = ref<boolean>(false);
const editId = ref<number | null>(null);
const previewLogo = ref<string | null>(""); 
const validator = ref<{ message: string }[]>([]);
const workStore = useWorkStore();
const { work, currentWork, isLoading, isError} = storeToRefs(useWorkStore());
const searchInput = ref("")
let debounceTimer: ReturnType<typeof setTimeout>
const form = reactive<WorkForm>({
  name: "portfolio",
  position: "full-stack",
  framework: "Vue.js, Node.js", 
  description: "description", 
  github: "https://github.com/", 
  demo: "https://demo.com/", 
});
// const form = reactive<WorkForm>({
//   name: "",
//   position: "",
//   framework: "", 
//   description: "", 
//   GitHub: "",
//   demo: "", 
// });

// -----------------------------------------------------------------------------------------------------------
// Event and function ----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------

// handleEdit -------------------------------------------------------
const handleEdit = (work: Work) => {
  isOpen.value = true;
  editId.value = work.id;
  form.name = work.name;
  form.position = work.position;
  form.framework = work.framework;
  form.description = work.description;
  form.github = work.github;
  form.demo = work.demo;
}

// handleCancel -------------------------------------------------------
const handleCancel = () => {
  isOpen.value = false;
  isOpenView.value = false
  editId.value = null;
  previewLogo.value = "";

  form.name = "";
  form.position = "";
  form.framework = "";
  form.description = "";
  form.github = "";
  form.demo = "";
};

// go to page -------------------------------------------------------
function goToPage(page: number) {
  if (page < 1 || page > workStore.work.pagination.totalPage) return
  workStore.setPage(page)
}

// clear search -------------------------------------------------------
function clearSearch() {
  searchInput.value = ""
  workStore.clearSearch()
}

// -----------------------------------------------------------------------------------------------------------
// call api ----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------------------------


// create and update --------------------------------------------------
const handleSubmit = async () => {
  if(editId.value !== null && editId.value !== undefined){
    await workStore.updateOne(editId.value, form)
    await workStore.loadForm();
    handleCancel(); 
    return
  }
  await workStore.create(form);
  await workStore.loadForm();
  handleCancel(); 
};

// find one --------------------------------------------------
const handleFindOne = async (id: number) => {
  isOpenView.value = true
  await workStore.findOne(id)
}

// handle_delete --------------------------------------------------
const handleDelete = async (id: number) => {
  await workStore.deleteOne(id)
  await workStore.loadForm();
  console.log(id)
}

// onMounted -------------------------------------------------------
onMounted(() => {
  workStore.loadForm()
});


// watch -------------------------------------------------------
watch(searchInput, (value) => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => workStore.setSearch(value), 400)
})

</script>