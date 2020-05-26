<template>
  <div class="page">
    <ul v-if ="flg">
        <li class="arr" v-for="(item,index) in data" :key="index">
         ({{index+1}}) {{item.name}}  <span style="color:red;margin-left:10px;"  @click="examine(item)"> 查看 </span>
          <p> 问卷截止日期 : {{item.closingdate}}</p>
        </li>
    </ul>
    <div v-if="flg === false">
      <fristchild2 @backinfo="change"  :qustioninfo='qustioninfo' :flg ='flg' :datalicense='datalicense'></fristchild2>
    </div>
  </div>
</template>

<script>
import chirld3 from "moudel/interactive/fristchild1.vue"; 
import fristchild2 from 'moudel/interactive/fristchild2.vue'
  export default {
    name: "page",
    props: {
      datalicense: String
    },
    data() {
      return {
        data: [],
        qustioninfo:"",
        flg:true,
        s_id:""
      }
    },
    components: {
      fristchild2
    },
    comments:{
      fristchild2,
      chirld3
    },
    mounted() {
      let vm = this;
      // console.log(${this.datalicense?this.datalicens:'150102100003' })
      vm.$axios
        .get(`${this.$apihost}`+"/wechat/api/survey_shop/?license="+this.datalicense)
        .then(function (response) {
          console.log(response.data)
          vm.data = response.data
      });
    },
    methods: {
      change(data){
        // console.log(data) 
        this.flg  = data
      },
      examine(item){
        this.qustioninfo = item;
        this.flg  = false
        console.log(item)
        // this.$router.push({
        //     path: "myBusiness/fristchild2",
        //     query: {
        //       item: item,
        //     }
        // })
      }
    }
  }

</script>

<style scoped>
.page{
  padding-top: 10px;
}
ul li{
  margin: 10px 10px 25px 10px;
  font-size: 18px;
  border:  1px #333 ;
}
.arr{
  background: #409EFF;
  padding: 10px;
  border-radius: 10px;
  color: #fff;
}
</style>
