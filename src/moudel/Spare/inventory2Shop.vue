<template>
  <div class="newMap" id="newMapw">
    <!-- 作战指南点击零售户 -->
    <div class="onebox map-div">
      <onepath
        :path="path"
        :point="pointData"
        :licenselist='licenselist'
        :marker="marker"
       
      ></onepath>
    </div>
      
    <div class="mass1">
      <p class="name">
        <span class="span1"></span>
        <span>{{biz_num}}</span>
      </p>
      <hr>
      <div class="content">
        <p>负责人：{{contacts}}</p>
        <p>电话：{{phone_no}}</p>
        <p>档位：{{level}}</p>
        <p>所属商圈：{{biz_num}}</p>
        <p>功能区：{{func_area}}</p>
        <p>主导环境因子：{{main_poi}}</p>
        <p>三批平均价：{{strip}}元/条</p>
      </div>
    </div>
    <p class="name">
      <span class="span1"></span>
      <span>维护目标完成情况</span>
    </p>
    <!-- <hr> -->
    <div class="contents">
      <div class="messagetable">
        <el-table
          class="tables"
          id="tb"
          :data="tableData4"
          height="6rem"
          border
          :header-cell-style="headerStyle"
          style="width: 100%;text-align:center"
        >
          <el-table-column prop="product_name" align="center" label="品规"></el-table-column>
          <el-table-column prop="accuqty" align="center" label="年累计进货量"></el-table-column>
          <el-table-column prop="target" align="center" label="目标量"></el-table-column>
          <el-table-column prop="completions" align="center" label="完成量"></el-table-column>
          <el-table-column prop="rate" align="center" label="完成率"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- <p class="name">维护目标完成情况</p>
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
    </div>-->
     <button class="buttom-back"  @click="backFn" style="z-index:200">返回</button>
  </div>
</template>
<script type="text/ecmascript-6">
import onepath from "map/onepath";

import { hostType } from "api/env.js";

export default {
  data() {
    return {
      path: [],
      licenselist:'',
      contacts:'',
      accurank:"",
      phone_no:'',
      names:'',
      mass: true,
      bizmass: false,
      shopmass: false,
      center: [],
      marker: [],
      pointData: [],
      name: "",
      func_area: "",
      func_area: "",
      main_poi: "",
      newName: "",
      accuqty: "",
      headerStyle: {
        "text-align": "center",
        color: "#404447"
      },
      avglevel: "",
      accuqtyrank: "",
      func_area: "",
      shop_list: [],
      main_poi: "",
      shoplength: "",
      avg_qty: "",
      avg_profit: "",
      biz_dist: "",
      strip: "",
      funcnums: "",
      func_area:'',
      accuqty: "",
      accustriprank: "",
      qtytrend: "",
      striptrend: "",
      level: "",
        accurank:'',
      biz_count: 0,
      lng: "",
      lat: "",
      tableData4: [],
      icon: {
        up: require("img/up.png"),
        mollie: require("img/junh.png"),
        down: require("img/down.png")
      },
      biz_num: "",
      level: "",
      shop_num: ""
    };
  },
  components: {
    onepath
  },
  computed: {},
  mounted: function() {
    // let vm = this
    // 获取当前位置的经纬度

    var vm = this;
    vm.licenselist = this.$route.query.license
    console.log( vm.licenselist)
    let domain = hostType(2);
    vm.$axios
      .get(`${this.$apihost}` + "/wechat/api/visitshop/?license=" + this.$route.query.license)
      .then(function(response) {
        // response.data.shop_info.color='黄色'
        console.log(response.data.shop_info)
        let array = []
        vm.tableData4 = response.data.data_list
        vm.path = array.concat(response.data.shop_info);
        vm.marker = array.concat(response.data.shop_list);
        vm.level = response.data.shop_info.level;
        vm.biz_num = response.data.shop_info.biz_dist;
        vm.func_area = response.data.shop_info.func_area;
        vm.main_poi = response.data.shop_info.main_poi;
        vm.strip = response.data.shop_info.strip;
        vm.contacts = response.data.shop_info.contacts;
        vm.phone_no = response.data.shop_info.phone_no;
      });
  },
  methods: {
    backFn(){
    this.$router.go(-1)
    },
   
  }
};
</script>

<style scoped>
.onebox {
  width: 100%;
 height: 350px;
}
.messagetable {
  padding: 0.1rem 0.4rem 50px 0;

}

.count {
  font-size: 16px;
  margin: 10px 0;
  text-align: right;
  color: #3d8eef;
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

.content {
  margin-left: 20px;
  margin-bottom: 20px;
}

.content p {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: gray;
}

.contents {
  margin-left: 20px;
  margin-bottom: 20px;
}

.contents p {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: gray;
}

.contents img {
  width: 5%;
}
.buttom-back{
  background: #3D8EEF;
}
</style>
