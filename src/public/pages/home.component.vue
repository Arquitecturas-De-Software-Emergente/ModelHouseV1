<template>
    <section class="introduction">
        <div class="containerB">
            <div class="boxB col1">
                <img src="../../assets/banner.png" class="imgBanner" alt="Remodeling a house view on a laptop">
            </div>
            <div class="boxC col2">
                <h1>Have a comfortable <span class="green">life!</span> </h1>
                <p id="txtBanner">
                    Find the best experts to remodel the house of your dreams in a fast and secure way.
                </p>
                <div>
                    <a href="" class="btnBanner">Most populars</a>
                </div>
            </div>
        </div>
    </section>

    <div class="center-part">
    
    </div>

    <div class="final-part-footer">

    </div>
</template>

<script>
export default {
    name: "Home-Page",
    data(){
        return{

        }
    },
}

</script>

<style scoped>

section.introduction{
    padding: 12%;
}

.second_title{
    text-align: center;
    color:#004A63;
    font-size:64px;
    font-family: Poppins, sans-serif;
}
.containerB{
    width: 100%;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(20rem,1fr));
    grid-gap: 2rem;
}
.boxB{
    display: flex;
    align-items: center;
    justify-content: center;
}
.imgBanner{
    width: 80%;

}
.imgArea{
    width: 100%;
    justify-content: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}
.imgRoom{
    width: 100%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}
.imgService{
    width: 100%;
    display:flex;
    justify-content: center;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}
.card-container-service {
    margin:25px 25px;
    padding: 0;
}
.card-container-area{
    margin:25px 25px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.card-container-room{
    margin:25px 25px;
    padding: 0;
}


.boxC{
    padding: 1rem 2rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    font-size: 30px;
    text-align: justify;
    color: #FFFFFF;
}
.btnBanner{
    background: #02AA8B;
    color: #FFFFFF;
    padding: 10px 20px;
    border-radius: 15px;
    text-decoration: none;
    font-size: 20px;
}
.green{
    color: #86D57C;
}
.introduction{
    position: relative;
    width: 100%;
    height: 100vh;
    background-color: #004A63;
    background-size: cover;
    background-position: center;
}
.cards{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-top: 80px;
    margin-bottom: 100px;
}

.final-part-footer{
    background-color: #004A63;
    padding: 40px 20px;
}

</style>