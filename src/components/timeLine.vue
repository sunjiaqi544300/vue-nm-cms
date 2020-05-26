<!-- 进度流程 -->
<template>
  <div class="time-line-div">
       <div class="time-line-item" v-for="(item,index) in v_list" :key="index">
            <div class="times-left">
                <i class="success el-icon-success"></i>
                <div class="line" v-if="index+1 != v_list.length"></div>
            </div>
            <div class="times-right">
                <p class="time-title">{{item.sign_time}} - {{item.sign_type}}</p>
                <p><i class="el-icon-location-outline"></i>{{item.sign_address}}</p>
            </div>
       </div>
  </div>
</template>

<script>
export default {
    props:{
        v_list:Array
    },
  data () {
    return {
       
    };
  },

  components: {},

  computed: {},

  mounted(){},

  methods: {}
}

</script>
<style scoped>
.times-right p{
    font-size: 16px;
    color: #333333;
}
.times-right p:last-child{
    margin-top: 10px;
}
.times-right p i{
    font-size: 26px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
}
.time-title{
    font-size: 18px;
    margin-bottom: 8px;
}

.times-right{
    padding: 15px 10px;
    background: #f4f4f4;
    border-radius:6px;
}

.time-line-div{
    width: 90%;
    margin: 10px auto;
}
.success{
    font-size: 40px;
    color: green;
}
.times-left{
    width: 40px;
    display: inline-block;
    vertical-align: middle;
    position: relative;
    /* flex: 1; */
}
.time-line-div .time-line-item{
    position: relative;
    margin-top: 20px;
}
.times-left i{
     display: inline-block;
    vertical-align: middle;
    top: 20px;
     position: relative;
    z-index: 10;
     background-color: #ffffff;
   
}
.times-right{
    min-width: 80%;
    display: inline-block;
    vertical-align: top;
    margin-left: 20px;
}
.line{
    width: 2px;
    height: 100px;
    background:#dddddd;
    margin: 0 auto;
    position: absolute;
    border-color: inherit;
    left: 20px;
    z-index: 0;
    background-color: #ccc;
}
</style>