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
body {
  font-family: 'Helvetica', sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 600px;
  margin: 20px auto;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

h1 {
  color: #333;
  text-align: center;
  padding: 20px 0;
  margin: 0;
}

.request-details {
  padding: 20px;
}

.detail {
  margin-bottom: 15px;
}

.strong {
  font-weight: bold;
}

.detail strong {
  display: inline-block;
  width: 150px;
  color: #555;
}

.detail a {
  color: #3498db;
  text-decoration: none;
}

.detail a:hover {
  text-decoration: underline;
}

</style>

