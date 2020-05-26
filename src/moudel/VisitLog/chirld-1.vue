<!-- 信息采集 -->
<template>
  <div v-loading="loading" class="chirld-1">
    <tableTitleLeft :tableDatalist="tableData" :leftList="leftdata" @iconx="isshow" :license="licenseNum" 
      @getdataFn="getdata" :butshow="true"><span slot="title">{{title}}</span></tableTitleLeft>
    <alertcont v-if="alertShow" @isshowClick="isshow" :bgcolor="bgcolorFn" :datalist="data_list" :type="1"  :types='types'></alertcont>
  </div>
</template>

<script>
  import alertcont from "com/alert.vue"
  import tableTitleLeft from "com/tableTitleLeft.vue"
  export default {
    props: {
      licenseNum: String,
      datalng: String,
      datalat: String
    },
    components: {
      alertcont,
      tableTitleLeft
    },
    data() {
      return {
        alertShow: false,
        title: "维护目标完成情况",
        leftdata: ["", "客户类型", "目标量", "完成量", "可信度", "预订单", "库存量", "系统推荐", "需求量", "系统推荐"],
        tableData: [],
        types:Number,
        bgcolorFn: "#ffffff",
        loading: false,
      };
    },

    computed: {},

    created() {
 
      this.getdata()
    },

    methods: {
      isshow(obj) {
        // console.log(obj)  
        this.types = obj.type
           console.log(obj.type)
        this.loading = true
        if (obj.data) {
          this.$axios.post(`${this.$apihost}` + "/wechat/api/recomshop/", {
            product_id: obj.data.product_id,
            v_license: obj.license,
            add_lng: this.datalng,
            add_lat: this.datalat,
            v_type: obj.type,
          }).then((response) => {
            this.data_list = response.data.data_list
            this.alertShow = obj.show
            this.bgcolorFn = obj.bgcolor
            this.loading = false
          })
        } else {
          this.loading = false
          this.alertShow = obj.show
          this.bgcolorFn = obj.bgcolor

        }

      },
      lookFn(item) {
        this.alertShow = true
      },
      getdata() {
        let vm = this
        vm.$axios.get(`${this.$apihost}` + "/wechat/api/infocollect/?license=" + this.licenseNum).then(
          function (response) {
            let array = response.data.data_list
            let arraynew = []
            for (let index = 0; index < array.length; index++) {
              arraynew.push(Object.assign({}, {
                name: array[index].product_name,
                product_id: array[index].product_id,
                modelvalue1: array[index].advance_order,
                modelvalue2: array[index].stock,
                modelvalue3: array[index].demand,
                value: {
                  license_type: array[index].license_type,
                  target: array[index].target,
                  completions: array[index].completions,
                  kxd: array[index].kxd,
                  advance_order: array[index].advance_order, //
                  stock: array[index].stock, //系统推荐
                  stocksmile: array[index].stocksmile, //库存量系统推荐
                  demand: array[index].demand,
                  demandsmile: array[index].demandsmile,
                }
              }))
            }
            vm.tableData = arraynew
          })
      }
    }
  }

</script>
<style scoped>
  img {
    width: 40%;
    margin: 0 auto;
    display: block;
  }

  .chirld-1 {
    overflow: hidden;
  }

</style>
