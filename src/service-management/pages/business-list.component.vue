<template>
  <div v-if="!userIsLoggedIn">
    <div class="Buttons">
      <div class="button-container">
        <router-link to="/sign-in"> <button class="sign-in-button">Sign In</button></router-link>
        <router-link to="/sign-up">
          <button class="sign-up-button">Sign Up</button>
        </router-link>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="AvatarButton">
      <router-link to="/profile">
        <div class="giant-button">
          <div class="avatar">
            <img :src="account.image" alt="Avatar del usuario" />
          </div>
          <div class="user-name">
            {{ account.name }}
          </div>
        </div>
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
        <div class="business-card__button">
          <router-link :to="{ name: 'business-content', params: { id: business.id } }">
            Read More
          </router-link>
        </div>
      </div>
      <div class="business-card__column">
        <div class="business-card__location">
          <!--- <Icon-v icon="prime:map-marker" />-->
          <p>{{ business.address }}</p>
        </div>
        
      </div>
    </div>
  </div>

</template>

<script>
//import {SigIn} from "../../identity-and-access-management/service/user-sign-in.service"
import { BusinessListService } from '../service/business-list.service'
import { UserListService } from '../service/users-list.service'

export default {
  name: 'Business-List-Page',
  computed: {
    userIsLoggedIn() {
      return this.$store.state.userIsLoggedIn;
    },
  },
  data() {
    return {
      businesses: [],
      account: {
        id: null,
        name: null,
        image: null,
        userType: 'business',
      },
      
      
    }
  },

  created() {
    const businessService = new BusinessListService();
    const userProfileService = new UserListService();

    businessService.searchRemodeler().then((response) => {
      this.businesses = response.data
    });

    const userId = localStorage.getItem("userId");

    if (userId) {
  businessService.searchBusinessProfile(userId)
    .then((response) => {
      if (response.data != null) {
        this.account.name = response.data.name;
        this.account.image = response.data.image;
        this.account.id = response.data.id;
        //this.account.userType = "business";
        console.log("es empresa: ", response.data.id);
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        console.log("Business profile not found. Switching to searchUserProfile.");
        userProfileService.searchUserProfile(userId)
          .then((userProfile) => {
            this.account.name = userProfile.data.firstName;;
            this.account.image = userProfile.data.image;
            this.account.id = userProfile.data.id;
            //this.account.userType = "user";
            console.log("es usuario: ", this.account);
          })
          .catch((userProfileError) => {
            console.error("Error in searchUserProfile:", userProfileError);
            // Handle the error from searchUserProfile if needed
          });
      } 
    });
}

  },


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

.AvatarButton {
  display: flex;
  flex-direction: row-reverse;
  padding-right: 50px;
}
.giant-button {
  max-width: 300px;
  max-height: 150px;
  display: flex;
  align-items: center;
  background-color: #e0e4e9;
  color: #000000;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px; /* Espacio entre el avatar y el nombre */
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ajusta la imagen dentro del avatar */
}

.user-name {
  font-size: 18px;
  font-weight: bold;
}
</style>
