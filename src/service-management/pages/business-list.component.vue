<template>
  <div class="Buttons">
    <div class="button-container">
        <router-link to="/sign-in">
      <button class="sign-in-button">Sign In</button></router-link>
        <router-link to="/sign-up">
      <button class="sign-up-button">Sign Up</button>
        </router-link>
    </div>
  </div>

  <div class="List">
    <div class="business-card" v-for="(business, index) in businesses" :key="index">
      <div class="business-card__column">
        <div class="business-card__logo">
          <img :src="business.image" alt="Logo de la empresa" class="small-image" />
        </div>
      </div>
      <div class="business-card__column">
        <div class="business-card__info">
          <h3>{{ business.name }}</h3>
          <div class="business-card__rating">
            <Rating-v v-model="business.rating" :cancel="false" :stars="5"></Rating-v>
          </div>
          <p>{{ business.description }}</p>
        </div>
      </div>
      <div class="business-card__column">
        <div class="business-card__location">
          <!--- <Icon-v icon="prime:map-marker" />-->
          <p>{{ business.address }}</p>
        </div>
        <div class="business-card__button">
          <a href="#">Ver más</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BusinessListService } from '../service/business-list.service'

export default {
  name: 'Business-List-Page',
  data() {
    return {
      businesses: []
    }
  },
  created() {
    const businessService = new BusinessListService()
    businessService.searchRemodeler().then((response) => {
      this.businesses = response.data
    })
  }
}
</script>

<style scoped>
.List {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.business-card {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  max-width: 800px;
}
.business-card__column {
  margin-right: 40px;
}
.small-image {
  max-width: 250px;
  max-height: 150px;
}
.button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.Buttons {
  display: flex;
  flex-direction: column;
  padding-right: 50px;
}

.sign-in-button {
  background-color: #02aa8b; /* Color de fondo del botón */
  color: #fff;
  border: none;
  padding: 10px 20px; 
  border-radius: 5px; 
  font-size: 16px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
  margin-right: 15px;

  &:hover {
    background-color: #48b9a5;
  }
}

.sign-up-button {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #000000;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e6fffa;
  }
}
</style>
