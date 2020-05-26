<template>
  <div class="page">
    <div class="selectBox">
      <ul>
        <li>
          &nbsp;&nbsp;&nbsp;&nbsp;功能区：
          <el-select
            v-model="func"
            clearable
            filterable
            class="selectEl"
            size="mini"
            @change="linkage"
            placeholder="请选择"
          >
            <el-option v-for="item in func_list" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </li>
        <li>
          主导因子：
          <el-select
            v-model="main"
            clearable
            filterable
            size="mini"
            class="selectEl"
            placeholder="请选择"
          >
            <el-option v-for="(item, index) in main_list" :key="index" :label="item" :value="item"></el-option>
          </el-select>
        </li>
        <li>
          烟草证号：
          <el-input v-model="license" placeholder="请输入内容" size="mini" class="inputEl"></el-input>
        </li>
        <li>
          客户名称：
          <el-input v-model="shop_name" placeholder="请输入内容" size="mini" class="inputEl"></el-input>
        </li>
        <li>
          客户地址：
          <el-input v-model="address" placeholder="请输入内容" size="mini" class="inputEl"></el-input>
        </li>
      </ul>
      <!-- <el-form-item  class="button"> -->
      <el-button type="primary" size="mini" class="reest" @click="reest">重置</el-button>
      <!-- <router-link to='/home/myBusiness' class="rous2" tag="div"> -->
      <el-button type="primary" size="mini" @click="filter">查询</el-button>
      <!-- </router-link> -->
      <!-- </el-form-item> -->
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { hostType } from "api/env.js";
import qs from "qs";
export default {
  name: "page",
  data() {
    return {
      tableData: [],
      license: "",
      shop_name: "",
      address: "",
      edate: "",
      input: "",
      func_list: [],
      main_list: [],
      main: "",
      func: "",
      sdate: "",
      time: "",
      shop_list: [],
      mon_list: ""
    };
  },
  components: {},
  methods: {
    reest() {
      //重置功能
      this.license = "";
      this.shop_name = "";
      this.address = "";
      this.main = "";
      this.func = "";
    },
    linkage() {
      let vm = this;
      let domain = hostType(1);
      vm.$axios
        .get(`${this.$apihost}` + "/wechat/api/shopfind/?func_area=" + vm.func)
        .then(function(response) {
          // console.log(response.data)
          // vm.func_list = response.data.func_list
          vm.main_list = response.data.main_list;
        });
    },
    filter() {
      let vm = this;
      let domain = hostType(1);
      vm.$axios
        .post(
          `${this.$apihost}` + "/wechat/api/shopfind/",
          qs.stringify({
            func_area: vm.func,
            main_poi: vm.main,
            license: vm.license,
            shop_name: vm.shop_name,
            address: vm.address
          })
        )
        .then(function(response) {
          console.log(response.data);
          let array = response.data.shop_list;
          let arraynew = [];
          for (let index = 0; index < array.length; index++) {
            arraynew.push(
              Object.assign({}, array[index], {
                color: 1
              })
            );
          }
          console.log(arraynew);
          if (array.length) {
            sessionStorage.setItem("shop_list", JSON.stringify(arraynew));
            vm.$router.push({
              path: "/home/myBusiness",
              query: {
                type: 6
              }
            });
          } else {
            vm.$message({
              message: "未搜到满足条件的零售化信息,请重新查询！",
              type: "warning"
            });
          }
        });
    }
  },
  mounted: function() {
    let vm = this;
    let domain = hostType(1);
    vm.$axios
      .get(`${this.$apihost}` + "/wechat/api/shopfind/")
      .then(function(response) {
        // console.log(response.data.func_list)
        vm.func_list = response.data.func_list;
        vm.main_list = response.data.main_list;
      });
  }
};
</script>

<style scoped>
.selectBox {
  padding: 30px 0 0 80px;
}

.selectBox li {
  list-style: none;
  padding: 10px 0;
}

.reest {
  margin-left: 80px;
  margin-top: 20px;
}

.selectBox .inputEl,
.selectEl {
  width: 230px;
}
</style>
