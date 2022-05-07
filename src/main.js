import { createApp } from "vue"
import App from "./App.vue"
import "./index.css"

import { createPinia } from "pinia"
import router from "./router"

import formatDateTime from "@/lib/dayjs"

import { useAuthStore } from "@/stores/auth"

import { library } from "@fortawesome/fontawesome-svg-core"
import { faHouseUser, faBook } from "@fortawesome/free-solid-svg-icons"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
library.add(faHouseUser, faBook, faGithub)

const app = createApp(App).use(createPinia()).use(router).use(formatDateTime).component("FontAwesomeIcon", FontAwesomeIcon)

const store = useAuthStore()
store.refreshToken().then(() => {
  app.mount("#app")
})
