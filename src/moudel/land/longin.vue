<template>
  <div class="longin">
    <!-- <div style="height: 4.5rem;display:none">
      <qqmap  :longitude='longitude'  :latitude='latitude'></qqmap>
    </div> -->
    <longin_one></longin_one>
    <!-- <p class="p1"> 
     <span @click="forgotPs = true">忘记密码</span>
     <span class="center">|</span>
     <span @click="signUp = true">立即注册</span>
   </p> -->
    <div class="signUp" v-if="signUp">
      <zhuce></zhuce>
      <p class="p1" @click="signUp = false">已有账号，立即登录</p>
    </div>
    <div class="forgotPs" v-if="forgotPs">
      <forget></forget>
      <p class="p1" @click="forgotPs = false">返回登录</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qqmap from '../../components/qqmap/qqMap'
  import longin_one from "../../components/longin_one"
  import zhuce from "../../components/zhuce"
  import forget from "../../components/forget"

import { getCookie } from "js/public.js"
export default {
 data() {
 return {
  //  selected:'1'
    signUp: false,
    forgotPs: false,
     longitude:'', //经度
   latitude:'', //纬度
  }
 },
 components: {
   qqmap,
    longin_one,
    zhuce,
    forget,
 },
 created() {
   if(getCookie("token")){
      this.$router.push({
        path:"/home/myEnvironment"
      })
   }
 },
}
</script>

<style scoped>
  .bigbox {
    margin-top: 20px;
  }

  .longin {
    padding-top: 75%;
    box-sizing: border-box;
    background: url('../../assets/img/bg.png') no-repeat;
    background-color: #FFFFFF;
    background-size: contain;
  }

  .p1 {
    text-align: center;
  }

  .center {
    margin: 0 0.5rem;
  }

  .signUp,
  .forgotPs {
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    position: absolute;
    top: 0;
    left: 0;
  }

</style>
