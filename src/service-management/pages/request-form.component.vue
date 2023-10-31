<template>
  <div>
    <h1>Request Form</h1>
    <form @submit.prevent="submitRequest">
      <div class="form-group">
        <label for="area">Area:</label>
        <input type="text" id="area" v-model="request.area" />
      </div>

      <div class="form-group">
        <label for="budget">Estimated Budget:</label>
        <select id="budget" v-model="request.budget">
          <option value="0 - 500">0 - 500</option>
          <option value="500 - 1000">500 - 1000</option>
          <option value="1000 - 1500">1000 - 1500</option>
          <option value="1500 - 2000">1500 - 2000</option>
          <option value="2000 - 2500">2000 - 2500</option>
          <option value="2500 - 3000">2500 - 3000</option>
          <option value="2500 - 3000">3000 - 3500</option>
        </select>
      </div>

      <div class="form-group">
        <label for="category">Category:</label>
        <select id="category" v-model="request.category">
          <option value="category1">Cocina</option>
          <option value="category2">Baño</option>
          <option value="category3">Patio</option>
        </select>
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <input type="text" id="location" v-model="request.location" />
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="request.description"></textarea>
      </div>

      <div class="form-group">
        <label for="file">Add File:</label>
        <input type="file" id="file" />
      </div>

      <button type="submit">Send Request</button>
    </form>

    <Dialog-v v-model="showDialog" header="Solicitud Enviada" :visible="this.showDialog">
      <p>Tu solicitud se ha enviado con éxito.</p>
      <button @click="closeDialog">Cerrar</button>
    </Dialog-v>

  </div>
</template>

<script>
import { RequestService } from '../service/request.service'
export default {
  name: 'Request-Form-Page',
  data() {
    return {
      request: {
        area: '',
        budget: '',
        category: '',
        location: '',
        description: ''
      },
      showDialog: false
    }
  },
  methods: {
    resetForm() {
      this.request = {
        area: '',
        budget: '',
        category: '',
        location: '',
        description: ''
      }
    },

    async submitRequest() {
      const requestService = new RequestService()
      try {
        const userId = JSON.parse(localStorage.getItem('account'))?.userProfileId;
        const businessId = JSON.parse(localStorage.getItem('account'))?.businessProfileId;
        const requestData = {
          area: this.request.area,
          estimatedBudget: this.request.estimatedBudget,
          category: this.request.category,
          location: this.request.location,
          description: this.request.description
        }

        const response = await requestService.sendRequest(userId, businessId, requestData)
        console.log('Response:', response.status)
        if (response.status === 200) {
            console.log('Solicitud enviada con éxito:', response)
            this.showDialog = true
            this.resetForm()
        
        } else {
          this.$toast.add({
            severity: 'error',
            summary: 'Error al enviar la solicitud',
            detail: 'Ha ocurrido un error al enviar la solicitud.'
          })
        }
      } catch (error) {
        console.error('Error al enviar la solicitud:', error)
      }
    },
    closeDialog() {
    this.showDialog = false;
    }
    
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
}

input[type='text'],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #02aa8b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
