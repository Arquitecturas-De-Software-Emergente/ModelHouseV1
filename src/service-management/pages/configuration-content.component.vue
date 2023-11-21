<template>
  
    <div class="setitng">
      <h1 style="border-bottom: 1px solid #ccc;">Settings</h1>
      
    </div> 

  <div class="body-buttons">
    
    <div class="buttons-configuration">
      <h2> Subscription </h2>
      <button @click="openSubscriptionComponent()">View Plans</button>
      <div v-if="this.account">
      <h2> Account </h2>
      <router-link to="/profile">
      <button class="button-Profile">
        <span>View Profile</span>
      </button>
    </router-link>
      <button class="button-sign-out"  @click="signOut()">
        <i class="pi pi-sign-out"></i>
        <span>Log Out</span>
      </button>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignOut',
  data() {
    return {
      account: null
    }
  },
  created() {
    this.account = JSON.parse(localStorage.getItem('account'))
  },
  methods: {
    signOut() {
      localStorage.removeItem('account')
      this.$store.commit('setUserLoggedIn', false)
      this.$router.push('/home')
    },
    openSubscriptionComponent() {
      // Navigate to the Subscription component
      this.$router.push('/subscription')
    }
  }
}
</script>

<style scoped>
  body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
  }

  h1 {
    color: #333;
    text-align: left; /* Cambiado a alineación a la izquierda */
    padding: 20px 0;
    margin: 0;
    
  }

  h2 {
    color: #666;
    margin-bottom: 25px;
  }
  
  .buttons-configuration {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px auto;
    padding: 20px;
    text-align: left; /* Cambiado a alineación a la izquierda */
  }

  button {
    background-color: #004A63;
    color: #fff;
    padding: 10px 20px;
    border: none ;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin-right: 10px;
    margin-bottom: 30px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color:#004A63;
  }

  .button-Profile {
    background-color: #004A63;
    display: flex;
    flex-direction: column;
  }

  .button-Profile:hover {
    background-color: #004A63;
  }

  .button-sign-out {
    background-color: #e74c3c;
  }

  .button-sign-out:hover {
    background-color: #c0392b;
  }
</style>
