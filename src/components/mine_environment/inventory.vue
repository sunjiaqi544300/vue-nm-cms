<template>
  <div>
    <!-- <div class="bigbox">
      <div class="box">
        <p class='title'>本问卷共有{{data.length}}道题，选择最适合您的选项完成调查</p>
        <div v-for="(item,index) in data" :key="index" class="box-in">
          {{index+1}}.{{item.q_type}}: <br />
          <p style="margin:10px 0">{{item.question}}:</p>
          <el-radio-group v-model="radio" v-if="item.q_type=='单选题'">
            <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
              style="display:block;margin-left:0.4rem">{{key}}.{{value}}</el-radio>
          </el-radio-group>

          <div v-if="item.q_type=='问答题'">
              <el-input v-model="answer[index]"  type="textarea" placeholder="请输入"></el-input>
          </div>
        </div>
          <el-button type="primary"  @click="submit" class="but">提交</el-button>
      </div>
    </div> -->
  </div>
</template>
<script>
import qs from 'qs'
  export default {
    data() {
      return {
        img: [{
          bg: require('../.../../../assets/img/bgs.png')
        },],
        radio: "",
        answer: [],
        answerlist:[],
        survey:'',
        qId1:'',
        qId2:'',
        data: []
      }
    },
    mounted: function () {
      let vm = this
      vm.$axios.get("http://192.168.1.3:8000/datawise/api/survey_shop/?license=110101200060").then(function (response) {
      // vm.$axios.get("http://192.168.1.3:8000/datawise/api/survey/").then(function (response) {
        console.log(response)
        vm.data = response.data.data
        vm.survey = response.data.survey_id
        vm.qId1= response.data.data[0].id
        vm.qId2= response.data.data[1].id
      })
    },
    methods: {
      submit() {
     
  
    if(this.radio==''){
          // this.$message.error('请全部填写完整，在进行提交');
    }
   let vm = this
   vm.answerlist = [
     {"s_id":vm.survey, "q_id":vm.qId1, "answer":vm.radio, "license":"110101200060"},
     {"s_id":vm.survey, "q_id":vm.qId2, "answer":vm.answer, "license":"110101200060"}
   ]
      vm.$axios.post("http://192.168.1.3:8000/datawise/api/answer/",qs.stringify({
         "answer_list": vm.answerlist
      })
      ).then(function (response) {
        console.log(response)
        // vm.data = response.data.data
        // vm.survey = response.data.data.survey_id
      })
        console.log(this.radio)
        console.log(this.answer)
      }
    }
  }

</script>
<style scoped>
  .bigbox {
    width: 100%;
    border: solid 1px #BBDAFF;
    background: url(../.../../../assets/img/bgs.png) no-repeat;
  }

  .box {
    /* border: solid 1px #3B8EF0; */
    margin: 0.8rem 0.2rem;
    /* background: #3B8EF0; */
  }

  .box-in {
    background: white;
    border: solid 5px #3B8EF0;
    box-sizing: border-box;
    margin: 0 0 0.2rem 0;
    padding: 2px;
  }

  .title {
    color: white;
    background: #3B8EF0;
    /* height: 0.3rem;
  lighting-color: 0.3rem; */
    padding: 0.15rem 0 0.05rem 0.2rem;
  }

  .el-radio+.el-radio {
    margin: 0;
  }

  .but {
    width: 90%;
    margin-left:4%;
    background: #3B8EF0;
  }

</style>
