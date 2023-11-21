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
            <img :src="account.image" alt="User Avatar" />
          </div>
          <div class="user-name">
            {{ account.name }}
          </div>
        </div>
      </router-link>
    </div>
  </div>

  <div class="Search">
      <input v-model="searchTerm" type="text" placeholder="Search businesses" @input="searchBusinesses" />
    </div>

  <div class="List">
    <div class="business-card" v-for="(business, index) in filteredBusinesses" :key="index">
      <div class="business-card__column">
        <div class="business-card-logo">
          <img :src="business.image" alt="Business logo" class="small-image" />
        </div>
      </div>
      <div class="business-card__column">
        <div class="business-card__info">
          <h3>{{ business.name }}</h3>
          <!-- <div class="business-card__rating">
            <Rating-v
              :modelValue= "promReview"
              :cancel="false"
              :stars="5"
              :readonly="true"
            ></Rating-v>
          </div> -->
          <p>{{ business.description }}</p>
        </div>
        <div class="business-card__button">
          <router-link :to="{ name: 'business-content', params: { id: business.id } }">
            <button class="custom-button">Read More</button>
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
      return this.$store.state.userIsLoggedIn
    }
  },
  data() {
    return {
      searchTerm: '',
      filteredBusinesses: [],
      businesses: [],
      promReview: 0,
      account: {
        id: null,
        name: null,
        image: null,
        userType: 'business'
      },
      businessReview: 4,
      review:{
        socre: 4,
      }
    }
  },

  methods: {
    // Función para buscar negocios al cambiar el término de búsqueda
    searchBusinesses() {
      const filter = this.searchTerm.toLowerCase();

      // Filtrar la lista de negocios en función del término de búsqueda
      this.filteredBusinesses = this.businesses.filter(business =>
        business.name.toLowerCase().includes(filter)
      );
    },
  },

  created() {
    const businessService = new BusinessListService();
    const userProfileService = new UserListService();

    businessService.searchRemodeler().then((response) => {
      this.businesses = response.data;
      this.filteredBusinesses = response.data; // Inicialmente, la lista filtrada es la misma que la lista completa
    });

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userIsLoggedIn = true;
    }

    if (userId) {
      businessService.searchBusinessProfile(userId).then((response) => {
        if (response.data != null) {
          this.account.name = response.data.name;
          this.account.image = response.data.image;
          this.account.id = response.data.id;
          //this.account.userType = "business";
          console.log('es empresa: ', response.data.id);
        }
      }).catch((error) => {
        if (error.response && error.response.status === 500) {
          console.log('Business profile not found. Switching to searchUserProfile.');
          userProfileService.searchUserProfile(userId).then((userProfile) => {
            this.account.name = userProfile.data.firstName;
            this.account.image = userProfile.data.image;
            this.account.id = userProfile.data.id;
            //this.account.userType = "user";
            console.log('es usuario: ', this.account);
          }).catch((userProfileError) => {
            console.error('Error in searchUserProfile:', userProfileError);
            // Handle the error from searchUserProfile if needed
          });
        }
      });
    }
  },
}
</script>

<style scoped>

  .Search {
    margin: 20px 0;
    position: relative;
    display: flex;
    justify-content: center;
  }

  .Search input {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s;
  }

  .Search input:focus {
    border-color: #004A63; /* Cambia el color del borde al enfocar el input */
  }

  .Search input::placeholder {
    color: #aaa;
  }

.List {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
.business-card__info{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.custom-button {
  background-color: #004a63; /* Color de fondo */
  color: #ffffff; /* Color del texto */
  padding: 10px 15px; /* Espaciado interno */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados */
  cursor: pointer; /* Cambia el cursor al pasar el ratón */
  font-size: 16px; /* Tamaño del texto */
  transition: background-color 0.3s ease, transform 0.2s ease;
  margin-top: 15px;
}
.custom-button:hover {
  background-color: #003142;
  transform: scale(1.05);
}
.business-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 900px;
  gap: 15px;
}
.small-image {
  width: 300px;
  height: 200px;
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

.business-card-logo img{
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.business-card-logo {
  border-radius: 20px;
}
</style>
