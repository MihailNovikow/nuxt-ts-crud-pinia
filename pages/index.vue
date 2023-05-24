<template>
  <div>
    <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <NuxtLink to="/" class="navbar-brand">CRUD</NuxtLink>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <NuxtLink to="/items" class="nav-link">items</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink to="/add" class="nav-link">Add</NuxtLink>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
    <items-list></items-list>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import  ItemsList from "../components/ItemsList.vue";
export default defineComponent({
 // name: "App",
  components: {ItemsList
    
  }
  });
</script>