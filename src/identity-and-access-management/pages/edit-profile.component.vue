<template>
  <div v-if="this.userId!=null">
    <div class="profile-container">
      <h1 class="profile-title">PERFIL</h1>
      <div class="profile">
        <div class="profile-avatar">
          <img :src="user.image" alt="User Avatar" />
        </div>
        <div class="profile-details">
          <h3 class="profile-name">{{ user.firstName }} {{ user.lastName }}</h3>
          <div class="profile-info">
            <div class="profile-info-item">
              <span class="info-label">Género:</span>
              <span class="info-value">{{ user.gender }}</span>
            </div>
            <div class="profile-info-item">
              <span class="info-label">Teléfono:</span>
              <span class="info-value">{{ user.phoneNumber }}</span>
            </div>
            <div class="profile-info-item">
              <span class="info-label">Dirección:</span>
              <span class="info-value">{{ user.address }}</span>
            </div>
          </div>
          <button class="edit-button">Editar</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.userId==null">
    <div class="profile-container">
      <h1 class="profile-title">PERFIL</h1>
      <div class="profile">
        <div class="profile-avatar">
          <img :src="business.image" alt="User Avatar" />
        </div>
        <div class="profile-details">
          <h3 class="profile-name">{{ business.name }}</h3>
          <div class="profile-info">
            <div class="profile-info-item">
              <span class="info-label">Descripción:</span>
              <span class="info-value">{{ business.description }}</span>
            </div>
            <div class="profile-info-item">
              <span class="info-label">Dirección:</span>
              <span class="info-value">{{ business.address }}</span>
            </div>
            <div class="profile-info-item">
              <span class="info-label">Sitio Web:</span>
              <a :href="business.webSite" class="info-link">{{ business.webSite }}</a>
            </div>
            <div class="profile-info-item">
              <span class="info-label">Teléfono:</span>
              <span class="info-value">{{ business.phoneNumber }}</span>
            </div>
          </div>
          <button class="edit-button">Editar</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EditProfileService } from '../service/edit-profile.service'
export default {
  name: 'Profile-Page',
  data() {
    return {
      account: null,
      userId: null,
      businessId: null,
      user: {
        firstName: null,
        lastName: null,
        gender: null,
        phoneNumber: null,
        address: null,
        image: null
      },
      business: {
        name: null,
        image: null,
        description: null,
        address: null,
        webSite: null,
        phoneNumber: null,
        foundationName: null,
        categories: [],
        review: null
      }
    }
  },
  created() {
    const editProfileService = new EditProfileService()
    //const account = JSON.parse(localStorage.getItem("account"));
    const userId = JSON.parse(localStorage.getItem('userId'))?.userProfileId
    const businessId = JSON.parse(localStorage.getItem('account'))?.businessProfileId

    if (userId!=null) {
      editProfileService.userprofileByUserId(userId).then((response) => {
        if (response.data != null) {
          this.user.firstName = response.data.firstName
          this.user.image = response.data.image
          this.user.lastName = response.data.lastName
          this.user.gender = response.data.gender
          this.user.phoneNumber = response.data.phoneNumber
          this.user.address = response.data.address
          this.user.id = response.data.id
          //console.log('datos:: ', response.data.id)
        }
      })
    } else if (userId==null) {
      editProfileService.businessProfileByUserId(businessId).then((response) => {
        if (response.data != null) {
          this.business.name = response.data.name
          this.business.image = response.data.image
          this.business.id = response.data.id
          this.business.description = response.data.description
          this.business.address = response.data.address
          this.business.webSite = response.data.webSite
          this.business.phoneNumber = response.data.phoneNumber
          this.business.foundationName = response.data.foundationName
          this.business.categories = response.data.categories
          this.business.review = response.data.review
          console.log('datos:: ', response.data.name)
        }
      })
    }
  },
  methods: {
    signOut() {
      localStorage.removeItem('account')
      this.$store.commit('setUserLoggedIn', false)
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
.profile-container {
  text-align: center;
  padding: 20px;
}

.profile-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.profile {
  display: flex;
  align-items: center;
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.profile-avatar {
  flex: 1;
}

.profile-avatar img {
  max-width: 150px;
  border-radius: 50%;
}

.profile-details {
  flex: 3;
  text-align: left;
  padding: 10px;
}

.profile-name {
  font-size: 20px;
  margin: 0;
}

.profile-info {
  margin-top: 10px;
}

.profile-info-item {
  margin-bottom: 10px;
}

.info-label {
  font-weight: bold;
  margin-right: 10px;
}

.edit-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.edit-button:hover {
  background-color: #0056b3;
}
</style>
