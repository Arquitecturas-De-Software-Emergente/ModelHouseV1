<template>
  <h1 class="request-title">Request to {{ requests.user.firstName }} {{ requests.user.lastName }}</h1>

  <div class="request-container">
    
    <table class="request-table">
      <tr>
        <td><strong>Category:</strong></td>
        <td>{{ requests.category }}</td>
      </tr>
      <tr>
        <td><strong>Estimated Budget:</strong></td>
        <td>Entre  {{ requests.estimatedBudget }}  soles.</td>
      </tr>
      <tr>
        <td><strong>Area (m2):</strong></td>
        <td>{{ requests.area }}</td>
      </tr>
      <tr>
        <td><strong>Location :</strong></td>
        <td>{{ requests.location }}</td>
      </tr>
      <tr>
        <td><strong>Description:</strong></td>
        <td>{{ requests.description }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { RequestService } from '../service/request.service'

export default {
  name: 'Request-Details',
  data() {
    return {
      isImg: false,
      requests: {
        category: null,
        estimatedBudget: null,
        area: 0,
        file: null,
        description: null,
        location: null,
        status: null,
        user: {
          firstName: null,
          lastName: null
        }
      }
    }
  },

  methods: {
    // ... (resto de los métodos)

    handleFileUpload(event) {
      const file = event.target.files[0]

      if (file) {
        // Lee el contenido del archivo como una URL de datos
        const reader = new FileReader()
        reader.onload = () => {
          this.request.files = file
          this.previewImage = reader.result
          this.isImg = this.isImage(file)
        }
        reader.readAsDataURL(file)
      }
    },

    isImage(file) {
      // Verifica si el archivo es una imagen según la extensión o tipo MIME
      return file && file.type.startsWith('image/')
    }

    // ... (resto de los métodos)
  },

  created() {
    const requestService = new RequestService()
    requestService
      .getRequests()
      .then((response) => {
        const allRequests = response.data
        console.log('Todas las solicitudes:', allRequests)
        this.request = allRequests.find((request) => request.id == this.$route.params.requestId)
        this.requests.description = this.request.description
        this.requests.location = this.request.location
        this.requests.status = this.request.status
        this.requests.category = this.request.category
        this.requests.estimatedBudget = this.request.estimatedBudget
        this.requests.area = this.request.area
        this.requests.file = this.request.file
        this.requests.user.firstName = this.request.userProfile.firstName
        this.requests.user.lastName = this.request.userProfile.lastName
        console.log('Detalles de la solicitud:', this.request)
        if (this.request) {
          console.log('Detalles de la solicitud:', this.request)
        } else {
          console.log('Solicitud no encontrada.')
        }
      })
      .catch((error) => {
        console.log('Error al obtener las solicitudes:', error)
      })
  }
}
</script>
<style scoped>

h1 {
  text-align: center;
  
}
.request-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid#004A63;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ecf0f1;
}

.request-title {
  color: #004A63;
  font-size: 24px;
  margin-bottom: 20px;
}

.request-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

td {
  border: 2px solid #004A63;
  padding: 15px;
}

.label {
  background-color: #004A63;
  color: #fff;
}

strong {
  color: #004A63;
}
</style>