<template>
  <div id="newMapa">
    <p class="name">
      <span class="span1"></span>
      <span> 奖金明细 </span>
      <el-dropdown class="dropdown" trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          {{month}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="(item,index) in datadown" :key="index" :command="item">{{item}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </p>
    <hr>
    <el-table :data="tableData3" height="270" :span-method="arraySpanMethod" border style="width: 100%">
      <!-- <el-table-column align="center" label="项目"> -->
      <el-table-column align="center" label="项目" prop="text">
      </el-table-column>
      <el-table-column align="center" label="品规" prop="type">
      </el-table-column>
      <!-- </el-table-column> -->
      <!-- <el-table-column label="项目" align="center"  prop="type"> -->
      <!-- </el-table-column> -->
      <el-table-column prop="l_" align="center" label="上月奖金">
      </el-table-column>
      <el-table-column prop="t_" align="center" label="本月奖金">
      </el-table-column>
    </el-table>
    <div class="prize">
      <p>当月奖金总额</p>
      <p>{{money}}</p>
      <p>当月排名</p>
      <p>{{solt}}</p>
    </div>
    <h4 class="h4" @click="ranking">当月奖金排名></h4>
    <!-- <p class="name">
      <span class="span1"></span>
      <span>拜访记录</span>
    </p>
    <div class="block">
      <span class="demonstration">开始时间：</span>
      <el-date-picker v-model="time1" type="date" placeholder="选择日期">
      </el-date-picker>
         <div  style="margin-top:10px;">
            <span class="demonstration">结束时间：</span>
            <el-date-picker v-model="time2" type="date" placeholder="选择日期">
            </el-date-picker>
          </div>
      <el-button type="primary" size="mini" class="filter" @click="filter">查询</el-button>
    </div>
    <el-table class="timetable" :data="tableData2" height="270" border style="width: 100%">

      <el-table-column type="index" align="center" label="序号">
      </el-table-column>
      <el-table-column align="center" label="客户名称" prop="shop_name">
      </el-table-column>
      <el-table-column prop="v_time" align="center" label="拜访日期">
      </el-table-column>
    </el-table> -->

    <!-- <hr> -->
  </div>
</template>

<script>
  import qqMap from 'map/qqMap';
  import {
    hostType
  } from 'api/env.js'
  export default {
    data() {
      return {
        datadown: [],
        data: [],
        numss: "",
        money:'',
        month: '',
        solt:'',
        time1: '',
        time2: '',
        project: ['维护目标奖励', '维护目标奖励', '维护目标奖励', '奖金合计', '奖金排名'],
        project2: ['A', 'B', 'c', '总目标'],
        tableData3: [],
        tableData2: [],
        ss: '',
        monthlist: '2019年1月',
      }
    },
    components: {

    },
    mounted: function () {
      let vm = this;
      console.log(vm.tableData3)
      vm.$axios
        .get(`${this.$apihost}` + "/wechat/api/mybonus/")
        .then(function (response) {
          // console.log(response.data.data_list)
          vm.numss = response.data.data_list.length
          vm.month = response.data.month_list[0]
          vm.datadown = response.data.month_list
          // var obj = vm.tableData3.find(function (x) {
          //   return x.text === "奖金合计"
          // })
          // alert(obj.l_);
          vm.tableData3 = response.data.data_list
          // for (let index = 0; index < vm.project.length; index++) {
          for (let i = 0; i < vm.tableData3.length; i++) {
            // console.log(vm.tableData3[vm.tableData3.length-'1'].t_)
            // console.log(vm.tableData3[vm.tableData3.length-'2'].t_)
           vm.money = vm.tableData3[vm.tableData3.length-'2'].t_
           vm.solt = vm.tableData3[vm.tableData3.length-'1'].t_
          }
          // }

          for (let index = 0; index < vm.project2.length; index++) {
            for (let i = 0; i < vm.tableData3.length; i++) {
              vm.tableData3[index].project2 = vm.project2[index]
            }
          }
         });
    },
    methods: {
      handleCommand(item) {
        this.month = item
        // console.log(item)
        let vm = this;
        vm.$axios
          .get(`${this.$apihost}` + "/wechat/api/mybonus/?monthly=" + vm.month)
          .then(function (response) {
            console.log(response.data.data_list.length)
            vm.numss = response.data.data_list.length
            // vm.month =  response.data.month_list[0]
            vm.datadown = response.data.month_list

            vm.tableData3 = response.data.data_list
             for (let i = 0; i < vm.tableData3.length; i++) {
            console.log(vm.tableData3[vm.tableData3.length-'1'].t_)
            console.log(vm.tableData3[vm.tableData3.length-'2'].t_)
           vm.money = vm.tableData3[vm.tableData3.length-'2'].t_
           vm.solt = vm.tableData3[vm.tableData3.length-'1'].t_
          }
            for (let index = 0; index < vm.project2.length; index++) {
              for (let i = 0; i < vm.tableData3.length; i++) {
                vm.tableData3[index].project2 = vm.project2[index]
              }
            }
          });
      },
      ranking() {
        // console.log('999')
        this.$router.push({
          path: "/home/ranking",
          // query: {
          //   license: item.license,
          // }
        })
      },
      dadeFn(time) {
        var mymonth = time.getMonth() + 1;
        var myweekday = time.getDate();
        if (mymonth < 10) {
          mymonth = "0" + mymonth;
        }
        if (myweekday < 10) {
          myweekday = "0" + myweekday;
        }
        return time.getFullYear() + '-' + mymonth + '-' + myweekday;
      },
      filter() {
        let vm = this;
        if(vm.time2 != null){
            if (vm.time1 > vm.time2) {
          vm.$message.error('开始时间不能大于结束时间');
          console.log(vm.time2 )
        }
        }else {
          vm.time2 = ''
        }
        
        let date_value1 = ""
        var date1 = new Date(vm.time1);
        date_value1 = this.dadeFn(date1);
          let date_value2 = ""
        var date2 = new Date(vm.time2);
        date_value2 = this.dadeFn(date2);
        console.log(date_value2)
        if(date_value2 == '1970-01-01'){
           date_value2 = ''
        }
        vm.$axios
          .get(`${this.$apihost}` + "/wechat/api/visitrecords/?v_time=" + date_value1+'&e_time='+date_value2)
          .then(function (response) {
            console.log(response)
            vm.tableData2 = response.data.data
          });
      },
      arraySpanMethod({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        let vm = this;
        //  console.log(vm.numss)
        if (rowIndex === vm.numss - 2 || rowIndex === vm.numss - 1) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        };
        if (columnIndex === 0) {
          if (rowIndex === 0) {
            return [vm.numss - 2, 1];
          } else {
            return [0, 0];
          }
        };
      },
    }
  }

</script>

<style scoped>
  .box {
    margin: 15px 0 15px 15px;
  }

  .filter {
    margin-left: 10px;
  }

  .timetable {
    margin-top: 20px;
  }

  .name span:last-child {
    width: 100px;
  }

  .dropdown {
    float: right;
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .prize {
    display: flex;
    width: 100%;
    margin: 10px 0;
    height: 20px;
    justify-content: space-around;

  }

  .prize p {
    border: 1px solid #E4E4E4;
    width: 25%;
    height: 30px;
    padding-top: 2px;
    text-align: center;
  }

  .h4 {
    margin: 20px 0 10px 370px;
  }

  .count {
    font-size: 24px;
    margin: 0.13rem 0 0.13rem 0;
    color: #3D8EEF;
    float: right;
    /* color:; */
  }

  .demonstration {
    margin-left: 20px;

  }

  .name {
    font-weight: 500;
    font-size: 23px;
    margin-left: 10px;
    /* border-left: solid 3px #3D8EEF; */
    padding-left: 10px;
    margin-bottom: 12px;
    margin-top: 10px;
  }

  hr {
    border: none;
    color: gainsboro;
    width: 100%;
    border-bottom: solid 1px gainsboro;
  }

  .span1 {
    display: inline-block;
    margin: 0 10px -2px 0;
    height: 20px;
    border: solid 1.5px #409eff;
    line-height: 20px;
  }

</style>
