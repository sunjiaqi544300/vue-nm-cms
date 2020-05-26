<template>
 <div class="allPath" id="allPath"> 
 </div>
</template>

<script type="text/ecmascript-6">
import gcoord from "gcoord"
import { TMap } from "../../assets/js/qqMap.js"
export default {
   props: ["marker","center","path","name"],
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
      "烟草":'#E95050'
    },
    img: {
        red: require('../img/1.png'),
        yellow: require('../img/2.png'),
        // green: require('@/module/marketAnalysis/images/3.png')
      }
  }
},
components: { },
watch: {
  path: function() {
    this.drawMap()
  },
  marker: function() {
    this.drawMap()
  }
},
// mounted: function(){
//   this.drawMap()
// },
methods: {
    drawMap() {
       let vm = this
        TMap("H7KBZ-XMI66-4CXSJ-ERMEQ-UPCYZ-PABYG&libraries=convertor").then(
        qq => {
          let map = new qq.maps.Map(document.getElementById("allPath"), {
            // 地图的中心地理坐标。
            center: new qq.maps.LatLng(vm.center[1],vm.center[0]),
            zoom: 14,
            disableDefaultUI: true})
          
           if( vm.marker !== []) {
            let markers = new qq.maps.MVCArray()
            for (let i = 0; i < vm.marker.length; i++) {
              // 将BD坐标转换为QQ坐标
              let result = gcoord.transform(
                [ vm.marker[i].add[1] - 0 + 0.000674, vm.marker[i].add[0] - 0.000452 ],
                gcoord.BMap, gcoord.GCJ02 )

              let latLng = new qq.maps.LatLng(result[0], result[1])
              if(vm.marker[i].color) {
                let anchor = new qq.maps.Point(10, 20),
                  size = new qq.maps.Size(24, 24),
                  origin = new qq.maps.Point(0, 0)//,
                  icon1 = new qq.maps.MarkerImage(vm.img.red, size, origin, anchor),
                  icon2 = new qq.maps.MarkerImage(vm.img.yellow, size, origin, anchor),
                  icon3 = new qq.maps.MarkerImage(vm.img.green, size, origin, anchor)
                  let icon
                  if(typeof(vm.marker[i].color) === 'number') {
                    icon = vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3
                  }else if(typeof(vm.marker[i].color) === 'string'){
                    icon = vm.marker[i].color === 'orange'?icon1:((vm.marker[i].color === 'red')?icon1:vm.marker[i].color === 'yellow'?icon2:icon3)
                  }
                var marker = new qq.maps.Marker({
                  icon: icon, // vm.marker[i].color === 1?icon1:vm.marker[i].color === 2?icon2:icon3,
                  map: map,
                  position:latLng,
                  animation: (vm.point !== []&&vm.point === vm.marker[i].add)?qq.maps.MarkerAnimation.BOUNCE:null
                });
                  marker.code = vm.marker[i].license
                  marker.color = vm.marker[i].color
                  marker.name = vm.marker[i].shop_name
                  marker.add = result
                  //marker点击事件
                  qq.maps.event.addListener(marker, 'click', function() {
                    vm.$emit('markerClick', this.code, this.name, this.add)
                  }) 
              }else {
                marker = new qq.maps.Marker({'position':latLng, map:map })
              }
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
             if (vm.path !== []) {
            for (let i = 0; i < vm.path.length; i++) {
              let innerPath = []
              innerPath.name = vm.path[i].biz_dist
              innerPath.color = "#ffffff"//vm.path[i].func_area || ''
              if(vm.path[i].biz_dist === vm.name) {
                innerPath.color = vm.func_area
              }else {
                innerPath.color = "#ffffff"
              }

              for (let j = 0; j < vm.path[i].path.length; j++) {
                // 将BD坐标转换为QQ坐标
                let result = gcoord.transform(
                  [ vm.path[i].path[j][1] - 0 + 0.000674, vm.path[i].path[j][0] - 0.000452 ],
                  gcoord.BMap, gcoord.GCJ02 )
                innerPath.push(new qq.maps.LatLng(result[0], result[1]))
              }
              let polygon = new qq.maps.Polygon({
                    path: innerPath,
                    strokeColor:"red",
                    strokeWeight: 1,
                    fillColor: qq.maps.Color.fromHex("red", 0.3),
                    map: map
                  })  
              //商圈点击事件
              polygon.name = innerPath.name
              qq.maps.event.addListener(polygon,"click",function(){
                  vm.$emit('pathClick',this.name)
             })      
          }
        }  
        })  
        
    }
  },
  mounted(){
    this.drawMap()
  }
}
</script>

<style scoped>
.allPath{
  width: 100%;
  height: 4.5rem;
}

</style>
