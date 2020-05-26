<template>
  <div class="page">
    <h4 class="h4">当月奖金排名</h4>
    <el-dropdown class="dropdown" trigger="click" @command="handleCommand">
      <span class="el-dropdown-link">
        {{month}}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item,index) in datadown" :key="index" :command="item">{{item}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="my" v-if="bonus != null">
      <ul>
        <li> <span class="spannum"> {{bonusrank}} </span> {{userid}} <span class="span2">{{bonus}}元</span></li>
        <!-- <li v-else> <span class="spannum"> {{bonusrank}} </span> {{userid}} <span class="span2" >{{bonus}}元</span></li> -->
      </ul>
    </div>
    <div v-else></div>
    <div class="solt">
      <ul>
        <li v-for="(item,index) in tablist" :key="index"> <span class="spannum"> {{item.bonusrank}} </span>
          {{item.userid}} <span class="span2">{{item.bonus}}元</span></li>
      </ul>
    </div>
    <button class="buttom-back" @click="backFn" style="z-index:200">返回</button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "page",
    data() {
      return {
        datadown: [],
        tablist: [],
        own_rank: [],
        month: '',
        bonusrank: '',
        userid: '',
        bonus: '',
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
          console.log(response.data)
          vm.tablist = response.data.rank_list
          vm.own_rank = response.data.own_rank
          vm.datadown = response.data.month_list
          vm.month = response.data.month_list[0]
          vm.bonusrank = response.data.own_rank.bonusrank
          vm.userid = response.data.own_rank.userid
          vm.bonus = response.data.own_rank.bonus

        });
    },
    methods: {
      backFn() {
        this.$router.go(-1)
      },
      handleCommand(item) {
        this.month = item
        let vm = this;
        vm.$axios
          .get(`${this.$apihost}` + "/wechat/api/mybonus/?monthly=" + vm.month)
          .then(function (response) {
            vm.tablist = response.data.rank_list
            vm.own_rank = response.data.own_rank
            vm.datadown = response.data.month_list
            // vm.month = response.data.month_list[0] 
            vm.bonusrank = response.data.own_rank.bonusrank
            vm.userid = response.data.own_rank.userid
            vm.bonus = response.data.own_rank.bonus
            console.log(response.data.data_list.length)
            vm.numss = response.data.data_list.length
            // vm.month =  response.data.month_list[0]
            vm.datadown = response.data.month_list
            vm.tableData3 = response.data.data_list
            for (let i = 0; i < vm.tableData3.length; i++) {
              console.log(vm.tableData3[vm.tableData3.length - '1'].t_)
              console.log(vm.tableData3[vm.tableData3.length - '2'].t_)
              vm.money = vm.tableData3[vm.tableData3.length - '2'].t_
              vm.solt = vm.tableData3[vm.tableData3.length - '1'].t_
            }
            for (let index = 0; index < vm.project2.length; index++) {
              for (let i = 0; i < vm.tableData3.length; i++) {
                vm.tableData3[index].project2 = vm.project2[index]
              }
            }
          });
      },
    }

  }

</script>
<style scoped>
  .h4 {
    text-align: center;
    font-size: 24px;
  }

  .solt {
    margin: 20px 0 0 0;
  }

  .solt ul {
    padding: 10px;
    /* height: 100%; */
    margin-bottom: 30px;
  }

  .dropdown {
    float: right;
    /* margin-left:20px; */
  }

  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }

  .el-icon-arrow-down {
    font-size: 12px;
  }

  .solt li {
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    border: 1px #E4E4E4 solid;
    margin-bottom: 10px;
  }

  .my {
    margin: 20px 0 0 0;
  }

  .my li {
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 20px;
    border: 1px #E4E4E4 solid;
    margin-bottom: 10px;
  }

  .my ul {
    padding: 10px;
  }

  .spannum {
    margin: 0 50px 0 0px;
    padding-left: 10px;
  }

  .span2 {
    float: right;
    padding-right: 10px;
  }

</style>
