<template>
  <div v-if="currentItem.id" class="edit-form">
    <h4>Item</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentItem.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentItem.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentItem.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      v-if="currentItem.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      v-else
      class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteItem">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateItem">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Item...</p>
  </div>
</template>

<script lang="ts" setup name="Item">
import { defineComponent } from "vue";
import ItemDataService from "@/services/ItemDataService";
import Item from "@/types/Item";
import ResponseData from "@/types/ResponseData";
import { useMainStore } from "@/store/store";
//export default defineComponent({
//  name: "Item",
 // data() {
  //  return {
    const mainStore = useMainStore();
      const currentItem = {} as Item,
      let message: String = "",
 //   };
  //},
  //methods: {
    const getItem = (id: any) => {
      mainStore.getItem(id);
    },

   const  updatePublished = (status: boolean) => {
      mainStore.updatePublished();
    },

   const updateItem = () => {
      mainStore.updateItem();
    },

   const deleteItem = () => {
      mainStore.deleteItem();
    },
 // },
  mounted() {
    return function() {
      this.message = "";
    this.getItem(this.$route.params.id);
    }
  };
//});
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
