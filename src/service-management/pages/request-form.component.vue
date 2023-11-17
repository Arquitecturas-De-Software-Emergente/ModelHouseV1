<template>

<div class="cards-container">
    <div class="request-title">
      <h1>Request Form</h1>
    </div>

    <form class="form" @submit.prevent="submitRequest">

      <div class="form-group">
        <label for="title">Area : </label>
        <InputText id="title" class="custom-input" type="text" v-model="title" placeholder="Area" />
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

      <div class="form-group-2">
        <input
          class="file-form"
          type="file"
          name="demo[]"
          accept="*/*"
          id="fileUpload"
          style="display: none"
          multiple
        />
        <label for="fileUpload" class="file-upload-label"
          >Add File <i class="pi pi-file"></i>
        </label>
      </div>

      <div class="submit-button">
        <button class="submit-button-form" type="submit">
          <span class="submit-button-label">Send Request</span>
        </button>
      </div>
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
      showDialog: false,
      businessId: null
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

    created() {
      this.businessId = this.$route.params.businessId
      console.log('businessId in created hook:', this.businessId)
    },

    async submitRequest() {
      const requestService = new RequestService()
      try {
        const userId = JSON.parse(localStorage.getItem('account'))?.userProfileId;
        const businessId = this.$route.params.businessId
        console.log('BusinessId:', businessId)
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
      this.showDialog = false
    }
  }
}
</script>

<style scoped>
.request-title {
  align-items: center;
  text-align: center;
  display: flex;
  padding: 10px;
  margin-bottom: 20px;
}

.cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.form {
  width: 100%; /* El formulario ocupará todo el ancho disponible */
  max-width: 500px;
}

.form-group-2 {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.form-group-2 label {
  font-size: 18px;
  margin-bottom: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.form-group label {
  font-size: 18px;
  margin-bottom: 10px;
}
label {
  display: block;
  font-weight: 600;
}

input[type='text'],
select,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

select {
  appearance: none;
}

.file-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
.file-upload-label {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e6e6e6;
  border: none;
  padding: 12px;
  border-radius: 5px;
  margin: 10px 0;
}
.file-upload-label i {
  margin: 0 0 0 10px;
}

.submit-button {
  display: flex;
  justify-content: center;
}
.submit-button-form {
  cursor: pointer;
  background-color: #02aa8b;
  color: white;
  font-size: 24px;
  border: none;
  border-radius: 25px;
  height: 45px;
  width: 80%;
}

/* Responsive Design */
@media screen and (max-width: 600px) {
  .cards-container {
    max-width: 100%;
  }

  label,
  input[type='text'],
  select,
  textarea {
    font-size: 14px;
  }
}
</style>
