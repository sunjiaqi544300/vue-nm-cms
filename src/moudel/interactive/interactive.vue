<template>
  <div class="page">
    <div class="firstpage">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label=" 调研问卷" name="first">
          <fristchild1></fristchild1>
        </el-tab-pane>
        
        <!-- <el-tab-pane label="活动查询" name="second" lazy>
          正在开发中。。。。。。
        </el-tab-pane>
        <el-tab-pane label="排名查询" name="third" lazy>
          <div class="mass1">
            <p class="name"> <span style='color:#000'>本店铺名称:</span><span style='color:#000'>{{shop_name||'暂无'}}</span>
            </p>
            <hr />
            <div class="content">
              <div class="textmessage">
                <p class="left_message1"> 本店铺烟草证号</p>
                <p class="model_message">:</p>
                <p class="right_message">{{license || "暂无"}}</p>
              </div>
              <div class="textmessage">
                <p class="left_message1"> 目前的档位</p>
                <p class="model_message">:</p>
                <p class="right_message">{{level || "暂无"}}</p>
              </div>
              <div class="textmessage">
                <p class="left_message1"> 商圈名称</p>
                <p class="model_message">:</p>
                <p class="right_message">{{biz_dist || "暂无"}}</p>
              </div>
              <div class="textmessage">
                <p class="left_message1"> 本店铺商圈排名</p>
                <p class="model_message">:</p>
                <p class="right_message">{{shop_accuqtyrank || "暂无"}}</p>
              </div>
              <div class="textmessage">
                <p class="left_message1"> 本商圈店铺数量</p>
                <p class="model_message">:</p>
                <p class="right_message">{{shop_accuqtyrank || "暂无"}}</p>
              </div>
              <div class="textmessage">
                <p class="left_message1"> 本商圈累计进货量在全区排名</p>
                <p class="model_message">:</p>
                <p class="right_message">{{biz_accuqtyrank || "暂无"}}</p>
              </div>
              <div class="textmessage">
                <p class="left_message1"> 本商圈三批平均价全区排名</p>
                <p class="model_message">:</p>
                <p class="right_message">{{biz_accuamtrank || "暂无"}}</p>
              </div>

            </div>
          </div>
          <div class="mass1">
            <p class="name">商圈趋势</p>
            <table border="1" cellspacing='0' cellpadding="0">
              <tr>
                <td> </td>
                <td>总户数</td>
                <td>进货量排名</td>
                <td>三批平均价排名</td>
                <td>毛利排名</td>
              </tr>
              <tr>
                <td>相同商圈</td>
                <td>{{funcnums}}</td>
                <td>{{funcaccuqtyrank}}</td>
                <td>{{funcaccustriprank}}</td>
                <td>{{funcaccuprofitrank}}</td>
              </tr>
              <tr>
                <td>相同商圈<br>相同档位</td>
                <td>{{flnums}}</td>
                <td>{{flaccuqtyrank}}</td>
                <td>{{flaccustriprank}}</td>
                <td>{{flaccuprofitrank}}</td>
              </tr>
              <tr>
                <td>本商圈</td>
                <td>{{nums}}</td>
                <td>{{accuqtyrank}}</td>
                <td>{{accustriprank}}</td>
                <td>{{accuprofitrank}}</td>
              </tr>
            </table>
          </div>
        </el-tab-pane> -->
      </el-tabs>
       <el-button type="primary" class="signout" size='mini' @click="signout">退出登录</el-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {
    getCookie,
    setCookie,
    delCookie
  } from "js/public.js"
  import fristchild1 from "moudel/interactive/fristchild1.vue"
  export default {
    name: "firstpage",
    data() {
      return {
        activeName: 'first',
        biz_dist: '',
        level: '',
        license: '',
        show: false,
        count_num: '',
        shop_accuqtyrank: '',
        biz_accuqtyrank: '',
        biz_accuamtrank: '',
        shop_name: '',
        options: [],
        value: '',
        center: [],
        names: '',
        shop: [],
        path: [],
        level: '',
        avg_qty: '',
        avg_profit: '',
        strip: '',
        funcnums: '',
        funcaccuqtyrank: '',
        flaccustriprank: '',
        funcaccuprofitrank: '',
        flnums: '',
        flaccuqtyrank: '',
        funcaccustriprank: '',
        flaccuprofitrank: '',
        nums: '',
        accuqtyrank: '',
        accustriprank: '',
        accuprofitrank: '',
        // flaselot: '',
      }
    },
    components: {
      fristchild1
    },
    mounted() {
        //  sessionStorage.setItem("flaselot", this.flaselot);
      let vm = this
      vm.$axios
        .get("/mprogram/api/rank/")
        .then(function (response) {
          vm.funcnums = response.data.rank.funcnums
          vm.funcaccuqtyrank = response.data.rank.funcaccuqtyrank
          vm.funcaccuprofitrank = response.data.rank.funcaccuprofitrank
          vm.flaccustriprank = response.data.rank.flaccustriprank
          vm.flnums = response.data.rank.flnums
          vm.flaccuqtyrank = response.data.rank.flaccuqtyrank
          vm.funcaccustriprank = response.data.rank.funcaccustriprank
          vm.flaccuprofitrank = response.data.rank.flaccuprofitrank
          vm.accuqtyrank = response.data.rank.accuqtyrank
          vm.nums = response.data.rank.nums
          vm.accustriprank = response.data.rank.accustriprank
          vm.accuprofitrank = response.data.rank.accuprofitrank
          vm.biz_dist = response.data.data[0].biz_dist
          vm.level = response.data.data[0].level
          vm.license = response.data.data[0].license
          vm.shop_name = response.data.data[0].shop_name
          vm.count_num = response.data.data[0].count_num
          vm.shop_accuqtyrank = response.data.data[0].shop_accuqtyrank
          vm.biz_accuqtyrank = response.data.data[0].biz_accuqtyrank
          vm.biz_accuamtrank = response.data.data[0].biz_accuamtrank
          // vm.options = response.data
          console.log(response.data)
        });
    },
    methods:{
       signout() {
        console.log('00')
        //
        if( sessionStorage.getItem("flaselot") === 'false'){
          //  alert('请填写完成问卷信息')
           this.$message({
          message: '您尚未完成问卷填写，请继续操作，谢谢配合',
          type: 'warning'
        });
          console.log(sessionStorage.getItem("flaselot"))
        }else{
               delCookie('token')
        localStorage.removeItem('token')
        this.$router.push('/')
        }
        
       


      },
    }
  }

</script>

<style scoped>
.signout{
  margin-top: 120px;
  margin-left: 300px;
}
  .card {
    padding: 20px 0 0 0;
  }

  table {
    text-align: center;
    margin: 0 auto;
    width: 95%;
    border: solid #F0F0F0;
    border-width: 1px 0px 0px 1px;
    color: gray;
  }

  td {
    width: 13%;
    height: 0.6rem;
    border: solid #F0F0F0;
    border-width: 0px 1px 1px 0px;
  }

</style>
