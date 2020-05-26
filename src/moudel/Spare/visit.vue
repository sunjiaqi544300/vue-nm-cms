<template>
  <div class="page">
    <p class="name">
      <span class="span1"></span>
      <span>基本信息</span>
    </p>
    <hr>
    <div v-for="(item,index) in data" :key="index" class="box" @click="clickshop(item)">
      <p> {{index+1}}.{{item.shop_name}}
        <span class="distance" v-if="item.distance <1000 ">{{item.distance}}米</span>
        <span class="distance" v-else-if='item.distance>1000'>{{(item.distance/1000).toFixed(1)}}公里</span>
        <!-- <span class="distance" v-else-if='item.distance>1000' >{{item.distance}}公里</span> -->
      </p>
      <p>地址：{{item.shop_address}}</p>
      <p>目标量：{{item.target}}</p>
      <p>完成量：{{item.completions}}</p>
      <p>预计增量：{{item.projected}}</p>
      <p>访销周期：{{item.cycle}}</p>
      <hr>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qqMap from 'map/qqMap';
  import {
    hostType
  } from 'api/env.js'
  export default {
    data() {
      return {
        tablist: [{
          id: 1,
          name: "优先拜访",
          select: true,
        }, {
          id: 2,
          name: "店铺信息",
          select: false,
        }],
        data: [],
        latitude: '',
        longitude: '',
        tabactive: 1,
        numlength: '',
        ss: '',
      }
    },
    components: {

    },
    mounted: function () {
      let vm = this;
      vm.latitude = JSON.parse(sessionStorage.getItem("position")).lat
      vm.longitude = JSON.parse(sessionStorage.getItem("position")).lng
      console.log(vm.longitude,vm.latitude)
      vm.$axios
        .get(`${this.$apihost}` + "/wechat/api/optguide/?add_lng=" + vm.longitude + '&add_lat=' + vm.latitude)
          .then(function (response) {
            console.log(response)
            vm.data = response.data.data
            vm.numlength = response.data.data.length
            sessionStorage.setItem("numlength", JSON.stringify(vm.numlength))
            // console.log(JSON.parse(sessionStorage.getItem("numlength")))
          // console.log( vm.numlength)
      });
    },
    methods: {
      tabFn(num) {
        this.tableData = []
        this.tabactive = num
        let array = this.tablist
        for (let index = 0; index < array.length; index++) {
          if (num == array[index].id) {
            array[index].select = true
          } else {
            array[index].select = false
          }
        }
      },
      clickshop(item) {
      let vm = this
        vm.$axios
          .get(`${this.$apihost}` + "/wechat/api/visitshop/?license=" + item.license)
          .then(function (response) {

            let array = response.data.shop_list
           console.log(array)
            // let arraynew2 = []
            // let array = response.data.shop_list
            let arraynew2 = []
            for (let index = 0; index < array.length; index++) {
              arraynew2.push(Object.assign({}, array[index]))
            }

         
            sessionStorage.setItem("shop_list2", JSON.stringify(arraynew2)) 
            console.log(JSON.parse(sessionStorage.getItem("shop_list2")))
            vm.$router.push({
              path: "/home/myBusiness",
             query: {
              type: 7,
              // license: item.license
            }
            })
          });


      }
    }
  }

</script>

<style scoped>
  .distance {
    float: right;
    margin-right: 10px;
  }

  .tablist {
    text-align: center;
    display: flex;
    position: relative;
    top: 10px;
    margin-bottom: 10px;
    background-color: #ededed;
  }

  .tablist span {
    display: inline-block;
    vertical-align: middle;
    flex: 1;
    font-size: 16px;
    padding: 15px 0;
    border-right: 1px solid #dddddd;
  }

  .tablist span.active {
    background: #c8e1ff;
  }

  .tablist span:last-child {
    border: none
  }

  .tabcont {
    /* padding-top: 10px; */
    padding-bottom: 60px;
    background-color: #ffffff;
    position: relative;
    top: 10px;
  }

  .box {
    margin: 15px 0 15px 15px;
  }

  .tits2 {
    font-size: 15px;
    margin: 4px 0 5px 0;
    color: #333
  }

  .tits {
    font-size: 13px;
    color: #666
  }

  .count {
    font-size: 24px;
    margin: 0.13rem 0 0.13rem 0;
    color: #3D8EEF;
    float: right;
    /* color:; */
  }

  .name {
    font-weight: 500;
     font-size: 18px;
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
    margin: 10px 0;
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
