<template>
  <div class="qqMap" :id="qqMap" v-loading="loading" element-loading-text="正在获取当前位置..."></div>
</template>
<script type="text/ecmascript-6">
import gcoord from "gcoord";
import { TMap } from "js/qqMap.js";
export default {
  name: "qqMap",
  props: [
    "path",
    "marker",
    "point",
    "pathClickState",
    "licenseData",
    "to_add_lng",
    "to_add_lat",
    "panTo",
    "watchState",
    "licenselist",
    "fristposition"
  ],
  data() {
    return {
      qqMap: Math.random()
        .toString(36)
        .substr(2),
      color: {
        居住场所: "#f3282b",
        交通枢纽: "#FFDD00",
        办公场所: "#0dccbb",
        旅游景区: "#a532cc",
        住宿场所: "#FF628C",
        购物场所: "#018fcc",
        教育文化: "#26cc3e",
        医疗服务: "#00cbe6",
        餐饮服务: "#FF9D00",
        休闲娱乐: "#86C166",
        自身: "#FF4252",
        竞品: "#549CF2",
        烟草: "#E95050"
      },
      img: {
        red: require("../img/1.png"),
        yellow: require("../img/2.png"),
        green: require("../img/3.png"),
        addressing: require("../img/address-ing.png")
      },
      // longitude: "116.397128", //经度,
      // latitude: "39.916527", //纬度
      longitude: "", //经度,
      latitude: "", //纬度
      city: "",
      getmaps: false,
      map: null,
      loading: true,
      timer: null,
      statenum: 0,
      markers: null,
      markersArray: [],
      zoomchange: true,
      geolocation: new qq.maps.Geolocation(
        "CKVBZ-CYKCS-5RTO3-66V5S-JECW5-UGBSV",
        "定位"
      ),
      timesNum: 0,
      watchNum: 0,
      myPosition: [],
      evt: null,
      info: null,
      updatetype: null, ///更新位置的类型  //
      firsttimes: true
    };
  },
  components: {},
  watch: {
    path: function() {
      this.drawMap();
    },
    marker: function() {
      if (this.map != null) {
        this.drawMap(this.map.getZoom());
      } else {
        this.drawMap();
      }
    },
    point: function() {
      this.drawMap();
    },
    fristposition: function() {
      this.drawMap();
    },
    licenseData: function() {
      // console.log(this.licenseData  + "改变了id")
      this.markerFnclear();
    },
    watchNum() {
      // console.log(this.myPosition)
      //  this.setMap()
      //  if(this.watchState){
      //       this.setMap()
      //   }
    },
    timesNum() {
      if (this.timesNum == 1) {
      }
    },
    alertObj: {
      deep: true,
      handler: function(newVal, oldVal) {
        this.info.close();
        this.alertFn(this.evt);
      }
    }
  },
  created() {
    // this.getMyLocation();
    // this.drawMap();
    this.getMyLocation();
  },
  mounted() {
    console.log(this.fristposition);
    //  this.timer = setInterval( () => {
    //       this.showWatchPosition();
    //  }, 6000)
  },
  destroyed() {
    this.map = null;
    this.evt = null;
    this.info = null;
  },
  beforeDestroy() {
    // clearInterval(this.timer)
    this.timer = null;
    this.geolocation.clearWatch();
    this.geolocation = null;
  },
  methods: {
    alertFn(evt) {
      console.log(evt);
      // let vm = this;
      //添加到提示窗
      this.info.open();
      // info.open();
      this.info.setContent("我被选中");
      this.info.setPosition(evt.latLng);
    },
    watchpostion() {
      var loc;
      var isMapInit = false;
      //监听定位组件的message事件
      window.addEventListener(
        "message",
        function(event) {
          loc = event.data; // 接收位置信息
          console.log("location", loc);

          if (loc && loc.module == "geolocation") {
            //定位成功,防止其他应用也会向该页面post信息，需判断module是否为'geolocation'
            var markUrl =
              "https://apis.map.qq.com/tools/poimarker" +
              "?marker=coord:" +
              loc.lat +
              "," +
              loc.lng +
              ";title:我的位置;addr:" +
              (loc.addr || loc.city) +
              "&key=your key&referer=myapp";
            //给位置展示组件赋值
            console.log(markUrl);
            // document.getElementById('markPage').src = markUrl;
          } else {
            //定位组件在定位失败后，也会触发message, event.data为null
            console.log("定位失败");
          }

          /* 另一个使用方式
            if (!isMapInit && !loc) { //首次定位成功，创建地图
                isMapInit = true;
                createMap(event.data);
            } else if (event.data) { //地图已经创建，再收到新的位置信息后更新地图中心点
                updateMapCenter(event.data);
            }
          */
        },
        false
      );
      //为防止定位组件在message事件监听前已经触发定位成功事件，在此处显示请求一次位置信息
      console.log(document.getElementById(this.qqMap).contentWindow);
      // document.getElementById(this.qqMap).contentWindow.postMessage('getLocation', '*');

      //设置6s超时，防止定位组件长时间获取位置信息未响应
      setTimeout(function() {
        if (!loc) {
          //主动与前端定位组件通信（可选），获取粗糙的IP定位结果
          document
            .getElementById(this.qqMap)
            .contentWindow.postMessage("getLocation", "*");
        }
      }, 6000); //6s为推荐值，业务调用方可根据自己的需求设置改时间，不建议太短
    },
    showWatchPosition(type) {
      //监听当前位置的变化
      // if(type){
      //     this.statenum = 0
      // }
      // 请求接口


      console.log('开始监听位置')

      console.log(type,'监听位置中1111111111111')
      this.updatetype = type == "reset" ? true : false;
      // this.loading = true
      console.log("监听当前位置的变化");
      // this.center_lat = this.lat
      // this.center_lng = this.lng
      let vm = this;
      this.geolocation.watchPosition(this.locationWatchSuccess);
    },
    locationWatchSuccess(position) {
      //监听当前位置的变化 成功回调
      // this.num = this.num + 0.0008
      //  this.loading = false
      console.log("当前地理位置监测成功");
      // console.log(position)
      // this.watchNum ++
      this.center_lat = position.lat;                                                  
      this.center_lng = position.lng;                                                                                                                             
                                                                                                                                                                                                                                                                                                                                             
      this.myPosition = this.myPosition[this.myPosition.length - 1];
      let arraynew = [];
      arraynew.push(this.myPosition[this.myPosition.length - 1]);
      this.myPosition = arraynew.map(val => {
        return {
          color: 4,
          add: [position.lng, position.lat],
          center: [position.lng, position.lat],
          path: []
        };
      });
      this.setMap();
    },
    markerFnclear() {
      //  console.log(this.map.getZoom() + "当前地图缩放等级-----")
      let vm = this;
      if (this.markersArray) {
        for (let index = 0; index < this.markersArray.length; index++) {
          this.markersArray[index].setMap(null);
        }
      }
      this.zoomchange = false;

      this.drawMap(this.map.getZoom());
    },
    pathFn() {
      let vm = this;
      if (vm.path !== []) {
        for (let i = 0; i < vm.path.length; i++) {
          let innerPath = [];
          innerPath.color = vm.path[i].func_area || "";
          innerPath.name = vm.path[i].biz_dist || "";
          innerPath.center = vm.path[i].center || "";
          for (let j = 0; j < vm.path[i].path.length; j++) {
            //   if(vm.path[i].path === vm.path[i].path){
            //         vm.path[i].splice(i,1)
            // }
            // 将BD坐标转换为QQ坐标
            // let result = gcoord.transform(
            //   [vm.path[i].path[j][1] - 0 + 0.000674, vm.path[i].path[j][0] - 0.000452],
            //   gcoord.BMap, gcoord.GCJ02)
            let result = [vm.path[i].path[j][1], vm.path[i].path[j][0]];
            // console.log(result)
            innerPath.push(new qq.maps.LatLng(result[0], result[1]));
          }
          //  vm.map.zoomTo(17)
          let polygon = new qq.maps.Polygon({
            path: innerPath,
            strokeColor: vm.color[innerPath.color] || "#cccccc",
            strokeWeight: 1,
            fillColor: qq.maps.Color.fromHex(
              vm.color[innerPath.color] || "#cccccc",
              0.3
            ),
            map: vm.map
          });
          //商圈点击事件
          polygon.name = innerPath.name;
          polygon.center = innerPath.center;

          if (vm.pathClickState != false) {
            qq.maps.event.addListener(polygon, "click", function() {
              vm.$emit("pathClick", this.name, this.center);
            });
          }
          vm.map.zoomTo(12);
          //  vm.map.panTo(new qq.maps.LatLng(vm.path[i].center[1], vm.path[i].center[0]));
        }
      }
    },
    markerFn() {
      let vm = this;
      if (vm.marker !== []) {
        if (vm.marker != undefined && vm.marker.length > 0) {
          vm.markers = new qq.maps.MVCArray();

          for (let i = 0; i < vm.marker.length; i++) {
            //  console.log(vm.marker[i],',==============')
            let result = [vm.marker[i].add[1], vm.marker[i].add[0]];
            // console.log(result)
            let latLng = new qq.maps.LatLng(result[0], result[1]);
            // if( vm.marker[i].license == vm.licenselist){
            //     let anchor = new qq.maps.Point(10, 20),
            //     size = new qq.maps.Size(24, 24),
            //     origin = new qq.maps.Point(0, 0),
            //   icon3 = new qq.maps.MarkerImage(
            //      vm.img.red,
            //       size,
            //       origin,
            //       anchor
            //     );
            //     var marker = new qq.maps.Marker({
            //             icon: icon3, // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
            //             map: vm.map,
            //             draggable: vm.marker[i].license === vm.licenseData ? true : false,
            //             position: latLng,
            //           });
            // }
            if (vm.marker[i].color) {
              let anchor = new qq.maps.Point(10, 20),
                size = new qq.maps.Size(24, 24),
                origin = new qq.maps.Point(0, 0),
                icon1 = new qq.maps.MarkerImage(
                  vm.img.red,
                  size,
                  origin,
                  anchor
                ),
                icon2 = new qq.maps.MarkerImage(
                  vm.img.yellow,
                  size,
                  origin,
                  anchor
                ),
                icon3 = new qq.maps.MarkerImage(
                  vm.img.green,
                  size,
                  origin,
                  anchor
                );
              let icon;
              if (typeof vm.marker[i].color === "number") {
                icon =
                  vm.marker[i].color === 1
                    ? icon1
                    : vm.marker[i].color === 2
                    ? icon2
                    : icon3;
              } else if (typeof vm.marker[i].color === "string") {
                icon =
                  vm.marker[i].color === "绿色"
                    ? icon3
                    : vm.marker[i].color === "红色"
                    ? icon1
                    : icon2;
              }

              if (vm.marker[i].color == 4) {
                //  var marker = new qq.maps.Marker({
                //       icon:  vm.marker[i].color === 4 ?  icon1 : icon, // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
                //       map: vm.map,
                //       position: latLng,
                //       animation:
                //         i == vm.marker.length - 1
                //           ? qq.maps.MarkerAnimation.BOUNCE
                //           : null,
                //     });
              } else {
                var marker = new qq.maps.Marker({
                  icon: vm.marker[i].color === 4 ? icon1 : icon, // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
                  map: vm.map,
                  draggable:
                    vm.marker[i].license === vm.licenseData ? true : false,
                  position: latLng
                });
              }

              marker.code = vm.marker[i].license;
              marker.color = vm.marker[i].license;
              marker.name = vm.marker[i].shop_name;
              marker.add = result;
              //marker点击事件
              if (vm.marker[i].color != 4) {
                qq.maps.event.addListener(marker, "click", function(evt) {
                  console.log(evt);
                  vm.$emit(
                    "markerClick",
                    vm.marker[i].license,
                    vm.marker[i].shop_name,
                    vm.marker[i]
                  );
                  vm.evt = evt;
                  vm.alertFn(evt);
                  // console.log(marker.code)
                });

                qq.maps.event.addListener(marker, "dragend", function(evt) {
                  var weizhi = marker.getPosition();
                  vm.$emit("changeMap", evt);
                  evt.event;
                });
              }
              vm.markersArray.push(marker);
            } else {
              marker = new qq.maps.Marker({
                position: latLng,
                map: vm.map
              });
            }
            vm.markers.push(marker);
          }
        }
        let markerClusterer = new qq.maps.MarkerCluster({
          map: vm.map,
          minimumClusterSize: 5, //默认2
          markers: vm.markers,
          zoomOnClick: true, //默认为true
          gridSize: 30, //默认60
          averageCenter: true, //默认false
          maxZoom: 18 //默认18
        });
      }

      if (this.timesNum == 0) {
        this.setMap();
      }
      this.timesNum++;
      if (this.panTo) {
        // vm.map.panTo(new qq.maps.LatLng(this.latitude, this.longitude ));
      }
    },
    drawMap(zoom) {
      console.log(zoom);
      let vm = this;
      this.latitude = JSON.parse(sessionStorage.getItem("fristposition"))[1];
      this.longitude = JSON.parse(sessionStorage.getItem("fristposition"))[0];
      console.log(JSON.parse(sessionStorage.getItem("fristposition")));
      // console.log(this.fristposition)
      // console.log(this.fristposition[1] ,this.longitude )
      TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then(
        qq => {
          let map = new qq.maps.Map(document.getElementById(this.qqMap), {  
            // 地图的中心地理坐标。longitude: 0, //经度  latitude: 0, //纬度
            // center: new qq.maps.LatLng(41.097867,111.463238),
            center: new qq.maps.LatLng(
              this.latitude ? this.latitude : 40.82,
              this.longitude ? this.longitude : 111.65
            ),
            // center: new qq.maps.LatLng(this.latitude ? this.latitude : 40.82	, this.longitude ? this.longitude : 111.65),
            zoom: zoom ? zoom : 15,
            disableDefaultUI: true
          });
          vm.map = map;
          this.info = new qq.maps.InfoWindow({
            map: vm.map
          });

          vm.pathFn();
          vm.markerFn(zoom);
          // vm.line()
          // var path1 = [
          //   new qq.maps.LatLng(39.91, 116.399),
          //   new qq.maps.LatLng(39.92, 116.405),
          //   new qq.maps.LatLng(39.93, 116.42)
          // ];
          // var polyline = new qq.maps.Polyline({
          //   path: path1,
          //   strokeColor: "#000000",
          //   strokeWeight: 5,
          //   editable: false,
          //   map: map
          // });

          // var mapM = document.getElementById(this.qqMap);
          // qq.maps.event.addDomListener(mapM, "click", function() {
          //   polyline.setVisible(true);
          //   if (polyline.getMap()) {
          //     polyline.setMap(null);
          //   } else {
          //     polyline.setMap(map);
          //   }
          // });

          if (zoom) {
            vm.map.zoomTo(zoom);
            vm.map.panTo(new qq.maps.LatLng(this.to_add_lat, this.to_add_lng));
            this.setMap();
          } else {
            //改变地图中心及缩放等级
            if (vm.point != undefined) {
              if (vm.point.length !== 0) {
                // let result = gcoord.transform(
                //   // [vm.point[1] - 0 + 0.000674, vm.point[0] - 0.000452],
                //   coordinateFn(vm.point[1], vm.point[0]),
                //   gcoord.BMap,
                //   gcoord.GCJ02
                // );
                let result = [vm.point[1], vm.point[0]];
                vm.map.panTo(new qq.maps.LatLng(result[0], result[1]));
                // vm.map.panTo(new qq.maps.LatLng(this.latitude, this.longitude));
                vm.map.zoomTo(16);
              } else if (vm.point.length === 0) {
                vm.map.zoomTo(13);
              }
            }
          }
        }
      );
    },
    getMyLocation(type) {
      //获取当前位置

      if (type) {
        // this.geolocation.clearWatch();
        this.statenum = 0;
        this.firsttimes = false;
      }
      // console.log(type)
      this.updatetype = type == "reset" ? true : false;
      this.loading = true;
      var options = { timeout: 3000 }; //enableHighAccuracy: true,

      if (type) {
        setTimeout(() => {
          this.geolocation.getLocation(
            this.showPosition,
            this.showErr,
            options
          );
        }, 6000); //6s为推荐值，业务调用方可根据自己的需求设置改时间，不建议太短
      } else {
        this.geolocation.getLocation(this.showPosition, this.showErr, options);
      }
      //  var vm = this
      //  vm.$emit('latlngClick', vm.longitude,vm.latitude)
    },
    showPosition(position) {
      console.log(position);
      sessionStorage.setItem("position", JSON.stringify(position));
      // console.log(position.lat, "position.lat");
      // console.log(position.lng, "position.lng");
      this.latitude = position.lat;
      this.longitude = position.lng;
      this.city = position.city;
      this.loading = false;

      if (this.watchState && this.latitude && this.longitude) {
        let array = [];
        this.myPosition = array.concat({
          color: 4,
          add: [this.longitude, this.latitude],
          center: [this.longitude, this.latitude],
          path: []
        });
        // this.showWatchPosition()  //进行位置监听
        // this.watchpostion()
        this.setMap();
      }

      // console.log(this.firsttimes)
      // if(this.firsttimes){  //判断是不是首次加载
      this.$emit("latlngClick", position.lng, position.lat); //请求成功出发父元素请求数据
      //  this.$emit("latlngClick",111.73 ,40.83)
      // }
    },
    showErr() {
      console.log("定位失败");
      this.statenum++;
      console.log("获取位置次数：" + this.statenum);
      if (this.statenum == 5) {
        //获取位置次数
        // this.$message({
        //     message: '出错啦、请检查您的定位是否开启、或重新刷新页面试试~~~',
        //     type: 'error',
        //    onClose:()=>{
        //       this.loading = false
        //     }
        // })
        this.$alert(
          "请检查您的定位是否开启、或重新刷新页面试试~~~",
          "获取当前位置失败！",
          {
            confirmButtonText: "好的",
            callback: action => {
              this.loading = false;
              return false;
            }
          }
        );
      } else {
        this.getMyLocation(); //定位失败再请求定位，测试使用
      }
    },
    line() {
      var path1 = [
        new qq.maps.LatLng(39.91, 116.399),
        new qq.maps.LatLng(39.92, 116.405),
        new qq.maps.LatLng(39.93, 116.42)
      ];
      var polyline = new qq.maps.Polyline({
        path: path1,
        strokeColor: "#000000",
        strokeWeight: 5,
        editable: false,
        map: map
      });

      var mapM = document.getElementById(this.qqMap);
      qq.maps.event.addDomListener(mapM, "click", function() {
        polyline.setVisible(true);
        if (polyline.getMap()) {
          polyline.setMap(null);
        } else {
          polyline.setMap(map);
        }
      });
    },
    //第二部分
    //位置信息在地图上展示
    setMap() {
      //步骤：定义map变量 调用 qq.maps.Map() 构造函数   获取地图显示容器

      //定义工厂模式函数
      // var myOptions = {
      //   // zoom: 13, //设置地图缩放级别
      //   center: myLatlng, //设置中心点样式
      //   mapTypeId: qq.maps.MapTypeId.ROADMAP //设置地图样式详情参见MapType
      // };
      if (this.map) {
        //  this.map.panTo(new qq.maps.LatLng(this.center_lat, this.center_lng));
      }
      if (this.myPosition) {
        // console.log(this.myPosition)
        // //获取dom元素添加地图信息
        if (this.markersArray) {
          for (let index = 0; index < this.markersArray.length; index++) {
            if (this.markersArray[index].color == 4) {
              this.markersArray[index].setMap(null);
            }
          }

          try {
            let arraynew = this.myPosition;
            //第三部分
            for (let i = 0; i < arraynew.length; i++) {
              // console.log(i + "个当前位置")
              var marker = new qq.maps.Marker({
                icon: this.img.addressing,
                position: new qq.maps.LatLng(
                  arraynew[i].add[1],
                  arraynew[i].add[0]
                ),
                map: this.map,
                animation: qq.maps.MarkerAnimation.BOUNCE
              });
              marker.color = 4;
              this.markersArray.push(marker);
            }
            if (this.updatetype) {
              this.map.panTo(
                new qq.maps.LatLng(
                  this.myPosition[0].add[1],
                  this.myPosition[0].add[0]
                )
              );
            }
          } catch (error) {
            // console.log(error)
            console.log("语法报错");
          }
        }
      }

      //给定位的位置添加图片标注
      // let lastval = this.marker[this.marker.length - 1]

      // console.log(myLatlng)
      //给定位的位置添加文本标注
      // var marker = new qq.maps.Label({
      //   position: myLatlng,
      //   map: map,
      //   content: "这是我当前的位置，偏差有点大，哈哈"
      // });
    }
  }
};
</script>

<style scoped>
.qqMap {
  width: 100%;
  height: 100%;
}
</style>
