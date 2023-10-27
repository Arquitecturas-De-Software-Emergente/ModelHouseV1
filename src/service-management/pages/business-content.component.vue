<template>
    <div class="business-detail" v-if="business">
      <h1>{{ business.name }}</h1>
      <div class="business-logo">
        <img :src="business.logo" alt="Logo de la empresa" />
      </div>
      <p>{{ business.description }}</p>
      <div class="business-rating">
        <p>Rating: {{ business.review }}/ 5 estrellas</p>
      </div>
      <div class="business-location">
        <i class="fas fa-map-marker"></i>
        <p>{{ business.address }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { BusinessDetailService } from "../service/business-detail.service";
  export default {
    name: "Business-Conent-Page",
    data() {
      return {
        business: null, 
      };
    },
    created() {
    const businessService = new BusinessDetailService(); 
    businessService.getBusinessByID(this.$route.params.id).then(response => {
      this.business = response.data;
    }).catch(error => {
      console.error("Error al obtener los detalles del negocio", error);
    });
  },

  };
  </script>
  
  <style scoped>
  /* Agrega estilos CSS para personalizar la apariencia del detalle del negocio según tus necesidades */
  .business-detail {
    /* Estilos para el contenedor principal */
  }
  
  .business-logo {
    /* Estilos para el logo de la empresa */
  }
  
  .business-rating {
    /* Estilos para mostrar la calificación del negocio */
  }
  
  .business-location {
    /* Estilos para mostrar la ubicación del negocio */
  }
  </style>
  