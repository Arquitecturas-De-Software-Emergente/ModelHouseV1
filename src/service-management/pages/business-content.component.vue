<template>
  <div class="business-detail" v-if="business">
    <div class="business-summary">
      <div class="business-logo">
        <img :src="business.image" alt="Business logo" />
      </div>
      <div class="business-rating">
        <Rating-v
          v-model="business.review"
          :cancel="false"
          :stars="5"
          :pt="{
            onIcon: { class: 'text-orange-400' }
          }"
        />
      </div>
      <h1>{{ business.name }}</h1>
      <p>Phone: {{ business.phone }}</p>
      <p>Website: {{ business.webSite }}</p>
      <p>Address: {{ business.address }}</p>
      <p>Service Area: {{ business.address }}</p>
      <p>Category:</p>
      <p>Social Media:</p>
      <button class="send-button" @click="navigateToRequestForm()">Send Request</button>
    </div>
    <div class="business-details">
      <h2>About Us</h2>
      <p>{{ business.description }}</p>
      <h2>Specialization</h2>
      <p>{{ business.especialization }}</p>
      <div>
        <h2>Projects</h2>
        <div class="project-carousel">
          <Carousel-v
            :value="projects"
            :numVisible="1"
            :numScroll="1"
            :responsiveOptions="responsiveOptions"
            circular
            :autoplayInterval="3000"
          >
            <template #item="slotProps">
              <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
                <div class="mb-3">
                  <img :src="slotProps.image" class="w-4 shadow-2" />
                </div>
                <div>
                  <h4 class="mb-1">{{ slotProps.title }}</h4>
                </div>
              </div>
            </template>
          </Carousel-v>
        </div>
      </div>
    </div>
  </div>
  <Dialog-v v-model="showDialog" :visible="this.showDialog">
    <i class="pi-check" style="font-size: 48px; color: #4caf50"></i>
    <p>To perform this action it is necessary to change the role to "Customer".</p>
    <router-link :to="{ name: 'sign-in' }">
      <button>Cambiar de cuenta</button>
    </router-link>
  </Dialog-v>
</template>

<script>
import { BusinessDetailService } from '../service/business-detail.service'
import { ProjectListService } from '../service/project-list.service'

export default {
  name: 'Business-Conent-Page',
  data() {
    return {
      business: null,
      projects: [],
      projectsLoaded: false,
      showDialog: false,
      responsiveOptions: [
        {
          breakpoint: '1024px',
          numVisible: 1,
          numScroll: 3
        },
        {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 2
        },
        {
          breakpoint: '560px',
          numVisible: 1,
          numScroll: 1
        }
      ]
    }
  },
  methods: {
    navigateToRequestForm() {
      const accountActive = JSON.parse(localStorage.getItem('account'))?.isActive
      const businessId = JSON.parse(localStorage.getItem('account'))?.businessProfileId

      if (accountActive) {
        if (businessId != null) {
          this.showDialog = true
        } else {
          // Add a log to verify business.id
          console.log('business.id:', this.business.id)

          // Pass the business.id as a route parameter
          this.$router.push({ name: 'request-form', params: { businessId: this.business.id } })
        }
      } else {
        this.$router.push('/sign-in')
      }
    }
  },

  created() {
    const businessService = new BusinessDetailService()
    const projectService = new ProjectListService()

    businessService
      .getBusinessByID(this.$route.params.id)
      .then((response) => {
        this.business = response.data
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del negocio', error)
      })

    projectService
      .getProjectListByBusinessId(this.$route.params.id)
      .then((response) => {
        this.projects = response.data
        this.projectsLoaded = true // Marca los proyectos como cargados
      })
      .catch((error) => {
        console.error('Error al obtener la lista de proyectos:', error)
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
