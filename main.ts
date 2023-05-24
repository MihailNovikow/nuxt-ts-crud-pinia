import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
//import { store, key } from "./store";
import mitt from 'mitt';
import { axios } from "axios";
import router from "@/router";
const emitter = mitt();
const app = createApp(App);
app.prototype.axios = axios;
app.config.globalProperties.emitter = emitter;
//app.use(store, key)
app.use(createPinia()).use(router).mount("#app");