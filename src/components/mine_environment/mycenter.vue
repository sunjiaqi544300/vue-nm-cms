<template>
  <div id="newMapa">
    <!-- 我的商圈 -->
    <p class="count">维护客户共有{{shoplength}}个</p>
    <div style="height: 4.5rem;">
      <qq-map :path="path"  @markerClick="shopClick" :point="center"  @latlngClick='latlngClick' :marker="shop" ></qq-map>
    </div>

    <p class="name">零售户名称：{{names}}
      <router-link :to="'/home/brandDemand?code='+code" class="rous4" tag="div">
        <el-button type="primary" style="padding:0.1rem 0.2rem;" size="mini">拜访</el-button>
      </router-link>
    </p>
    <div class="content">
      <p>档位：{{level}}</p>
      <p>所属商圈：{{biz_dist}}</p>
      <p>功能区：{{func_area}}</p>
      <p>主导环境因子：{{main_poi}}</p>
      <p>年累计进货量：{{accuqty}}条</p>
      <p>三批平均价：{{strip}}元/条</p>
    </div>
    <p class="name">品牌经营信息</p>
     <div class="contents">
      <div class="messagetable">
        <el-table class="tables" id="tb" :data="tableData4" height="6rem" border :header-cell-style="headerStyle"
          style="width: 100%;text-align:center">

          <el-table-column prop="product_name" align="center" label="品规"></el-table-column>
          <el-table-column prop="accuqty" align="center" label="年累计进货量(条)"></el-table-column>
          <el-table-column prop="count" align="center" label="订购月次"></el-table-column>
          <el-table-column prop="biz_accuqtyrank" align="center" label="进货量排名(本商圈)"></el-table-column>
          <el-table-column prop="poi_accuqtyrank" align="center" label="进货量排名(相同商圈)"></el-table-column>
          <el-table-column prop="poilevel_accuqtyrank" align="center" label="进货量排名(相同商圈相同档位)"></el-table-column>
        </el-table>
      </div>
    </div>
   
  </div>
</template>

<script>
  import qqMap from '../qqmap/qqMap';
 import {hostType} from '../../../src/assets/js/env.js'
  export default {
    data() {
      return {
        center: [],
        names: '',
        shop: [],
        path: [],
        biz_dist:'',
        lat: '',
        lng: '',
        level: '',
        func_area:'',
        shop_list: [],
        main_poi:'',
        shoplength:'',
        avg_qty: '',
        avg_profit: '',
        strip: '',
        funcnums: '',
        accuqty:'',
        code:'',
        tableData4:'',
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
      qqMap
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
      latlngClick(lng, lat) {
        console.log(lng)
        console.log(lat)
        var vm = this;
        let domain = hostType(1)
        vm.$axios.get(`${domain}`+"/wechat/api/nearshop/?add_lng=" + lng + '&add_lat=' + lat).then(
        // vm.$axios.get("http://192.168.1.40:8000/wechat/api/nearshop/?add_lng=" + lng + '&add_lat=' + lat).then(
          function (response) {
            console.log(response.data)
            console.log('55')
            // vm.path = response.data.shop_list
            // vm.shop = response.data.shop_list
            // vm.shoplength = response.data.shop_list.length
          })
      },
      shopClick(code,name) {
        console.log(code)
        // console.log('00')
          var vm = this;
          vm.names = name
          vm.code = code
          let domain = hostType(1)
            vm.$axios.get(`${domain}`+"/wechat/api/myshop/?license="+'110114206846').then(
            // vm.$axios.get("http://192.168.1.40:8000/wechat/api/myshop/?license="+'110114206846').then(
          function (response) {
            console.log(response.data)
            vm.level =response.data.shop_info.level
            vm.biz_dist =response.data.shop_info.biz_dist
            vm.func_area =response.data.shop_info.func_area
            vm.main_poi =response.data.shop_info.main_poi
            vm.strip =response.data.shop_info.strip
            vm.accuqty =response.data.shop_info.accuqty
            vm.tableData4 = response.data.data_list
            // console.log('55')
            // vm.path = response.data.shop_list
            // vm.shop = response.data.shop_list
          })
      }
    }
  }

</script>

<style scoped>
  .name {
    font-weight: 500;
    font-size: 0.31rem;
    margin-left: 0.2rem;
    /* border-left: solid 3px #3D8EEF; */
    padding-left: 0.2rem;
    margin-bottom: 0.13rem;
    margin-top: 0.2rem;
  }

  .count {
    font-size: 0.3rem;
    margin: 0.13rem 0 0.13rem 0;
    color: #3D8EEF;
    float:right;
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
