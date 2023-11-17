<template>
  <div>
    <h1>Request to {{ requests.user.firstName }} {{ requests.user.lastName }}</h1>
    <div class="request-details">
      <div class="detail">
        <strong>Category:</strong> {{ requests.category }}
      </div>
      <div class="detail">
        <strong>Estimated Budget:</strong> {{ requests.estimatedBudget }}
      </div>
      <div class="detail">
        <strong>Area (m2):</strong> {{ requests.area }}
      </div>
      <div class="detail">
        <strong>Location :</strong> {{ requests.location }}
      </div>
      <div class="detail">
        <strong>Files :</strong>
        {{ requests.file ? requests.file : 'No hay documentos' }}
      </div>
      <div class="detail">
        <strong>Description:</strong> {{ requests.description }}
      </div>
    </div>
  </div>


</template>
<script>
import { RequestService } from '../service/request.service';

export default {
  name: 'Request-Details',
  data() {
    return {
      requests: {
        category: null,
        estimatedBudget: null,
        area : null,
        file: null,
        description: null,
        location: null,
        status: null,
        user: {
          firstName: null,
          lastName: null,
        },
      },
      }

    
  },

  created(){

      const requestService = new RequestService()
        requestService.getRequests()
    .then(response => {
      const allRequests = response.data;
      console.log('Todas las solicitudes:', allRequests);
      this.request = allRequests.find(request => request.id == this.$route.params.requestId);
      this.requests.description = this.request.description;
      this.requests.location = this.request.location;
      this.requests.status = this.request.status;
      this.requests.category = this.request.category;
      this.requests.estimatedBudget = this.request.estimatedBudget;
      this.requests.area = this.request.area;
      this.requests.file = this.request.file;
      this.requests.user.firstName = this.request.userProfile.firstName;
      this.requests.user.lastName = this.request.userProfile.lastName;
      console.log('Detalles de la solicitud:', this.request);
      if (this.request) {
        console.log('Detalles de la solicitud:', this.request);
      } else {
        console.log('Solicitud no encontrada.');
      }
    })
    .catch(error => {
      console.log('Error al obtener las solicitudes:', error);
    });

  },

}
</script>
<style scoped>
  /* Estilo básico para la vista de detalles de la solicitud */
  .request-details {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .detail {
    margin-bottom: 10px;
  }

  /* Agrega más estilos según sea necesario */
</style>

