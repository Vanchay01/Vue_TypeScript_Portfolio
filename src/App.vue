<template>
  <article class="w-full flex">
    <SideMenu />
    <div class="w-full">
      <router-view></router-view>
    </div>
  </article>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue';


</script>
