import './style.css'
import { createApp, ref } from 'vue'
import App from './App.vue'
import router from './router/routes'
import Swal from 'sweetalert2'

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component("Icon", FontAwesomeIcon)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { library } from "@fortawesome/fontawesome-svg-core"

import {     
    faCloudUpload,
} from "@fortawesome/free-solid-svg-icons"

library.add(
    faCloudUpload,
);