
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/public/pages/home.component.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: "home",
        },
        {
            path: "/home",
            name: "Home-Page",
            component: Home,
        },
        
    ],
});
export default router;