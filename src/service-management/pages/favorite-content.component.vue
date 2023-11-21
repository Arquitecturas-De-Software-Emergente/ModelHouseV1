<template>
    <div>   

    </div>
</template>

<script>
import { FavoriteService } from '../service/favorite.service'

export default{
    name: 'Favorite-Content-Page',
    data(){
        return{
            favorite: null,
            favoriteId: null,
            favorites: [],
            favoriteBusinees: null,
            favoritesLoaded: false,
            account: {
                id: null,
                name: null,
                image: null,
                userType: 'business'
            },
            businessReview: 4,
            review:{
                socre: 4,
            }
        }
    },

    created(){
        const favoriteService = new FavoriteService()
        const userProfileId = JSON.parse(localStorage.getItem('account'))?.userProfileId;
        favoriteService.getFavorite(userProfileId).then((response) => {
            this.favorites = response.data
            this.favoriteBusinees = response.data.business
            console.log('favorite', this.favorites)
        })
    }


}
</script>
<style scoped>

</style>