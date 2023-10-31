<template>
    <div>
        <h1>PERFIL</h1> 
    </div>
</template>
<script>
export default {
    name: "Profile-Page",
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
        }
    }
}
</script>