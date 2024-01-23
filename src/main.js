//import './assets/main.css'
import './assets/output.css';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

app.config.globalProperties.$urlWrap = function (url) {
    const separator = url.includes("?") ? "&" : "?";
    return url + separator + "t=" + new Date().getTime();
};

app.mount('#app');
