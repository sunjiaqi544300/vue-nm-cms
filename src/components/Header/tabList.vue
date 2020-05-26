<template>
  <div class="page">
    <div class="nav">
      <div class="above">
        <router-link
          :to="item.path"
          class-active="active"
          class="rous"
          tag="div"
          v-for="(item,index) in tablist.slice(0,3)"
          :key="index"
        >
          <span @click="visit(item)">
            <img :src="item.icon" alt @click="chenageColor" />
            <el-badge :value="num" class="item" v-if="item.name=='作战指南'" :hidden="boolean">
              <span>{{item.name}}</span>
            </el-badge>
            <span v-else>{{item.name}}</span>
          </span>
        </router-link>
      </div>
      <div class="below">
        <router-link
          :to="item.path"
          class-active="active"
          class="rous"
          tag="div"
          v-for="(item,index) in tablist.slice(3,6)"
          :key="index"
        >
          <img :src="item.icon" alt @click="chenageColor" />
          <span>{{item.name}}</span>
        </router-link>
      </div>
    </div>
    <div class="luyou">
      <router-view></router-view>
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>-->
      <div id="allMap"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import AMap from "AMap";
import { coordinateFn } from "@/assets/js/qqMap.js";
export default {
  data() {
    return {
      boolean: false,
      num: "",
      sginoff: "",
    };
  },
  components: {},
  computed: {
    tablist() {
      return this.$store.state.tablist;
    }
  },
  created() {},
  mounted() {
    this.getMyLocation();
    //定时器 请求位置
    const timer = setInterval(() => {
      this.getMyLocation();
    }, 300000);
    this.$once('hook:beforeDestroy', () => {    
       //如果定时器还在运行 或者直接关闭，不用判断        
        clearInterval(timer);                                    
    })
    // console.log(JSON.parse(sessionStorage.getItem("numlength")));
    this.num = JSON.parse(sessionStorage.getItem("numlength"));
  },
  beforeDestroy() {
     
  },
  methods: {
    getMyLocation() {
      var _this = this;
      var mapObj = new AMap.Map("allmap");
      mapObj.plugin("AMap.Geolocation", function() {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认:true
          timeout: 1000, // 超过10秒后停止定位，默认：无穷大
          maximumAge: 0, // 定位结果缓存0毫秒，默认：0
          convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, // 显示定位按钮，默认：true
          buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
          buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
          showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
        mapObj.addControl(geolocation);
        geolocation.getCurrentPosition(function(status, result) {
          if (status == "complete") {
            console.log("高德地图");
            _this.$axios.post(`${_this.$apihost}` + "/wechat/api/user_locus/", {
              lat: result.position.lat.toFixed(6),
              lng: result.position.lng.toFixed(6),
              address: result.formattedAddress
            });
          } else {
            console.log();
          }
        });
      });
    },
    visit(item) {
      if (item.path == "/home/inventory2") {
        // console.log("000");
        this.boolean = true;
      }
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    chenageColor() {
      // this.colors=="colors"
    }
  }
};
</script>
 
<style lang="less">
.above,
.below {
  display: flex;
}

a {
  text-decoration: none;
  color: black;
}

.nav {
  width: 100%;
  font-size: 0.3rem;
  // margin-top: 0.2rem;
}

.rous {
  flex: 1;
  display: inline-block;
  border-right: solid 1px #dddddd;
  padding: 8px 5px 8px 20px;
}

.rous span {
  font-size: 18px;
  display: inline-block;
  vertical-align: middle;
}

.rous img {
  display: inline-block;
  vertical-align: middle;
  width: 35px;
  height: 35px;
  margin-right: 6px;
}

.above,
.below {
  border-bottom: #dddddd 1px solid;
}

.above :last-child {
  border: none;
}

.below :last-child {
  border: none;
}

//  .rous1:active{
//    background: #3D8EEF;
//  }
// .rous2:active{
//    background: #3D8EEF;
//  }
// .rous3:active{
//    background: #3D8EEF;
//  }
//  .router-link-class{
//    background: #3D8EEF;
//  }
.router-link-active {
  background: #c8e1ff;
}
</style>
