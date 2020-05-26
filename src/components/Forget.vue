<template>
 <div class="forget">
   <input type="text" placeholder="请输入手机号" v-model="phonenum" @blur="phone" id="userphone" >
   <input type="text" placeholder="请输入短信验证码" v-model="yzmnum" id="userdx">
   <button   v-show="sendAuthCode"   class="btn" @click="fs">获取验证码</button>
   <span v-show="!sendAuthCode" class="auth_text"> <span class="auth_text_blue">{{auth_time}} </span> 秒后重发</span> 
   <input type="password" placeholder="请输入密码" v-model="Passwords0" id="pssword">
   <input type="password" placeholder="请确认密码" v-model="Passwords1" @blur="passwords" id="morepassword">
   <button class="queding" @click="signUP">确定</button>
 </div>
</template>

<script type="text/ecmascript-6">
export default {
 data() {
 return {
  phonenum: '',
  yzmnum: '',
  Passwords0: '',
  Passwords1: '',
  sendAuthCode:true,
   auth_time: 0,
 }
 },
 components: {

 },
 methods: {
  phone(){
      let vm = this
      if(!(/^1[34578]\d{9}$/.test(vm.phonenum))){ 
        this.$message('请填写正确的手机号');
        // 2
        return false; 
    } 
  },
  fs(){
     let vm = this
     if(vm.UserNames!==''){
         vm.$axios.post('/wechat/api/code/',{
        //  vm.$axios.post('http://192.168.1.3:8000/wechat/api/code/',{
         "mobile":vm.phonenum
      }).then(function(response) {
        // console.log(response)
          this.sendAuthCode = false;
            this.auth_time = 60;
            var auth_timetimer =  setInterval(()=>{
                this.auth_time--;
                if(this.auth_time<=0){
                    this.sendAuthCode = true;
                    clearInterval(auth_timetimer);
                }
            }, 1000);
      })
     }
      //  vm.$axios.post('/wechat/api/code/',{
     
       
   },
   passwords() {
     let vm = this
     if(vm.Passwords1 !== vm.Passwords0) {
       this.$message('两次密码不一样');
      // 3
     }
   },
   signUP() {
     let vm = this
     if(vm.Passwords1 ==''||vm.phonenum ==''||vm.yzmnum==''){
       this.$message('请完成填写');
      // 4
       
     }else{
      vm.$axios.post('/wechat/api/changepwd/',{
      // vm.$axios.post('http://192.168.1.3:8000/wechat/api/changepwd/',{
        "password": vm.Passwords1,
        "mobile": vm.phonenum,
        "code": vm.yzmnum
      }).then(function(response) {
        // console.log(response)
        if(response.status==201){
          this.$message('注册成功，请登录')
          // 5
        }
      })
     }
   }
 }
}
</script>

<style scoped>
.forget{
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
  border-bottom: solid 1px #ccc;
  font-size: 0.25rem;
}
.btn{
    position: absolute;
    right: 15%;
    top: 2rem;
    background: #3b8ef0;
    color: #FFFFFF;
    outline: none;
    border: none;
    font-size: 0.25rem;
    padding: 0.1rem;
    box-sizing: border-box;
}
.queding{
  width: 70%;
  padding: 0.2rem;
  box-sizing: border-box;
  outline: none;
  font-size: 0.25rem;
  border: none;
  background: #3b8ef0;
  color: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 0.5rem;
}
#userphone{
  background:url(img/telephone.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
#userdx{
  background:url(img/yzm.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
#pssword{
  background:url(img/password.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
#morepassword{
  background:url(img/password.png) no-repeat left;
  background-size: 6% 44%;
  padding-left: 6%;
}
.forget span{
  margin-left: -9%;
}
</style>
