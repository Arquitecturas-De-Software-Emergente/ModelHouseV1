
import { createRouter, createWebHistory } from "vue-router";
import Home from "@/public/pages/home.component.vue";
import signUp from "@/identity-and-access-management/pages/sign-up.component.vue";
import signIn from "@/identity-and-access-management/pages/sign-in.component.vue";
import BusinessContent from "@/service-management/pages/business-content.component.vue";
import RequestForm from "@/service-management/pages/request-form.component.vue";
import Request from "@/service-management/pages/request.component.vue";
import ProposalForm from "@/service-management/pages/proposal-form.component.vue";
import configurationContent from "@/service-management/pages/configuration-content.component.vue"
import profile from "@/identity-and-access-management/pages/edit-profile.component.vue";
import Cart from "@/payment-and-subscription-management/Cart.vue";
import projectProgressView from "@/service-management/pages/project-progress-view.component.vue";
import porjectDetails from "@/service-management/pages/project-details.component.vue";
import requestDetails from "@/service-management/pages/request-details.component.vue";
import userType from "@/identity-and-access-management/pages/user-type.component.vue";
import formUserProfile from "@/identity-and-access-management/pages/form-user-profile.component.vue";
import formBusinessProfile from "@/identity-and-access-management/pages/form-business-profile.component.vue";

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
    {
        path: "/sign-up",
        name: "sign-up",
        component: signUp,
    },
    {
        path: "/sign-in",
        name: "sign-in",
        component: signIn,
    },
    {
        path: "/business_profile/:id",
        name: "business-content",
        component: BusinessContent,
    },
    {
        path: "/project-details/:projectId",
        name: "project-details",
        component: porjectDetails,
    },
    {
        path: "/request-form/:businessId",
        name: "request-form",
        component: RequestForm,
    },
    {
        path: "/proposal-form/:proposalId",
        name: "proposal-form",
        component: ProposalForm,
        props: true,
    },
    {
        path: "/request/",
        name: "request-list",
        component: Request,
    },
    {
        path: "/settings",
        name: "settings",
        component: configurationContent,
    },
    {
        path: "/form-user-profile",
        name: "form-user-profile",
        component: formUserProfile,
    },
    {
        path: "/form-business-profile",
        name: "form-business-profile",
        component: formBusinessProfile,
    },
    {
        path: "/profile",
        name: "Profile-Page",
        component: profile,
    },
    {
        path:"/user-type",
        name:"user-type",
        component: userType
    },
    {
        path:"/subscription",
        name:"cartSubscription",
        component: Cart
    },
    {
        path: "/project/:proposalId",
        name: "project",
        component:projectProgressView
    },
    {
        path: "/request-details/:requestId",
        name: "request-details",
        component: requestDetails
    }
    ],
});
export default router;