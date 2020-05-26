<template>
  <div>
    <div class="tabcont">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="零售户消费问卷" name="first">
          <div class="tablist">

            <span type="primary" v-for="(item,index) in class_list" :key="index" @click="tabFn(item,index)"
              :class=" activeIndex==index ? 'active': ''">{{item}}</span>
          </div>
          <div class="tabcont-item tabcont-1">
            <div class="bigbox">
              <div class="box">
                <p class='title'>本次问卷共有{{dataall.length}}道题，选择最适合您的选项完成调查</p>
                <div v-for="(item,index1) in dataall" :key="index1" class="box-in">
                  ({{index1+1}}.{{item.requireds}}).{{item.q_type}}: <br />
                  <p style="margin:10px 0">{{item.question}}:</p>
                  <el-radio-group v-model="item.answer" v-if="item.q_type=='单选题'">
                    <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                      style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
                  </el-radio-group>
                  <div v-if="item.q_type =='多选题'">
                    <el-checkbox-group v-model="item.checkList" v-if="item.checkList">
                      <el-checkbox style="display:block;margin-left:15px" v-for="(value,key,index) in item.options"
                        :key="index" :label="key" v-if="value !=null">
                        {{key}}.{{value}}</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="item.answer" v-else>
                      <el-checkbox v-if="value !=null" v-for="(value,key1,index) in item.options" :key="index"
                        :label="key1">
                        {{key1}}.{{value}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-if="item.q_type =='单选填空'">
                    <div v-if="item.type == 1">
                      <el-radio-group v-model="item.answer_id">
                        <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                          style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
                      </el-radio-group>
                      <div>
                        <el-input v-model="item.answer" v-if="item.answer_id  == opat[index1]"
                          style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入">
                        </el-input>
                      </div>

                    </div>
                  </div>
                  <div v-if="item.q_type=='问答题'">
                    <el-input v-model="item.answer" style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入">
                    </el-input>
                  </div>
                </div>
                <el-button type="success" @click="submit()" class="but">提交</el-button>
                <p> &nbsp;</p>
                <p> &nbsp;&nbsp; </p>
                <p> &nbsp;</p>
                <p> &nbsp;</p>
                <p> &nbsp;</p>
              </div>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="消费者信息采集" name="second">



          <div class="tabcont-item tabcont-1">
            <div class="bigbox">
              <div class="box">
                <p class='title'>本次问卷共有{{dataall.length}}道题，选择最适合您的选项完成调查</p>
                <div v-for="(item,index1) in dataall" :key="index1" class="box-in">
                  ({{index1+1}}.{{item.requireds}}).{{item.q_type}}: <br />
                  <p style="margin:10px 0">{{item.question}}:</p>
                  <el-radio-group v-model="item.answer" v-if="item.q_type=='单选题'">
                    <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                      style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
                  </el-radio-group>
                  <div v-if="item.q_type =='多选题'">
                    <el-checkbox-group v-model="item.checkList" v-if="item.checkList">
                      <el-checkbox style="display:block;margin-left:15px" v-for="(value,key,index) in item.options"
                        :key="index" :label="key" v-if="value !=null">
                        {{key}}.{{value}}</el-checkbox>
                    </el-checkbox-group>
                    <el-checkbox-group v-model="item.answer" v-else>
                      <el-checkbox v-if="value !=null" v-for="(value,key1,index) in item.options" :key="index"
                        :label="key1">
                        {{key1}}.{{value}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div v-if="item.q_type =='单选填空'">
                    <div v-if="item.type == 1">
                      <el-radio-group v-model="item.answer_id">
                        <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                          style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
                      </el-radio-group>
                      <div>
                        <el-input v-model="item.answer" v-if="item.answer_id  == opat[index1]"
                          style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入">
                        </el-input>
                      </div>

                    </div>
                  </div>
                  <div v-if="item.q_type=='问答题'">
                    <el-input v-model="item.answer" style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入">
                    </el-input>
                  </div>
                </div>
                <el-button type="success" @click="submit()" class="but">提交</el-button>
                <p> &nbsp;</p>
                <p> &nbsp;&nbsp; </p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
              </div>
            </div>
          </div>


        </el-tab-pane>
      </el-tabs>

      <!-- <div class="tabcont-item tabcont-1" v-if="tabactive == 2">
        <div class="bigbox">
          <div class="box">
            <p class='title'>本次问卷共有{{data.length}}道题，选择最适合您的选项完成调查</p>
            <div v-for="(item,index) in data" :key="index" class="box-in" v-if="item.q_class=='B'">
              {{index+1}}.{{item.q_type}}: <br />
              <p style="margin:10px 0">{{item.question}}:</p>
              <el-radio-group v-model="item.answer" v-if="item.q_type=='单选题'">
                <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                  style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
              </el-radio-group>
              <div v-if="item.q_type =='多选题'">
                <el-checkbox-group v-model="item.checkList" v-if="item.checkList">
                  <el-checkbox style="display:block;margin-left:15px" v-for="(value,key,index) in item.options"
                    :key="index" :label="key" v-if="value !=null">
                    {{key}}.{{value}}</el-checkbox>
                </el-checkbox-group>
                <el-checkbox-group v-model="item.answer" v-else>
                  <el-checkbox v-if="value !=null" v-for="(value,key1,index) in item.options" :key="index"
                    :label="key1">
                    {{key1}}.{{value}}
                  </el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="item.q_type =='单选填空'">
                <div v-if="item.type == 1">
                  <el-radio-group v-model="item.answerid">
                    <el-radio v-for="(value,key,index) in item.options" :key="index" :label="key"
                      style="display:block;margin-left:15px" v-if="value !=null">{{key}}.{{value}}</el-radio>
                  </el-radio-group>
                  <div v-if="item.answertext != '' && item.answertext">
                    <el-input v-model="item.answer" v-if="item.answerid==opat[index]" style="padding:2px 6px 6px 6px"
                      type="textarea" placeholder="请输入不合适的原因">
                    </el-input>
                  </div>
                  <div v-else>
                    <el-input v-model="item.answer" v-if="item.answerid==opat[index]" style="padding:2px 6px 6px 6px"
                      type="textarea" placeholder="请输入不合适的原因">
                    </el-input>
                  </div>
                </div>
              </div>
              <div v-if="item.q_type=='问答题'">
                <el-input v-model="item.answer" style="padding:2px 6px 6px 6px" type="textarea" placeholder="请输入">
                </el-input>
              </div>
            </div>
            <el-button type="success" @click="submit" class="but">提交</el-button>
            <p> &nbsp;</p>
            <p> &nbsp;&nbsp; </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div> -->
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
        activeName: 'first',
        activeIndex: 0,
        tabactive: 1,
        dataall: [],
        tablist: [{
            id: 4,
            name: "签到签退",
            select: true,
          }, {
            id: 2,
            name: "活动查询",
            select: false,
          }, {
            id: 3,
            name: "市场调研",
            select: false,
          },
          {
            id: 1,
            name: "信息采集",
            select: false,
          }
        ],
        aaa: ["a", "b"],
        checkList: ['选中且禁用', '复选框 A'],
        img: [{
          bg: require('images/bgs.png')
        }, ],
        radio: "",
        answer: [],
        answer1: [],
        opat: [],
        arraynew: [],
        survey: '',
        qId1: '',
        checkList: [],
        required: '',
        qId2: '',
        data: [],
        smoothly: false,
        class_list: '',
      }
    },
    mounted: function () {
      console.log(this.datalicense)
      let vm = this
      vm.$axios.get(`${this.$apihost}` + "/wechat/api/survey_shop/?license=" + this.datalicense + '&stype=1').then(
        function (
          response) {
          // console.log(response)
          vm.class_list = response.data.class_list
          vm.arraynew = response.data.data
          // let arraynew = []
          //  let required = ''
          //问题数组
          for (var i = 0; i < response.data.data.length; i++) {
            if (response.data.data[i].q_class == vm.class_list[0]) {

              if (response.data.data[i].required == true) {
                //  vm.required  = '必填'
                response.data.data[i].requireds = '必填'
                console.log(response.data.data[i].q_type)
              }
              if (response.data.data[i].q_type == "单选填空") {
                response.data.data[i].type = 1
                let a = {};
                Object.keys(response.data.data[i].options).forEach(item => {
                  if (response.data.data[i].options[item] != null) {
                    a[item] = response.data.data[i].options[item];
                  }
                })

                vm.opat[i] = Object.keys(a)[Object.keys(a).length - 1]
                console.log(vm.opat[i])
                // vm.opat[response.data.data[i].q_id] = Object.keys(a)[Object.keys(a).length - 1]
                //  console.log(vm.opat[response.data.data[i].q_id])
              }
              //      vm.dataall.push(Object.assign({}, response.data.data[i], {
              //   answer: response.data.data[i].q_type == "多选题" ? checkList.concat(response.data.data[i].options) : "",
              // }))
              vm.dataall.push(response.data.data[i])
            }
          }
          // vm.ans = response.data.data
          // let ans = response.data.data
          // let checkList = []
          // let anslist = []
          // for (let index = 0; index < array.length; index++) {
          //   vm.arraynew.push(Object.assign({}, array[index], {
          //     answer: array[index].q_type == "多选题" ? checkList.concat(array[index].options) : "",
          //   }))
          //   if (vm.arraynew[index].q_type == "单选填空") {

          //     vm.arraynew[index].type = 1

          //     let a = {};
          //     Object.keys(array[index].options).forEach(item => {
          //       if (array[index].options[item] != null) {
          //         a[item] = array[index].options[item];
          //       }
          //     })
          //     console.log(Object.keys(a))
          //     vm.opat[index] = Object.keys(a)[Object.keys(a).length - 1]

          //     // console.log(array[index].id)
          //     // console.log(array[index].options[Object.keys(array[index].options)[Object.keys(array[index]
          //     //   .options).length - 1]])

          //     console.log(vm.opat[index])
          //   }
          //   for (let i = 0; i < ans.length; i++) {
          //     if (array[index].id == ans[i].q_id) {
          //       if (array[index].q_type == "多选题") {
          //         ans[i].answer = ans[i].answer.split(",")
          //       } else if (array[index].q_type == "单选填空") {
          //         let a = {};
          //         Object.keys(array[index].options).forEach(item => {
          //           if (array[index].options[item] != null) {
          //             a[item] = array[index].options[item];
          //           }
          //         })
          //         // console.log(a)
          //         vm.opat[index] = Object.keys(a)[Object.keys(a).length - 1]
          //         // console.log(vm.opat)
          //         // if (array[index].question == "该零售户是否合适？") {
          //         let ansitem = ans[i].answer
          //         ans[i].type = 1 //判断当前类型是不是    该零售户是否合适？类型
          //         if (ansitem != null) {
          //           ans[i].answerid = ansitem.split(",")[0]
          //           ans[i].answer = ansitem.split(",")[1]
          //           ans[i].answertext = ansitem.split(",")[1]
          //           console.log(ans[i].answerid)
          //           console.log(ans[i].answertext)
          //         } else {
          //           ans[i].answerid = ansitem
          //           ans[i].answer = ansitem
          //           ans[i].answertext = ansitem
          //           console.log(ans[i].answerid)
          //           console.log(ans[i].answertext)
          //         }
          //         // } else {
          //         //   ans[i].answer = ans[i].answer.split(",")[0]
          //         //   // ans[i].answertext = ans[i].answer.split(",")[1]
          //         // }
          //       } else {
          //         ans[i].answer = ans[i].answer
          //         // console.log('033')
          //       }
          //       //  arraynew.push(Object.assign({}, array[index],''))
          //       vm.arraynew[index].q_id = ans[i].q_id
          //       vm.arraynew[index].answerid = ans[i].answerid

          //       vm.arraynew[index].answer = ans[i].answer
          //     }
          //   }
          //   // console.log('999')
          // }
          // console.log(vm.arraynew)
          // for (var i = 0; i < vm.arraynew.length; i++) {
          //   if (vm.arraynew[i].q_class == vm.class_list[0]) {
          //     vm.dataall.push(vm.arraynew[i])
          //   }
          // }
          // vm.data = response.data.data
          vm.survey = response.data.survey_id
        })
    },
    methods: {
      // 第一层tab切换
      handleClick(tab, event) {
        console.log(tab.name);

        if (tab.name == 'second') {
          let vm = this
          vm.dataall = []
          vm.$axios.get(`${this.$apihost}` + "/wechat/api/survey_shop/?license=" + this.datalicense + '&stype=4').then(
            function (
              response) {
              // console.log(response)
              vm.class_list = response.data.class_list
              vm.arraynew = response.data.data
              // let arraynew = []
              //  let required = ''
              //问题数组
              for (var i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].q_class == vm.class_list[0]) {

                  if (response.data.data[i].required == true) {
                    //  vm.required  = '必填'
                    response.data.data[i].requireds = '必填'
                    console.log(response.data.data[i].q_type)
                  }
                  if (response.data.data[i].q_type == "单选填空") {
                    response.data.data[i].type = 1
                    let a = {};
                    Object.keys(response.data.data[i].options).forEach(item => {
                      if (response.data.data[i].options[item] != null) {
                        a[item] = response.data.data[i].options[item];
                      }
                    })

                    vm.opat[i] = Object.keys(a)[Object.keys(a).length - 1]
                    console.log(vm.opat[i])
                    // vm.opat[response.data.data[i].q_id] = Object.keys(a)[Object.keys(a).length - 1]
                    //  console.log(vm.opat[response.data.data[i].q_id])
                  }
                  //      vm.dataall.push(Object.assign({}, response.data.data[i], {
                  //   answer: response.data.data[i].q_type == "多选题" ? checkList.concat(response.data.data[i].options) : "",
                  // }))
                  vm.dataall.push(response.data.data[i])
                }
              }
              vm.survey = response.data.survey_id
            })
        } else if (tab.name == 'first') {
          let vm = this
          vm.dataall = []
          vm.$axios.get(`${this.$apihost}` + "/wechat/api/survey_shop/?license=" + this.datalicense + '&stype=1').then(
            function (
              response) {
              // console.log(response)
              vm.class_list = response.data.class_list
              vm.arraynew = response.data.data
              // let arraynew = []
              //  let required = ''
              //问题数组
              for (var i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].q_class == vm.class_list[0]) {

                  if (response.data.data[i].required == true) {
                    //  vm.required  = '必填'
                    response.data.data[i].requireds = '必填'
                    console.log(response.data.data[i].q_type)
                  }
                  if (response.data.data[i].q_type == "单选填空") {
                    response.data.data[i].type = 1
                    let a = {};
                    Object.keys(response.data.data[i].options).forEach(item => {
                      if (response.data.data[i].options[item] != null) {
                        a[item] = response.data.data[i].options[item];
                      }
                    })
                    vm.opat[i] = Object.keys(a)[Object.keys(a).length - 1]
                    console.log(vm.opat[i])
                    // vm.opat[response.data.data[i].q_id] = Object.keys(a)[Object.keys(a).length - 1]
                    //  console.log(vm.opat[response.data.data[i].q_id])
                  }
                  //   vm.dataall.push(Object.assign({}, response.data.data[i], {
                  //   answer: response.data.data[i].q_type == "多选题" ? checkList.concat(response.data.data[i].options) : "",
                  // }))
                  vm.dataall.push(response.data.data[i])
                }
              }
              vm.survey = response.data.survey_id
            })
        }
      },
      // 消费者零售户tab切换
      tabFn(num, acindex) {
        console.log(12312)
        let vm = this;
        vm.activeIndex = acindex
        vm.dataall = []
        vm.opat = []
        // let checkList = []
        for (var i = 0; i < vm.arraynew.length; i++) {
          if (vm.arraynew[i].q_class == num) {
            vm.dataall.push(vm.arraynew[i])
          }
        }

        for (var i = 0; i < vm.dataall.length; i++) {

          if (vm.dataall[i].required == true) {
            //  vm.required  = '必填'
            vm.dataall[i].requireds = '必填'
            // console.log(vm.arraynew[i].q_type)
          }
          if (vm.dataall[i].q_type == "单选填空") {
            vm.dataall[i].type = 1
            let a = {};
            Object.keys(vm.dataall[i].options).forEach(item => {
              if (vm.dataall[i].options[item] != null) {
                a[item] = vm.dataall[i].options[item];
              }
            })
            // console.log(Object.keys(a))
            vm.opat[i] = Object.keys(a)[Object.keys(a).length - 1]
            // console.log(vm.opat[i],'-----',i)
            // vm.opat[vm.arraynew[i].q_id] = Object.keys(a)[Object.keys(a).length - 1]
          }
          //    vm.dataall.push(Object.assign({}, vm.arraynew[i], {
          //   answer: vm.arraynew[i].q_type == "多选题" ? checkList.concat(vm.arraynew[i].options) : "",
          // }))
        }
        // console.log(vm.dataall)
      },

      submit() {
        let vm = this
        // for (let index = 0; index < vm.arraynew.length; index++) {
        //   if (vm.arraynew[index].q_class == vm.umss) {

        //     vm.dataall.push(vm.arraynew[index])
        //   }
        // }
        for (let index2 = 0; index2 < vm.dataall.length; index2++) {
          if (vm.dataall[index2].required == true) {
            if (vm.dataall[index2].q_type == "单选填空") {
              // console.log(vm.dataall[index].answer_id,vm.opat[index])
              if (vm.dataall[index2].answer_id == vm.opat[index2]) {
                // console.log(vm.dataall[index].answer,'-----',vm.dataall[index].answer_id);
                if (vm.dataall[index2].answer == '' || vm.dataall[index2].answer_id == '') {
                  vm.$message.error('请填写完整，再提交');
                  return
                }

              } else if (vm.dataall[index2].answer_id == '') {
                //console.log(vm.dataall[index].answer,'-----',vm.dataall[index].answer_id);
                vm.$message.error('请填写完整，再提交');
                return
              }
            } else if (vm.dataall[index2].answer == '') {
              vm.$message.error('请填写完整，再提交');
              return
            } else {
              vm.smoothly = true
            }
            // if (vm.dataall[index].answer == '' && vm.dataall[index].answer_id == '') {
            //   vm.$message.error('请填写完整，再提交222');
            //   return
            // } else if (vm.dataall[index].q_type == "单选填空") {
            //   if (vm.dataall[index].answer_id == vm.opat[index.q_id]) {
            //     if (vm.dataall[index].answer == '' && vm.dataall[index].answer_id == '') {
            //       vm.$message.error('请填写完整，再提交1');
            //       return
            //     }
            //   }
            // } else {
            //   vm.smoothly = true
            // }



          } else if (vm.dataall[index2].required == null || vm.dataall[index2].required == false) {
            if (vm.dataall[index2].q_type == "单选填空") {
              if (vm.dataall[index2].answer_id == vm.opat[index2]) {
                if (vm.dataall[index2].answer == '' && vm.dataall[index2].answer_id == '') {
                  vm.$message.error('请填写完整，再提交1');
                  return
                }
              }
              // console.log(vm.data[index])
            } else {
              vm.smoothly = true
            }
          }
          // console.log(vm.data[index].answer)
          // let anslist = vm.dataall[index].answer
          // if (vm.arraynew[index].q_type == "单选填空") {
          //   if (vm.arraynew[index].answer_id == vm.opat[index]) {
          //     if (vm.arraynew[index].answer == "") {
          //       vm.$message.error('请填写完整，再提交');
          //       return
          //     }
          //   }
          //   // console.log(vm.data[index])
          // } else {
          //   console.log(anslist)
          //   if (anslist != "") {
          //     // console.log('04')
          //     vm.smoothly = true
          //   } else {
          //     console.log('05') 
          //     vm.smoothly = false
          //     vm.$message.error('请填写完整，再进行提交');
          //     return
          //   }
          // }

        }
        if (vm.smoothly == true) {
          console.log('06')
          let vm = this
          let subarray = []
          let array = vm.arraynew
          // console.log(array)

          for (let index = 0; index < array.length; index++) {
            // console.log(array[index].answer, index)
            let a = {};
            Object.keys(array[index].options).forEach(item => {
              if (array[index].options[item] != null) {
                a[item] = array[index].options[item];
              }
            })
            // console.log(Object.keys(a))
            vm.opat[index] = Object.keys(a)[Object.keys(a).length - 1]
            console.log(vm.opat[index], index)
            subarray.push(Object.assign({}, {}, {
              s_id: vm.survey,
              q_id: array[index].id,
              answer: array[index].q_type == "多选题" ? array[index].answer.slice(0, array[index].answer.length)
                .join(",") : array[index].q_type == "单选填空" && array[index].answer_id == vm.opat[index] ?
                array[index].answer_id + "," + array[index].answer : array[index].q_type == "单选填空" && array[index]
                .answer_id != vm.opat[index] ? array[index].answer_id : array[index].answer,
              // answer:array[index].answer,
              license: this.datalicense
            }))
          }
          console.log(subarray)
          vm.$axios.post(`${this.$apihost}` + "/wechat/api/answer/", {
            "answer_list": subarray
          }).then(function (response) {
            // console.log(response)
            vm.$message({
              message: "提交成功",
              type: "success"
            });
            window.scrollTo(0, 0);
          })
        }
      }
    }
  }

</script>
<style scoped>
  .tablist span {
    padding: 3px 20px;
    /* display: inline-block;
    vertical-align: middle;
    flex: 1;
    font-size: 16px;
    padding: 8px 50px;
    border-right: 1px solid #dddddd; */
  }


  .tablist span.active {
    background: rgb(196, 213, 243);
  }

  .tablist span:last-child {
    border: none
  }

  .tablist {
    display: flex;
    justify-content: space-around;
    font-size: 14px;
    margin-bottom: 5px;
  }

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

  /* .el-checkbox-group .el-checkbox:nth-of-type(1) {
    margin-left: 30px;
  } */

  .but {
    width: 90%;
    margin-left: 4%;
    margin-top: 10px;
    /* position: absolute;
    bottom:0; */
    /* background: #3B8EF0; */
  }

</style>
