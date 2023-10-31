<template>
  <div class="request-view-container">
    <TabView v-model:activeIndex="active" style="margin: 0px 50px 0px 50px">
      <!--    FIRST PANEL-->
      <TabPanel style="background-color: cornflowerblue; padding: 10px 15px" header="REQUESTS">
        <div>
          <div class="request-cards">
            <div v-for="request in pendingRequests" :key="request.id" class="request-card">
              <div class="card">
                <div class="card-body">
                  <p>User Type in Request-Page: {{ userType }}</p>
                  <p>{{ request.description }}</p>
                  <p>Address: {{ request.location }}</p>
                </div>
              </div>
              <div class="button-container-business" v-if="userType == 'business'">
                <button @click="acceptRequest(request)" class="accept-button">Accept</button>
                <button @click="rejectRequest(request)" class="reject-button">Reject</button>
              </div>
              <div class="button-container-client" v-if="userType == 'user'">
                <button class="see-details">See Details</button>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>

      <!--    SECOND PANEL-->
      <TabPanel style="background-color: yellowgreen; padding: 10px 15px" header="PROPOSALS">
        <proposalComponent></proposalComponent>
      </TabPanel>
      <!--    THIRD PANEL-->
      <TabPanel style="background-color: green; padding: 10px 15px" header="PROJECTS"> </TabPanel>
      <!--    FOURTH PANEL-->
      <TabPanel style="background-color: green; padding: 10px 15px" header="COMPLETED Projects">
      </TabPanel>
      <!--    FIFTH PANEL-->

      <TabPanel style="background-color: #f5f5f5; padding: 1rem" header="CANCELED">
        <div class="request-cards">
          <div v-for="request in canceledRequests" :key="request.id" class="request-card">
            <div class="card">
              <div class="card-body">
                <p>{{ request.description }}</p>
                <p>Address: {{ request.location }}</p>
              </div>
            </div>
            <div class="button-container">
              <h3 class="canceled-label">Canceled</h3>
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { RequestService } from '../service/request.service';
import proposalComponent from './proposal.component.vue';

export default {

  name: 'Request-Page',
  data() {
    return {
      requests: [],
      canceledRequests: [],
      pendingRequests: [],
      userType: 'business',
    }
  },

  components: { proposalComponent },

  created() {
    const storedRequests = localStorage.getItem('requests')
    console.log(storedRequests)
    if (storedRequests) {
      this.requests = JSON.parse(storedRequests)
      this.loadRequestsPending()
      this.loadRequestsCanceled()
    }
  },
  methods: {
    loadRequestsPending() {
      const requestService = new RequestService()
      const userProfileId = localStorage.getItem('userId')
      const status = 'Pendiente'
      requestService
        .getRequestsByUserId(userProfileId, status)
        .then((response) => {
          this.requests = response.data
          localStorage.setItem('requests', JSON.stringify(this.requests))
          this.pendingRequests = this.requests.filter((request) => request.status == 'Pendiente')
          console.log('Solicitudes:', this.requests)
          console.log('Solicitudes pendientes:', this.pendingRequests)
        })
        .catch((error) => {
          console.error('Error al obtener las solicitudes:', error)
        })
    },
    loadRequestsCanceled() {
      const requestService = new RequestService()
      const userProfileId = localStorage.getItem('userId')
      const status = 'Cancelado'
      requestService
        .getRequestsByUserId(userProfileId, status)
        .then((response) => {
          this.requests = response.data
          localStorage.setItem('requests', JSON.stringify(this.requests))
          ;(this.canceledRequests = this.requests.filter(
            (request) => request.status == 'Cancelado'
          )),
            console.log('Solicitudes:', this.requests)
          console.log('Solicitudes canceladas:', this.canceledRequests)
        })
        .catch((error) => {
          console.error('Error al obtener las solicitudes:', error)
        })
    },
    acceptRequest(request) {
      console.log('Solicitud aceptada:', request)
      request.status = 'Aprobado'
      this.changeRequestStatus(request.id, { status: 'Aprobado' })
    },
    rejectRequest(request) {
      console.log('Solicitud rechazada:', request)
      request.status = 'Cancelado'
      this.changeRequestStatus(request.id, { status: 'Cancelado' })
    },
    changeRequestStatus(requestId, data) {
      const requestService = new RequestService()
      requestService
        .changeRequestStatus(requestId, data)
        .then(() => {
          if (data.status === 'Aprobado') {
            const message = 'Cambio de estado a Aprobado exitoso.'
            window.alert(message)
          } else {
            const message = 'Cambio de estado a Cancelado exitoso.'
            window.alert(message)
          }
          window.location.reload()
        })
        .catch((error) => {
          console.error('Error al cambiar el estado de la solicitud:', error)
        })
    }
  }
}
</script>

<style scoped>
.request-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.request-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-around; /* Distribuir las tarjetas de manera uniforme */
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
  display: flex;
  flex-direction: column;
}

.card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.card-header {
  background-color: #02aa8b;
  color: #fff;
  padding: 0.5rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-weight: bold;
  text-align: center;
}

.card-body {
  padding: 1rem;
}

.button-container-business {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.button-container-client{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

/* Estilo para el botón "Accept" */
.accept-button,
.reject-button {
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
  margin: 0 10px;
}

.accept-button:hover,
.reject-button:hover {
  background-color: #048071;
}

/* Estilo para el botón "Reject" */
.reject-button {
  background-color: #f44336;
}

.reject-button:hover {
  background-color: #d32f2f;
}

.canceled-label {
  color: #d32f2f;
  padding: 10px 20px;
  margin: 10px;
  display: inline-block;
  border-radius: 5px;
  text-align: start;
  font-size: 18px;
}
</style>
