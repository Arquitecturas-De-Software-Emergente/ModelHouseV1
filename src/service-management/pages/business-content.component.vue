<template>
  <div class="business-detail" v-if="business">
    <div class="business-summary">
      <div class="business-logo">
        <img :src="business.image" alt="Logo de la empresa" />
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
      <p>Teléfono: {{ business.phone }}</p>
      <p>Oficial Web Page: {{ business.webSite }}</p>
      <p>Address: {{ business.address }}</p>
      <p>Service Area: {{ business.address }}</p>
      <p>Categoría:</p>
      <p>Social Media:</p>
      <button class="send-button" @click="navigateToRequestForm()">Send Request</button>
    </div>
    <div class="business-details">
      <h2>About Us</h2>
      <p>{{ business.description }}</p>
      <h2>Especialización</h2>
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
              <img
                :src="slotProps.image"
                class="w-4 shadow-2"
              />
            </div>
            <div>
              <h4 class="mb-1">{{ slotProps.title }}</h4>
            </div>
          </div>
        </template>
          </Carousel-v>
    <div class="column-1">
      <div class="business-summary">
        <div class="business-logo">
          <img :src="business.image" alt="Business logo" />
        </div>
        <div class="business-rating">
          <Rating-v
            :modelValue="businessReview"
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
        <div v-if = 'this.businessProfileId == null'>
        <button class="send-button" @click="navigateToRequestForm()">Send Request</button>
      </div>
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
          <div class="carousel" v-if="projects.length>0">
            <Carousel-v
              :value="projects"
              :numVisible="1"
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
          <div v-else class="no-projects">
            <p>The company does not yet have completed projects</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- <Dialog-v v-model="showDialog" :visible="this.showDialog">
    <i class="pi-check" style="font-size: 48px; color: #4caf50"></i>
    <p>To perform this action it is necessary to change the role to "Customer".</p>
    <router-link :to="{ name: 'sign-in' }">
      <button>Cambiar de cuenta</button>
    </router-link>
  </Dialog-v> -->
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
      showButton: false,
      businessReview: 4,
      businessProfileId : JSON.parse(localStorage.getItem('account'))?.businessProfileId,
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
      const accountActive = JSON.parse(localStorage.getItem('account'))?.isActive;
      if(accountActive){
        this.$router.push('/request-form');
      }else{
        this.$router.push('/sign-in');
      }
      
    
    },
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
        this.projectsLoaded = true; // Marca los proyectos como cargados
        localStorage.setItem('projects', JSON.stringify(this.projects));
        this.projects = this.projects.filter((projects) => projects.status === 'Completado');
        console.log('Propuestas:', this.projects);
        console.log('Propuestas completadas:', this.completedProposal);
        console.log('Projects: ', this.projects)
        this.projectsLoaded = true // Marca los proyectos como cargados
      })
      .catch((error) => {
        console.error('Error al obtener la lista de proyectos:', error)
      })

  },
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
  max-width: 60%;
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
  background-color: #02aa8b;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
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
  justify-content: center; /* Centrar el contenido horizontalmente */
  align-items: center; /* Centrar el contenido verticalmente */
  width: 100%; /* Hacer que el carrusel ocupe todo el ancho disponible */
}

.business-details {
  flex: 2;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-right: 10px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center; /* Centrar el texto y otros elementos en el sentido horizontal */
}

.project-image img {
  max-width: 60%;
  height: auto;
}
.project-details{
  text-align: center;
}
.project-details a {
  font-size: 16px;
  display: block;
  margin-top: 10px;
  text-decoration: none;
  color: #007bff;
}

.project-status {
  font-size: 16px;
  margin: 10px 0;
}

h2 {
  font-size: 20px;
  margin-top: 20px;
}

.project-carousel {
  /* Agrega estilos para el carrusel de imágenes aquí */
}

/* Ajusta los estilos del carrusel de imágenes según tu elección */
.Button.secondary {
  background-color: #ccc;
}

.no-projects {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; /* Adjust the height as needed */
  border: 2px solid #48b9a5; /* Border color */
  border-radius: 8px; /* Border radius for rounded corners */
  background-color: #f9f9f9; /* Background color */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional box shadow for depth */
}

.no-projects p {
  margin: 0; /* Remove default margin */
  font-size: 18px;
  color: #48b9a5; /* Text color */
  text-align: center;

</style>
