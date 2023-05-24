<template>
  <div class="list row">
    <div class="col-md-8">
      <!--search>-->
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          v-model="searchQuery"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="searchTitle(searchQuery)"
          >
            Search
          </button>
        </div>
      </div>
<!--sort-->
<my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
    </div>
    <div class="col-md-6">
      <h4>items List</h4>
      <ul v-for="(item, index) in items" :key="index" class="list-group">
        <li class="list-group-item" @click="setActiveItem(item, index)">
          
          <h2>{{ item.title }} </h2>
          <h2>{{ item.description }} </h2>
          <p class="mt-1 text-sm text-gray-600">Post image
                            <img class="h-64 w-128" :src="item.img" alt="item.title" srcset="">
                        </p>
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllitems">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentItem.id">
        <h4>Item</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentItem.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentItem.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentItem.published ? "Published" : "Pending" }}
        </div>

        <NuxtLink
          :to="'/items/' + currentItem.id"
          class="badge badge-warning"
          >Edit</NuxtLink
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a item...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="items-list">
import { useMainStore } from "@/store/store";
import MySelect from "@/components/UI/MySelect";
import Item from "@/types/Item";
    const mainStore = useMainStore();
//const props = defineProps({});
const searchQuery: String = "";
//const emit = defineEmits([/*'update:getHtml', 'update:getText'*/]);
mainStore.retrieveItems(); 
let items: Item[] = mainStore.items;
const currentItem: Item = {
  id: null,
  title: "",
  description: "",
  published: false,
  img: ""
};
const currentIndex: Number = -1;

function setSelectedSort() {
  mainStore.setSelectedSort();
}
    function searchTitle(searchQuery) {
      mainStore.searchTitle(searchQuery);
    }

    const refreshList = () =>
    {
      mainStore.refreshList();

    };

    const setActiveItem = (item: Item, index = -1) => {
      mainStore.setActiveItem(item, index);
    };

    const removeAllitems = () => {
      mainStore.removeAllitems();
    };
//computed(() => {
let selectedSort = mainStore.selectedSort;
let sortOptions = mainStore.sortOptions;
//})
   onMounted(() => {
      //
  mainStore.retrieveItems();
   });
   
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
