<template>
  <div id="newMapa">
    <div class="tablist">
      <span type="primary" v-for="(item,index) in tablist" :key="index" @click="tabFn(item.id)"
        :class="item.select ? 'active': ''">{{item.name}}</span>
    </div>
    <div class="tabcont">
      <div class="tabcont-item tabcont-1" v-if="tabactive == 1">
        <visit> </visit>
      </div>
      <div class="tabcont-item tabcont-2" v-if="tabactive == 2">
        <visit2> </visit2>
      </div>
      <!-- <div class="tabcont-item tabcont-2" v-if="tabactive == 3">
        <visit3> </visit3>
      </div> -->
    </div>
    <!-- <p class="name">
      <span class="span1"></span>
      <span>基本信息</span>
    </p>
    <hr>  
    <div v-for="(item,index) in data" :key="index" class="box" @click="clickshop(item)">
      <p > {{index+1}}.{{item.shop_name}}</p>
      <p>地址：{{item.shop_address}}</p>
      <p>目标量：{{item.target}}</p>
      <p>完成量：{{item.completions}}</p>
      <p>预计增量：{{item.projected}}</p>
      <hr>
    </div> -->
  </div>
</template>

<script>
  import qqMap from 'map/qqMap';
  import visit from "moudel/Spare/visit.vue"
  import visit3 from "moudel/Spare/visit3.vue"
  import visit2 from "moudel/Spare/visit2.vue"
  import {
    hostType
  } from 'api/env.js'
  export default {
    data() {
      return {
        tablist: [{
          id: 1,
          name: "优先拜访",
          select: true,
        }, {
          id: 2,
          name: "店铺信息",
          select: false,
        }
        // ,{
        //   id: 3,
        //   name: "培训资料",
        //   select: false,
        // }
        ],
        data: [],
        tabactive: 1,
        ss: '',
      }
    },
    components: {
      visit,
      visit2,
      visit3
    },
    mounted: function () {
      let vm = this;
      // vm.$axios
      //   .get(`${this.$apihost}` + "/wechat/api/optguide/")
      //   .then(function (response) {
      //     vm.data = response.data.data
      //   });
    },
    methods: {
      tabFn(num) {
        this.tableData = []
        this.tabactive = num
        let array = this.tablist
        for (let index = 0; index < array.length; index++) {
          if (num == array[index].id) {
            array[index].select = true
          } else {
            array[index].select = false
          }
        }
      },
      clickshop(item) {
        console.log(item.license)
        this.$router.push({
          path: "/home/inventory2Shop",
          query: {
            license: item.license,
          }
        })
      }
    }
  }

</script>

<style scoped>
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
    border: none
  }

  .tabcont {
    /* padding-top: 10px; */
    padding-bottom: 60px;
    background-color: #ffffff;
    position: relative;
    top: 10px;
  }

  .box {
    margin: 15px 0 15px 15px;
  }

  .tits2 {
    font-size: 15px;
    margin: 4px 0 5px 0;
    color: #333
  }

  .tits {
    font-size: 13px;
    color: #666
  }

  .count {
    font-size: 24px;
    margin: 0.13rem 0 0.13rem 0;
    color: #3D8EEF;
    float: right;
    /* color:; */
  }

  .name {
    font-weight: 500;
     font-size: 14px;
    margin-left: 10px;
    /* border-left: solid 3px #3D8EEF; */
    padding-left: 10px;
    margin-bottom: 12px;
    margin-top: 10px;
  }

  hr {
    border: none;
    color: gainsboro;
    width: 100%;
    margin: 10px 0;
    border-bottom: solid 1px gainsboro;
  }

  .span1 {
    display: inline-block;
    margin: 0 10px -2px 0;
    height: 20px;
    border: solid 1.5px #409eff;
    line-height: 20px;
  }

</style>
