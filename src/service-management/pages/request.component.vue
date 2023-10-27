<template>
  <div>
    <h1>Pending Requests</h1>
    <div class="request-cards">
      <div v-for="request in requests" :key="request.id" class="request-card">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ request.status }}</h5>
            <p>{{ request.description }}</p>
          </div>
        </div>
        <div class="button-container">
          <button @click="acceptRequest(request)" class="accept-button">Accept</button>
          <button @click="rejectRequest(request)" class="reject-button">Reject</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { RequestService } from '../service/request.service'

export default {
  name: 'Request-Page',
  data() {
    return {
      requests: []
    }
  },
  created() {
    const storedRequests = localStorage.getItem('requests')
    if (storedRequests) {
      this.requests = JSON.parse(storedRequests)
    } else {
      this.loadRequests()
    }
  },

  methods: {
    loadRequests() {
      const requestService = new RequestService()
      const userProfileId = 1
      const status = 'Pendiente'
      requestService
        .getRequestsByUserId(userProfileId, status)
        .then((response) => {
          this.requests = response.data
          localStorage.setItem('requests', JSON.stringify(this.requests))
        })
        .catch((error) => {
          console.error('Error al obtener las solicitudes:', error)
        })
    },
    acceptRequest(request) {
      console.log('Solicitud aceptada:', request)
      request.status = 'Aceptado'; 
      this.changeRequestStatus(request.id, { status: 'Aceptado' });
    },

    rejectRequest(request) {
      console.log('Solicitud rechazada:', request)
      request.status = 'Cancelado';
      this.changeRequestStatus(request.id, { status: 'Cancelado' });
    },

    changeRequestStatus(requestId, data) {
      const requestService = new RequestService();
      requestService.changeRequestStatus(requestId, data)
        .then(() => {
          if(data.status === 'Aceptado'){
            const message = "Cambio de estado a Aceptado exitoso.";
      window.alert(message);

          }
          else{
            const message = "Cambio de estado a Cancelado exitoso.";
            window.alert(message);
          }
          window.location.reload();
        })
        .catch(error => {
          
          console.error('Error al cambiar el estado de la solicitud:', error);
        });
    }
  }
}
</script>

<style scoped>
.request-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.request-card {
  flex: 1;
  min-width: 300px;
  max-width: 400px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #02aa8b;
  color: #fff;
  padding: 0.5rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: bold;
}

.card-body {
  padding: 1rem;
}

.button-container {
  text-align: center;
  margin-top: 20px;
}

/* Estilo para el botón "Accept" */
.accept-button {
  background-color: #02aa8b;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}

.accept-button:hover {
  background-color: #02aa8b;
}

/* Estilo para el botón "Reject" */
.reject-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.reject-button:hover {
  background-color: #d32f2f;
}
</style>
