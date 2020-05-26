<template>
  <div class="pages" id="newMaps">
    <!-- 拜访 -->
    <!-- 品牌需求 -->

    <div class="hint">
            <qq-map ></qq-map>
    </div>
    <div class="box">
      <el-table :data="tableData" border style="width: 100%"  class="tablenum">
        <el-table-column align='center' prop="product_name"  label="品规">
        </el-table-column>
        <el-table-column align='center' prop="num" label="需求数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.num" class="inputs" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column align='center' prop="num2" label="库存数量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.num2" class="inputs" size="mini" ></el-input>
          </template>
        </el-table-column>
          <el-table-column
          align='center'
          prop="num"
          label="热销商圈">
          <template slot-scope="scope">
            <span 
              :style="{ color: scope.row.num!==''?'red':''}"
              @click="chenck(scope.row.num,scope.row.product_id)"
              >查看</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="base">
      <p id="cancel" @click="cancel">取消</p>
      <p id="sure" @click="sure">保存</p>
        <!-- <el-button type="primary" size="mini"  @click="filter222">跳转调查问卷</el-button> -->

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import qqMap from '../qqmap/qqMap'
  import {hostType} from '../../../src/assets/js/env.js'
  export default {
    data() {
      return {
        center: [],
        shop: [],
        path: [],
        need: '',
        stock: '',
        polygonName: '',
        tableData: [],
      }
    },
    components: {
      qqMap
    },
    mounted: function () {
      // 表格渲染接口
      let vm = this
   let domain = hostType(1)
      // $route.query.code
      vm.$axios.get(`${domain}`+"/wechat/api/proneedsave/?license="+ vm.$route.query.code).then(function (response) {
      // vm.$axios.get("http://192.168.1.40:8000/wechat/api/proneedsave/").then(function (response) {
        // console.log(response.data) 
        vm.tableData = response.data.data_list
      })

      var windowH = document.documentElement.clientHeight
      document.getElementById('newMaps').style.height = windowH - 100 + 'px'

      // 地图渲染接口
      // vm.$axios.get("/wechat/api/secondpage/").then(function(response) {
      // // vm.$axios.get("http://127.0.0.1:8000/wechat/api/secondpage/").then(function(response) {
      //   console.log(response.data) 
      //   vm.center = response.data.shop_info.path
      //   // vm.shop = response.data.data
      // })   
    },
    methods: {
        filter222(){
           let vm = this
             vm.$router.push({
          path: "/home/inventory",
          // query: {
          //  shop_list:vm.shop_list
          // }
        })
       },
      sure() {
        let vm = this
        let domain = hostType(1)
        let fles = [] //vm.tableData.filter(item => item.num !== '')
        for (let i = 0; i < vm.tableData.length; i++) {
          if (vm.tableData[i].num || vm.tableData[i].num2) {
            //  fles.push(vm.tableData[i])
            if (vm.tableData[i].num  == null) {
              vm.tableData[i].num = 0
            }
            if (vm.tableData[i].num2 == null) {
              vm.tableData[i].num2 = 0
            }
            fles.push({
              "product_id": vm.tableData[i].product_id,
              "product_name": vm.tableData[i].product_name,
              "num": vm.tableData[i].num,
              "num2": vm.tableData[i].num2,
            })
          }
        }
        let fles2 = [] //vm.tableData.filter(item => item.num !== '')
        console.log(vm.need)
        vm.$axios.post(`${domain}`+"/wechat/api/proneedsave/", {
        // vm.$axios.post("http://192.168.1.40:8000/wechat/api/proneedsave/", {
          "product_list_need": fles,
          'license':vm.$route.query.code
          // 'product_list_stock':fles2
        }).then(function (response) {})
        this.$message('保存成功');
      },
      cancel() {
        //  console.log(444)
        let vm = this
        for (let i = 0; i < vm.tableData.length; i++) {
          //  if(vm.tableData[i].num !== '') {
          vm.tableData[i].num = ''
          vm.tableData[i].num2 = ''
        }
        //  }
      },
     chenck(num,product_id) {
          let vm = this
       if(num !== '') {
      let vm = this
         console.log('33')
         console.log(product_id)
  //     vm.$axios.get("/wechat/api/hotbiz/?product_id="+product_id).then(function(response) {
  //     // vm.$axios.get("http://127.0.0.1:8000/wechat/api/hotbiz/?product_id="+product_id).then(function(response) {
  //       console.log(response.data.data) 
  //       vm.center = response.data.data[0].center
  //       // console.log(response.data.data[0].center)
  //       vm.path = response.data.data//.path
  //       // vm.title = response.data.data.biz_dist
  // })
       }
     },
    }
  }

</script>

<style scoped>
/* .tablenum tr{
  height: 300px;
} */
  .name {
    font-weight: 500;
    font-size: 0.4rem;
    margin-left: 0.4rem;
    border-left: solid 3px #3D8EEF;
    padding-left: 0.2rem;
    margin-bottom: 0.13rem;
    margin-top: 0.7rem;
  }

  .hint {
   width: 100%;
   height: 6rem;
   margin-bottom:0.2rem;
  }

 

  .box {
    height: 9rem;
    width: 100%;
    overflow-x: hidden;
    /* font-size: 0.4rem; */
    overflow-y: auto;
  }

  .base {
    width: 100%;
    height: 0.8rem;
    align-items: center;
    font-size: 0.3rem;
    display: flex;
    position: fixed;
    bottom: 0rem;
    z-index: 888;
  }

  #cancel {
    width: 50%;
    text-align: center;
    color: #388EF1;
    height: 0.8rem;
    line-height: 0.8rem;
    background: white
  }

  #sure {
    width: 50%;
    text-align: center;
    height: 0.8rem;
    line-height: 0.8rem;
    background: #388EF1;
    color: white;
  }

  .el-table th {
    font-size: large;
  }
.el-table th{
  padding: 0.4rem 0; 
}

</style>
