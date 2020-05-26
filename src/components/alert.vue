<!-- 弹出框模块 -->
<template>
  <div class="alert-wrap">
      <!--类型1-->
      <div class="alert-cont" v-if="type == 1">
           <div class="close-div">
                <i class="close"  @click="isshowFn"></i>
                <hr>
           </div>
            <div class="wrap-cont alert-cont1" :style="{'background-color':bgcolor}">
                <div class="table-div">
                <el-table class="tables" id="tb" :data="datalist" border :class="{bgcolor:bgcolor != '#ffffff' ? true : false}">
                        <el-table-column prop="shop_name" align="center" label="客户名称"></el-table-column>
                        <el-table-column prop="shop_address" align="center" label="地址"></el-table-column>
                        <el-table-column prop="contacts" align="center" label="负责人"></el-table-column>
                        <el-table-column prop="phone_no" align="center" label="电话"></el-table-column>
                        <el-table-column prop="demand" align="center" label="数量"  v-if="types == 1"></el-table-column>
                            <el-table-column prop="stock" align="center" label="数量"  v-if="types == 2"></el-table-column>
                    </el-table>
                </div>    
                <el-button @click="isshowFn">确定</el-button>
            </div>
      </div>
        <!--类型2-->  
        <div class="alert-cont alert-cont2" v-if="type == 2">
            <div class="wrap-cont">
                 <ul>
                    <li v-for="(item,index) in datalist" :key="index" @click="selectFn(item)">{{item.value}}</li>    
                </ul>   
            </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        bgcolor:String,
        datalist:Array,
        type:Number,
        types:Number
    },
  data () {
    return {
       tableData:[{
            product_name:"系统推荐",
            value1:"",
            value2:"",
            value3:"",
            value4:"",
            xiao:true,
       }]
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {
      selectFn(item){
            this.$emit("selectValue",item)
      },
      isshowFn(){
          this.$emit("isshowClick",false)
      },
      closeshowFn(){
          this.$emit("update:isshowClick",false)
      }
  }
}

</script>
<style scoped>
    .alert-cont2 ul li{
       padding: 15px 10px;
       text-align: center;
       border-bottom: 1px solid #dddddd;
    }

    .alert-cont.alert-cont2{
        width: 50%;
    }
    .alert-cont2 button{
        width: 100%;
        background: none;
        color:#789de4;
        border:none;
        font-size: 18px;
        text-align: center;
    }
    

    
    .tables{
        height: 180px;
        overflow: scroll;
    }
  
    .bgcolor tr{
        background: red;
    }
    .close-div{
        width: 40px;
        text-align: right;
        position: relative;
        left: 80%;
    }
    .close{
      width: 40px;
      height: 40px;
      display: inline-block;
      vertical-align: middle;
      background: url("../assets/img/icon-close.png") no-repeat;
      background-size: 100% 100%;
    }
    hr{
        width: 50%;
        height: 30px;
       border-right:2px solid #ffffff;
    }

    .alert-wrap{
        width: 100%;
        height: 100%;
        position: fixed;
        left: 0;
        top:0;
        background:rgba(51, 51, 51, 0.7);
        z-index: 9999;
    }
    .alert-cont{
        width: 80%;
        overflow:hidden;
        margin: 180px auto 0;
        position: relative;
    }
    .alert-cont .el-table{
        width: 100%;
    }
    .wrap-cont{
          background-color: #ffffff; 
           border-radius:10px;
          overflow: hidden;
           
    }
    .alert-cont .table-div{
        margin:15px;
    }
    .alert-cont1 button{
        width: 100%;
        height: 50px;
        background-color: #efefef;
        color:#789de4;
        border:none;
        font-size: 20px;
    }
    
</style>