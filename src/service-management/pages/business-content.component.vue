<template>
  <div class="business-detail" v-if="business">
    <div class="business-summary">
      <div class="business-logo">
        <img :src="business.image" alt="Logo de la empresa" />
      </div>
      <div class="business-rating">
    <Rating-v v-model="business.review" :cancel="false" :stars="5"></Rating-v>
  </div>
      <h1>{{ business.name }}</h1>
      <p>Teléfono: {{ business.phone }}</p>
      <p>Oficial Web Page: {{ business.webSite }}</p>
      <p>Address: {{ business.address }}</p>
      <p>Service Area: {{ business.address }}</p>
      <p>Categoría: </p>
      <p>Social Media: </p>
      <router-link to ="/request-form">
      <button class="send-button">Send Request</button>
      </router-link>
    </div>
    <div class="business-details">
      <h2>About Us</h2>
      <p>{{ business.description }}</p>
      <h2>Especialización</h2>
      <p>{{ business.especialization }}</p>
      <h2>Projects</h2>
      <div class="project-carousel">
        <!-- Agrega un carrusel de imágenes aquí -->
      </div>
    </div>
  </div>
</template>

<script>
import { BusinessDetailService } from '../service/business-detail.service'
export default {
  name: 'Business-Conent-Page',
  data() {
    return {
      business: null
    }
  },
  created() {
    const businessService = new BusinessDetailService()
    businessService
      .getBusinessByID(this.$route.params.id)
      .then((response) => {
        this.business = response.data
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del negocio', error)
      })
  }
}
</script>

<style scoped>
.business-detail {
  display: flex;
  justify-content: space-between;
}

.business-summary {
  flex: 1;
  padding: 20px;
  border-right: 1px solid #ccc;
}

.business-logo img {
  max-width: 450px;
  border: 2px solid #02aa8b;
  border-radius: 5%;
  margin-bottom: 10px;
}

.business-rating {
  margin-bottom: 10px;
  font-size: 24px;
  color: #FDB813;
}

.send-button {
  background-color: #02aa8b;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.business-details {
  flex: 2;
  padding: 20px;
}

h1 {
  font-size: 24px;
}

h2 {
  font-size: 20px;
  margin-top: 20px;
}

.project-carousel {
  /* Agrega estilos para el carrusel de imágenes aquí */
}

/* Ajusta los estilos del carrusel de imágenes según tu elección */
</style>
