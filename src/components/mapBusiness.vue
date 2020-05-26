<template>
  <div class="newMap" :id="mass == false ? 'wrap' : ''">
    <!-- 我的环境 -->
    <el-button @click="zoom" type="primary" size="mini" class="blowup">{{fullname}}</el-button>
    <el-button @click="navigate" type="primary" size="mini">导航</el-button>
    <div class="onebox map-div" id="onebox">
      <onepath
        :path="path"
        :point="pointData"
        @markerClick="shopClick"
        :marker="marker"
        :pathClickState="false"
        @latlngClick="latlngClickFn"
        :ingstate="true"
        :licenseData="codechange"
        @changeMap="changeMap"
        :to_add_lng="to_add_lng"
        :to_add_lat="to_add_lat"
        :panTo="true"
        :myPosition="myPosition"
        :watchState="true"
        :watchNum="watchNum"
        ref="mychild"
        :isShowtf="isShowtf"
        :fristposition="fristposition"
      ></onepath>
      <!-- <div class="updata-address-div" @click="updataAddress">
        <i class="updata-address"></i>
        <p>定位</p>
      </div>-->
    </div>
    <!-- <div class="mass1" v-show="mass">
      <p class="name">
        <span class="span1"></span>
        <span>{{shopname || "基本信息"}}</span>
      </p>
      <hr>
      <div class="content"  v-loading="loading">
        <p>维护商圈数量：{{biz_num}}</p>
        <p>维护客户数量：{{shop_num}}</p>
        <p>维护客户平均档位：{{level}}</p>
      </div>
    </div>-->
    <!-- <div class="mass1" v-show="bizmass">
      <p class="name">
        <span class="span1"></span>
        <span>商圈基本信息</span>
      </p>
      <hr>
      <div class="content"  v-loading="loading">
        <p>平均档位：{{avglevel}}</p>
        <p>功能区：{{main_poi}}</p>
        <p>主导环境因子：{{func_area}}</p>

        <p>累计进货量在全区排名：{{accuqtyrank}}</p>
        <p>三批平均价在全区排名：{{accustriprank}}</p>
        <p>总排名：{{accurank}}</p>
      </div>
    </div>-->
    <div class="tablist">
      <span
        type="primary"
        v-for="(item,index) in tablist"
        :key="index"
        @click="tabFn(item.id)"
        :class="item.select ? 'active': ''"
      >{{item.name}}</span>
    </div>
    <div class="tabcont">
      <div class="tabcont-item tabcont-1" v-if="tabactive == 1">
        <!-- <visit> </visit> -->
        <div class="basic">
          <div class="mass1">
            <p class="name">
              <span class="span1"></span>
              <span>{{names || "零售户基本信息"}}</span>
            </p>
            <div class="content" v-loading="loading">
              <div v-if="editState">
                <p>
                  负责人：
                  <el-input v-model="baifnagYz.name" placeholder="请输入内容" class="xinxitext"></el-input>
                </p>
                <p>
                  联系电话：
                  <el-input v-model="baifnagYz.mobile" placeholder="请输入内容" class="xinxitext"></el-input>
                </p>
                <p>
                  地址：
                  <el-input v-model="baifnagYz.shop_address" placeholder="请输入内容" class="xinxitext"></el-input>
                </p>
                <p>
                  访销周期：
                  <span class="selectCyclediv">
                    <span
                      class="selectCycle"
                      v-if="baifnagYz.cycle"
                      @click="selectCycleFn"
                    >{{baifnagYz.cycle}}</span>
                    <span class="selectCycle" @click="selectCycleFn" v-else>请选择访销周期</span>
                  </span>
                </p>
              </div>
              <div v-else>
                <p>
                  负&nbsp;&nbsp;责&nbsp;人：
                  <span v-if="baifnagYz.name != ''">{{baifnagYz.name || "暂无"}}</span>
                  <span v-else>
                    <el-input v-model="baifnagYz.contacts" placeholder="请输入内容" class="xinxitext"></el-input>
                  </span>
                </p>

                <p>
                  联系电话：
                  <span v-if="baifnagYz.mobile !=''">{{baifnagYz.mobile || "暂无"}}</span>
                  <el-input
                    v-model="baifnagYz.phone_no"
                    placeholder="请输入内容"
                    class="xinxitext"
                    v-else
                  ></el-input>
                </p>
                <p class="shop_address">
                  <!-- <el-popover
                    class="ellipsis" v-if="baifnagYz.address !=''"
                    placement="top-start"
                    title="标题"
                    width="200"
                    trigger="hover"
                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                    <el-button slot="reference">地址：{{baifnagYz.address || "暂无"}}</el-button>
                  </el-popover>-->
                  <span
                    class="ellipsis"
                    v-if="baifnagYz.address !=''"
                  >地址：{{baifnagYz.address || "暂无"}}</span>
                  <el-input
                    v-model="baifnagYz.shop_address"
                    placeholder="请输入内容"
                    class="xinxitext"
                    v-else
                  ></el-input>
                </p>
                <p>
                  访销周期：
                  <span v-if="baifnagYz.cycle != ''">
                    <span v-if="cyclestate">
                      <span class="selectCycle" @click="selectCycleFn">{{baifnagYz.cycle}}</span>
                    </span>
                    <span v-else>{{baifnagYz.cycle}}</span>
                  </span>
                  <span v-else>
                    <span v-if="names != ''">
                      <span class="selectCycle" @click="selectCycleFn">请选择访销周期</span>
                      <!-- <el-select></el-select> -->
                    </span>
                    <span v-else>暂无</span>
                  </span>
                </p>
              </div>

              <p>档位：{{level || "暂无"}}</p>
              <p>所属商圈：{{biz_dist || "暂无"}}</p>
              <p>功能区：{{func_area || "暂无"}}</p>

              <p>主导环境因子：{{main_poi || "暂无"}}</p>
              <p>三批平均价：{{strip || "暂无"}}元/条</p>
              <p>上一次拜访业务员：{{userid || "暂无"}}</p>
              <p>上一次拜访时间：{{sign_time || "暂无"}}</p>
              <div v-if="editState == false">
                <el-button
                  type="primary"
                  class="editBut"
                  v-if="names && (baifnagYz.name != '' && baifnagYz.mobile != '' && baifnagYz.cycle != ''&& baifnagYz.address != '')"
                  @click="editState = true"
                >编辑</el-button>

                <template v-else>
                  <div class="bcbut-div" v-if="names != ''">
                    <el-button @click="bcFnclose">取消</el-button>
                    <el-button type="primary" @click="bcFn">保存</el-button>
                  </div>
                </template>
              </div>
              <div v-else>
                <!-- <div class="bcbut-div" v-if="baifnagYz.name == '' && baifnagYz.mobile == '' && baifnagYz.cycle == ''"> -->
                <div class="bcbut-div">
                  <el-button @click="bcFnclose">取消</el-button>
                  <el-button type="primary" @click="bcFn">保存</el-button>
                </div>
              </div>
            </div>
          </div>
          <!-- 添加图片 -->
          <div class="picture">
            <div class="div-type-2">
              <!-- <ul class="imgdiv" v-if="item.imglist">
              <li v-for="(img,key) in item.imglist.img_lis" :key="key">
                <img :src="$apihost+'/'+img" alt="">
              </li>
              </ul>-->
              <p v-if="res.length > 0">
                <img :src="href+head_img" alt />
                <!-- <img :src="href+'/'+head_img" alt=""> -->
              </p>
            </div>
            <uploadImg :Dlicense="search" v-if="isrefresh"></uploadImg>
          </div>
        </div>
      </div>
      <div class="tabcont-item tabcont-2" v-if="tabactive == 2">
        <!-- <visit2> </visit2> -->
        <div class="mass1" v-loading="loading">
          <p class="name">
            <span class="span1"></span>
            <span>维护目标完成情况</span>
          </p>
          <tableTitleLeft
            :tableDatalist="tableData4"
            :leftList="leftdata"
            :type="1"
            :butshow="false"
          ></tableTitleLeft>
        </div>
      </div>
      <div class="tabcont-item tabcont-2" v-if="tabactive == 3">
        <!-- <visit3> </visit3> -->
        <div class="mass1">
          <p class="name">
            <span class="span1"></span>
            <span>拜访记录</span>
          </p>
          <!-- <hr> -->
          <div class="visitcontent">
            <div class="block">
              <span class="demonstration">开始时间：</span>
              <el-date-picker v-model="time1" type="date" placeholder="选择日期"></el-date-picker>
              <div style="margin-top:10px;">
                <span class="demonstration">结束时间：</span>
                <el-date-picker v-model="time2" type="date" placeholder="选择日期"></el-date-picker>
              </div>
              <div style="margin-top:10px;">
                <span class="demonstration">拜访类型：</span>
                <el-select
                  v-model="callOnValue"
                  clearable
                  filterable
                  size="mini"
                  style="width:4.5rem"
                >
                  <el-option
                    v-for="item in callOnList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                  ></el-option>
                </el-select>
                <el-button type="primary" size="mini" class="filter" @click="filter">查询</el-button>
              </div>
            </div>
            <el-table
              class="timetable"
              :data="tableData2"
              height="270"
              border
              style="width: 98%;margin:0 auto;"
            >
              <el-table-column type="index" align="center" label="序号"></el-table-column>
              <el-table-column align="center" label="客户名称" prop="shop_name"></el-table-column>
              <el-table-column prop="v_time" align="center" label="拜访日期"></el-table-column>
              <!-- <el-table-column prop="v_time" align="center" label="拜访时长"></el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
    </div>

    <!-- {{langnum}}---{{latnum}} -->

    <!-- <div class="mass1" v-loading="loading">
      <tableTitleLeft :tableDatalist="tableData4" :leftList="leftdata" :type="1" :butshow="false"><span
          slot="title">维护目标完成情况</span></tableTitleLeft>
    </div>-->

    <div class="botom-fix-div" v-if="!mass && loading == false">
      <el-button type="primary" @click="changePoint" v-if="changeState">移点</el-button>

      <el-button type="primary" @click="changePointBc" v-else-if="changeState">保存</el-button>
      <el-button type="primary" @click="changePoint2" v-if="changeStat2">移动当前位置</el-button>
      <el-button type="primary" @click="bfFn" :disabled="changeState ? false : true">拜访</el-button>
    </div>
    <alertcont :type="2" :datalist="cyclelist" @selectValue="selectValue" v-if="isshow"></alertcont>
  </div>
</template>
<script type="text/ecmascript-6">
import qs from "qs";
import onepath from "map/onepathnew";
import uploadImg from "com/uploadImg2.vue";
import tableTitleLeft from "com/tableTitleLeft.vue";
import { GetDistance } from "js/qqMap.js";
import { distanceNum } from "api/env.js";
import alertcont from "com/alert.vue";

export default {
  data() {
    return {
      isShowtf: true,
      callOnValue: "签到签退",
      callOnList:[
        {
          name: "签到签退",
          id: "1"
        },
        {
          name: "信息采集",
          id: "2"
        },
        {
          name: "调研问卷",
          id: "3"
        },
        {
          name: "活动执行",
          id: "4"
        }
      ],
      tablist: [
        {
          id: 1,
          name: "零售户信息",
          select: true
        },
        {
          id: 2,
          name: "维护目标",
          select: false
        },
        {
          id: 3,
          name: "拜访记录",
          select: false
        }
      ],
      tabactive: 1,
      isrefresh: true,
      place: "",
      res: "",
      href: "/",
      // href: 'http://192.168.1.3:8001/',
      search: "", //上传照片的零售户编码
      head_img: "",
      fullname: "放大",
      flag: false,
      changeStat2: false,
      cyclestate: false,
      editState: false,
      isshow: false,
      cyclelist: [
        {
          value: "周一",
          id: 1
        },
        {
          value: "周二",
          id: 2
        },
        {
          value: "周三",
          id: 3
        },
        {
          value: "周四",
          id: 4
        },
        {
          value: "周五",
          id: 5
        },
        {
          value: "周六",
          id: 6
        },
        {
          value: "周日",
          id: 7
        },
        {
          value: "关闭",
          id: 8
        }
      ],
      leftdata: [
        "品规",
        "年累计进货量",
        "目标量",
        "完成量",
        "上月完成量",
        "完成率"
      ],
      loading: false,
      mass: true,
      bizmass: false,
      shopmass: false,
      path: [],
      center: [],
      marker: [],
      pointData: [],
      name: "",
      func_area: "",
      func_area: "",
      main_poi: "",
      sign_time: "",
      userid: "",
      newName: "",
      accuqty: "",
      headerStyle: {
        "text-align": "center",
        color: "#404447"
      },
      avglevel: "",
      accuqtyrank: "",
      accustriprank: "",
      qtytrend: "",
      striptrend: "",
      biz_count: 0,
      lng: "",
      lat: "",
      tableData4: [],
      icon: {
        up: require("img/up.png"),
        mobile: require("img/junh.png"),
        down: require("img/down.png")
      },
      building1: "",
      building2: "",
      building3: "",
      accurank: "", //总排名
      biz_num: "",
      level: "",
      shop_num: "",
      biz_dist: "",
      strip: "",
      shop_address: "",
      shopname: "",
      cycle: "", //访销周期
      baifnagYz: {
        name: null,
        mobile: null,
        address: null,
        contacts: "",
        phone_no: "",
        shop_address: "",
        cycle: "",
        cycleval: "",
        baifnagYz: ""
      },
      lng: "",
      lat: "",
      names: "",
      langnum: "",
      latnum: "",
      code: 0,
      changecode: null,
      changeState: true,
      mapgetState: true, //默认进来点击
      to_add_lng: "116.397128",
      go_lng: "",
      to_add_lat: "39.916527",
      go_lat: "",
      startlng: "",
      startlat: "",
      codechange: null,
      timer: null,
      num: 0,
      myPosition: [],
      watchNum: 0,
      center_lng: "116.397128",
      center_lat: "39.916527",
      time1: "",
      time2: "",
      tableData2: [],
      fristposition: []
    };
  },
  components: {
    onepath,
    tableTitleLeft,
    alertcont,
    uploadImg
  },
  computed: {
    add() {
      let arr = [];
      if (this.building1) {
        arr.push(this.building1);
      }
      if (this.building2) {
        arr.push(this.building2);
      }
      if (this.building3) {
        arr.push(this.building3);
      }
      if (arr.length !== 0) {
        return arr.join(",");
      } else {
        return "";
      }
    }
  },

  created: function() {
    this.getdata();
  },
  mounted() {
    this.getdata();
    //  this.timer = setInterval( () => {
    //       // this.showWatchPosition();
    //  }, 60000)
  },
  beforeDestroy() {
    // this.timer = null
    // clearInterval(this.timer)
    // this.geolocation.clearWatch();
  },
  methods: {
    //拜访记录查询
    filter() {
      let vm = this;
      if (vm.time2 != null) {
        if (vm.time1 > vm.time2) {
          vm.$message.error("开始时间不能大于结束时间");
          console.log(vm.time2);
        }
      } else {
        vm.time2 = "";
      }

      let date_value1 = "";
      var date1 = new Date(vm.time1);
      date_value1 = this.dadeFn(date1);
      let date_value2 = "";
      var date2 = new Date(vm.time2);
      date_value2 = this.dadeFn(date2);
      console.log(date_value2);
      if (date_value2 == "1970-01-01") {
        date_value2 = "";
      }
      vm.$axios
        .get(
          `${this.$apihost}` +
            "/wechat/api/visitrecords/?v_time=" +
            date_value1 +
            "&e_time=" +
            date_value2 +
            "&type=" +
            this.callOnValue 
        )
        .then(function(response) {
          // console.log(response);
          vm.tableData2 = response.data.data;
        });
    },
    //拜访
    dadeFn(time) {
      var mymonth = time.getMonth() + 1;
      var myweekday = time.getDate();
      if (mymonth < 10) {
        mymonth = "0" + mymonth;
      }
      if (myweekday < 10) {
        myweekday = "0" + myweekday;
      }
      return time.getFullYear() + "-" + mymonth + "-" + myweekday;
    },
    //菜单
    tabFn(num) {
      this.tableData = [];
      this.tabactive = num;
      let array = this.tablist;
      for (let index = 0; index < array.length; index++) {
        if (num == array[index].id) {
          array[index].select = true;
        } else {
          array[index].select = false;
        }
      }
    },
    // 导航
    navigate() {
      this.startlng = JSON.parse(sessionStorage.getItem("position")).lng;
      this.startlat = JSON.parse(sessionStorage.getItem("position")).lat;
      console.log(this.startlng, this.startlat);
      let arr = [];
      arr.push(this.startlng, this.startlat);
      let arrs = [];
      let arr2 = [];
      arr2.push(this.go_lng, this.go_lat);
      arrs = arr.join(",");
      let arrs2 = [];
      arrs2 = arr2.join(",");
      // console.log(this.go_lng, this.go_lat);
      // console.log(arrs);
      window.location.href =
        "http://uri.amap.com/navigation?from=" +
        arrs +
        ",我的位置&to=" +
        arrs2 +
        "," +
        this.place +
        "&policy=1&src=mypage&coordinate=gaode&callnative=0";
      //  window.location.href = 'http://uri.amap.com/navigation?from=116.478346,39.997361,startpoint&to=116.3246,39.966577,endpoint&policy=1&src=mypage&coordinate=gaode&callnative=0'
    },
    // 放大缩小
    zoom() {
      this.flag = !this.flag;
      if (this.flag) {
        document.getElementById("onebox").style.height = "550px";
        this.fullname = "缩小";
      } else {
        document.getElementById("onebox").style.height = "300px";
        this.fullname = "放大";
      }
    },
    selectValue(item) {
      this.isshow = false;
      this.cyclestate = true;
      this.baifnagYz.cycle = item.id != 8 ? item.value : "";
      this.baifnagYz.cycleval = item.id != 8 ? item.value : "";
    },
    selectCycleFn() {
      this.isshow = true;
    },
    updataAddress() {
      //    this.level =  "";
      //   this.biz_dist =  "";
      //   this.func_area =  "";
      //  this.main_poi =  "";
      //  this.strip =  "";
      //  this.accuqty =  "";
      // this.shopname = ""
      // this.names = ""
      //  this.baifnagYz.name =  null
      //   this.baifnagYz.mobile = null
      //   this.baifnagYz.contacts = null
      //   this.baifnagYz.phone_no = null
      //    this.baifnagYz.cycle = ''

      this.mass = true;
      this.editState = false;
      this.codechange = null;
      this.changeState = true;
      // this.$refs.mychild.watchpostion("reset")
      // this.$refs.mychild.initMap("reset");
      this.$router.go(0);
      // this.$refs.mychild.showWatchPosition("reset")
    },
    changeMap(evt) {
      var e = window.event || evt;
      if (e.stopPropagation) {
        e.stopPropagation(); //阻止事件 冒泡传播
      } else {
        e.cancelBubble = true; //ie兼容
      }
      this.mapgetState = false;
      this.lng = evt.latLng.lng.toFixed(6);
      this.lat = evt.latLng.lat.toFixed(6);
    },
    changePointBc() {
      this.$confirm("您确定将此零售户坐标设置成当前选中坐标吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.lng + "------------" + this.lat)
          // console.log(this.code)
          this.changePointFn(this.lng, this.lat, this.code);
        })
        .catch(() => {});
    },

    changePoint() {
      this.changecode = this.code;
      this.changeState = false;
      // console.log(this.code)
      this.codechange = this.code;
      this.changeStat2 = true;
    },
    changePoint2() {
      // console.log(this.code);
      this.$confirm("您确定将此零售户坐标设置成当前选中坐标吗？", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(this.lng + "------------" + this.lat)
          // console.log(this.code)

          this.changePointFn2(this.lng, this.lat, this.code);
        })
        .catch(() => {});
    },
    changePointFn2(lng, lat, code) {
      // let lng = JSON.parse(sessionStorage.getItem("position")).lng
      // let lat = JSON.parse(sessionStorage.getItem("position")).lat
      // console.log(lng, lat);
      this.$axios
        .put(
          `${this.$apihost}` + "/wechat/api/shop_dot/" + code + "/",
          qs.stringify({
            add_lng: JSON.parse(sessionStorage.getItem("position")).lng,
            add_lat: JSON.parse(sessionStorage.getItem("position")).lat
          })
        )
        .then(response => {
          if (response) {
            // 客户查找跳转
            if (this.$route.query.type == 6) {
              let shop = JSON.parse(sessionStorage.getItem("shop_list"));
              this.marker = shop.map(value => {
                if (this.code == value.license) {
                  // console.log(this.lng + "------------" + this.lat)
                  value.add_lat = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lat;
                  value.add_lng = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lng;
                  value.add[0] = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lng;
                  value.add[1] = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lat;
                }
                return value;
              });
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              this.getdata();
              //  console.log(this.to_add_lat + "----" + this.to_add_lng)
              sessionStorage.setItem("shop_list", JSON.stringify(this.marker));
            } else if (this.$route.query.type == 7) {
              let shop = JSON.parse(sessionStorage.getItem("shop_list2"));
              this.marker = shop.map(value => {
                if (this.code == value.license) {
                  // console.log(this.lng + "------------" + this.lat)
                  value.add_lat = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lat;
                  value.add_lng = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lng;
                  value.add[0] = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lng;
                  value.add[1] = JSON.parse(
                    sessionStorage.getItem("position")
                  ).lat;
                }
                return value;
              });
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              this.getdata();
              //  console.log(this.to_add_lat + "----" + this.to_add_lng)
              sessionStorage.setItem("shop_list2", JSON.stringify(this.marker));
            } else {
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              // console.log(this.to_add_lat + "----" + this.to_add_lng)
              this.getdata();
            }
            // 作战指南跳转
            // if (this.$route.query.type == 7) {
            //   let shop = JSON.parse(sessionStorage.getItem("shop_list2"))
            //   this.marker = shop.map((value) => {
            //     if (this.code == value.license) {
            //       // console.log(this.lng + "------------" + this.lat)
            //       value.add_lat = JSON.parse(sessionStorage.getItem("position")).lat
            //       value.add_lng = JSON.parse(sessionStorage.getItem("position")).lng
            //       value.add[0] = JSON.parse(sessionStorage.getItem("position")).lng
            //       value.add[1] = JSON.parse(sessionStorage.getItem("position")).lat
            //     }
            //     return value
            //   })
            //   this.to_add_lat = response.data.add_lat
            //   this.to_add_lng = response.data.add_lng
            //   this.getdata()
            //   //  console.log(this.to_add_lat + "----" + this.to_add_lng)
            //   sessionStorage.setItem("shop_list2", JSON.stringify(this.marker))
            // } else {
            //   this.to_add_lat = response.data.add_lat
            //   this.to_add_lng = response.data.add_lng
            //   // console.log(this.to_add_lat + "----" + this.to_add_lng)
            //   this.getdata()
            // }
            this.changeState = true;
            this.codechange = null; //所有maker都不能移动
          } else {
            this.$message.error("修改失败，请稍后重试！！");
          }
        });
    },
    changePointFn(lng, lat, code) {
      this.$axios
        .put(
          `${this.$apihost}` + "/wechat/api/shop_dot/" + code + "/",
          qs.stringify({
            add_lng: lng,
            add_lat: lat
          })
        )
        .then(response => {
          if (response) {
            // 客户查找跳转过来
            if (this.$route.query.type == 6) {
              let shop = JSON.parse(sessionStorage.getItem("shop_list"));
              this.marker = shop.map(value => {
                if (this.code == value.license) {
                  // console.log(this.lng + "------------" + this.lat)
                  value.add_lat = this.lat;
                  value.add_lng = this.lng;
                  value.add[0] = this.lng;
                  value.add[1] = this.lat;
                }
                return value;
              });
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              this.getdata();
              //  console.log(this.to_add_lat + "----" + this.to_add_lng)
              sessionStorage.setItem("shop_list", JSON.stringify(this.marker));
            } else {
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              // console.log(this.to_add_lat + "----" + this.to_add_lng)
              this.getdata();
            }
            // 作战指南跳转过来
            if (this.$route.query.type == 7) {
              let shop = JSON.parse(sessionStorage.getItem("shop_list2"));
              this.marker = shop.map(value => {
                if (this.code == value.license) {
                  // console.log(this.lng + "------------" + this.lat)
                  value.add_lat = this.lat;
                  value.add_lng = this.lng;
                  value.add[0] = this.lng;
                  value.add[1] = this.lat;
                }
                return value;
              });
              // console.log(response.data);
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              this.getdata();
              //  console.log(this.to_add_lat + "----" + this.to_add_lng)
              sessionStorage.setItem("shop_list2", JSON.stringify(this.marker));
            } else {
              this.to_add_lat = response.data.add_lat;
              this.to_add_lng = response.data.add_lng;
              // console.log(this.to_add_lat + "----" + this.to_add_lng)
              this.getdata();
            }

            this.changeState = true;
            this.codechange = null; //所有maker都不能移动
          } else {
            this.$message.error("修改失败，请稍后重试！！");
          }
        });
    },
    getdata() {
      // console.log("拜访日志首页")
      if (this.$route.query.type != 6) {
        // this.emptydataFn()
      }
      this.loading = true;
      var vm = this;
      -vm.$axios
        .get(`${this.$apihost}` + "/wechat/api/mydomain/")
        .then(response => {
          console.log(response);
          this.loading = false;
          this.changeState = true;
          // vm.fristposition = response.data.result[0].add

          //判断是否从客户查找页面跳转过来
          if (this.$route.query.type == 6) {
            this.marker = JSON.parse(sessionStorage.getItem("shop_list"));
            if (this.marker.length == 0) {
              this.marker = response.data.result;
            }
            console.log(this.marker);
            // this.marker.push();
            // this.marker.push({
            //   path:[],
            //   add:[],
            //   center:[],
            //   color:1
            // })
          } else if (this.$route.query.type == 7) {
            this.marker = JSON.parse(sessionStorage.getItem("shop_list2"));
            // this.marker.add
            // console.log(this.marker.add)
            // console.log(JSON.parse(sessionStorage.getItem("shop_list2")))
            // this.marker = Array.from(JSON.parse(sessionStorage.getItem("shop_list2")))
            // console.log(this.marker);

            // this.marker.push({
            //   path: [],
            //   add:[JSON.parse(sessionStorage.getItem("shop_list2")).add_lng,JSON.parse(sessionStorage.getItem("shop_list2")).add_lat],
            //   center:[JSON.parse(sessionStorage.getItem("shop_list2")).center[0],JSON.parse(sessionStorage.getItem("shop_list2")).center[1]],
            //   color: 1,
            //   accuqty:JSON.parse(sessionStorage.getItem("shop_list2")).accuqty,
            //   contacts:JSON.parse(sessionStorage.getItem("shop_list2")).contacts,
            //   func_area:JSON.parse(sessionStorage.getItem("shop_list2")).func_area,
            //   level:JSON.parse(sessionStorage.getItem("shop_list2")).level,
            //   main_poi:JSON.parse(sessionStorage.getItem("shop_list2")).main_poi,
            //   phone_no:JSON.parse(sessionStorage.getItem("shop_list2")).phone_no,
            //   strip:JSON.parse(sessionStorage.getItem("shop_list2")).strip,
            //   biz_dist:JSON.parse(sessionStorage.getItem("shop_list2")).biz_dist,
            //   license:JSON.parse(sessionStorage.getItem("shop_list2")).license,
            //   shop_name:JSON.parse(sessionStorage.getItem("shop_list2")).shop_name
            // });
            // vm.langnum=JSON.parse(sessionStorage.getItem("shop_list2")).add_lng
            // vm.latnum=JSON.parse(sessionStorage.getItem("shop_list2")).add_lat
            // console.log();
            //  this.marker.push({
            //      path: [],
            //     add: [vm.langnum, vm.latnum],
            //     center: [vm.langnum, vm.latnum],
            //     color: 4
            //   });
            // console.log(this.marker, "00000000000000000000");
          } else {
            this.marker = response.data.result;
            vm.path = response.data.path;
          }
          //判断是否从作战指南页面跳转过来
          // if (this.$route.query.type == 7) {
          //   this.marker = JSON.parse(sessionStorage.getItem("shop_list2"));
          //   this.marker.push({
          //     path: [],
          //     add: [vm.langnum, vm.latnum],
          //     center: [vm.langnum, vm.latnum],
          //     color: 4
          //   })
          // } else {
          //   this.marker = response.data.result;
          //   // vm.path = response.data.path;
          // }
          // console.log(this.to_add_lng, vm.langnum, vm.langnum);
          if (vm.langnum && vm.latnum) {
            // console.log("00000000000000");
            this.to_add_lng = vm.langnum;
            this.to_add_lat = vm.latnum;

            //           this.myPosition = this.myPosition.concat({
            //             path:[],
            //             add:[vm.langnum,vm.latnum],
            //             center:[vm.langnum,vm.latnum],
            //             color:4
            //           })
            //           this.watchNum ++
          }
          vm.biz_count = response.data.result.length;
          // vm.level = response.data.top_data.level;
          // vm.biz_num = response.data.top_data.biz_num;
          // vm.shop_num = response.data.top_data.shop_num;
          let array = response.data.bot_data;
          // console.log(array)
          let arraynew = [];
          if (array.length > 0) {
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
          } else {
            arraynew.push(
              Object.assign(
                {},
                {
                  name: "暂无数据",
                  // product_id:array[index].product_id,
                  // modelvalue1:array[index].advance_order,
                  // modelvalue2:array[index].stock,
                  // modelvalue3:array[index].demand,
                  value: {
                    accuqty: "暂无数据",
                    accuqty2: "暂无数据",
                    accuqty3: "暂无数据",
                    accuqty4: "暂无数据",
                    accuqty5: "暂无数据"
                  }
                }
              )
            );
          }
          vm.tableData4 = arraynew;
          // console.log(this.to_add_lng, "===================");
        });
    },
    bcFnclose() {
      this.baifnagYz.name = "";
      this.baifnagYz.mobile = "";
      this.baifnagYz.address = "";
      this.baifnagYz.contacts = "";
      this.baifnagYz.phone_no = "";
      this.baifnagYz.shop_address = "";
      this.baifnagYz.cycle = "";
    },
    emptydataFn() {
      //清空输入数据
      this.baifnagYz.name = null;
      this.baifnagYz.mobile = null;
      this.baifnagYz.address = null;
      this.baifnagYz.contacts = null;
      this.baifnagYz.phone_no = null;
      this.baifnagYz.shop_address = null;
      this.baifnagYz.cycle = "";
    },
    bcFn() {
      if (this.editState == false) {
        this.baifnagYz.contacts = this.baifnagYz.name
          ? this.baifnagYz.name
          : this.baifnagYz.contacts;
        this.baifnagYz.phone_no = this.baifnagYz.mobile
          ? this.baifnagYz.mobile
          : this.baifnagYz.phone_no;
        this.baifnagYz.shop_address = this.baifnagYz.address
          ? this.baifnagYz.address
          : this.baifnagYz.shop_address;
        this.baifnagYz.cycleval = this.baifnagYz.cycle
          ? this.baifnagYz.cycle
          : this.baifnagYz.cycleval;

        if (this.baifnagYz.contacts == "") {
          this.$message({
            message: "请填写负责人！",
            type: "warning"
          });
          return false;
        } else if (this.baifnagYz.phone_no == "") {
          this.$message({
            message: "请填写手机号！",
            type: "warning"
          });
          return false;
        } else if (this.baifnagYz.cycleval == "") {
          this.$message({
            message: "请选择访销周期！",
            type: "warning"
          });
          return false;
        } else if (this.baifnagYz.shop_address == "") {
          this.$message({
            message: "请填写地址！",
            type: "warning"
          });
          return false;
        }
      } else {
        if (this.baifnagYz.name == "") {
          this.$message({
            message: "请填写负责人！",
            type: "warning"
          });
          return false;
        } else if (this.baifnagYz.mobile == "") {
          this.$message({
            message: "请填写手机号！",
            type: "warning"
          });
          return false;
        } else if (this.baifnagYz.cycle == "") {
          this.$message({
            message: "请选择访销周期！",
            type: "warning"
          });
          return false;
        } else if (this.baifnagYz.address == "") {
          this.$message({
            message: "请填写地址！",
            type: "warning"
          });
          return false;
        }
      }

      // console.log(this.baifnagYz);

      this.$axios
        .post(`${this.$apihost}` + "/wechat/api/visitshop/", {
          license: this.code,
          contacts: this.editState
            ? this.baifnagYz.name
            : this.baifnagYz.contacts,
          phone_no: this.editState
            ? this.baifnagYz.mobile
            : this.baifnagYz.phone_no,
          shop_address: this.editState
            ? this.baifnagYz.address
            : this.baifnagYz.shop_address,
          cycle: this.editState ? this.baifnagYz.cycle : this.baifnagYz.cycleval
        })
        .then(response => {
          if (response.data == "请求成功") {
            this.$message({
              message: "信息保存成功！！",
              type: "success",
              onClose: () => {
                // console.log("信息保存成功回调")
                this.baifnagYz.name = this.baifnagYz.name
                  ? this.baifnagYz.name
                  : this.baifnagYz.contacts;
                this.baifnagYz.mobile = this.baifnagYz.mobile
                  ? this.baifnagYz.mobile
                  : this.baifnagYz.phone_no;
                this.baifnagYz.cycle = this.baifnagYz.cycle
                  ? this.baifnagYz.cycle
                  : this.baifnagYz.cycleval;
                this.baifnagYz.address = this.baifnagYz.address
                  ? this.baifnagYz.address
                  : this.baifnagYz.shop_address;
                this.cyclestate = false;
                this.editState = false;
                // console.log(this.baifnagYz);

                // this.bfFn(1);跳转拜访日志功能
              },
              offset: "330"
            });

            // let obj = {
            //       lng : this.lng,
            //       lat : this.lat
            //     }
            //     setTimeout(this.$emit("tabcontShowFn",  this.code,obj),1000)
          }
        });
    },
    latlngClickFn(lng, lat) {
      this.langnum = lng;
      this.latnum = lat;
      console.log(lng, lat);
      this.lng = lng;
      this.lat = lat;
      // this.lng = "116.470351"
      // this.lat = "39.929802"
      // console.log("通过获取当前位置，获取地图坐标maker")
      this.getdata();
    },
    bfFn(type) {
      // console.log(this.baifnagYz, this.langnum);
      // if(this.editState == false){
      //     this.baifnagYz.mobile = this.baifnagYz.phone_no ? this.baifnagYz.phone_no : ""
      //     this.baifnagYz.name = this.baifnagYz.contacts ? this.baifnagYz.contacts : ""
      //     this.baifnagYz.cycle = this.baifnagYz.cycle ? this.baifnagYz.cycle : ""
      // }
      // console.log(this.editState)

      if (
        this.baifnagYz.mobile == "" &&
        this.baifnagYz.name == "" &&
        this.baifnagYz.cycle == "" &&
        this.baifnagYz.address == ""
      ) {
        this.$message({
          message: "请填写您的信息！",
          type: "warning"
        });
      } else {
        //判断当前烟草证号值是否相等并且是否在约定的距离之内
        //  this.$axios.get(`${this.$apihost}`+"/wechat/api/distanceshop/?add_lng="+ this.lng + "&add_lat=" + this.lat+ '&time=' + new Date().getTime() ).then((result) => {
        //       if(result.data){
        //           if(result.data.license == this.code){
        //                     if( result.data.distance < 100){
        //                           let obj = {
        //                             lng : this.lng,
        //                             lat : this.lat
        //                           }
        //                           this.$emit("tabcontShowFn",  this.code,obj);
        //                     }else{
        //                       this.$message({
        //                         message: '对不起，您选择的零售户距离不在预约之内！',
        //                         type: 'error'
        //                       });
        //                     }
        //           }else{
        //              this.$message({
        //                 message: '对不起，只能拜访据您最近得零售户！',
        //                 type: 'error'
        //               });
        //           }
        //       }
        //  })

        //计算两点坐标之间的距离
        console.log(this.lat); //当前定位坐标
        // this.to_add_lng = this.langnum;
        //   this.to_add_lat = this.latnum;
        console.log(this.lat, this.to_add_lat);
        // this.to_add_lng=JSON.parse(sessionStorage.getItem("position")).lng
        // this.to_add_lat=JSON.parse(sessionStorage.getItem("position")).lat
        console.log(this.to_add_lat + "--------" + this.to_add_lng);
        let distance = GetDistance(
          this.lat,
          this.lng,
          this.to_add_lat,
          this.to_add_lng
        );
        //distanceNum   距离范围
        console.log(distanceNum);
        console.log(distance);
        if (distance * 1000 <= distanceNum) {
          // console.log("可以拜访")
          let obj = {
            lng: this.lng,
            lat: this.lat
          };
          this.$emit("tabcontShowFn", this.code, obj);
        } else {
          // console.log("无法拜访")
          if (type == 1) {
            // console.log(11111111111)
            this.$message({
              message: "对不起，您选择的零售户距离不在预约之内！",
              type: "error",
              onClose: () => {
                // this.$router.go(0)
              }
            });
          } else {
            // console.log(2222222)
            this.$message({
              message: "对不起，您选择的零售户距离不在预约之内！",
              type: "error"
            });
          }
        }
      }
    },
    latlngClick(lng, lat) {
      // console.log(lng);
      // console.log(lat);

      var vm = this;
      vm.$axios
        .post(`${this.$apihost}` + "/wechat/api/query_dist/", {
          lat: lat,
          lng: lng
        })
        .then(function(response) {
          vm.path = response.data.biz_list;
          // console.log(response.data.biz_list);
          vm.marker = [lng, lat];
          // vm.path.push(response.data.biz)
          vm.name = response.data.biz_dist;
          vm.biz_count = response.data.biz_list.length;
          // console.log(response.data);
        });
    },
    shopClick(code, name, obj) {
      // console.log(obj.add_lng + "----" + obj.add_lat)
      console.log(code, name, obj);
      var vm = this;
      //  vm.level = obj.level;
      //   vm.biz_dist = obj.biz_dist;
      //   vm.func_area = obj.func_area;
      //   vm.main_poi = obj.main_poi;
      //   vm.sign_time = response.data.shop_info.sign_time;
      //   vm.userid = response.data.shop_info.userid;
      //   vm.strip = response.data.shop_info.strip;
      //   vm.shop_address = response.data.shop_info.shop_address;
      //   vm.accuqty = response.data.shop_info.accuqty;
      //   vm.shopname = response.data.shop_info.biz_dist;
      vm.isrefresh = vm.isrefresh ? false : true;
      vm.$nextTick(function() {
        vm.isrefresh = vm.isrefresh ? false : true;
        //  回显照片
        vm.$axios
          .get(`${this.$apihost}` + "/wechat/api/head_img/?search=" + code)
          .then(function(response) {
            console.log(response);
            vm.res = response.data;
            if (response.data.length > 0) {
              console.log(vm.res);
              console.log(response.data[0].head_img);
              vm.head_img = response.data[0].head_img;
            }
          });
      });

      try {
        if (this.code != code) {
          // console.log(obj) //当前选中的点
          //清空数据
          this.emptydataFn();

          this.cyclestate = false;
          this.editState = false;
          this.codechange = null;
          this.changeState = true;
          // console.log(add)
          // console.log(code)

          vm.baifnagYz.mobile = "";
          vm.baifnagYz.name = "";
          vm.baifnagYz.address = "";
          vm.baifnagYz.cycle = "";

          vm.loading = true;
          vm.names = name;
          vm.place = name;
          vm.code = code;
          vm.search = code;
          vm.go_lng = obj.add_lng;
          vm.go_lat = obj.add_lat;
          console.log(vm.go_lng, vm.go_lat);
          vm.to_add_lng = obj.add_lng;
          vm.to_add_lat = obj.add_lat;
          // console.log("点击了----"+vm.code )

          vm.bizmass = false;
          vm.mass = false;
          vm.shopmass = true;
          vm.$axios
            .get(
              `${this.$apihost}` +
                "/wechat/api/myshop/?license=" +
                code +
                "&time=" +
                new Date().getTime()
            )
            .then(function(response) {
              console.log(response);
              vm.loading = false;
              vm.level = response.data.shop_info.level;
              vm.biz_dist = response.data.shop_info.biz_dist;
              vm.func_area = response.data.shop_info.func_area;
              vm.main_poi = response.data.shop_info.main_poi;
              vm.sign_time = response.data.shop_info.sign_time;
              vm.userid = response.data.shop_info.userid;
              vm.strip = response.data.shop_info.strip;
              vm.shop_address = response.data.shop_info.shop_address;
              vm.accuqty = response.data.shop_info.accuqty;
              vm.shopname = response.data.shop_info.biz_dist;
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

              //负责人手机号姓名验证
              vm.baifnagYz.mobile = response.data.shop_info.phone_no;
              vm.baifnagYz.address = response.data.shop_info.shop_address;
              vm.baifnagYz.name = response.data.shop_info.contacts;
              vm.baifnagYz.cycle = response.data.shop_info.cycle;

              //  vm.baifnagYz.mobile =  "111"
              // vm.baifnagYz.name =  "1111"
            });
        }
      } catch (error) {
        console.log("方法、语法报错！！");
      }
    }
  }
};
</script>

<style scoped>
.visitcontent {
  background: #ccc;
  padding-top: 10px;
  margin-top: 10px;
  margin-left: 10px;
}
.filter {
  margin-left: 20px;
}
.block {
  margin-left: 15px;
  margin-bottom: 10px;
}
.shop_address {
  display: flex;
}
.ellipsis {
  /* width: 100%; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
}
.basic {
  background: #ccc;
  padding: 10px;
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
  border: none;
}

.picture {
  margin-left: 170px;
}

.blowup {
  margin-left: 330px;
}
.name {
  font-weight: 500;
  font-size: 23px;
  border-bottom: 1px solid #ccc;
}
.span1 {
  display: inline-block;
  margin: 0 10px -2px 0;
  height: 20px;
  border: solid 1.5px #409eff;
  line-height: 20px;
  background: #409eff;
}
.div-type-2 {
  text-align: center;
  padding-bottom: 15px;
  padding-top: 15px;
}

.div-type-2 p {
  width: 50%;
}

.div-type-2 p img {
  width: 100%;
}

.imgdiv {
  padding: 15px;
}

.imgdiv img {
  width: 50%;
}

/* .updata-address {
  width: 35px;
  height: 35px;
  display: inline-block;
  vertical-align: middle;
  background: url("./img/target.png") no-repeat center center;
  background-size: 115% 115%;
} */

.editBut {
  position: absolute;
  right: 10px;
  bottom: 0px;
}

.selectCyclediv {
  height: 100%;
}

.selectCycle {
  width: 160px;
  height: 35px;
  line-height: 35px;
  padding-left: 10px;
  border: 1px solid #dddddd;
  display: inline-block;
  vertical-align: middle;
}

.bcbut-div {
  margin: 10px 0;
  text-align: center;
}

.bcbut-div button {
  width: 120px;
}

.bcbut-div button:first-child {
  margin-right: 20px;
}

.xinxitext {
  width: 160px;
}

.onebox {
  width: 100%;
  height: 350px;
  padding-top: 10px;
}

#onebox {
  width: 100%;
  height: 300px;
}

.messagetable {
  /* padding: 0.1rem 0.4rem 0 0; */
  margin: 10px auto;
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
  margin-top: 0;
}

.content {
  margin-left: 20px;
  /* margin-bottom: 20px; */
  position: relative;
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
</style>
