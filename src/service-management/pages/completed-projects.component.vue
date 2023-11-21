<template>
  <div class="projects-card-container">
    <div>
      <div class="projects-cards">
        <Card-v v-for="projects in completedProposal" :key="projects" class="project-card">
          <template #title>{{ projects.title }}</template>
          <template #content>
            <div class="project-card-content">
              <p>{{ projects.description }}</p>

              <div class="project-progress-button-container">
                <router-link :to="'/project-details/' + projects.id">
                  <button class="see-progress-button">
                    <span>See details</span>
                  </button>
                </router-link>
              </div>

              <div class="MIGUEL ARREGLA ESTO">
                <div>
                  <h3>{{ projects.status }}</h3>
                </div>

                <!-- <div v-if="projects.reviewId == null" class="project-progress-leave-comment">
                  <button class="leave-comment-button" @click="leaveComment">
                    <span>Leave Comment</span>
                  </button>
                </div> -->
              </div>
            </div>
          </template>
        </Card-v>
      </div>
    </div>
  </div>
  <Dialog-v
    v-model:visible="showDialog"
    modal
    header="Leave Comment:"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="business-rating">
      <Rating-v
        v-model="businessValueSend"
        :cancel="false"
        :stars="5"
      />
    </div>
    <textarea v-model="commentText" rows="4" cols="50" placeholder="Escribe tu comentario aquí"></textarea>
    <button class="send-comment" @click="sendComment">Send</button>
  </Dialog-v>
</template>

<script>
import { ProjectListService } from '../service/project-list.service'

export default {
  name: 'Completed-Projects-Page',
  data() {
    return {
      proposals: [],
      completedProposal: [],
      showDialog: false,
      businessValueSend: 0,
      commentText: '', 
      review : {
        score: 4,
        comment: null
      },
      proposalIdCompleted: null,
    }
  },
  created() {
    this.getAccoundId()
    this.loadCompletedProposal()
    const storedProposals = localStorage.getItem('proposals')
    console.log(storedProposals)
  },
  methods: {
    leaveComment() {
      this.showDialog = true
    },

    sendComment(){
      console.log('Score:', this.businessValueSend);
      console.log('Comment:', this.commentText);

    
    },

    loadCompletedProposal() {
      console.log(this.userProfileId);
      const projectService = new ProjectListService()
      if(this.userProfileId){
        projectService
            .getProjectsUserProfile(this.userProfileId)
            .then((response) => {
              console.log(response, "RESPONSE");
              this.proposals = response.data
              localStorage.setItem('proposals', JSON.stringify(this.projects))
              this.completedProposal = this.proposals.filter(
                  (proposal) => proposal.status === 'Completado'
              )
              console.log('Propuestas:', this.proposals)
              console.log('Propuestas completadas:', this.completedProposal)
            })
            .catch((error) => {
              console.log('Error al obtener las propuestas:', error)
            })
      }else if(this.businessProfileId){
        projectService
            .getProjectsBusinessProfile(this.businessProfileId)
            .then((response) => {
              this.proposals = response.data
              localStorage.setItem('proposals', JSON.stringify(this.projects))
              this.completedProposal = this.proposals.filter(
                  (proposal) => proposal.status === 'Completado'
              )
              console.log('Propuestas:', this.proposals)
              console.log('Propuestas completadas:', this.completedProposal)
            })
            .catch((error) => {
              console.log('Error al obtener las propuestas:', error)
            })
      }
    },
    getAccoundId() {
      this.businessProfileId = JSON.parse(localStorage.getItem('account'))?.businessProfileId
      this.userProfileId = JSON.parse(localStorage.getItem('account'))?.userProfileId
    }
  }
}
</script>

<style>
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;
}

.send-comment {
  background-color: #48b9a5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.leave-comment-button {
  background-color: #48b9a5;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
