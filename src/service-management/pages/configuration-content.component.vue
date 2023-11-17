<template>
    <!-- <div>
        <div class="navbar-link sign-out" v-if='this.account' @click="signOut()">
            <i class="pi pi-sign-out"></i>
            <span>Sign Out</span>
        </div>
      <button @click="openSubscriptionComponent()">Open Subscription</button>
    </div> -->

    <div>
        <div class="buttons-configuration">

  <button @click="openSubscriptionComponent()">Open Subscription</button>
  <button class="button-sign-out" v-if='this.account' @click="signOut()">
    <i class="pi pi-sign-out"></i>
    <span>Log Out</span>
  </button>
</div>
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

/* Estilos para el contenedor de los botones */
.buttons-configuration {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 10px;
}

/* Estilos para los botones */
.buttons-configuration button {
  display: inline-flex;
  align-items:center;
  padding: 10px 20px;
  background-color: #e9e9e9;
  color: #000000;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px;
  font-size: 16px;
}

.buttons-configuration button:hover {
  background-color: #969696;
}
/* Estilos para el ícono dentro del botón */
.buttons-configuration button i {
  margin-right: 5px;
  font-size: 20px;
}

/* Estilos para el texto dentro del botón */
.buttons-configuration .button-sign-out {
  background-color: #48b9a5;
}
.buttons-configuration .button-sign-out:hover {
  background-color: #49dabf;
}
</style>