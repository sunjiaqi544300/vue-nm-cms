<template>
  <div id="newMapa">
    <!-- 我的商圈 -->
    <p class="count">维护客户共有{{shoplength}}个</p>
    <div class="map">
      <qq-map :path="path" @markerClick="shopClick" :point="center" :marker="shop"></qq-map>
    </div>
 <p class="name">
        <span class="span1"></span>
        <span>{{names}}</span>
      </p>
    <div class="content">
      <p>档位：{{level}}</p>
      <p>所属商圈：{{biz_dist}}</p>
      <p>功能区：{{func_area}}</p>
      <p>主导环境因子：{{main_poi}}</p>
      <p>年累计进货量：{{accuqty}}条</p>
      <p>三批平均价：{{strip}}元/条</p>
      <p>地址：{{shop_address}}</p>
    </div>
    <div class="contents">
      <div class="messagetable">
            <tableTitleLeft :tableDatalist="tableData4" :leftList="leftdata" :type="1" :butshow="false"><span slot="title">维护目标完成情况</span></tableTitleLeft>  
      </div>
    </div>
  </div>
</template>

<script>
  import qqMap from "map/qqMap";
import tableTitleLeft from "com/tableTitleLeft.vue"
  import {
    hostType
  } from 'api/env.js'
  export default {
    data() {
      return {
         leftdata:["品规","年累计进货量","目标量","完成量","完成率"],
        center: [],
        names: '',
        shop: [],
        path: [],
        shop_address:'',
        biz_dist: '',
        lat: '',
        lng: '',
        level: '',
        func_area: '',
        shop_list: [],
        main_poi: '',
        shoplength: '',
        avg_qty: '',
        avg_profit: '',
        strip: '',
        funcnums: '',
        accuqty: '',
        code: '',
        tableData4: [],
        funcaccuqtyrank: '',
        flaccustriprank: '',
        funcaccuprofitrank: '',
        flnums: '',
        flaccuqtyrank: '',
        funcaccustriprank: '',
        flaccuprofitrank: '',
        nums: '',
        accuqtyrank: '',
        accustriprank: '',
        accuprofitrank: '',
      }
    },
    components: {
      qqMap,
      tableTitleLeft
    },
    mounted: function () {
      // var windowH = document.documentElement.clientHeight
      // document.getElementById('newMapa').style.height = windowH - 100 + 'px'
      let vm = this
      vm.shop_list = vm.$route.query.shop_list
      vm.shop = vm.shop_list
      vm.shoplength = vm.shop_list.length
    },
    methods: {
      shopClick(code, name) {
        console.log('00')
        console.log(code)
        var vm = this;
          vm.names = name
          vm.code = code
          let domain = hostType(1)
        vm.$axios.get(`${this.$apihost}` + "/wechat/api/myshop/?license=" + code).then(
          // vm.$axios.get("http://192.168.1.40:8000/wechat/api/myshop/?license="+'110114206846').then(
          function (response) {
            console.log(response.data)
            vm.level = response.data.shop_info.level
            vm.biz_dist = response.data.shop_info.biz_dist
            vm.func_area = response.data.shop_info.func_area
            vm.main_poi = response.data.shop_info.main_poi
            vm.strip = response.data.shop_info.strip
            vm.accuqty = response.data.shop_info.accuqty
            vm.shop_address = response.data.shop_info.shop_address
             let array = response.data.data_list
              let arraynew = []
                for (let index = 0; index < array.length; index++) {
                    arraynew.push(Object.assign({},{
                          name:array[index].product_name,
                          // product_id:array[index].product_id,
                          // modelvalue1:array[index].advance_order,
                          // modelvalue2:array[index].stock,
                          // modelvalue3:array[index].demand,
                          value:{
                            accuqty:array[index].accuqty,
                            accuqty2:array[index].target,
                            accuqty3:array[index].completions,
                            accuqty4:array[index].rate,
                          }
                    }))
                }
              vm.tableData4 = arraynew
            // vm.tableData4 = response.data.data_list
            // console.log('55')
            // vm.path = response.data.shop_list
            // vm.shop = response.data.shop_list
          })
      }
    }
  }

</script>

<style scoped>
  .map {
    height: 350px;
  }

  
  .name {
  font-weight: 500;
  font-size: 18px;
  margin-left: 10px;
  /* border-left: solid 3px #3D8EEF; */
  padding-left: 10px;
  margin-bottom: 12px;
   margin-top: 50px;
}
.span1 {
  display: inline-block;
  margin: 0 10px -2px 0;
  height: 20px;
  border: solid 1.5px #409eff;
  line-height: 20px;
}

  .count {
    font-size: 0.3rem;
    margin: 0.13rem 0 0.13rem 0;
    color: #3D8EEF;
    float: right;
    /* color:; */
  }

  .content {
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .content p {
    font-size: 0.3rem;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    color: gray;
  }

  table {
    text-align: center;
    margin: 0 auto;
    width: 95%;
    border: solid #F0F0F0;
    border-width: 1px 0px 0px 1px;
    color: gray;
  }

  td {
    width: 13%;
    height: 0.6rem;
    border: solid #F0F0F0;
    border-width: 0px 1px 1px 0px;
  }

</style>
