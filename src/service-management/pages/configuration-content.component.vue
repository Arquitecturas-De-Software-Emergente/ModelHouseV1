<template>
    <div>
        <li class="navbar-link sign-out" v-if='this.account' @click="signOut()">
            <i class="pi pi-sign-out"></i>
            <span>Sign Out</span>
        </li>
      <button  class="subscription-button" @click="openSubscriptionComponent()">Open Subscription</button>
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

.subscription-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.subscription-button:hover {
  background-color: #45a049;
}
</style>