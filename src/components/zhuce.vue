<template>
 <div class="page">
   <div class="zhuce">
      <input type="text" placeholder="烟草账号" id="UserNames" v-model="UserNames"  @blur="inputBlur" ><br>
      <input type="text" placeholder="手机号" id="Passwords" v-model="phonenum"><br>
      <input type="text" placeholder="验证码" id="phonenum" v-model="yzmnum" @blur="phone" >
      <button   v-show="sendAuthCode" class="btn"  @click="fs">发送验证码</button>
       <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}}</span>秒后重发</span> 
      <input type="password" placeholder="密码" id="yzmnum" v-model="Passwords"><br>
      <button class="zhuceBtn" @click="zhuceForm">注册</button>
      <P>{{plasslobin}}</P>
    </div>
 </div>
</template>

<script type="text/ecmascript-6">
import axios from 'axios'
import qs from 'qs'
export default {
 data() {
 return {
   UserNames:'',
   Passwords:'',
   phonenum:'',
   yzmnum:'',
   plasslobin:'',
   sendAuthCode:true,
   auth_time: 0,
 }
 },
 components: {
 },
 methods: {
   inputBlur() {
     let vm = this
      let int = /^[0-9]{12}$/
     if(!int.test(vm.UserNames)){
      this.$message('请填写正确的烟草账号');
      // 6
     }
    },
   phone(){
      let vm = this
      if(!(/^1[34578]\d{9}$/.test(vm.phonenum))){ 
        this.$message('请填写正确的手机号');
        // 7
        return false; 
    } 
   },
   zhuceForm(){
     let vm = this
     if(vm.UserNames==''|| vm.Passwords==''||vm.phonenum==''||vm.yzmnum==''){
       this.$message('请完成填写');
      // 8
     }else{
      vm.$axios.post('/wechat/api/user/',{
      // vm.$axios.post('http://192.168.1.3:8000/wechat/api/user/',{
        "license":vm.UserNames,
        "password":vm.Passwords,
        "mobile":vm.phonenum,
        "code": vm.yzmnum
      }).then(function(response) {
        // console.log(response)
        if(response.status==201){
          vm.plasslobin=='注册成功请先登录'
        }
      })
      // .catch(function(error){
      //   if(error.response){
      //     this.$message('请求错误')
      //   }
      // })
     } 
   },
  fs(){
      let vm = this
      if(vm.UserNames!==''&& vm.phonenum!==''){
       vm.$axios.post('/wechat/api/code/',{
      //  vm.$axios.post('http://192.168.1.3:8000/wechat/api/code/',{
         "mobile":vm.phonenum
        }).then(function(response) {
              // console.log(response)
                vm.sendAuthCode = false;
                  vm.auth_time = 60;
                  var auth_timetimer =  setInterval(()=>{
                      vm.auth_time--;
                      if(vm.auth_time<=0){
                          vm.sendAuthCode = true;
                          clearInterval(auth_timetimer);
                      }
                  }, 1000);
            }).catch(function(error){
              // console.log(error.response.status)
              // console.log(error)
            })
        }
   }
 }
}
</script>

<style scoped>
.zhuce{
  text-align: center;
  position: relative;
  padding-top: 0.5rem;
  box-sizing: border-box;
}
input{
  width: 70%;
  padding: 0.3rem;
  margin-bottom: 0.5rem;
  box-sizing: border-box;
  outline: none;
  border: none;
  font-size: 0.25rem;
  border-bottom: solid 1px #ccc;
}
.btn{
  position: absolute;
  right: 15%;
  top: 3.5rem;
  background: #3b8ef0;
  color: #FFFFFF;
  outline: none;
  border: none;
  padding: 0.1rem;
  font-size: 0.25rem;
  box-sizing: border-box;
}
.zhuceBtn{
  width: 70%;
  padding: 0.2rem;
  box-sizing: border-box;
  outline: none;
  border: none;
   font-size: 0.25rem;
  background: #3b8ef0;
  color: #FFFFFF;
  border-radius: 5px;
}
p{
  margin-bottom: 0.5rem;
}
#UserNames{
  background:url(img/ycxkz.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
#Passwords{
  background:url(img/telephone.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
#phonenum{
  /* background:url(img/password.png) no-repeat left; */
   background:url(img/yzm.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
#yzmnum{
  /* background:url(img/yzm.png) no-repeat left; */
  background:url(img/password.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
.zhuce span{
  margin-left: -9%;
}
</style> 
