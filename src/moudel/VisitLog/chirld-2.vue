<!-- 待执行活动 -->
<template>
  <div class="type2">
    <div class="notsport">
      <ul>
        <li v-for="(item,index) in tableData2" :key="index">
          <div class="item" v-if="item.activity.type.opt_type== '2'">
            <p class="name">
              <span class="span1"></span>
              <span>撕皮条- {{item.activity.name}}</span>
            </p>
            <hr>
            <div class="div-type-1">
              <span class="lable">完成数量 :</span>
              <el-input v-model="item.num" placeholder="请输入" class="text"></el-input>
              <el-button type="primary" @click="subButFn(item)">保存</el-button>
            </div>
          </div>
          <div class="item" v-if="item.activity.type.opt_type== '1'">
            <p class="name">
              <span class="span1"></span>
              <span>陈列有奖活动 - {{item.activity.name}}</span>
            </p>
            <hr>
            <div class="div-type-2">
              <!-- <uploadImg :Dlicense="item.shop.license" :Dactivity_id="item.activity.id.toString()"
                :Dproduct="item.activity.product.product_id"></uploadImg> -->
              <uploadImg  :Dlicense="item.shop.license" :Dactivity_id="item.activity.id.toString()"
              :Dproduct="'00000000'"></uploadImg>
            </div>
          </div>
          <div class="item" v-if="item.activity.type.opt_type== '3'">
            <p class="name">
              <span class="span1"></span>
              <span>客情维护 - {{item.activity.name}}</span>
            </p>
            <hr>
            <div class="div-type-3">
              <ul>
                <li><label>物资名称：</label>v  
                  <el-select v-model="value" clearable filterable size="mini" style="margin-top:5px" class="input-item"
                    placeholder="请选择">
                    <el-option v-for="(item, index) in options" :key="index" :label="item" :value="item">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <label> 物资数量：</label>
                  <el-input placeholder="" type="number" style="width:100px;color:red;margin-top:5px" v-model="nums"
                    class="knum" size="mini" clearable>
                  </el-input>
                  <el-button type="primary" size="mini" style="margin-left:32px" @click="pushFn(item)">添加</el-button>
                </li>
              </ul>
              <el-table :data="tableData" border style="width: 100%;margin-top:5px" v-show='tableshow'>
                <el-table-column prop="ctime" label="日期">
                </el-table-column>
                <el-table-column prop="goods_name" label="物资名称">
                </el-table-column>
                <el-table-column prop="nums" label="数量">
                </el-table-column>
              </el-table>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="outsport">
      <outsport></outsport>
    </div>
  </div>
</template>

<script>
  import qqMap from 'map/qqMap';
  import uploadImg from "com/uploadImg.vue"
  import outsport from "moudel/VisitLog/chirld-4.vue"

  import {
    hostType
  } from 'api/env.js'

  export default {
    props: {
      tableData2: Array,
      datalicense: String
    },
    data() {
      return {
        loading: true,
        value: '',
        tableshow: false,
        nums: '',
        options: [],
        tableData: []
      };
    },

    components: {
      uploadImg,
      outsport
    },

    computed: {},

    created() {
      let vm = this;
      // console.log(vm.datalicense)
      vm.$axios.get(`${this.$apihost}` + "/wechat/api/goods/").then(function (response) {
        console.log(response.data)
        for (let index = 0; index < response.data.length; index++) {
          vm.options.push(response.data[index].good_name)
        }
      });
      //  this.getdata(2)
    },
    methods: {
      // getimgFn(item){
      //         return new Promise((resolve, reject) => {
      //                 this.$axios.get(`${this.$apihost}`+"/wechat/api/image/?license="+ this.license + "&activity_id="+ item.activity.id + "&product=" + item.activity.product.product_id).then((result) =>  {
      //                       return resolve(result)
      //                       // if(result.data.img_lis.length > 0){
      //                       //     let array = result.data.img_lis
      //                       //     let arraynew = []
      //                       //     for (let  index = 0; index < array.length; index++) {
      //                       //       arraynew.push(Object.assign({},{
      //                       //         url:hostType(2) + '/' + array[index]
      //                       //       }))
      //                       //     }
      //                       // }
      //                 }) 
      //         })

      // },
      //  getdata(num){
      //                 // let imglist = await this.getimgFn(array[index])
      //                 return new Promise((resolve, reject) => {
      //                            let vm = this
      //                           let status =  num == 2 ? false : true
      //                             vm.$axios.get(`${this.$apihost}`+"/wechat/api/shop?shop__license="+this.license + "&status="+ status +"&activity__id=").then(
      //                             (response)=> {
      //                               if(response.data.length > 0){
      //                                   let array = response.data
      //                                   let arraynew = []

      //                                     for (let index = 0; index < array.length; index++) {
      //                                           if(array[index].activity.type.opt_type == '1'){
      //                                               console.log("获取图片1")
      //                                               let imglist =  this.getimgFn(array[index])
      //                                                imglist.then(function (res) {
      //                                                     console.log(res)
      //                                                     arraynew.push(Object.assign({},array[index],{
      //                                                       imglist:res.data
      //                                                     }))
      //                                                })
      //                                               // console.log(imglist.resolve)
      //                                           }else{
      //                                               arraynew.push(Object.assign({},array[index],{
      //                                                 num:null
      //                                               }))
      //                                           }

      //                                       }
      //                                       vm.tableData = arraynew
      //                                       console.log(vm.tableData)
      //                                       vm.loading = false
      //                               }else{
      //                                   vm.tableData = response.data
      //                                   vm.loading = false
      //                               }
      //                             })
      //                 })
      // },
      subButFn(item) {
        console.log(item)
        let vm = this;
        let aa = item.activity.id
        vm.$axios
          .post(`${this.$apihost}` + "/wechat/api/shop/", {
            "activity": item.activity.id,
            "license": vm.datalicense,
            // "product": item.activity.product.product_id,
            "product": '00000000',
            'nums': item.num
          })
          .then(function (response) {
            // console.log(response.data)
            vm.$message(response.data);
          })
        //   .catch(function(error){
        //          console.log('error')
        // })
      },
      pushFn(item) {
        console.log(111,item)
        let vm = this;
        vm.tableshow = true;
        console.log(item.activity.id)
        console.log(vm.datalicense)
        let aa = item.activity.id
        vm.$axios.post(`${this.$apihost}` + "/wechat/api/shop/", {
          "activity": item.activity.id,
          "license": vm.datalicense,
          // "product": item.activity.product.product_id,
          "product":'00000000',
          "act_customer": {
            "goods_name": vm.value,
            "nums": vm.nums
          }
        }).then(function (response) {
          console.log(response.data)
          vm.push2Fn(aa)
        });

      },
      push2Fn(aa) {
        let vm = this;
        vm.$axios.get(`${this.$apihost}` + "/wechat/api/customer/?activity_id=" + aa + "&license=" + vm.datalicense)
          .then(function (response) {
            console.log(response,22222)
            vm.tableData = response.data
          });
      },
      uploadimgFnFn(value) {
        console.log(value + "------点击上传出发的值")
      },
    
    },
    mounted(){
      console.log(this.tableData2)
    }
  }

</script>
<style scoped>
  .text {
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-right: 10px;
  }

  .type2 {
    /* background-color: #ededed; */
    background-color: #ffffff;
  }

  ul li {
    background-color: #ffffff;
    padding-bottom: 8px;
    list-style: none;
    ;
  }

  .name span {
    font-size: 16px;
  }

  .div-type-1 {
    padding: 10px 20px;
  }

  .div-type-1 span,
  input,
  button {
    display: inline-block;
    vertical-align: middle;
  }

  .lable {
    margin-right: 6px;
  }

  .div-type-2 {
    text-align: center;
    padding-bottom: 15px;
    padding-top: 15px;
  }

  .uploadimgBut {
    margin-top: 10px;
  }

  .div-type-3 ul {
    margin-top: 10px;
    padding-left: 20px;
  }

</style>
