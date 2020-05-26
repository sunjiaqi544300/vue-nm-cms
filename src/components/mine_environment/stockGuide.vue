<template>
  <div class="page">
    <!-- 客户查找 -->
    <!-- <p class="count">满足客户条件的数量共有？？个</p>
      <div style="height: 4.5rem;">
         <qq-map ></qq-map>
       </div> -->

    <div class="selectBox">
      <ul>
        <li> &nbsp;&nbsp;&nbsp;&nbsp;功能区：<el-select v-model="func" clearable filterable  style="width:4.5rem"    size="mini"  @change="linkage"  placeholder="请选择">
            <el-option v-for="item in func_list" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </li>
        <li>主导因子：<el-select v-model="main" clearable filterable size="mini" style="width:4.5rem"   placeholder="请选择">
            <el-option v-for="(item, index) in main_list" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </li>
        <li>烟草证号：<el-input v-model="license" placeholder="请输入内容" size="mini" style="width:4.5rem" ></el-input>
        </li>
        <li>客户名称：<el-input v-model="shop_name" placeholder="请输入内容"  size="mini" style="width:4.5rem" ></el-input>
        </li>
        <li>客户地址：<el-input v-model="address" placeholder="请输入内容"  size="mini" style="width:4.5rem" ></el-input>
        </li>
      </ul>
      <!-- <el-form-item  class="button"> -->
        <el-button type="primary" size="mini" style="margin-top:0.2rem">重置</el-button>
          <!-- <router-link to='/home/myBusiness' class="rous2" tag="div"> -->
        <el-button type="primary" size="mini"  @click="filter">查询</el-button>
         <!-- </router-link> -->
      <!-- </el-form-item> -->
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import qqMap from '../qqmap/qqMap';
  import {hostType} from '../../../src/assets/js/env.js'
  import qs from 'qs'
  // import { setFlagsFromString } from 'v8';
  // import { setTimeout } from 'timers';
  export default {
    data() {
      return {
        tableData: [],
        license:'',
        shop_name:'',
        address:'',
        edate: '',
        input:'',
        func_list:[],
        main_list:[],
        main:'',
        func:'',
        sdate: '',
        time: '',
        shop_list:[],
        mon_list: '',
      }
    },
    components: {
      qqMap
    },
    mounted: function () {
      let vm = this
       let domain = hostType(1)
      vm.$axios.get(`${domain}`+"/wechat/api/shopfind/").then(function (response) {
      // vm.$axios.get("http://192.168.1.40:8000/wechat/api/shopfind/").then(function (response) {
        console.log(response.data.func_list)
        vm.func_list = response.data.func_list
        vm.main_list = response.data.main_list
      })
    },
     methods: {
       linkage(){
          let vm = this
           let domain = hostType(1)
           vm.$axios.get(`${domain}`+"/wechat/api/shopfind/?func_area="+ vm.func).then(function (response) {
          //  vm.$axios.get("http://192.168.1.40:8000/wechat/api/shopfind/?func_area="+ vm.func).then(function (response) {
        console.log(response.data)
        // vm.func_list = response.data.func_list
        vm.main_list = response.data.main_list
      })
       },
     
       filter(){
          let vm = this
              let domain = hostType(1)
            vm.$axios.post(`${domain}`+"/wechat/api/shopfind/",qs.stringify({
            // vm.$axios.post("http://192.168.1.40:8000/wechat/api/shopfind/",qs.stringify({
             'func_list':vm.func,
             'main_list':vm.main,
             'license':vm.license,
             'shop_name':vm.shop_name,
             'address':vm.address
            })).then(function (response) {
           console.log(response.data)
           vm.shop_list = response.data.shop_list
           vm.$router.push({
          path: "/home/mycenter",
          query: {
           shop_list:vm.shop_list
          }
        })
      
      })
       }
     }
  }

</script>

<style scoped>
  .name {
    font-weight: 500;
    font-size: 0.4rem;
    margin-left: 0.4rem;
    border-left: solid 3px #3D8EEF;
    padding-left: 0.2rem;
    margin-bottom: 0.13rem;
    margin-top: 0.2rem;
  }

  .name span {
    margin-left: 10%;
    color: #3D8EEF;
    font-size: 0.3rem;
  }

  .hint {
    background: #FFFDF1;
    color: #AFAEAB;
  }

  .hint img {
    width: 0.3rem;
  }

  .count {
    font-size: 0.3rem;
    margin: 0.13rem 0.1rem 0.13rem 0.1rem;
    float: right;
    color: #3D8EEF;
    /* color:; */
  }

  .selectBox {
    font-size: 0.3rem;
    padding-top: 1rem;
  }

  .tit {
    padding-left: 0.3rem;
  }

  .v-table-title-cell {
    height: 1rem;
  }

  .selectBox {
    text-align: center;
  }

  .selectBox ul li {
    padding: 0.1rem 0;
  }

  .button {
    margin-top: 2rem;

  }

</style>
