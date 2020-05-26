<template>
  <div class="page">
    <!-- <headers></headers> -->
    <div class="nav">
           <div class="above"> 
           <!-- <keep-alive> --> 
         <router-link  to='/home/myEnvironment'  class-active="active"  class="rous1" tag="div" >
         <img src="./img/myhj.png" alt="" @click="chenageColor" :id="colors">我的地盘
         </router-link>
         <!-- </keep-alive> -->
         <router-link to='/home/myBusiness' class="rous2" tag="div">
         <img src="./img/mysq.png" alt="">拜访日志
         </router-link>
         <router-link  to='/home/brandDemand'  class="rous3" tag="div">
           <img src="./img/jhjy.png" alt="">作战指南
          </router-link>
          </div>
          <div class="below"> 
         <router-link  to='/home/stockGuide' class="rous1" tag="div" >
       <img src="./img/ppxq.png" alt="">活动查询
         </router-link>
         <router-link to='/home/inventory1' class="rous2" tag="div">
         <img src="./img/kcyh.png" alt="">我的奖金
         </router-link>
       
         <router-link to='/home/inventory2' class="rous3" tag="div">
           <img src="./img/mycenter.png" alt="">备用标题
          </router-link>
          </div>
        </div>
        <div class="luyou">
          <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import headers from '@/moudel/Header/header';
export default {
 data() {
 return {
   colors:''
 }
 },
 components: {
   headers
 },
 
 methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      chenageColor(){
        this.colors=="colors"
      }
    }
}
</script>

<style lang="less" >
  a{
    text-decoration: none;
    color: black;
  }
  .nav{
    width: 100%;
    font-size: 0.3rem;
    // margin-top: 0.2rem;
  }

 .rous1{
   width: 32%;
   display: inline-block;
   border-right: solid 1px #E5E5E5;
   padding-top: 0.1rem;
   padding-bottom: 0.13rem;
   padding-left: 4%;
 }
 .rous4{
  //  width: 32%;
   display: inline-block;
  //  border-right: solid 1px #E5E5E5;
   padding-top: 0.1rem;
   padding-bottom: 0.13rem;
   padding-left: 4%;
 }
 .rous1 img{
  width: 24%;
  vertical-align:middle;
 }
 .rous2{
   width: 33%;
   display: inline-block;
   padding-top: 0.1rem;
   border-right: solid 1px #E5E5E5;
   padding-bottom: 0.13rem;
   padding-left: 4%;
 }
 .rous2 img{
  width: 24%;
  vertical-align:middle;
 }
 .rous3{
   width: 32%;
   display: inline-block;
   padding-bottom: 0.13rem;
   padding-top: 0.1rem;
   padding-left: 4%;
 }
 .rous3 img{
  width: 24%;
  vertical-align:middle;
 }
 .above{
  border-bottom:#E5E5E5 1px solid;
 }
//  .rous1:active{
//    background: #3D8EEF;
//  }
// .rous2:active{
//    background: #3D8EEF;
//  }
// .rous3:active{
//    background: #3D8EEF;
//  }
//  .router-link-class{
//    background: #3D8EEF;
//  }
.router-link-active{
  background:#C8E1FF;
}
</style>
