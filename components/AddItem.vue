<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="item.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="item.description"
          name="description"
        />
      </div>

      <button @click="saveItem" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newItem">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemDataService from "@/services/ItemDataService";
import Item from "@/types/Item";
import ResponseData from "@/types/ResponseData";
import { useMainStore } from "@/store/store";
export default defineComponent({
  name: "add-item",
  data() {
    const mainStore = useMainStore();
    return {
       
      item: {
        id: null,
        title: "",
        description: "",
        published: false,
      } as Item,
      submitted: false,
    };
  },
  methods: {
    
    saveItem() {
      mainStore.saveItem();
    },

    newItem() {
       mainStore.newItem();
    },
  },
});
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
