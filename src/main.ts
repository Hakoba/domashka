import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import naive from 'naive-ui'

// General Font
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'

const app = createApp(App)
app.use(store)
app.use(naive)
app.mount("#app");