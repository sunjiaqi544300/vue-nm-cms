<template>
  <div id="app">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"> -->
    <!-- <img src="./assets/logo.png"> -->
    <router-view v-if="isRouterAlive"/>
  </div>
</template>
<script>
import "./assets/css/public.css"
export default {
  name: 'App',
  provide(){
    return {
      reload:this.reload
    }
  },
  data(){
    return {
      isRouterAlive:true,
      geolocation: new qq.maps.Geolocation(
        "CKVBZ-CYKCS-5RTO3-66V5S-JECW5-UGBSV",
        "定位"
      ),
    }
  },
  methods:{
    reload(){
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    },
    showPosition(position){
        console.log(position,1111111111111111)
      },
    showErr(err){

    },
  },
  mounted(){
    
  
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
*{
  margin: 0;
  padding: 0;
} 

.el-carousel__arrow {
  display: none;
}
.el-carousel__indicators{
  display: none;
}
.el-carousel__container{
  height: 3rem;
}
</style>
