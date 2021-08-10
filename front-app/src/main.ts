import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
// Tailwind読み込み
import "./assets/tailwind.scss";

createApp(App).use(store).use(router).mount("#app");
