<!--  -->
<template>
  <div>
    <div v-loading="loading">
      <div v-html="getDate" class="time-div"></div>
      <div class="sign-list-div" v-if="sign_list && sign_list.length > 0">
        <timeline :v_list="sign_list"></timeline>
      </div>
      <div
        class="address-div"
        v-if="sign_list.length < 2"
      >当前位置：{{nowaddress.addr || nowaddress.city}}</div>
      <div v-if="sign_list">
        <template v-if="sign_list.length < 2">
          <el-button
            type="primary"
            class="signbut"
            v-if="sign_type == 1"
            @click="sginFn('签到')"
            :loading="loadingbut"
          >签到</el-button>
          <el-button
            type="primary"
            class="signbut"
            v-else
            @click="sginFn('签退')"
            :loading="loadingbut"
          >签退</el-button>
        </template>
        <div
          v-if="sign_list.length >= 2"
          class="times-div-cont"
          :class="{'address-bottom':sign_list.length == 2}"
        >
          <h4>此零售户拜访了</h4>
          <h6>{{mins}}分钟</h6>
        </div>

        <el-button type="primary" v-if="loadingbut2" class="signbut" @click="sginFn2('签退')">再次签退</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getNowFormatDate, changeFormatDate } from "js/public.js";
import timeline from "com/timeLine.vue";

export default {
  props: {
    v_license: String
  },
  data() {
    return {
      sign_type: 1,
      idlist: "",
      loadingbut2: false,
      sign_list: [],
      mins: null,
      nums: "",
      loading: true,
      loadingbut: false,
      position: JSON.parse(sessionStorage.getItem("position"))
    };
  },

  components: {
    timeline
  },

  computed: {
    getDate() {
      return getNowFormatDate();
    },
    nowaddress() {
      return JSON.parse(sessionStorage.getItem("position"));
    }
  },

  created() {
    
  },
  mounted() {
    this.getdata();
  },
  methods: {
    changedate(times) {
      return changeFormatDate(times);
    },
    getdata() {
      this.loading = false;
      this.loadingbut = false;
      this.$axios
        .get(
          `${this.$apihost}` +
            "/wechat/api/signinout/?license=" +
            this.v_license
        )
        .then(res => {
          if (res.data.sign_list.length > 0) {
            this.nums = res.data.sign_list.length;
            console.log(this.nums);
         
            this.sign_type = 2;
            this.mins = res.data.mins;

            // console.log( res.data.mins)
            let sign_list = res.data.sign_list;
            this.sign_list = sign_list.map(val => {
              return {
                // sign_time:changeFormatDate(val.sign_time),
                sign_time: val.sign_time,
                sign_address: val.sign_address,
                sign_type: val.sign_type
              };
            });

            this.$emit("minsfn", this.nums);
            
            if (this.nums == 2) {
              this.loadingbut2 = true;
            }
            console.log(this.nums);
            this.idlist = res.data.sign_list[1].id;
          }
          
        });
    },
    sginFn(type) {
      this.loadingbut = true;
      let add_lng = JSON.parse(sessionStorage.getItem("position")).lng;
      let add_lat = JSON.parse(sessionStorage.getItem("position")).lat;

      let sign_address = this.position.addr || this.position.city;
      this.$axios
        .post(`${this.$apihost}` + "/wechat/api/signinout/", {
          v_license: this.v_license,
          add_lng: add_lng,
          add_lat: add_lat,
          sign_address: sign_address,
          sign_type: type
        })
        .then(res => {
          //  console.log(res.data)
          if (res.data == "请求成功") {
            this.$message({
              message:
                type == "签到" ? "恭喜你，签到成功！" : "恭喜你，签退成功！",
              type: "success"
            });
            this.getdata();
            if (type == "签退") {
              this.loadingbut2 = true;
            }
          } else {
            this.$message.error("签到失败，请重试！");
          }
        });
    },
    sginFn2(type) {
      let add_lng = JSON.parse(sessionStorage.getItem("position")).lng;
      let add_lat = JSON.parse(sessionStorage.getItem("position")).lat;
      let sign_address = this.position.addr || this.position.city;
      this.$axios
        .put(
          `${this.$apihost}` + "/wechat/api/signinout/" + this.idlist + "/",
          {
            // v_license: this.v_license,
            add_lng: add_lng,
            add_lat: add_lat,
            sign_address: sign_address
            // sign_type: type,
          }
        )
        .then(res => {
          console.log(res.data);
          if (res.data == "更新成功") {
            this.$message({
              message:
                type == "签到" ? "恭喜你，签到成功！" : "恭喜你，签退成功！",
              type: "success"
            });
            this.getdata();
          } else {
            this.$message.error("签到失败，请重试！");
          }
        });
    }
  }
};
</script>
<style scoped>
.address-bottom {
  margin-top: 130px;
}

.times-div-cont {
  text-align: center;
}

.times-div-cont h4 {
  font-size: 18px;
  font-weight: normal;
}

.times-div-cont h6 {
  font-size: 24px;
}

.sign-list-div {
  height: 200px;
}

.time-div {
  text-align: center;
  font-size: 20px;
  padding-top: 20px;
}

.address-div {
  text-align: center;
  padding-top: 50px;
}

.signbut {
  width: 150px;
  display: block;
  margin: 10px auto;
  font-size: 16px;
}
</style>
