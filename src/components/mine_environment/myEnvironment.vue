<template>
  <div class="newMap" id="newMapw">
    <!-- 我的环境 -->
    <p class="count">维护商圈共有{{biz_count}}个</p>
    <div class="onebox">
      <onepath :path="path" :point="pointData" :marker='marker' @latlngClick='latlngClick' @pathClick="polygonClick">
      </onepath>
    </div>
    <p class="name">基本信息</p>
    <hr>
    <div class="content">
      <p>维护商圈数量：{{avglevel}}</p>
      <p>维护客户数量：{{func_area}}</p>
      <p>维护客户平均档位：{{main_poi}}</p>
    </div>
    <p class="name">品牌经营信息</p>
    <hr>
    <div class="contents">
      <div class="messagetable">
        <el-table class="tables" id="tb" :data="tableData4" height="6rem" border :header-cell-style="headerStyle"
          style="width: 100%;text-align:center">
          <el-table-column prop="product_name" align="center" label="品规"></el-table-column>
          <el-table-column prop="accuqty" align="center" label="年累计进货量(条)"></el-table-column>
          <el-table-column prop="accuqtyrank" align="center" label="上柜户数"></el-table-column>
        </el-table>
      </div>
    </div>
    <p class="name">维护目标完成情况</p>
    <hr>
    <div class="contents">
      <div class="messagetable">
        <el-table class="tables" id="tb" :data="tableData4" height="6rem" border :header-cell-style="headerStyle"
          style="width: 100%;text-align:center">
          <el-table-column prop="product_name" align="center" label="品规"></el-table-column>
          <el-table-column prop="product_name" align="center" label="目标量"></el-table-column>
          <el-table-column prop="accuqty" align="center" label="完成量"></el-table-column>
          <el-table-column prop="accuqtyrank" align="center" label="完成比"></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import onepath from '../mine_environment/../qqmap/onepath';
  import {hostType} from '../../../src/assets/js/env.js'
  export default {
    data() {
      return {
        path: [],
        center: [],
        marker: [],
        pointData: [],
        name: '',
        func_area: '',
        func_area: '',
        main_poi: '',
        newName: '',
        accuqty: '',
        headerStyle: {
          "text-align": "center",
          color: "#404447",
        },
        avglevel: '',
        accuqtyrank: '',
        accustriprank: '',
        qtytrend: '',
        striptrend: '',
        biz_count: '',
        lng: '',
        lat: '',
        tableData4: [],
        icon: {
          up: require('../img/up.png'),
          mollie: require('../img/junh.png'),
          down: require('../img/down.png')
        },
        building1: '',
        building2: '',
        building3: ''
      }
    },
    components: {
      onepath
    },
    computed: {
      add() {
        let arr = []
        if (this.building1) {
          arr.push(this.building1)
        }
        if (this.building2) {
          arr.push(this.building2)
        }
        if (this.building3) {
          arr.push(this.building3)
        }
        if (arr.length !== 0) {
          return arr.join(',')
        } else {
          return ''
        }

      }
    },
    mounted: function () {
      let vm = this
      // 获取当前位置的经纬度
      // vm.latlngClick(39.64574, 116.45984)
    },
    methods: {
      latlngClick(lng, lat) {
        console.log(lng)
        console.log(lat)
        var vm = this;
         let domain = hostType(1)
        vm.$axios.post(`${domain}`+"/wechat/api/query_dist/", {
        // vm.$axios.post("http://192.168.1.40:8000/wechat/api/query_dist/", {
          "lat": lat,
          "lng": lng
        }).then(function (response) {
          vm.path = response.data.biz_list
          console.log(response.data.biz_list)
          vm.marker = [lng, lat]
          // vm.path.push(response.data.biz)
          vm.name = response.data.biz_dist
          vm.biz_count = response.data.biz_list.length
          console.log(response.data)
        })
      },
      polygonClick(polygonName) {
        //  console.log(polygonName)
        let vm = this
         let domain = hostType(1)
        vm.$axios.get(`${domain}`+"/wechat/api/myenvi/?biz_dist=" + polygonName)
        // vm.$axios.get("http://192.168.1.40:8000/wechat/api/myenvi/?biz_dist=" + polygonName)
          .then(function (response) {
            console.log(response.data)
            vm.accuqtyrank = response.data.biz_info.accuqtyrank
            vm.main_poi = response.data.biz_info.main_poi
            vm.func_area = response.data.biz_info.func_area
            vm.accustriprank = response.data.biz_info.accustriprank
            vm.avglevel = response.data.biz_info.avglevel
            vm.tableData4 = response.data.data_list
          })
      }
    }
  }

</script>

<style scoped>
  .onebox {
    width: 100%;
    height: 4.5rem;
  }

  .messagetable {
    padding: 0.1rem 0.4rem 0 0;
  }

  .count {
    font-size: 0.3rem;
    margin: 0.13rem 0 0.13rem 0;
    float:right;
    color: #3D8EEF;
    /* color:; */
  }

  .name {
    font-weight: 500;
    font-size: 0.3rem;
    margin-left: 0.2rem;
    /* border-left: solid 3px #3D8EEF; */
    padding-left: 0.2rem;
    margin-bottom: 0.13rem;
    margin-top: 0.2rem;
  }

  hr {
    border: none;
    color: gainsboro;
    width: 100%;
    border-bottom: solid 1px gainsboro;
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

  .contents {
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
  }

  .contents p {
    font-size: 0.3rem;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    color: gray;
  }

  .contents img {
    width: 5%;
  }

</style>
