<template>
  <div id="wrap-bottpm-no">
    <!-- 拜访日志 -->
    <div class="cont-main" v-if="tabcontShow == false">
      <mapBusiness @tabcontShowFn="tabcontShowFn"></mapBusiness>
    </div>
    <div v-if="tabcontShow">
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
          <chirld1 :licenseNum="license" :datalng="lng" :datalat="lat"></chirld1>
        </div>
        <div class="tabcont-item tabcont-2" v-if="tabactive == 2" v-loading="loading">
          <ul class="soportab">
            <li
              v-for="(item,index) in soportab"
              :key="index"
              :class="item.select ? 'active': ''"
              @click="soportabFn(item)"
            >{{item.value}}</li>
          </ul>
          <div v-if="soportabId == 2">
            <div v-if="tableData.length > 0">
              <chirld2 :tableData2="tableData" :datalicense="license"></chirld2>
            </div>
            <p v-else>暂无数据</p>
          </div>
          <div v-if="soportabId == 4">
            <div v-if="tableData.length > 0">
              <chirld4 :tableData4="tableData" :Dlicense="license"></chirld4>
            </div>
            <p v-else>暂无数据</p>
          </div>
        </div>
        <div class="tabcont-item tabcont-3" v-if="tabactive == 3">
          <chirld3 :datalicense="license"></chirld3>



        </div>
        <div class="tabcont-item tabcont-4" v-if="tabactive == 4">
          <!-- <chirld4 :tableData4="tableData" v-if="tableData.length > 0" :Dlicense="license"></chirld4>
          <p v-else>暂无数据</p>-->
          <signInAndOut :v_license="license" @minsfn="minsfn"></signInAndOut>
        </div>
      </div>
    </div>
    <el-button type="primary" class="buttom-back" v-if="tabcontShow" @click="backFn">返回</el-button>
  </div>
</template>

<script>
import qqMap from "map/qqMap";
import mapBusiness from "com/mapBusiness.vue";

import chirld1 from "moudel/VisitLog/chirld-1.vue";
import chirld2 from "moudel/VisitLog/chirld-2.vue";
import chirld3 from "moudel/interactive/fristchild1.vue";
import chirld4 from "moudel/VisitLog/chirld-4.vue";
import fristchild2 from 'moudel/interactive/fristchild2.vue'

import signInAndOut from "moudel/VisitLog/signInAndOut.vue";

import { hostType } from "api/env.js";

export default {
  data() {
    return {
      num: "",
      soportabId: null,
      soportab: [
        {
          value: "待执行",
          select: true,
          id: 2
        },
        {
          value: "已参加",
          select: false,
          id: 4
        }
      ],
      tablist: [
        {
          id: 4,
          name: "签到签退",
          select: true
        },
        {
          id: 2,
          name: "活动查询",
          select: false
        },
        {
          id: 3,
          name: "市场调研",
          select: false
        },
        {
          id: 1,
          name: "信息采集",
          select: false
        }
      ],
      names: "",
      shop: [],
      path: [],
      code: "",
      biz_dist: "",
      lat: "",
      lng: "",
      level: "",
      headerStyle: {
        "text-align": "center",
        color: "#404447"
      },
      func_area: "",
      shop_list: [],
      main_poi: "",
      shoplength: "",
      avg_qty: "",
      avg_profit: "",
      strip: "",
      funcnums: "",
      accuqty: "",
      tableData: [],
      funcaccuqtyrank: "",
      flaccustriprank: "",
      funcaccuprofitrank: "",
      flnums: "",
      flaccuqtyrank: "",
      funcaccustriprank: "",
      flaccuprofitrank: "",
      nums: "",
      accuqtyrank: "",
      accustriprank: "",
      accuprofitrank: "",
      tabactive: 4,
      tabcontShow: false,
      license: "",
      loading: true,
      lng: "",
      lat: ""
    };
  },
  watch: {
    license() {
      // console.log("值改变了")
      this.tabactive = 4;
      // this.getdata()
    },
    soportabId() {
      if (this.soportabId == 2 || this.soportabId == 4) {
        this.getdata(this.soportabId);
      }
    }
  },
  components: {
    mapBusiness,
    qqMap,
    chirld1,
    chirld2,
    chirld3,
    chirld4,
    signInAndOut,
    fristchild2
  },
  created: function() {
    console.log("拜访详情页进入");
    //
  },
  beforeRouteLeave(to, from, next) {
    console.log(this, "beforeRouteLeave");
    if (this.num == 1) {
      this.$message({
        message: "您还没签退请前往签退",
        type: "error"
      });
      // to.path === '/home/myBusiness'
    }

    next();
  },
  methods: {
    minsfn(ww) {
      //  console.log(ww)
      this.num = ww;
      //  console.log(this.num)
      sessionStorage.setItem("signoff", this.num);
    },
    soportabFn(item) {
      this.soportabId = item.id;
      let array = this.soportab;
      console.log(array);
      for (let index = 0; index < array.length; index++) {
        if (item.id == array[index].id) {
          array[index].select = true;
        } else {
          array[index].select = false;
        }
      }

      // if(item.id == 2 || item.id == 4){
      //     this.getdata(item.id)
      // }
    },
    backFn() {
      this.$confirm("是否确定返回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (this.num == 1) {
            this.$confirm("尚未签退, 是否继续返回?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "成功返回!"
                });
                this.tabcontShow = false;
                this.tabactive = 4;
                this.tablist = [
                  {
                    id: 4,
                    name: "签到签退",
                    select: true
                  },
                  {
                    id: 2,
                    name: "活动查询",
                    select: false
                  },
                  {
                    id: 3,
                    name: "市场调研",
                    select: false
                  },
                  {
                    id: 1,
                    name: "信息采集",
                    select: false
                  }
                ];
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "请签退之后再返回"
                });
              });
          } else {
            console.log("000");
            this.tabcontShow = false;
            this.tabactive = 4;
            this.tablist = [
              {
                id: 4,
                name: "签到签退",
                select: true
              },
              {
                id: 2,
                name: "活动查询",
                select: false
              },
              {
                id: 3,
                name: "市场调研",
                select: false
              },
              {
                id: 1,
                name: "信息采集",
                select: false
              }
            ];
          }
          // console.log(this.num)
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消返回"
          });
        });
      // }else{
      //   console.log('还没掐退')
      // }
    },
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

      if (num == 2) {
        // console.log("活动查询")
        this.soportabId = 2;
        let array = this.soportab;
        for (let index = 0; index < array.length; index++) {
          if (index == 0) {
            array[index].select = true;
          } else {
            array[index].select = false;
          }
        }
      } else {
        this.soportabId = null;
      }
    },
    tabcontShowFn(license, obj) {
      this.tabcontShow = true;
      this.license = license;
      let lng = obj.lng;
      let lat = obj.lat;
      this.lng = lng.toString();
      this.lat = lat.toString();
    },
    getimgFn(item) {
      console.log(item);
      let config = {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      };
      return new Promise((resolve, reject) => {
        if (item.activity.product === null) {
          this.$axios
            .get(
              `${this.$apihost}` +
                "/wechat/api/image/?license=" +
                this.license +
                "&activity_id=" +
                item.activity.id +
                "&product=" + "00000000",
              config
            )
            .then(result => {
              console.log(result);
              return resolve(result);
              // if(result.data.img_lis.length > 0){
              //     let array = result.data.img_lis
              //     let arraynew = []
              //     for (let  index = 0; index < array.length; index++) {
              //       arraynew.push(Object.assign({},{
              //         url:hostType(2) + '/' + array[index]
              //       }))
              //     }
              // }
            });
        }else{
          this.$axios
            .get(
              `${this.$apihost}` +
                "/wechat/api/image/?license=" +
                this.license +
                "&activity_id=" +
                item.activity.id +
                "&product=" + item.activity.product.product_id,
              config
            )
            .then(result => {
              console.log(result);
              return resolve(result);
              // if(result.data.img_lis.length > 0){
              //     let array = result.data.img_lis
              //     let arraynew = []
              //     for (let  index = 0; index < array.length; index++) {
              //       arraynew.push(Object.assign({},{
              //         url:hostType(2) + '/' + array[index]
              //       }))
              //     }
              // }
            });
        }
      });
    },
    getdata(num) {
      this.loading = true;
      let config = {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      };

      // let imglist = await this.getimgFn(array[index])
      return new Promise((resolve, reject) => {
        let vm = this;
        let status = num == 2 ? false : true;
        vm.$axios
          .get(
            `${this.$apihost}` +
              "/wechat/api/shop/?shop__license=" +
              this.license +
              "&status=" +
              status +
              "&activity__id=",
            config
          )
          .then(response => {
            console.log(response);
            if (response.data.length > 0) {
              let array = response.data;
              let arraynew = [];
              console.log(array);
              for (let index = 0; index < array.length; index++) {
                if (array[index].activity.type.opt_type == "1") {
                  console.log("获取图片1");
                  if (status) {
                    let imglist = this.getimgFn(array[index]);
                    console.log(
                      imglist.then(data => {
                        console.log(data);
                      })
                    );
                    imglist.then(function(res) {
                      console.log(res);
                      arraynew.push(
                        Object.assign({}, array[index], {
                          imglist: res.data
                        })
                      );
                    });
                  } else {
                    arraynew.push(Object.assign({}, array[index], {}));
                  }
                  // console.log(arraynew)
                } else {
                  arraynew.push(
                    Object.assign({}, array[index], {
                      num: null
                    })
                  );
                }
                vm.tableData = arraynew;
                console.log(vm.tableData);
                vm.loading = false;
              }
            } else {
              vm.tableData = response.data;
              vm.loading = false;
            }
          });
      });
    }
  }
};
</script>

<style scoped>
.soportab {
  display: flex;
  border-bottom: 1px solid #dddddd;
}

.soportab li {
  height: 45px;
  line-height: 45px;
  list-style: none;
  flex: 1;
  text-align: center;
  font-size: 16px;
}

.soportab li.active {
  width: 100px;
  color: #409eff;
  border: #3d8eef;
}

.tabcont-item p {
  padding: 10px;
  font-size: 16px;
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

.tabcont {
  /* padding-top: 10px; */
  padding-bottom: 60px;
  background-color: #ffffff;
  position: relative;
  top: 10px;
}

.count {
  font-size: 18px;
  margin: 0.13rem 0 0.13rem 0;
  color: #3d8eef;
  text-align: right;
  /* color:; */
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

table {
  text-align: center;
  margin: 0 auto;
  width: 95%;
  border: solid #f0f0f0;
  border-width: 1px 0px 0px 1px;
  color: black;
}

td {
  width: 13%;
  height: 30px;
  border: solid #f0f0f0;
  border-width: 0px 1px 1px 0px;
}
</style>
