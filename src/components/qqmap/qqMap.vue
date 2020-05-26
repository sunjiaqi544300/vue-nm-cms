<template>
  <div class="qqMap" id="qqMap"></div>
</template>
<script type="text/ecmascript-6">
  import gcoord from "gcoord"
  import {
    TMap
  } from "../../assets/js/qqMap.js"
  export default {
    name: "qqMap",
    props: ["path", "marker", "point"],
    data() {
      return {
        color: {
          "居住场所": "#f3282b",
          "交通枢纽": "#FFDD00",
          "办公场所": "#0dccbb",
          "旅游景区": "#a532cc",
          "住宿场所": "#FF628C",
          "购物场所": "#018fcc",
          "教育文化": "#26cc3e",
          "医疗服务": "#00cbe6",
          "餐饮服务": "#FF9D00",
          "休闲娱乐": "#86C166",
          "自身": "#FF4252",
          "竞品": "#549CF2",
          "烟草": '#E95050'
        },
        img: {
          red: require('../img/1.png'),
          yellow: require('../img/2.png'),
          green: require('../img/3.png')
        },
        longitude: 0, //经度
        latitude: 0, //纬度
        city: '',
        getmaps: false,
      }
    },
    components: {},
    watch: {
      path: function () {
        this.drawMap()
      },
      marker: function () {
        this.drawMap()
      },
      point: function () {
        this.drawMap()
      }
    },
    mounted: function () {
      this.getMyLocation();
      this.drawMap()
    },
    methods: {
       getMyLocation() {
        // var options = {timeout: 8000}
        var geolocation = new qq.maps.Geolocation("CKVBZ-CYKCS-5RTO3-66V5S-JECW5-UGBSV", "定位");
        geolocation.getIpLocation(this.showPosition, this.showErr);
        //  var vm = this
        //  vm.$emit('latlngClick', vm.longitude,vm.latitude)
      },
      showPosition(position) {
        console.log(position.lat, 'position.lat');
        console.log(position.lng, 'position.lng');
        this.latitude = position.lat;
        this.longitude = position.lng;
        this.city = position.city;
        // this.setMap();
         this.$emit('latlngClick',position.lng,position.lat)
      },
      showErr() {
        console.log("定位失败");
        this.getMyLocation(); //定位失败再请求定位，测试使用
      },
      drawMap() {
        let vm = this

        TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then(
          qq => {
            let map = new qq.maps.Map(document.getElementById("qqMap"), {
              // 地图的中心地理坐标。
              center: new qq.maps.LatLng(39.916527,116.397128),
              zoom: 11,
              disableDefaultUI: true})  


        if (vm.path !== []) {
          for (let i = 0; i < vm.path.length; i++) {
            let innerPath = []
            innerPath.color = vm.path[i].func_area || ''
            innerPath.name = vm.path[i].biz_dist || ''
            innerPath.center = vm.path[i].center || ''
            for (let j = 0; j < vm.path[i].path.length; j++) {
              // 将BD坐标转换为QQ坐标
              // let result = gcoord.transform(
              //   [vm.path[i].path[j][1] - 0 + 0.000674, vm.path[i].path[j][0] - 0.000452],
              //   gcoord.BMap, gcoord.GCJ02)
              let result = [vm.path[i].path[j][1],vm.path[i].path[j][0]]
              innerPath.push(new qq.maps.LatLng(result[0], result[1]))
            }
            let polygon = new qq.maps.Polygon({
              path: innerPath,
              strokeColor: vm.color[innerPath.color] || "#cccccc",
              strokeWeight: 1,
              fillColor: qq.maps.Color.fromHex(vm.color[innerPath.color] || "#cccccc", 0.3),
              map: map
            })
            //商圈点击事件
            polygon.name = innerPath.name
            polygon.center = innerPath.center
            qq.maps.event.addListener(polygon, "click", function () {
              vm.$emit('pathClick', this.name, this.center)
            })
          }
        }
        if (vm.marker.length!== 0) {
          let markers = new qq.maps.MVCArray()
          for (let i = 0; i < vm.marker.length; i++) {//vm.marker.length
            // 将BD坐标转换为QQ坐标
            // let result = gcoord.transform(
            //   [vm.marker[i].add[1] - 0 + 0.000674, vm.marker[i].add[0] - 0.000452],
            //   gcoord.BMap, gcoord.GCJ02)
            let result =[vm.marker[i].add[1], vm.marker[i].add[0]]
            let latLng = new qq.maps.LatLng(result[0], result[1])
            // console.log(vm.marker[i].color)
            // if (vm.marker[i].color == undefined) {
              let anchor = new qq.maps.Point(10, 20),
                size = new qq.maps.Size(24, 24),
                origin = new qq.maps.Point(0, 0),
                icon1 = new qq.maps.MarkerImage(vm.img.red, size, origin, anchor),
                icon2 = new qq.maps.MarkerImage(vm.img.yellow, size, origin, anchor),
                icon3 = new qq.maps.MarkerImage(vm.img.green, size, origin, anchor)
              // let icon
              // if(typeof(vm.marker[i].color) === 'number') {
              //   icon = vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3
              // }else if(typeof(vm.marker[i].color) === 'string'){
              //   icon = vm.marker[i].color === 'orange'?icon1:((vm.marker[i].color === 'red')?icon1:vm.marker[i].color === 'yellow'?icon2:icon3)
              // }icon, // 
              var marker = new qq.maps.Marker({
                // icon: vm.marker[i].color === 1 ? icon1 : vm.marker[i].color === 2 ? icon2 : icon2,
                map: map,
                position: latLng,
                animation: (vm.point !== [] && vm.point === vm.marker[i].add) ? qq.maps.MarkerAnimation.BOUNCE :
                  null
              });
              vm.marker[i].selected = false
              marker.code = vm.marker[i].license
              // console.log( vm.marker[i].license)
              marker.color = vm.marker[i].color
              marker.name = vm.marker[i].shop_name
              marker.add = result
              //marker点击事件
              qq.maps.event.addListener(marker, 'click', function () {
                vm.$emit('markerClick', vm.marker[i].license, vm.marker[i].shop_name, marker.add)
                // console.log(icon3)
                // console.log(marker)
              //  marker.setIcon(icon3)
              //  console.log(marker)
                  marker.selected = true
                //   console.log(icon1.url)
                //  marker.setIcon( marker.selected ? icon1.url :icon2.url)
              })
            // } else {
            //   marker = new qq.maps.Marker({
            //     'position': latLng,
            //     map: vm.map
            //   })
            // }
            markers.push(marker)
          }


          let markerClusterer = new qq.maps.MarkerCluster({
            map: map,
            minimumClusterSize: 5, //默认2
            markers: markers,
            zoomOnClick: true, //默认为true
            gridSize: 30, //默认60
            averageCenter: true, //默认false
            maxZoom: 18, //默认18
          })

        }
        //改变地图中心及缩放等级
        if (vm.point.length !== 0) {
          // console.log(vm.point)
          let result = gcoord.transform(
            [(vm.point[1] - 0) + 0.000674, vm.point[0] - 0.000452],
            gcoord.BMap, gcoord.GCJ02
          )
          map.panTo(new qq.maps.LatLng(result[0], result[1]))
          map.zoomTo(16)
        } else if (vm.point.length === 0) {
          map.zoomTo(11)
        }
      })
  }
  }
  }

</script>

<style scoped>
  .qqMap {
    width: 100%;
    height: 100%;
  }

</style>
