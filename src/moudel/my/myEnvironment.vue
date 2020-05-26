<template>
  <div class="newMap" id="newMapw">
    <!-- 我的环境 -->
    <p class="count">
      <el-button @click="zoom" type="primary" size="mini">{{fullname}}</el-button>
      维护客户共有{{biz_count}}个
    </p>
    <div class="onebox map-div" id="onebox">
      <onepath
        :path="path"
        :fristposition="fristposition"
        :point="pointData"
        @markerClick="shopClick"
        :marker="marker"
       :isShowtf= "isShowtf"
        @pathClick="polygonClick"
      ></onepath>
    </div>
    <div class="mass1" v-show="mass">
      <p class="name">
        <span class="span1"></span>
        <span>基本信息</span>
        <el-button type="primary" class="signout" size="mini" @click="signout">退出登录</el-button>
      </p>
      <hr />
      <div class="content">
        <p>维护商圈数量：{{biz_num}}</p>
        <p>维护客户数量：{{shop_num}}</p>
        <p>维护客户平均档位：{{level}}</p>
      </div>
    </div>
    <div class="mass1" v-show="bizmass">
      <p class="name">
        <span class="span1"></span>
        <span>{{polygonName}}基本信息</span>
        <el-button type="primary" class="signout" size="mini" @click="signout">退出登录</el-button>
      </p>
      <hr />
      <div class="content">
        <p>平均档位：{{avglevel}}</p>
        <p>功能区：{{main_poi}}</p>
        <p>主导环境因子：{{func_area}}</p>
        <p>累计进货量在全区排名：{{accuqtyrank}}</p>
        <p>三批平均价在全区排名：{{accustriprank}}</p>
        <p>总排名：{{accurank}}</p>
      </div>
    </div>
    <div class="mass1" v-show="shopmass">
      <p class="name">
        <span class="span1"></span>
        <span>{{names}}</span>
        <el-button type="primary" size="mini" class="signout" @click="signout">退出登录</el-button>
      </p>
      <hr />
      <div class="content">
        <p>档位：{{level}}</p>
        <p>所属商圈：{{biz_dist}}</p>
        <p>功能区：{{func_area}}</p>
        <p>主导环境因子：{{main_poi}}</p>
        <p>三批平均价：{{strip}}元/条</p>
        <p>访销周期：{{cycle}}</p>
        <p>地址：{{shop_address}}</p>
      </div>
    </div>
    <!-- <p class="name">
      <span class="span1"></span>维护目标完成情况
    </p>-->
    <!-- <hr> -->
    <div class="contents">
      <div class="messagetable">
        <tableTitleLeft :tableDatalist="tableData4" :leftList="leftdata" :type="1" :butshow="false">
          <span slot="title">维护目标完成情况</span>
        </tableTitleLeft>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import onepath from "map/onepathnew";
import { getCookie, setCookie, delCookie } from "js/public.js";
import tableTitleLeft from "com/tableTitleLeft.vue";
import { hostType } from "api/env.js";

export default {
  data() {
    return {
      isShowtf:false,
      fullname: "放大",
      flag: false,
      activeClass: -1,
      leftdata: [
        "品规",
        "年累计进货量",
        "目标量",
        "完成量",
        "上月完成量",
        "完成率"
      ],
      path: [],
      accurank: "",
      polygonName: "",
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
      accuqty: "",
      accustriprank: "",
      qtytrend: "",
      striptrend: "",
      level: "",
      accurank: "",
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
      names: "",
      phone: "",
      cycle: "",
      shop_address: "",
      shop_num: "",
      fristposition: []
    };
  },
  components: {
    onepath,
    tableTitleLeft
  },
  computed: {},
  mounted: function() {
    // $(function () {

    // });
    // let vm = this
    // 获取当前位置的经纬度
    var vm = this;
    let domain = hostType(2);
    vm.$axios
      .get(`${this.$apihost}` + "/wechat/api/mydomain/")
      .then(function(response) {
        console.log(response);
        vm.path = response.data.path;
        vm.biz_count = response.data.result.length;
        // vm.fristposition = response.data.result[0].add
        sessionStorage.setItem(
          "fristposition",
          JSON.stringify(response.data.result[0].add)
        );
        console.log(vm.fristposition);
        vm.marker = response.data.result;
        vm.level = response.data.top_data.level;
        vm.biz_num = response.data.top_data.biz_num;
        vm.shop_num = response.data.top_data.shop_num;
        let array = response.data.bot_data;
        let arraynew = [];
        for (let index = 0; index < array.length; index++) {
          arraynew.push(
            Object.assign(
              {},
              {
                name: array[index].product_name,
                // product_id:array[index].product_id,
                // modelvalue1:array[index].advance_order,
                // modelvalue2:array[index].stock,
                // modelvalue3:array[index].demand,
                value: {
                  // accuqty: array[index].accuqty,
                  // accuqty2: array[index].target,
                  // accuqty3: array[index].completions,
                  // accuqty4: array[index].rate,
                  accuqty: array[index].accuqty,
                  accuqty2: array[index].target,
                  accuqty3: array[index].completions,
                  accuqty4: array[index].l_completions,
                  accuqty5: array[index].rate
                }
              }
            )
          );
        }
        vm.tableData4 = arraynew;
      });
  },
  methods: {
    qqq() {
      console.log("00");
      //  this.a()
      // window.location.href ='ios://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=36.547901&amp;lon=104.258354&amp;dev=1&amp;style=2'
      window.location.href =
        "http://uri.amap.com/navigation?from=116.478346,39.997361,startpoint&to=116.3246,39.966577,endpoint&via=116.402796,39.936915,midwaypoint&mode=car&policy=1&src=mypage&coordinate=gaode&callnative=0";
      // this.activeClass = index;
    },
    zoom() {
      // this.activeClass = index;
      this.flag = !this.flag;
      if (this.flag) {
        document.getElementById("onebox").style.height = "550px";
        this.fullname = "缩小";
      } else {
        document.getElementById("onebox").style.height = "300px";
        this.fullname = "放大";
      }
    },
    // a(){
    //    var u = navigator.userAgent,
    //     app = navigator.appVersion;
    //   var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    //   var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    //   if (isAndroid) {
    //     this.phone = "androidamap://navi?sourceApplication=appname&amp;poiname=fangheng&amp;lat=39.80386245189909&amp;lon=116.37454826978217&amp;dev=1&amp;style=2"
    //     //这个是安卓操作系统
    //   }
    //   if (isIOS) {
    //      this.phone ='ios'
    //     //这个是ios操作系统
    //   }
    // },
    signout() {
      console.log("00");
      delCookie("token");
      localStorage.removeItem("token");
      this.$router.push("/");
    },
    polygonClick(polygonName) {
      // console.log("9");
      let vm = this;
      vm.mass = false;
      vm.bizmass = true;
      vm.shopmass = false;
      vm.$axios
        .get(`${this.$apihost}` + "/wechat/api/myenvi/?biz_dist=" + polygonName)
        .then(response => {
          vm.accuqtyrank = response.data.biz_info.accuqtyrank;
          vm.main_poi = response.data.biz_info.main_poi;
          vm.func_area = response.data.biz_info.func_area;
          vm.accustriprank = response.data.biz_info.accustriprank;
          vm.avglevel = response.data.biz_info.avglevel;
          vm.accurank = response.data.biz_info.accurank;

          let array = response.data.data_list;
          let arraynew = [];
          for (let index = 0; index < array.length; index++) {
            arraynew.push(
              Object.assign(
                {},
                {
                  name: array[index].product_name,
                  // product_id:array[index].product_id,
                  // modelvalue1:array[index].advance_order,
                  // modelvalue2:array[index].stock,
                  // modelvalue3:array[index].demand,
                  value: {
                    accuqty: array[index].accuqty,
                    accuqty2: array[index].target,
                    accuqty3: array[index].completions,
                    accuqty4: array[index].l_completions,
                    accuqty5: array[index].rate
                  }
                }
              )
            );
          }
          vm.tableData4 = arraynew;
        });
      vm.polygonName = polygonName;
    },
    shopClick(code, name) {
      var vm = this;
      vm.names = name;
      this.code = code;
      vm.bizmass = false;
      vm.mass = false;
      vm.shopmass = true;
      let domain = hostType(2);
      vm.$axios
        .get(`${domain}` + "/wechat/api/myshop/?license=" + code)
        .then(function(response) {
          vm.level = response.data.shop_info.level;
          vm.biz_dist = response.data.shop_info.biz_dist;
          vm.func_area = response.data.shop_info.func_area;
          vm.main_poi = response.data.shop_info.main_poi;
          vm.strip = response.data.shop_info.strip;
          vm.accuqty = response.data.shop_info.accuqty;
          vm.cycle = response.data.shop_info.cycle;
          vm.shop_address = response.data.shop_info.shop_address;

          let array = response.data.data_list;
          let arraynew = [];
          for (let index = 0; index < array.length; index++) {
            arraynew.push(
              Object.assign(
                {},
                {
                  name: array[index].product_name,
                  // product_id:array[index].product_id,
                  // modelvalue1:array[index].advance_order,
                  // modelvalue2:array[index].stock,
                  // modelvalue3:array[index].demand,
                  value: {
                    accuqty: array[index].accuqty,
                    accuqty2: array[index].target,
                    accuqty3: array[index].completions,
                    accuqty4: array[index].l_completions,
                    accuqty5: array[index].rate
                  }
                }
              )
            );
          }
          vm.tableData4 = arraynew;
          // vm.tableData4 = response.data.data_list;
        });
    }
  }
};
</script>

<style scoped>
#newMapw {
  background-color: #f3f4f8;
}

/* .onebox {
    width: 100%;
    height: 300px;
  } */
#onebox {
  width: 100%;
  height: 300px;
}
.active {
  width: 100%;
  height: 650px;
}

.count {
  font-size: 16px;
  margin: 10px 0;
  text-align: right;
  color: #3d8eef;
  /* color:; */
}

.contents {
  width: 100%;
  margin: 10px auto;
  background: #ffffff;
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
  /* margin-bottom: 20px; */
}

.content p {
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  color: gray;
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

.signout {
  float: right;
  margin-right: 20px;
}
</style>
