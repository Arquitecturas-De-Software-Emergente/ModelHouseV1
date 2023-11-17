<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "successPayment",
  methods: {
    navigateToHome() {
      this.$router.push('/home');
    }
  }
})
</script>

<template>
  <div class="payment-success">
    <h1>Payment Successful</h1>
    <p>Thank you for your payment. Your transaction was successful.</p>
    <p>An email receipt has been sent to your email address.</p>
    <button @click="navigateToHome" class="back-to-home-button">Back to Home</button>
  </div>
</template>

<style scoped>
.payment-success {
  text-align: center;
  margin: 50px;
}

h1 {
  font-size: 24px;
  color: #4CAF50;
}

.back-to-home-button {
  margin-top: 20px;
  text-decoration: none;
  color: #FFFFFF;
  font-weight: bold;
  background-color: #4CAF50;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-to-home-button:hover {
  background-color: #45a049;
}
</style>