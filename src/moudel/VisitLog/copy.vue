<template>
  <div>
    <div class="bigbox">
      <div class="box">
        <p class='title'>本问卷共有{{data.length}}道题，选择最适合您的选项完成调查</p>
        <div v-for="(item,index) in data" :key="index" class="box-in">
          {{index+1}}.{{item.q_type}}: <br />
          <p style="margin:10px 0">{{item.question}}:</p>
          <el-radio-group v-model="item.answer" v-if="item.q_type=='单选题'">
            <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
              style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
          </el-radio-group>
          <div v-if="item.q_type =='多选题'">
            <el-checkbox-group v-model="item.checkList" v-if="item.checkList">
              <el-checkbox style="display:block;margin-left:15px" v-for="(value,key,index) in item.options" :key="index"
                :label="key" v-if="value !=null">
                {{key}}.{{value}}</el-checkbox>
            </el-checkbox-group>
            <el-checkbox-group v-model="item.answer" v-else>
              <el-checkbox v-if="value !=null" v-for="(value,key1,index) in item.options" :key="index" :label="key1">
                {{key1}}.{{value}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
          <!-- {{item.q_type}} -->
          <div v-if="item.q_type =='单选填空'">
            <div v-if="item.type == 1">
              <el-radio-group v-model="item.answerid">
                <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                  style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
              </el-radio-group>
              <div v-if="item.answertext != '' && item.answertext">
                <el-input v-model="item.answer" v-if="item.answerid==opat[index]" style="padding:2px 6px 6px 6px"
                  type="textarea" placeholder="请输入">
                </el-input>
              </div>
              <div v-else>
                <el-input v-model="item.answer" v-if="item.answerid==opat[index]" style="padding:2px 6px 6px 6px"
                  type="textarea" placeholder="请输入">
                </el-input>
              </div>
            </div>
            <div v-else>
              <!-- <el-radio-group v-model="item.answer" >
                        <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                          style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
                      </el-radio-group> -->
            </div>
            <!-- 
             <el-radio-group v-model="item.answer"  v-if="item.answer1">
            <el-radio v-for="(value,key,index) in item.options"    :key="index" :label="key"  
              style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
          </el-radio-group>
           <el-input v-model="item.answer1" v-if="item.answer=='b'"  style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入不合适的原因">
            </el-input> -->
          </div>
          <div v-if="item.q_type=='问答题'">
            <el-input v-model="item.answer" style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入">
            </el-input>
          </div>
        </div>
        <el-button type="primary" @click="submit" class="but">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import qs from 'qs'
  import {
    fail
  } from 'assert';
  export default {
    props: {
      datalicense: String
    },
    data() {
      return {
        aaa: ["a", "b"],
        checkList: ['选中且禁用', '复选框 A'],
        img: [{
          bg: require('images/bgs.png')
        }, ],
        radio: "",
        answer: [],
        answer1: [],
        opat: [],
        survey: '',
        qId1: '',
        checkList: [],
        qId2: '',
        data: [],
        smoothly: false,
      }
    },
    mounted: function () {
      let vm = this
      vm.$axios.get(`${this.$apihost}` + "/wechat/api/survey_shop/?license=" + this.datalicense).then(function (
        response) {
        // console.log(response)
        let array = response.data.data
        let arraynew = []
        //问题数组
        vm.ans = response.data.answer
        let ans = response.data.answer
        // console.log(vm.answer)
        if (vm.ans.length > 0) {
          let checkList = []
          let anslist = []
          // console.log('1')
          for (let index = 0; index < array.length; index++) {
            for (let i = 0; i < ans.length; i++) {
              if (array[index].id == ans[i].q_id) {
                if (array[index].q_type == "多选题") {
                  ans[i].answer = ans[i].answer.split(",")
                } else if (array[index].q_type == "单选填空") {
                  // if(){

                  // }

                  // console.log(array[index].options[Object.keys(array[index].options)[Object.keys(array[index]
                  //   .options).length - 1]])
                  let a = {};
                  Object.keys(array[index].options).forEach(item => {
                    if (array[index].options[item] != null) {
                      a[item] = array[index].options[item];
                    }
                  })
                  console.log(a)
                  // if (array[index].options[Object.keys(array[index].options)[Object.keys(array[index].options).length - 1]] != null) {
                  //   console.log('0')
                  //   console.log(Object.keys(array[index].options)[Object.keys(array[index].options).length - 1])
                  // }else{
                  //   console.log('2')
                  //   console.log(Object.keys(array[index].options)[Object.keys(array[index].options).length - 1])
                  // }
                  vm.opat[index] = Object.keys(a)[Object.keys(a).length - 1]
                  console.log(vm.opat)
                  // if (array[index].question == "该零售户是否合适？") {
                  let ansitem = ans[i].answer
                  ans[i].type = 1 //判断当前类型是不是    该零售户是否合适？类型
                  if (ansitem != null) {
                    ans[i].answerid = ansitem.split(",")[0]
                    ans[i].answer = ansitem.split(",")[1]
                    ans[i].answertext = ansitem.split(",")[1]
                  } else {
                    ans[i].answerid = ansitem
                    ans[i].answer = ansitem
                    ans[i].answertext = ansitem
                  }

                  // } else {
                  //   ans[i].answer = ans[i].answer.split(",")[0]
                  //   // ans[i].answertext = ans[i].answer.split(",")[1]
                  // }
                } else {
                  ans[i].answer = ans[i].answer

                  // console.log('0')
                }
                arraynew.push(Object.assign({}, array[index], ans[i]))
              }
            }
          }
          // console.log(arraynew)
        } else {
          console.log('0')
          let checkList = []
          for (let index = 0; index < array.length; index++) {

            // console.log(Object.keys(array[index].options))
            arraynew.push(Object.assign({}, array[index], {
              answer: array[index].q_type == "多选题" ? checkList.concat(array[index].options) : "",
            }))
            if (arraynew[index].q_type == "单选填空") {
              arraynew[index].type = 1
              // if(array[index].id){
              let a = {};
              Object.keys(array[index].options).forEach(item => {
                if (array[index].options[item] != null) {
                  a[item] = array[index].options[item];
                }
              })
              console.log(Object.keys(a))
              // if (array[index].options[Object.keys(array[index].options)[Object.keys(array[index].options).length - 1]] != null) {
              //   console.log('0')
              //   console.log(Object.keys(array[index].options)[Object.keys(array[index].options).length - 1])
              // }else{
              //   console.log('2')
              //   console.log(Object.keys(array[index].options)[Object.keys(array[index].options).length - 1])
              // }
              vm.opat[index] = Object.keys(a)[Object.keys(a).length - 1]
              // }
              console.log(array[index].id)
              console.log(array[index].options[Object.keys(array[index].options)[Object.keys(array[index]
                .options).length - 1]])

              console.log(vm.opat)
            }
          }
        }
        //答案数组
        // let ans = response.data.answer
        // let ansnew=[]
        // for (let index = 0; index < ans.length; index++) {
        //   ansnew.push(Object.assign({}, ans[index], {
        //     answer: ''
        //   }))
        // } 
        vm.data = arraynew
        // console.log(vm.data)
        // console.log(response.data.survey_id)
        vm.survey = response.data.survey_id
      })
    },
    methods: {
      submit() {
        let vm = this

        for (let index = 0; index < vm.data.length; index++) {
          console.log(vm.data[index].answer)
          let anslist = vm.data[index].answer
          if (vm.data[index].q_type == "单选填空") {
            if (vm.data[index].answerid == vm.opat[index]) {
              if (vm.data[index].answer == "") {
                vm.$message.error('请填写完整，再进行提交');
                return
              }
            }
            // console.log(vm.data[index])
          } else {
            if (anslist != "") {
              console.log('04')
              vm.smoothly = true
            } else {
              console.log('05')
              vm.smoothly = false
              vm.$message.error('请填写完整，再进行提交');
              return
            }
          }

        }
        if (vm.smoothly == true) {
          console.log('06')
          let vm = this
          let subarray = []
          let array = vm.data
          for (let index = 0; index < array.length; index++) {
            subarray.push(Object.assign({}, {}, {
              s_id: vm.survey,
              q_id: array[index].id,
              answer: array[index].q_type == "多选题" ? array[index].answer.slice(0, array[index].answer.length)
                .join(",") : array[index].q_type == "单选填空" && array[index].answerid == vm.opat[index] ? array[index]
                .answerid + "," + array[index].answer : array[index].q_type == "单选填空" && array[index].answerid !=
                vm.opat[index] ? array[index].answerid : array[index].answer,
              license: this.datalicense
            }))
          }
          // console.log(subarray)
          vm.$axios.post(`${this.$apihost}` + "/wechat/api/answer/", {
            "answer_list": subarray
          }).then(function (response) {
            // console.log(response)
            vm.$message({
              message: "提交成功",
              type: "success"
            });
          })
        }



      }
    }
  }

</script>
<style scoped>
  .bigbox {
    width: 100%;
    position: relative;
    border: solid 1px #BBDAFF;
    background: url(../.../../../assets/img/bgs.png) no-repeat;
  }

  .box {
    /* border: solid 1px #3B8EF0; */
    margin: 30px 14px;
    /* background: #3B8EF0; */
  }

  .box-in {

    background: white;
    border: solid 5px #3B8EF0;
    box-sizing: border-box;
    margin: 0 0 6px 0;
    padding: 2px;
  }

  .title {
    color: white;
    background: #3B8EF0;
    /* height: 0.3rem;
  lighting-color: 0.3rem; */
    padding: 8px 0 4px 6px;
  }

  .el-radio+.el-radio {
    margin: 0;
  }

  .el-checkbox {
    display: block;
  }

  .el-checkbox-group .el-checkbox:nth-of-type(1) {
    margin-left: 30px;
  }

  .but {
    width: 90%;
    margin-left: 4%;
    margin-top: 10px;
    /* position: absolute;
    bottom:0; */
    background: #3B8EF0;
  }

</style>
