<template>
  <div>
    <div id="header-top" @click="backinfo()">
      <i class="el-icon-arrow-left back-left"></i>
      <span class="center">返回</span>
    </div>
    <div class="tabcont">
      <div class="tablist">
        <span
          type="primary"
          v-for="(item,index) in class_list2"
          :key="index"
          @click="tabFn(item,index)"
          :class=" activeIndex==index ? 'active': ''"
        >{{item}}</span>
      </div>
      <div class="tabcont-item tabcont-1">
        <div class="bigbox">
          <div class="box">
            <p class="title">本次问卷共有{{dataall.length}}道题，选择最适合您的选项完成调查</p>
            <div v-for="(item,index1) in dataall" :key="index1" class="box-in">
              <!-- ({{index1+1}})<span style="color:red">{{item.required===0?"":"*"}}</span>.{{item.q_type}}:
              <br />-->
              <p style="margin:10px 0 10px 0px">
                <span>{{index1+1}}.</span>
                &nbsp;{{item.question}}
                <span
                  style="color:red"
                >{{item.required===0?"":"*"}}</span>
              </p>
              <el-radio-group v-model="item.answer" v-if="item.q_type=='单选题'">
                <el-radio
                  v-for="(value,key,index) in item.options"
                  :key="index"
                  :label="key"
                  style="display:block;margin:5px 0 5px 10px;"
                  v-if="value !=null && value != ''"
                >{{key}}.{{value}}</el-radio>
              </el-radio-group>
              <div v-if="item.q_type =='多选题'">
                <el-checkbox-group v-model="item.answer">
                  <el-checkbox
                    style="margin:5px 0 5px 10px"
                    v-if="value !=null && value != ''"
                    v-for="(value,key1,index) in item.options"
                    :key="index"
                    :label="key1"
                  >{{key1}}.{{value}}</el-checkbox>
                </el-checkbox-group>
              </div>
              <div v-if="item.q_type =='单选填空'">
                <el-radio-group v-model="item.answer_id">
                  <el-radio
                    v-for="(value,key,index) in item.options"
                    :key="index"
                    :label="key"
                    @change="hide(value,key,item)"
                    style="display:block;margin:5px 0 5px 10px;"
                    v-if="value !=null && value != ''"
                  >{{key}}.{{value}}</el-radio>
                </el-radio-group>
                <div>
                  <el-input
                    v-model="item.answer"
                    v-if="item.edit || item.answer !=''"
                    :maxlength="item.maxlen"
                    style="margin:5px 0 5px 10px;width:85%;display:block"
                    :type="item.datatype==='数值'?'number':'textarea'"
                    :placeholder="`${item.datatype==='数值'?'请输入数值':'请输入文本'}`"
                  ></el-input>
                  <span v-if="item.datatype==='数值'">
                    <span
                      style="color:red"
                      v-for="(demo,index) in yzmatrix"
                      :key="index"
                    >{{`请输入${demo.minnum}—${demo.maxnum}之间的值`}}</span>
                  </span>
                  <span v-if="item.datatype==='数值'">
                    <span
                      style="color:red"
                      v-for="(demo,index) in objectarr"
                      :key="index"
                    >{{demo.id===item.id?`请输入${demo.minnum}—${demo.maxnum}之间的值`:""}}</span>
                  </span>
                  <!-- <el-input
                      v-model="item.answer" 
                      v-if="item.answer_id  == opat[index1]"
                      style="padding:2px 6px 6px 6px"
                      type="textarea"
                      placeholder="请输入不合适的原因"
                  ></el-input>-->
                </div>
              </div>
              <div v-if="item.q_type=='问答题'">
                <el-input
                  @change="Verification(item)"
                  :maxlength="item.maxlen"
                  v-model="item.answer"
                  style="margin:5px 0 5px 10px;width:85%;display:block"
                  :type="item.datatype==='数值'?'number':'textarea'"
                  :placeholder="`${item.datatype==='数值'?'请输入数值':'请输入文本'}`"
                ></el-input>
                <span v-if="yzmatrix.length>0">
                  <span
                    style="color:red;"
                    v-for="(demo,index) in yzmatrix"
                    :class="[yzmatrix[index].id===item.id?`a123`:`b123`]"
                    :key="index"
                  >{{demo.id===item.id?`请输入${demo.minnum}—${demo.maxnum}之间的值`:""}}</span>
                </span>
                <span v-else>
                  <span
                    style="color:red;"
                    v-for="(demo,index) in objectarr"
                    :class="[objectarr[index].id===item.id?`a123`:`b123`]"
                    :key="index"
                  >{{demo.id===item.id?`请输入${demo.minnum}—${demo.maxnum}之间的值`:""}}</span>
                </span>
              </div>
              <div v-if="item.q_type=='矩阵题'">
                <!-- 嵌套循环 -->
                <p v-for="(demo,num) in item.child_question" :key="num">
                  <!--矩形行列问题合并 -->
                  <span style="display:block;margin:5px 0 5px 10px;">
                    <span>({{num+1}}).{{demo.rowquestion}}{{demo.question}}</span>
                    <span style="color:red">{{demo.required===0?"":"*"}}</span>
                  </span>
                  <!-- <el-form :model="demo" ref="formData" :rules="rules"> -->
                  <!-- <el-form-item label=""> -->
                  <el-input
                    v-if="demo.q_type =='问答题'"
                    style="margin:5px 0 5px 10px;width:85%;display:block"
                    v-model="demo.answer"
                    :type="demo.datatype==='数值'?'number':'text'"
                    :maxlength="demo.maxlen"
                    :placeholder="`${demo.datatype==='数值'?'请输入数值':'请输入文本'}`"
                    @change="Verification(item.child_question[num])"
                  ></el-input>
                  <el-radio-group v-model="demo.answer" v-if="demo.q_type =='单选题'">
                    <el-radio
                      v-for="(value,key,index) in demo.option"
                      :key="index"
                      :label="key"
                      style="display:block;margin:5px 0 5px 10px;"
                      v-if="value !=null && value != ''"
                    >{{key}}.{{value}}</el-radio>
                  </el-radio-group>

                  <span v-if="yzmatrix.length>0">
                    <span style="color:red;" v-for="(demo3,num3) in yzmatrix" :key="num3">
                      <span
                        :class="[yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`a123`:'b123':'']"
                        v-if="demo3.datatype=='数值'"
                      >{{yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`请输入${yzmatrix[num3].minnum}—${yzmatrix[num3].maxnum}之间的值`:"":""}}</span>
                      <!-- <span
                      v-if="demo3.datatype=='文本'"
                      >{{yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`请输入文本内容`:"":""}}</span>-->
                    </span>
                  </span>
                  <!-- <span style="color:red">{{demo.rowid===rowids?demo.colid===colids?yztext:"":""}}</span> -->
                  <span v-else>
                    <span style="color:red" v-for="(demo2,num2) in objectarr" :key="num2">
                      <span
                        :class="[objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`a123`:'b123':'']"
                        v-if="demo2.datatype=='数值'"
                      >{{objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`请输入${objectarr[num2].minnum}—${objectarr[num2].maxnum}之间的值`:"":""}}</span>
                      <!-- <span
                      v-if="demo2.datatype=='文本'"
                      >{{objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`请输入文本内容`:"":""}}</span>-->
                    </span>
                  </span>

                  <!-- <span style="color:red" v-if="demo.datatype=='数值'" >
                    <span v-if="inspect?demo.rowid===rowids?demo.colid===colids?true:'':'':''">{{"请输入"+demo.minnum+"—"+demo.maxnum+"之间的值"}}</span>
                  </span>
                  <span style="color:red"  v-if="demo.datatype=='文本'">
                    <span v-if="inspect2?demo.rowid===rowids?demo.colid===colids?true:'':'':''">{{"请输入"+demo.maxlen+"字符长度"}}</span>
                  </span>-->
                </p>
                <!--  -->
              </div>
              <div v-if="item.q_type=='多项填空'">
                <p v-for="(demo,num) in item.child_question" :key="num">
                  <!--问题 -->
                  <span style="display:block;margin:5px 0 5px 10px">
                    ({{num+1}}).{{demo.question}}
                    <span
                      style="color:red"
                    >{{demo.required===0?"":"*"}}</span>
                  </span>
                  <el-input
                    style="margin:5px 0 5px 10px;width:85%;display:block"
                    @change="Verification(item.child_question[num])"
                    :maxlength="demo.maxlen"
                    size="mini"
                    v-model="demo.answer"
                    :placeholder="`${demo.datatype==='数值'?'请输入数值':'请输入文本'}`"
                  ></el-input>
                  <span style="color:red" v-for="(demo2,num2) in objectarr" :key="num2">
                    <span
                      :class="[objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`a123`:'b123':'']"
                      v-if="demo2.datatype=='数值'"
                    >{{objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`请输入${objectarr[num2].minnum}—${objectarr[num2].maxnum}之间的值`:"":""}}</span>
                    <span
                      :class="[objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`a123`:'b123':'']"
                      v-if="demo2.datatype=='文本'"
                    >{{objectarr[num2].rowid===demo.rowid?demo.colid===objectarr[num2].colid?`请输入文本内容`:"":""}}</span>
                  </span>
                  <span style="color:red" v-for="(demo3,num3) in yzmatrix" :key="num3">
                    <span
                      :class="[yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`a123`:'b123':'']"
                      v-if="demo3.datatype=='数值'"
                    >{{yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`请输入${yzmatrix[num3].minnum}—${yzmatrix[num3].maxnum}之间的值`:"":""}}</span>
                    <span
                      :class="[yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`a123`:'b123':'']"
                      v-if="demo3.datatype=='文本'"
                    >{{yzmatrix[num3].rowid===demo.rowid?demo.colid===yzmatrix[num3].colid?`请输入文本内容`:"":""}}</span>
                  </span>
                </p>
              </div>
              <div v-if="item.q_type=='评分题'">
                <div class="block">
                  <!-- <el-rate style="display: inline-block;"  v-model="item.answer" :colors="colors" ></el-rate> -->
                  <el-rate
                    v-model="item.answer"
                    style="display: inline-block;margin:5px 0 5px 10px"
                    :colors="colors"
                    :max="10"
                  ></el-rate>
                  <p v-if="item.answer*1>0" style="display: inline-block;">{{item.answer}}分</p>
                </div>
              </div>
              <div v-if="item.q_type=='排序题'">
                <p v-for="(demo,index) in item.options" :key="index" class="sortitem">
                  <!-- {{demo===demo?demo:demo.text}} -->
                  <span>{{item.options.length>0?demo.text:demo}}</span>
                  <span class="sortblock" @click="sortquestion(item,index)">
                    <span v-if="item.answer.length<0">{{demo.index !==0 ? demo.index : ''}}</span>
                    <!-- 反显 -->
                    <span
                      v-else
                      v-for="(num,index1) in item.options"
                      :key="index1"
                    >{{demo.option == item.answer[index1]?index1+1:""}}</span>
                  </span>
                </p>
              </div>
            </div>
            <el-button type="success" @click="submit()" class="but">提交</el-button>
            <p>&nbsp;</p>
            <p>&nbsp;&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Star from "@/components/xinxin.vue";
import qs from "qs";
import { fail } from "assert";
// import draggable from "vuedraggable";
export default {
  name: "fristchild2",
  props: ["datalicense", "qustioninfo", "flg"],
  data() {
    return {
      xin: "",
      radioblanks: false,
      checkboxGroup1: "",
      dragOffClass: ".list-group-item2", // 允许拖拽
      count: 0,
      torlo: 0,
      answer_d: [],
      activeName: "first",
      activeIndex: 0,
      tabactive: 1,
      dataall: [],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
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
      aaa: ["a", "b"],
      checkList: ["选中且禁用", "复选框 A"],
      img: [
        {
          bg: require("images/bgs.png")
        }
      ],
      radio: "",
      answer: [],
      answer1: [],
      opat: [],
      arraynew: [],
      survey: "",
      qId1: "",
      checkList: [],
      required: "",
      qId2: "",
      data: [],
      s_id: "",
      smoothly: false,
      class_list: [],
      class_list2: [],
      flaselot: false,
      objectarr: [], //验证
      objectarr2: [], //提交的数据
      userid: "",
      scor: "",
      sortarr: [],
      num: 0,
      newid: 0,
      nownum: [],
      sortnewarr: [],
      newdataall: [],
      reg: /^[\u4E00-\u9FA5]+$/,
      yzmatrix: [], //验证每行的错误提示,
      last: ""
    };
  },
  mounted: function() {
    var vm = this;
    sessionStorage.setItem("flaselot", vm.flaselot);
    // vm.s_id = vm.$route.query.item.s_id;
    vm.s_id = vm.qustioninfo.s_id;
    // console.log(${this.datalicense?this.datalicens:'150102100003' })//用这个
    vm.$axios
      // .get(`${vm.$apihost}` + "/mprogram/api/survey_shop/?s_id=" + vm.s_id)
      .get(
        `${vm.$apihost}` +
          "/wechat/api/survey_shop/?s_id=" +
          vm.s_id +
          "&license=" +
          vm.datalicense
      )
      .then(function(response) {
        console.log(response);
        for (let i = 0; i < response.data.data.length; i++) {
          response.data.data[i].edit = false;
          if (response.data.data[i].q_type == "排序题") {
            console.log(response.data.data[i]);
            vm.sortnewarr = [];
            for (let key in response.data.data[i].options) {
              // console.log(key + "---" + demo.options[key]);
              if (
                response.data.data[i].options[key] === "" ||
                response.data.data[i].options[key] === null
              ) {
                continue;
              }

              vm.sortnewarr.push({
                //给对象新增加属性
                text: response.data.data[i].options[key],
                flg: false,
                index: 0,
                option: key,
                returnanswer: response.data.data[i].answer
              });
            }
            // console.log(vm.sortnewarr)
            response.data.data[i].options = vm.sortnewarr;
          }
          if (response.data.data[i].q_type == "评分题") {
            //字符串转成数字
            response.data.data[i].answer = response.data.data[i].answer * 1;
          }
        }
        console.log(response.data);
        // vm.class_list2 = response.data.questions.class_list

        // for(let i=0;i<response.data.data.length;i++){
        //   // if(response.data.data[i].q_type=='矩阵题')
        //   if(response.data.data[i].answer instanceof Array){
        //     response.data.data[i].answer =[]
        //   }else{
        //     response.data.data[i].answer = '';
        //   }
        //   response.data.data[i].answer_id = '';
        //   console.log(response.data.data[i])
        //   if(response.data.data[i].child_question.length>0){
        //     console.log(response.data.data[i])
        //     for(let k=0;k<response.data.data[i].child_question.length;k++){
        //      response.data.data[i].child_question[k].answer ='';
        //     }
        //   }
        // }
        // console.log(response.data.data)
        vm.dataall = response.data.data;
        console.log(vm.dataall);

        // for (let i = 0; i < vm.dataall.length; i++) {
        // if (response.data.data[i].required == true) {
        //     //  vm.required  = '必填'
        //     response.data.data[i].requireds = "必填";
        //     console.log(response.data.data[i].q_type);
        //   }
        // }
        // let arraynew = []
        //  let required = ''
        //问题数组
        // for (var i = 0; i < response.data.data.length; i++) {
        //   vm.class_list.push(response.data.data[i].q_class);
        //   const removeDuplicateItems = arr => [...new Set(arr)];
        //   console.log(removeDuplicateItems(vm.class_list));
        //   vm.class_list2 = removeDuplicateItems(vm.class_list);
        // }
        // for (var i = 0; i < response.data.data.length; i++) {
        //   console.log(vm.class_list2[0]);
        //   if (response.data.data[i].q_class == vm.class_list2[0]) {
        //     if (response.data.data[i].required == true) {
        //       //  vm.required  = '必填'
        //       response.data.data[i].requireds = "必填";
        //       console.log(response.data.data[i].q_type);
        //     }
        //     if (response.data.data[i].q_type == "单选填空") {
        //       response.data.data[i].type = 1;
        //       // response.data.data[i].answer_id = [];
        //       let a = {};
        //       Object.keys(response.data.data[i].options).forEach(item => {
        //         if (response.data.data[i].options[item] != null) {
        //           a[item] = response.data.data[i].options[item];
        //         }
        //       });

        //       vm.opat[i] = Object.keys(a)[Object.keys(a).length - 1];

        //       // vm.opat[response.data.data[i].q_id] = Object.keys(a)[Object.keys(a).length - 1]
        //       //  console.log(vm.opat[response.data.data[i].q_id])
        //     }

        //     if (response.data.data[i].q_type == "多选题") {
        //       // response.data.data[i].answer = [];
        //     }
        //     vm.dataall.push(response.data.data[i]);
        //     console.log(vm.dataall);
        //   }
        // }
        // vm.survey = response.data.data.survey_id;
      });
  },

  // components: {
  //   draggable
  // },

  watch: {},
  methods: {
    backinfo() {
      // console.log("false")
      this.flg = true;
      this.$emit("backinfo", this.flg);
    },
    Verification(item) {
      //检验类型长度
      console.log(item);
      if (item.datatype === "数值") {
        if (item.answer > item.maxnum || item.answer < item.minnum) {
          this.yzmatrix.push(item);
          this.yzmatrix = [...new Set(this.yzmatrix)];
        } else {
          this.yzmatrix.forEach((v, i) => {
            //删除数组中验证通过的数组
            if (item.child_question) {
              if (item.id === v.id) {
                this.yzmatrix.splice(i, 1);
              }
            } else {
              if (v.colid === item.colid && v.rowid === item.rowid) {
                this.yzmatrix.splice(i, 1);
              }
            }
          });
          this.objectarr.forEach((v, i) => {
            //删除数组中验证通过的数组
            if (item.child_question) {
              if (item.id === v.id) {
                this.objectarr.splice(i, 1);
              }
            } else {
              if (v.colid === item.colid && v.rowid === item.rowid) {
                this.objectarr.splice(i, 1);
              }
            }
          });
        }
      }
      // if(item.q_type ==='问答题'){

      // }
      // else if (item.datatype === "文本") {
      //   let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
      //   if (reg.test(item.answer)) {
      //     this.yzmatrix.push(item);
      //   } else {
      //     this.yzmatrix.forEach((v, i) => {
      //       //删除数组中验证通过的数组
      //       if (v.colid === item.colid && v.rowid === item.rowid) {
      //         this.yzmatrix.splice(i, 1);
      //       }
      //     });
      //     this.objectarr.forEach((v, i) => {
      //       //删除数组中验证通过的数组
      //       if (v.colid === item.colid && v.rowid === item.rowid) {
      //         this.objectarr.splice(i, 1);
      //       }
      //     });
      //   }
      // }
      this.yzmatrix = [...new Set(this.yzmatrix)];
      console.log(this.yzmatrix);
    },
    //排序题事件
    sortquestion(demo, index) {
      if (this.newid != demo.id) {
        this.newid = demo.id;
        if (this.nownum[demo.id] == undefined) {
          this.nownum[demo.id] = 0;
        }
      }
      if (!demo.options[index].flg) {
        if (this.nownum[demo.id] < demo.maxlen) {
          demo.options[index].flg = true;
          this.num++;
          this.nownum[demo.id]++;
        } else {
          this.$message.error(`只能选择${demo.maxlen}项`);
          return false;
        }
        demo.options[index].index = this.num;
        // console.log(demo.options[index])
      } else {
        demo.options[index].flg = false;
        this.num--;
        this.nownum[demo.id]--;
        demo.options.forEach((item, i) => {
          if (item.index > demo.options[index].index) {
            item.index--;
          }
        });
        demo.options[index].index = 0;
      }

      // demo.options = this.sortarr; //重新赋值原对象中
      demo.answer = [];
      console.log(demo.options);
      // demo.options.forEach(item => {
      //   if (item.flg) {
      //     demo.answer.push(item.option);
      //     // console.log(demo.answer.push(item.option))
      //   }
      // });
      for (let i = 1; i < 10; i++) {
        for (let j = 0; j < demo.options.length; j++) {
          if (demo.options[j].flg == true && demo.options[j].index == i) {
            demo.answer.push(demo.options[j].option);
            // console.log("=============", j, "============", i);
          }
        }
      }
      console.log(demo.answer);
    },
    hide(a, key, item) {
      console.log(item);
      //单选填空，点击最后一个出现input
      let arr = [];
      this.last = "";
      item.answer = "";
      // console.log(item);
      for (let key in item.options) {
        // arr = item.options[key]
        arr.push(item.options[key]);
      }
      console.log();
      //  console.log(a,key,item)
      console.log(item.id);
      for (let k = 0; k < item.options.length; k++) {}
      for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
        if (arr[i] === null) {
          this.last = arr[i - 1];
          console.log(this.last);
          if (this.last === a) {
            item.edit = true;
          } else {
            item.edit = false;
          }
          return false;
        }
        // if(arr[i] == !null && arr[i] == !""){
        //   console.log(arr[i])
        // }
      }

      console.log(arr);
    },
    // 消费者零售户tab切换
    tabFn(num, acindex) {
      let vm = this;
      vm.activeIndex = acindex;
      vm.dataall = [];
      vm.opat = [];
      // let checkList = []
      for (var i = 0; i < vm.arraynew.length; i++) {
        if (vm.arraynew[i].q_class == num) {
          vm.dataall.push(vm.arraynew[i]);
        }
      }

      for (var i = 0; i < vm.dataall.length; i++) {
        if (vm.dataall[i].required == true) {
          //  vm.required  = '必填'
          vm.dataall[i].requireds = "必填";
          // console.log(vm.arraynew[i].q_type)
        }
        if (vm.dataall[i].q_type == "单选填空") {
          vm.dataall[i].type = 1;
          let a = {};
          Object.keys(vm.dataall[i].options).forEach(item => {
            if (vm.dataall[i].options[item] != null) {
              a[item] = vm.dataall[i].options[item];
            }
          });
          // console.log(Object.keys(a))
          vm.opat[i] = Object.keys(a)[Object.keys(a).length - 1];
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
      let vm = this;
      vm.objectarr = [];
      vm.objectarr2 = [];
      vm.yzmatrix = []; //清空单行验证的提示信息，不然会重复
      console.log(vm.dataall);
      for (let i = 0; i < vm.dataall.length; i++) {
        if (vm.dataall[i].required == true) {
          //判断必选项
          // console.log(vm.dataall[i]);
          if (
            vm.dataall[i].q_type === "多项填空" ||
            vm.dataall[i].q_type === "评分题" ||
            vm.dataall[i].q_type === "排序题" ||
            vm.dataall[i].q_type === "问答题" ||
            vm.dataall[i].q_type === "单选题" ||
            vm.dataall[i].q_type === "多选题" ||
            vm.dataall[i].q_type === "单选填空" ||
            vm.dataall[i].q_type === "矩阵题"
          ) {
            if (vm.dataall[i].q_type === "单选填空") {
              if (vm.dataall[i].answer_id) {
                //判断选项
                if (vm.dataall[i].edit == true) {
                  //判断选择最后一项的时候textarea为必填
                  if (vm.dataall[i].answer == "") {
                    console.log(666666666);
                    vm.$message.error("请填写必选项");
                    return false;
                  }
                }
              } else {
                vm.$message.error("请填写必选项");
                return false;
              }
            }
            if (
              vm.dataall[i].q_type === "问答题" ||
              vm.dataall[i].q_type === "单选题" ||
              vm.dataall[i].q_type === "多选题" ||
              vm.dataall[i].q_type === "评分题" ||
              vm.dataall[i].q_type === "排序题"
            ) {
              if (vm.dataall[i].q_type === "排序题") {
                if (vm.dataall[i].answer.length < vm.dataall[i].maxlen) {
                  vm.$message.error(`排序题请选择${vm.dataall[i].maxlen}项`);
                  return false;
                }
              }
              console.log(vm.dataall[i]);
              if (
                vm.dataall[i].answer === "" ||
                vm.dataall[i].answer.length <= 0
              ) {
                console.log(vm.dataall[i]);
                vm.$message.error("请填写必选项");
                console.log(222222222);
                return false;
              }
            }
            if (vm.dataall[i].q_type === "单选填空") {
              if (vm.dataall[i].edit == true) {
                //判断选择最后一项的时候textarea为必填
                vm.objectarr2.push(
                  Object.assign(
                    {},
                    {},
                    {
                      s_id: vm.s_id,
                      q_id: vm.dataall[i].id,
                      answer: `${vm.dataall[i].answer_id},${vm.dataall[i].answer}`,
                      rowid: null,
                      colid: null,
                      license: vm.datalicense
                    }
                  )
                );
              } else {
                vm.objectarr2.push(
                  Object.assign(
                    {},
                    {},
                    {
                      s_id: vm.s_id,
                      q_id: vm.dataall[i].id,
                      answer: vm.dataall[i].answer_id,
                      rowid: null,
                      colid: null,
                      license: vm.datalicense
                    }
                  )
                );
              }
            }
            if (
              vm.dataall[i].q_type === "排序题" ||
              vm.dataall[i].q_type === "多选题"
            ) {
              //  array[index].answer .slice(0, array[index].answer.length).join(",")
              vm.objectarr2.push(
                Object.assign(
                  {},
                  {},
                  {
                    s_id: vm.s_id,
                    q_id: vm.dataall[i].id,
                    answer: vm.dataall[i].answer
                      .slice(0, vm.dataall[i].answer.length)
                      .join(","),
                    rowid: null,
                    colid: null,
                    license: vm.datalicense
                  }
                )
              );
            }
            if (
              vm.dataall[i].q_type === "问答题" ||
              vm.dataall[i].q_type === "单选题" ||
              vm.dataall[i].q_type === "评分题"
            ) {
              //必填的时候
              if (vm.dataall[i].datatype === "数值") {
                if (
                  vm.dataall[i].answer > vm.dataall[i].maxnum ||
                  vm.dataall[i].answer < vm.dataall[i].minnum
                ) {
                  this.objectarr.push(vm.dataall[i]);
                  // return false;
                }
              }
              vm.objectarr2.push(
                Object.assign(
                  {},
                  {},
                  {
                    s_id: vm.s_id,
                    q_id: vm.dataall[i].id,
                    answer: vm.dataall[i].answer,
                    rowid: null,
                    colid: null,
                    license: vm.datalicense
                  }
                )
              );
              // console.log(vm.objectarr2);
            }
            // if (
            //   vm.dataall[i].q_type === "矩阵题" ||
            //   vm.dataall[i].q_type === "多项填空"
            // ) {
            //   console.log(11111);
            //   for (let k = 0; k < vm.dataall[i].child_question.length; k++) {
            //     if (vm.dataall[i].child_question[k].required === true) {
            //       if (vm.dataall[i].child_question[k].answer === "") {
            //         vm.$message.error("请把矩阵题中的必填项填写完整");
            //         return false;
            //       }
            //     }
            //     if (vm.dataall[i].child_question[k].datatype === "数值") {
            //       if (
            //         vm.dataall[i].child_question[k].answer >
            //           vm.dataall[i].child_question[k].maxnum ||
            //         vm.dataall[i].child_question[k].answer <
            //           vm.dataall[i].child_question[k].minnum
            //       ) {
            //         this.objectarr.push(vm.dataall[i].child_question[k]);
            //         // return false;
            //       }
            //     }
            //     vm.objectarr2.push(
            //       Object.assign(
            //         {},
            //         {},
            //         {
            //           s_id: vm.s_id,
            //           q_id: vm.dataall[i].id,
            //           answer: vm.dataall[i].child_question[k].answer,
            //           rowid: vm.dataall[i].child_question[k].rowid,
            //           colid: vm.dataall[i].child_question[k].colid
            //         }
            //       )
            //     );
            //   }
            // }
          }

          //  vm.$message.error("请填写必选项");
          //  return false;
        } else {
          if (vm.dataall[i].q_type === "单选填空") {
            console.log(123123123123123);
            console.log(vm.dataall[i]);
            if (vm.dataall[i].edit == true) {
              //判断选择最后一项的时候textarea为必填
              if (vm.dataall[i].answer == "") {
                vm.$message.error("请填写必选项");
                return false;
              } else {
                vm.objectarr2.push(
                  Object.assign(
                    {},
                    {},
                    {
                      s_id: vm.s_id,
                      q_id: vm.dataall[i].id,
                      answer: `${vm.dataall[i].answer_id},${vm.dataall[i].answer}`,
                      rowid: null,
                      colid: null,
                      license: vm.datalicense
                    }
                  )
                );
              }
            }
          }

          if (
            vm.dataall[i].q_type === "矩阵题" ||
            vm.dataall[i].q_type === "多项填空" 
          ) {
            console.log(vm.dataall[i], 111111);
            for (let k = 0; k < vm.dataall[i].child_question.length; k++) {
              if (vm.dataall[i].child_question[k].required == true) {
                console.log(vm.dataall[i].child_question[k]);
                if (
                  vm.dataall[i].child_question[k].answer === "" ||
                  vm.dataall[i].child_question[k].answer === null
                ) {
                  if (vm.dataall[i].q_type == "矩阵题") {
                    console.log(i);
                    // vm.$message.error("请把矩阵题中的必填项填写完整");
                    vm.$message.error(`请把${i + 1}题必填项填写完整`);
                    return false;
                  }
                  if (vm.dataall[i].q_type == "多项填空") {
                    console.log(i);
                    // vm.$message.error("请把多项填空的必填项填写完整");
                    vm.$message.error(`请把${i + 1}题必填项填写完整`);
                    return false;
                  }
                }
                if (vm.dataall[i].child_question[k].datatype === "数值") {
                  if (
                    vm.dataall[i].child_question[k].answer >
                      vm.dataall[i].child_question[k].maxnum ||
                    vm.dataall[i].child_question[k].answer <
                      vm.dataall[i].child_question[k].minnum
                  ) {
                    this.objectarr.push(vm.dataall[i].child_question[k]);
                    // return false;
                  }
                }
                // if (vm.dataall[i].child_question[k].datatype === "文本") {
                //   if (!vm.reg.test(vm.dataall[i].child_question[k].answer)) {
                //     console.log(typeof vm.dataall[i].child_question[k]);
                //     this.objectarr.push(vm.dataall[i].child_question[k]);
                //     // return false;
                //   }
                // }
                console.log(i + "多项填空111");
                console.log(vm.dataall[i].child_question[k].answer);
                vm.objectarr2.push(
                  Object.assign(
                    {},
                    {},
                    {
                      s_id: vm.s_id,
                      q_id: vm.dataall[i].id,
                      answer: vm.dataall[i].child_question[k].answer,
                      rowid: vm.dataall[i].child_question[k].rowid,
                      colid: vm.dataall[i].child_question[k].colid,
                      license: vm.datalicense
                    }
                  )
                );
              }
            }
            // for (let i in vm.yzmatrix) {
            //   vm.objectarr.push(vm.yzmatrix[i]);
            // }
            // console.log(vm.objectarr);

            // vm.objectarr = [...new Set(vm.objectarr)];
            // console.log(this.objectarr);
          }
          if (
            vm.dataall[i].q_type === "单选题" ||
            vm.dataall[i].q_type === "问答题" ||
            vm.dataall[i].q_type === "评分题"
          ) {
            if (vm.dataall[i].datatype === "数值") {
              if (
                vm.dataall[i].answer > vm.dataall[i].maxnum ||
                vm.dataall[i].answer < vm.dataall[i].minnum
              ) {
                this.objectarr.push(vm.dataall[i]);
                // return false;
              }
            }
            vm.objectarr2.push(
              Object.assign(
                {},
                {},
                {
                  s_id: vm.s_id,
                  q_id: vm.dataall[i].id,
                  answer: vm.dataall[i].answer,
                  rowid: null,
                  colid: null,
                  license: vm.datalicense
                }
              )
            );
          }
          if (
            vm.dataall[i].q_type === "多选题" ||
            vm.dataall[i].q_type === "排序题"
          ) {
            vm.objectarr2.push(
              Object.assign(
                {},
                {},
                {
                  s_id: vm.s_id,
                  q_id: vm.dataall[i].id,
                  answer: vm.dataall[i].answer
                    .slice(0, vm.dataall[i].answer.length)
                    .join(","),
                  rowid: null,
                  colid: null,
                  license: vm.datalicense
                }
              )
            );
          }
        }
        // console.log(vm.dataall[i])

        //
      }
      console.log(vm.objectarr, vm.yzmatrix);

      console.log(vm.objectarr);

      if (this.objectarr.length > 0) {
        vm.$message.error("请确认无误之后在提交");
        return false;
      }

      // console.log(vm.objectarr);
      //  vm.dataall = vm.arraynew
      // for (let index2 = 0; index2 < vm.dataall.length; index2++) {
      //   if (vm.dataall[index2].required == true) {
      //     if (vm.dataall[index2].q_type == "单选填空") {
      //       // console.log(vm.dataall[index].answer_id,vm.opat[index])
      //       if (vm.dataall[index2].answer_id == vm.opat[index2]) {
      //         // console.log(vm.dataall[index].answer,'-----',vm.dataall[index].answer_id);
      //         if (
      //           vm.dataall[index2].answer == "" ||
      //           vm.dataall[index2].answer_id == ""
      //         ) {
      //           vm.$message.error("请填写完整，再提交");
      //           return;
      //         }
      //       } else if (vm.dataall[index2].answer_id == "") {
      //         //console.log(vm.dataall[index].answer,'-----',vm.dataall[index].answer_id);
      //         vm.$message.error("请填写完整，再提交");
      //         return;
      //       }
      //     } else if (vm.dataall[index2].answer == "") {
      //       vm.$message.error("请填写完整，再提交");
      //       return;
      //     } else {
      //       vm.smoothly = true;
      //     }
      //   } else if (
      //     vm.dataall[index2].required == null ||
      //     vm.dataall[index2].required == false
      //   ) {
      //     if (vm.dataall[index2].q_type == "单选填空") {
      //       if (vm.dataall[index2].answer_id == vm.opat[index2]) {
      //         if (
      //           vm.dataall[index2].answer == "" &&
      //           vm.dataall[index2].answer_id == ""
      //         ) {
      //           vm.$message.error("请填写完整，再提交1");
      //           return;
      //         }
      //       }
      //       // console.log(vm.data[index])
      //     } else {
      //       vm.smoothly = true;
      //     }
      //   }
      // }

      // if (vm.smoothly == true) {
      //   // console.log('06')
      //   let vm = this;
      //   let subarray = [];
      //   let array = vm.arraynew;
      //   // console.log(array)
      //   // console.log(vm.answer_d, '=========================')
      //   // console.log(answer)
      //   for (let index = 0; index < array.length; index++) {
      //     // console.log(array[index].answer, index)
      //     let a = {};
      //     Object.keys(array[index].options).forEach(item => {
      //       if (array[index].options[item] != null) {
      //         a[item] = array[index].options[item];
      //       }
      //     });
      //     // console.log(Object.keys(a))
      //     vm.opat[index] = Object.keys(a)[Object.keys(a).length - 1];

      //     subarray.push(
      //       Object.assign(
      //         {},
      //         {},
      //         {
      //           s_id: vm.s_id,
      //           q_id: array[index].id,
      //           answer:
      //             array[index].q_type == "多选题"
      //               ? array[index].answer
      //                   .slice(0, array[index].answer.length)
      //                   .join(",")
      //               : array[index].q_type == "单选填空" &&
      //                 array[index].answer_id == vm.opat[index]
      //               ? array[index].answer_id + "," + array[index].answer
      //               : array[index].q_type == "单选填空" &&
      //                 array[index].answer_id != vm.opat[index]
      //               ? array[index].answer_id
      //               : array[index].answer
      //           // answer:array[index].answer,
      //           // license: this.datalicense
      //         }
      //       )
      //     );
      //   }

      //   console.log(subarray);
      // alert("成功");

      vm.$axios
        .post(`${this.$apihost}` + "/wechat/api/answer/", {
          answer_list: this.objectarr2
        })
        .then(function(response) {
          console.log(response);
          if (response.status === 201) {
            vm.$message({
              message: "提交成功",
              type: "success"
            });
          }
        });
      vm.flaselot = true;
      sessionStorage.setItem("flaselot", vm.flaselot);
      window.scrollTo(0, 0); //跳转到页头
      // vm.$router.push({
      //   path: "/home/firstPage/turntable"

      // });
      // }
    }
  }
};
</script>
<style scoped>
#header-top {
  padding: 5px 0;
  font-size: 18px;
}
.a123 {
  margin-left: 15px;
}
.b123 {
  margin-left: 0px;
}
.sortitem {
  border: 1px solid #3b8ef0;
  margin-top: 5px;
  height: 40px;
  line-height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  margin: 5px 0 5px 10px;
  width: 85%;
}
.sortblock {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  line-height: 30px;
  background: #3b8ef0;
  color: #fff;
}
#box .on {
  background: url("./../../assets/img/on.png") no-repeat;
}
#box div {
  width: 56px;
  height: 59px;
  float: left;
  background: url("./../../assets/img/off.png") no-repeat;
}

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
  border: none;
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
  border: solid 1px #bbdaff;
  background: url(../.../../../assets/img/bgs.png) no-repeat;
}

.box {
  /* border: solid 1px #3B8EF0; */
  margin: 30px 14px;
  /* background: #3B8EF0; */
}

.box-in {
  background: white;
  border: solid 5px #3b8ef0;
  box-sizing: border-box;
  margin: 0 0 6px 0;
  padding: 2px;
}

.title {
  color: white;
  background: #3b8ef0;
  /* height: 0.3rem;
  lighting-color: 0.3rem; */
  padding: 8px 0 4px 6px;
}

.el-radio + .el-radio {
  margin: 0;
}

.el-checkbox {
  display: block;
  margin-left: 15px;
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
.test {
  border: 1px solid #ccc;
}
.drag-item {
  width: 200px;
  height: 50px;
  line-height: 50px;
  margin: auto;
  position: relative;
  background: #ddd;
  margin-top: 20px;
}
.ghostClass {
  opacity: 1;
}
.bottom {
  width: 200px;
  height: 50px;
  position: relative;
  background: blue;
  top: 2px;
  left: 2px;
  transition: all 0.5s linear;
}
</style>
