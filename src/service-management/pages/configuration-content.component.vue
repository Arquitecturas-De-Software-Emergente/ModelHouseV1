<template>
    <div>
        <li class="navbar-link sign-out" v-if='this.account' @click="signOut()">
            <i class="pi pi-sign-out"></i>
            <span>Sign Out</span>
        </li>
      <button @click="openSubscriptionComponent">Open Subscription</button>
    </div>
</template>

<script>

export default {
    name: "SignOut",
    data() {
        return {
            account: null,
        }
    },
    created() {
        this.account = JSON.parse(localStorage.getItem("account"));
    },
    methods: {
        signOut() {
            localStorage.removeItem("account");
            this.$router.push('/sign-in');
        },
        openSubscriptionComponent() {
        // Navigate to the Subscription component
        this.$router.push('/subscription');
      }
    }
}

</script>

<style>
.sign-out {
 cursor: pointer;
}
</style>