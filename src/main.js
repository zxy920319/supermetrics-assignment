import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"
import { createPinia } from "pinia"
import router from "./router"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faHouseUser, faBook } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
library.add(faHouseUser, faBook, faGithub)

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component("FontAwesomeIcon", FontAwesomeIcon)
app.mount("#app")
