<template>
  <h1>Grocery List App</h1>

  <button @click="createItem">New Item</button>
<!--search-->
<my-input
      :model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск...."
      v-focus
    />
<!--filter-->
<FilterComponentCheckbox
:allfilters="sendCat()"
          @filter="filterCategory($event)"
></FilterComponentCheckbox>
<!--sort-->
<my-select
        :model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
  <div>
    <!--list-->
    <div
      v-for="(item, index) in items"
      :key="index"
      style="background-color: #f5f5f5; padding: 10px; margin-bottom: 10px; margin-top: 10px;"
    >
      <div>{{ item }}</div>
      <Item :item="item"></Item>
      <button @click="deleteItem(item.id)">Delete</button>
      <button @click="updateItem(item.id)">Update</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import { useMainStore } from "@/store/store";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import FilterComponentCheckbox from "@/components/FilterComponentCheckbox";
//export default defineComponent({

  //setup() {
     const mainStore = useMainStore();const items = mainStore.items;//ref<Item[]>([]);

   

    onMounted(() => {
       items = mainStore.items;
    });
        
        function fetchItems() {
            const fetchUrl = 'api/getPosts';
      mainStore.fetchItems(fetchUrl);
    }
    function createItem(item: {}) {
      mainStore.createNewItem(item);
    }

    function deleteItem(id: string) {
      mainStore.deleteItem(id);
    }

    function updateItem(id: string) {
      mainStore.updateItem(id);
    }
function sendCat() {
      mainStore.sendCat();
        }
    function filterCategory(status) {
      mainStore.filterCategory(status);
    }
   /* return {
      items,
      createItem,
      deleteItem,
      updateItem,
    };
  },*/
//});
</script>