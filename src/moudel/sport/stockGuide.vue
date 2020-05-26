<template>
  <div class="page">
    <!-- 活动查询 -->
    <p class="name">
      <span class="span1"></span>
      <span> 基本信息</span>
    </p>
    <hr>

    <div class="selectBox">
      <ul>
        <li>
          <div class="block">
            <span class="demonstration">开始时间：</span>
            <el-date-picker v-model="time1" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li>
          <div class="block">
            <span class="demonstration">结束时间：</span>
            <el-date-picker v-model="time2" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
        </li>
        <li>活动类型：&nbsp;<el-select v-model="main" style="width:182.16px" clearable filterable size="mini" class="input-item" placeholder="请选择">
            <el-option v-for="(item, index) in main_list" :key="index" :label="item.act_type" :value="item.id">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" style="margin-left:32px" @click="filter">查询</el-button>
        </li>
      </ul>
    </div>
    <!-- 活动查询 -->
    <p class="name" style="margin-top:20px">
      <span class="span1"></span>
      <span>活动列表</span>
    </p>
    <hr>
    <el-table :data="tableData" border style="width: 100%;margin-top:.3rem">
      <el-table-column type="index" width="50" label="序号">
      </el-table-column>
      <el-table-column prop="name" label="活动主题">
      </el-table-column>
      <el-table-column prop="type.act_type" label="活动类型">
      </el-table-column>
      <el-table-column prop="product.product_name" label="活动品规">
      </el-table-column>
      <el-table-column prop="rule" label="活动规则">
      </el-table-column>
    </el-table>
  </div>

</template>

<script type="text/ecmascript-6">
  import qqMap from 'map/qqMap';
  import {
    hostType
  } from 'api/env.js'
  import qs from 'qs'
  import {
    fileURLToPath
  } from 'url';
  import {
    type
  } from 'os';
  export default {
    data() {
      return {
        tableData: [],
        table: [],
        time1: '',
        time2: '',
        license: '',
        tableshow: false,
        shop_name: '',
        address: '',
        edate: '',
        input: '',
        func_list: [],
        main_list: [],
        main: '',
        func: '',
        sdate: '',
        time: '',
        shop_list: [],
        mon_list: '',
      }
    },
    components: {
      qqMap
    },
    mounted: function () {
      let vm = this
      let domain = hostType(2)
      vm.$axios.get(`${this.$apihost}` + "/wechat/api/type/").then(function (response) {
        console.log(response.data)
        vm.main_list = response.data
      })
      vm.getdata()
    },
    methods: {
      getdata() {
        let vm = this
        vm.$axios.get(`${this.$apihost}` + "/wechat/api/activity/").then(function (response) {
          console.log(response.data)
          vm.tableData = response.data
        })
      },
      dadeFn(time) {
        return time.getFullYear() + '/' + (time.getMonth() + 1) + '/' + time.getDate();
      },
      filter() {
        let vm = this
        // vm.tableshow = true
        let date_value1 = ""
        let date_value2 = ""

        if (vm.time1 > vm.time2) {
          vm.$message.error('开始时间不能大于结束时间');
        }
        if (vm.time1 != '') {
          console.log(vm.time1)
          if (vm.time1 != null) {
            var date1 = new Date(vm.time1);
            date_value1 = this.dadeFn(date1);
          } else {
            date_value1 = ''
          }

        } else {
          date_value1 = ''
        }

        if (vm.time2 != '') {
          if (vm.time2 != null) {
            var date2 = new Date(vm.time2);
            date_value2 = this.dadeFn(date2);
          } else {
            date_value2 = ''
          }
        } else {
          date_value2 = ''
        }

        // console.log(date_value2)
        vm.$axios.get(`${this.$apihost}` + "/wechat/api/activity/?type=" + vm.main + '&begin=' + date_value1 + '&end=' +
          date_value2).then(function (response) {
          console.log(response.data)
          vm.tableData = response.data
        })


        // if (vm.main || vm.time1 || vm.time2) {
        //   let array = vm.tableData
        //   let arraynew = []
        //   for (let index = 0; index < array.length; index++) {
        //         console.log(date_value1 + "---" +array[index].begin_time)

        //     if ((array[index].type.id == vm.main) || (date_value1 == array[index].begin_time) || (date_value2 == array[index].end_time)) {
        //         arraynew.push(array[index])
        //     }
        //   }
        //   // console.log(arraynew)
        //   vm.tableData = arraynew
        // }else{
        //   vm.tableData  = vm.tableData 
        // }

        // console.log(vm.tableData)
        // console.log(vm.main)
        // console.log(vm.time1)

      }

    }
  }

</script>

<style scoped>
  .input-item {
    width: 250px;
  }

  .name {
    font-weight: 500;
    font-size: 18px;
    margin-left: 10px;
    /* border-left: solid 3px #3D8EEF; */
    padding-left: 10px;
    margin-bottom: 12px;
    margin-top: 10px;
    padding-bottom: 0px;
  }

  .span1 {
    display: inline-block;
    margin: 0 10px -2px 0;
    height: 20px;
    border: solid 1.5px #409eff;
    line-height: 20px;
  }

  hr {
    border: none;
    color: gainsboro;
    width: 100%;
    border-bottom: solid 1px gainsboro;
  }

  .hint {
    background: #FFFDF1;
    color: #AFAEAB;
  }

  .hint img {
    width: 16px;
  }

  .count {
    font-size: 0.3rem;
    margin: 15px 2px;
    float: right;
    color: #3D8EEF;
    /* color:; */
  }

  .selectBox {
    font-size: 16px;
    margin-top: 15px;
    padding-left: 10px;
    /* padding-top: 10px; */
  }

  .tit {
    padding-left: 32px;
  }

  .v-table-title-cell {
    height: 50px;
  }

  .selectBox ul li {
    padding: 8px 0;
  }

  .button {
    margin-top: 20px;
  }

  .button button {
    width: 110px;
    height: 35px;
    font-size: 16px;
  }

  .button button:last-child {
    position: relative;
    left: 20px;
  }

</style>
