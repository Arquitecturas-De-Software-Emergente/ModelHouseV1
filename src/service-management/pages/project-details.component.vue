<template>
  <div class="project-details">
    <img :src="project.image" alt="Project Image" />
    <h1>{{ project.title }}</h1>
    <p>{{ project.description }}</p>
  </div>
  <div class="comment-details">
    <h2>Comment:</h2>
    <div class="comment">
      <img :src="project.proposal.request.user.image" alt="User Avatar" />
      <div class="comment-info">
        <h1>{{ project.proposal.request.user.firstName }}</h1>
        <div class="business-rating">
          <Rating-v :modelValue="review.score" :cancel="false" :stars="5" :pt="{ onIcon: { class: 'text-orange-400' } }" />
        </div>
        <p>{{ review.comment }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { ProjectListService } from '@/service-management/service/project-list.service'
import { ReviewService } from '../service/review-service'
import {UserProfile} from "../service/user-detail.service"

export default {
  name: 'Project-Details',
  data() {
    return {
      projectId: null,
      project: {
        image: null,
        title: null,
        description: null,
        proposal: {
          request: {
          user: {
            firstName: null,
            image: null,
          },
        },
        },
        
        
      },
      user: {
        image: null,
        name: null,
      }, 
      review : {
        score: null,
        comment: null
      }
    }
  },
  created() {
    const projectService = new ProjectListService()
    const userProfile = new UserProfile()
    console.log('userProfile', userProfile)
    //this.projectId = this.$route.params.id;
    const reviewService = new ReviewService()
    const userProfileId = JSON.parse(localStorage.getItem('account'))?.userProfileId;
    console.log('userProfileId:', userProfileId)
    reviewService.getReviewProjectId(this.$route.params.projectId).then((response) => {
      this.review.score = response.data.score
      this.review.comment = response.data.comment
      console.log('review', this.review)
    })
    .catch((error) => {
      console.error('Error al obtener puntaje de projecto', error)
    })

    projectService
      .getProjectById(this.$route.params.projectId)
      .then((response) => {
        this.project.image = response.data.image
        this.project.title = response.data.title 
        this.project.description = response.data.description
        this.project.proposal.request.user.firstName = response.data.proposal.request.userProfile.firstName
        this.project.proposal.request.user.image = response.data.proposal.request.userProfile.image

        console.log('project', this.project)
      })
      .catch((error) => {
        console.error('Error al obtener los detalles del negocio', error)
      })
  }
}
</script>
<style scoped>
.project-details {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 5px;
  margin: 10px;
  text-align: center;
}

.project-details img {
  max-width: 100%;
  border-radius: 5px;
}

.project-details h1 {
  font-size: 24px;
  color: #333;
  margin: 10px 0;
}

.project-details p {
  font-size: 16px;
  color: #666;
}

.comment-details {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}

.comment-details h2 {
  font-size: 20px;
  color: #333;
  margin: 10px 0;
}

.comment {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.comment img {
  max-width: 100px;
  max-height: 100px;
  border-radius: 100%;
  margin-right: 10px;
}

.comment-info h1 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.business-rating {
  display: flex;
  align-items: center;
}

.comment-info p {
  font-size: 16px;
  color: #666;
}
</style>
