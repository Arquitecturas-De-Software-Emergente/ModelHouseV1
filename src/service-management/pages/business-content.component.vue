<template>
  <div class="business-detail" v-if="business">
    <div class="column-1">
      <div class="business-summary">
        <div class="business-logo">
          <img :src="business.image" alt="Business logo" />
        </div>
        <div class="business-rating">
          <Rating-v
            v-model="business.review"
            :cancel="false"
            :stars="5"
            :pt="{ onIcon: { class: 'text-orange-400' } }"
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
    </div>
    <div class="column-2">
      <div class="business-details-more">
        <h2>About Us</h2>
        <p>{{ business.description }}</p>
        <h2>Specialization</h2>
        <p>{{ business.especialization }}</p>
        <div>
          <h2>Projects</h2>
          <div class="carousel">
            <Carousel-v
              :value="projects"
              :numVisible="3"
              :numScroll="1"
              :responsiveOptions="responsiveOptions"
              circular
              :autoplayInterval="3000"
            >
              <template #item="slotProps">
                <div class="project-item">
                  <div class="project-image">
                    <router-link :to="'/project-details/' + slotProps.data.id">
                      <img
                        :src="slotProps.data.image
                        "
                        :alt="slotProps.data.title"
                        class="project-image"
                      />
                    </router-link>
                  </div>
                  <div class="project-details">
                    <router-link :to="'/project-details/' + slotProps.data.id">
                      {{ slotProps.data.title }}
                    </router-link>
                    <h6 class="project-status">Status: {{ slotProps.data.status }}</h6>
                  </div>
                </div>
              </template>
            </Carousel-v>
          </div>
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
      projectId: null,
      projects: [],
      projectsLoaded: false,
      showDialog: false,
      completedProjects: [],
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
    },
    navigateToProjectDetails(projectId) {
      this.$router.push({ name: 'project-details', params: { id: projectId } })
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
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.completedProjects = this.projects.filter((projects) => projects.status === 'Completado');
        console.log('Propuestas:', this.projects);
        console.log('Propuestas completadas:', this.completedProposal);
        console.log('Projects: ', this.projects)
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
  background-color: #f9f9f9;
  padding: 20px;
}

.column-1,
.column-2 {
  flex: 1;
  padding: 20px;
}

.business-summary {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.business-logo img {
  max-width: 100px;
  height: auto;
  border: 1px solid #ccc;
  border-radius: 15%;
}

h1 {
  font-size: 24px;
  margin: 10px 0;
}

p {
  font-size: 16px;
  margin: 5px 0;
}

.send-button {
  background-color: #48b9a5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.column-2 .business-details-more {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 20px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

.carousel {
  display: flex;
  overflow-x: auto;
  width: 600px;
}

.project-item {
  background-color: #fff;
  padding: 20px;
  margin-right: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.project-image img {
  max-width: 100px;
  height: auto;
}

.project-details a {
  font-size: 16px;
  text-decoration: none;
  color: #007bff;
}

.project-status {
  font-size: 16px;
  margin: 10px 0;
}

.project-actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
}

Button {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 5px;
}

.Button.secondary {
  background-color: #ccc;
}
</style>
