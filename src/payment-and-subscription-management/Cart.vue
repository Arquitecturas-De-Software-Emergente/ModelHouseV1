<template>
  <div class="subscription-container">
    <div class="subscription-header">
    <h2>Choose your plan</h2>
    <p>You can canceled anytime.</p>
    </div>
    <div class="card flex align-items-center justify-content-center cardContent" >
      <Card-v v-for="plan in plans" :key="plan.id" style="width: 25em">
        <template #header>
          <img alt="user header" src="https://primefaces.org/cdn/primevue/images/usercard.png" />
        </template>
        <template #title> {{ plan.name }} </template>
        <template #subtitle> {{'🗸 '+ plan.description}} </template>
        <template #content>
          <p></p>
        </template>
        <template #footer>
          <Button-v @click="goToCheckout(plan)">
            {{ 'USD ' + plan.price + '/Monthly' }}
          </Button-v>
        </template>
      </Card-v>
    </div>

  </div>
</template>

<script>
import {defineComponent} from 'vue'
import axios from "axios";
export default defineComponent ({
  name: "cartSubscription",
  props: ['baseURL'],
  data() {
    return {
      stripeAPIToken : "pk_test_51NFT1pHntTAJqB06co8fw50sJHQLtYXUSb9sqA7YH6f1JVPKmb6GwZNgi6dWrFMZYOmZNT61jrZMgrZ72egCi9rZ003aA4r8Ro",
      stripe: "",
      plans: [],
      checkoutBodyArray: [],
    };
  },
  methods:{
    fetchPlans(){
      axios.get("http://modelhouse0.westus3.cloudapp.azure.com:8082/subscription-payment/plans").then(response => {
        this.plans = response.data;
      }).catch(error=>{
        console.error(error);
      });
    },

    goToCheckout(plan){
      const checkoutBody = {
        planId: plan.id,
        name: plan.name,
        description: plan.description,
        price: plan.price
      };
      this.checkoutBodyArray.push(checkoutBody);
      console.log('checkoutBodyArray', this.checkoutBodyArray);
      axios.post('http://modelhouse0.westus3.cloudapp.azure.com:8082/subscription-payment/order/create-checkout-session',this.checkoutBodyArray)
          .then((response) => {
            localStorage.setItem('sessionId', response.data.sessionId);
            console.log("session", response.data);
            this.stripe.redirectToCheckout({sessionId: response.data.sessionId});
          }).catch((err)=> console.log(err));
    },
  },
  mounted() {
    this.stripe = window.Stripe(this.stripeAPIToken);
    this.fetchPlans();
  },
});
</script>

<style scoped>
.subscription-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 20px;
}

.cardContent {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 110px; /* Increased space between cards */
  max-width: 1100px;
  width: 100%;
}

.subscription-header {
  text-align: center;
  margin-bottom: 20px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .cardContent {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (max-width: 480px) {
  .cardContent {
    grid-template-columns: 1fr;
  }
}
</style>