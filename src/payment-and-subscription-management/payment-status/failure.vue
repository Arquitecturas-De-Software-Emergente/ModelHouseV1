<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "failurePayment",
  methods: {
    retryPayment() {
      this.$router.push('/subscription');
    }
  }
})
</script>

<template>
  <div class="payment-failure">
    <h1>Payment Failed</h1>
    <p>We're sorry, but your payment was not successful.</p>
    <p>Please check your payment details and try again.</p>
    <button @click="retryPayment">Retry Payment</button>
  </div>
</template>

<style scoped>
.payment-failure {
  text-align: center;
  margin: 50px;
}

h1 {
  font-size: 24px;
  color: #FF0000;
}

button {
  margin-top: 20px;
  background-color: #FF0000;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #CC0000;
}
</style>