<template>
  <div class="page" id="login">
    <div class="item username">
      <label></label>
      <el-input placeholder="请输入账号" id="UserName" v-model="UserName"></el-input>
    </div>
    <div class="item password">
      <label></label>
      <el-input type="password" placeholder="请输入密码" id="Password" v-model="Password"></el-input>
    </div>
    <el-button type="primary" :loading="loading" @click="submitForm">登录</el-button>
    <p>{{hintInformation}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getCookie,
    setCookie
  } from "js/public.js"
  import {
    expiredays
  } from "api/env.js"

  import axios from 'axios'
  import qs from 'qs'
  import qqmap from 'map/qqMap'
  export default {
    data() {
      return {
        UserName: '',
        Password: '',
        hintInformation: '',
        loading: false
      }
    },
    components: {
      qqmap
    },
    mounted: function () {
      //  alert(getCookie('token'))
    },
    methods: {

      inputBlur1() {
        let vm = this
        //   let int = /^[0-9]{12}$/
        //   // console.log(!int.test(vm.UserName))
        //  if(!int.test(vm.UserName)){
        //   //  1
        //   this.$message('请填写正确的烟草账号');
        //  }
      },
      submitForm() {
        let vm = this
        if (vm.UserName == "") {
          this.$message({
            message: '请输入用户名！',
            type: 'warning'
          })
        }
        if (vm.Password == "") {
          this.$message({
            message: '请输入您的密码！',
            type: 'warning'
          })
        }
        if (vm.UserName && vm.Password) {
          let form = {
            username: vm.UserName,
            password: vm.Password,
            time: Date.parse(new Date()) / 1000,
          }
          // let url = '/jwtlogin/'

          let url = `${this.$apihost}` + '/jwtlogin/'

          var instance = axios.create({
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            }
          })
          vm.loading = true

          instance.post(url, qs.stringify(form)).then(function (res) {
            //  alert(url)
            console.log(res)
            if (res) {
              vm.loading = false
              localStorage.setItem('token', res.data.token) // 登录成功后保存用户token
              localStorage.setItem('userName', vm.UserName) // 登录成功后保存用户token
              localStorage.setItem('token', res.data.token) // 登录成功后保存用户名
              //  vm.$router.push('/home')
              setCookie("token", res.data.token, expiredays)

              vm.$router.push({
                path: '/home/myEnvironment',
                query: {
                  dist: vm.UserName
                }
              })
            }
          }).catch(function (error) {
            // console.log(error.response.status)
            if (error.response.status === 400) {
              vm.loading = false
              // vm.hintInformation = '您的账户密码信息填写有误'
              vm.$message.error('您的账户密码信息填写有误');
            }
            // console.log(error.response.status);
            // console.log(error.response.headers);
          })
        }
      }
    }
  }

</script>

<style scoped>
  #login {
    width: 60%;
    margin: 0 auto;
  }

  #login button {
    margin-top: 40px;
  }

  .item {
    border-bottom: 1px solid #dddddd;
  }

  .item.password {
    margin-top: 15px;
  }

  .item label {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 21px;
  }

  .username label {
    background: url(img/ycxkz.png) no-repeat left;
    background-size: 100% 100%;
  }

  .password label {
    background: url(img/password.png) no-repeat left;
    background-size: 100% 100%;
  }

  .item .el-input {
    display: inline-block;
    width: 80%;

  }

  .page {
    text-align: center;
    font-size: 14px;
  }

  input {
    width: 70%;
    padding: 15px;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    outline: none;
    border: none;
    font-size: 0.25rem;
    border-bottom: solid 1px #ccc;
  }

  button {
    width: 70%;
    box-sizing: border-box;
    outline: none;
    border: none;
    background: #3b8ef0;
    color: #FFFFFF;
    border-radius: 5px;
    font-size: 16px;
  }

  /* #UserName {
    background: url(img/ycxkz.png) no-repeat left;
    background-size: 6% 44%;
    padding-left: 6%;
  }

  #Password {
    background: url(img/password.png) no-repeat left;
    background-size: 6% 44%;
    padding-left: 6%;
  } */

</style>
