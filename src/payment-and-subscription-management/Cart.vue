<template>
  <div class="subscription-container">
    <div class="subscription-header">
      <h2>Choose Your Plan</h2>
      <p>You can cancel anytime.</p>
    </div>
    <div class="card-container">
      <div class="card" v-for="plan in plans" :key="plan.id">
        <div class="card-header">
          <img class="user-image" src="https://primefaces.org/cdn/primevue/images/usercard.png" alt="user header" />
        </div>
        <div class="card-body">
          <h3>{{ plan.name }}</h3>
          <p>{{ plan.description }}</p>
        </div>
        <div class="card-footer">
          <button class="subscribe-button" @click="goToCheckout(plan)">
            Subscribe for {{ plan.price }}/Monthly
          </button>
        </div>
      </div>
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
  margin: 50px;
}

.subscription-header {
  text-align: center;
  margin-bottom: 20px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  width: 300px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 20px;
  text-align: center;
}

.user-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.card-body {
  padding: 20px;
  text-align: center;
}

.card-footer {
  padding: 20px;
  text-align: center;
}

.subscribe-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.subscribe-button:hover {
  background-color: #45a049;
}
</style>