//import { generateFakeData, Product, Item } from "@/models/product.model";
import Item from "@/types/Item";
import { defineStore } from "pinia";
import ItemDataService from "@/services/ItemDataService";

export type RootState = {
   
   items: Item[];
};

export const useMainStore = defineStore({
    id: "mainStore",
    state: () =>
    ({
        isPostsLoading: false,
        selectedSort: '',
        searchQuery: '',
        page: 1,
        limit: 10,
        totalPages: 0,
        sortOptions: [
            { value: 'title', name: 'По названию' },
            { value: 'description', name: 'По содержимому' },
        ], 
        items: [],
        currentItem: {
            id: null,
            title: "",
            description: "",
            published: false,
        } as Item,
        item: {
            id: null,
            title: "",
            description: "",
            published: false,
        } as Item,
        message: "",
       
        filters: [],
        page: "",
        limit: 20,
    } as RootState),
    getters: {
        sortedItems(state) {
            return [...state.items].sort((item1, item2) => item1[state.selectedSort]?.localeCompare(item2[state.selectedSort]))
        },
        sortedAndSearchedItems(state, getters) {
            return getters.sortedItems.filter(item => item.title.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    actions: {
        //from bezkoder
        searchTitle(title: String) {
            ItemDataService.findByTitle(title)
                .then((response: ResponseData) => {
                    this.items = response.data.data;
                    this.setActiveItem({} as Item);
                    console.log(this.items);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        retrieveItems() {
            ItemDataService.getAll()
                .then((response: ResponseData) => {
                    this.items = response.data.data;
                    console.log('this.items:', this.items);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        refreshList() {
            this.retrieveItems();
            this.currentItem = {} as Item;
            this.currentIndex = -1;
        },

        setActiveItem(Item: Item, index = -1) {
            this.currentItem = Item;
            this.currentIndex = index;
        },

        removeAllitems() {
            ItemDataService.deleteAll()
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        saveItem() {
            let data = {
                title: this.item.title,
                description: this.item.description,
            };

            ItemDataService.create(data)
                .then((response: ResponseData) => {
                    this.item.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        newItem() {
            this.submitted = false;
            this.Item = {} as Item;
        },
        getItem(id: any) {
            ItemDataService.get(id)
                .then((response: ResponseData) => {
                    this.currentItem = response.data;
                    console.log(response.data);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        updatePublished(status: boolean) {
            let data = {
                id: this.currentItem.id,
                title: this.currentItem.title,
                description: this.currentItem.description,
                published: status,
            };

            ItemDataService.update(this.currentItem.id, data)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.currentItem.published = status;
                    this.message = "The status was updated successfully!";
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        updateItem(id: number) {
            ItemDataService.update(this.currentItem.id, this.currentItem)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.message = "The Item was updated successfully!";
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },

        deleteItem(id: number) {
            ItemDataService.delete(this.currentItem.id)
                .then((response: ResponseData) => {
                    console.log(response.data);
                    this.$router.push({ name: "Items" });
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
        //items
        async fetchItems(url, data = {}) {
            const fetchItemsResponse = await axios.get(url, data
            ).then(res => {
                this.items = res.data;
                console.log('res.data:', res.data);
            })
        },


        createNewItem(item: {}) {
            let data = {
                title: item.title,
                description: item.description,
            };
            ItemDataService.create(data)
            .then((response: ResponseData) => {
                this.item.id = response.data.id;
                console.log('response.data:', response.data);
            }).catch((e: Error) => {
                console.log(e);
            });
            //this.items.push(Item);
        },

      /*  async updateItem(id: string, payload: Item) {
            if (!id || !payload) return;

            const index = this.findIndexById(id);

            if (index !== -1) {
                //this.items[index] = generateFakeData();
                const updateItemsResponse = await axios.put(url, data
                ).then(res => {
                    this.items = res.data;
                    console.log('res.data:', res.data);
                })
            }
        },

        async deleteItem(id: string) {
            const index = this.findIndexById(id);

            if (index === -1) return;
            const deleteItemsResponse = await axios.delete(url, data
            ).then(res => {
                this.items = res.data;
                console.log('res.data:', res.data);
                this.items.splice(index, 1);
            })
           
        },

        findIndexItemsById(id: string) {
            return this.items.findIndex((item) => item.id === id);
        },*/
       
        findIndexById(id: string) {
            return this.items.findIndex((product) => product.id === id);
        },
        sendCat() {
            const catFilt = { title: "Все рубрики" };
            catFilt["catArr"] = [];
            this.items.forEach((catElem) => {
                catFilt.catArr.push({ cat: catElem.property });
            });
            catFilt["all"] = catFilt.catArr.length;
            return catFilt;
        },
        filterCategory(status) {
            console.log('status', status);
            this.actualItems = [];
            this.items.forEach((el) => {
                let isFilt = true;
                el.properties.forEach((elProp) => {
                    if (status.includes(elProp.property) && isFilt) {
                        this.actualItems.push(el);
                        isFilt = false;
                    }
                });
            });
            !this.actualItems.length && !status.length ? (this.actualItems = this.items) : "";
        },
    },
});