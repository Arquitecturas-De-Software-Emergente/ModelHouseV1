<template>
    <div>
        <div class="navbar-link sign-out" v-if='this.account' @click="signOut()">
            <i class="pi pi-sign-out"></i>
            <span>Sign Out</span>
        </div>
      <button @click="openSubscriptionComponent()">Open Subscription</button>
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
            this.$store.commit("setUserLoggedIn", false);
            this.$router.push('/home');
        },
        openSubscriptionComponent() {
        // Navigate to the Subscription component
        this.$router.push('/subscription');
        }
    },

    
}

</script>

<style>
.sign-out {
 cursor: pointer;
}
</style>