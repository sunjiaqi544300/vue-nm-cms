<!-- 待执行活动 -->
<template>
  <div class="type2">
    <ul>
      <li v-for="(item,index) in tableData4" :key="index">
        <div class="item" v-if="item.activity.type.opt_type== '2'">
          <p class="name">
            <span class="span1"></span>
            <span>撕皮条- {{item.activity.name}}</span>
          </p>
          <hr />
          <div class="div-type-1">
            <span class="lable">完成数量 :</span>
            <span>{{item.nums || "暂无"}}</span>
          </div>
        </div>

        <div class="item" v-if="item.activity.type.opt_type== '1'">
          <p class="name">
            <span class="span1"></span>
            <span>陈列有奖活动 - {{item.activity.name}}</span>
          </p>
          <hr />
          <div class="div-type-2">
            <ul class="imgdiv" v-if="item.imglist">
              <li v-for="(img,key) in item.imglist.img_lis" :key="key">
                <img :src="$apihost+'/'+img" alt @click="dleimg(item,img)" />
              </li>
            </ul>
          </div>
          <div class="div-type-2">
            <uploadImg
              v-if="item.activity.product===null"
              :Dlicense="item.shop.license"
              :Dactivity_id="item.activity.id.toString()"
              Dproduct="00000000"
            ></uploadImg>
            <uploadImg
              v-else
              :Dlicense="item.shop.license"
              :Dactivity_id="item.activity.id.toString()"
              :Dproduct="item.activity.product.product_id"
            ></uploadImg>
          </div>
        </div>
        <div class="item" v-if="item.activity.type.opt_type== '3'">
          <p class="name">
            <span class="span1"></span>
            <span>客情维护 - {{item.activity.name}}</span>
          </p>
          <hr />
          <div class="div-type-3"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import qqMap from "map/qqMap";
import uploadImg from "com/uploadImg.vue";
//  import uploadImg from "com/uploadImg.vue"
import { hostType } from "api/env.js";
export default {
  inject: ["reload"],
  props: {
    tableData4: Array,
    Dlicense: String
  },
  data() {
    return {
      loading: true,
      imgdata: []
    };
  },
  mounted() {
    console.log(this.tableData4);
  },
  components: {
    uploadImg
  },
  computed: {
    //   getimgFn1(){
    //    return [{name:"1121"},{name:"1121"}]
    //  }
  },
  filters: {},
  created() {
    console.log(this.tableData4);
  },
  methods: {
    getimgFn(item) {
      let config = {
        headers: {
          Authorization: "JWT " + localStorage.getItem("token")
        }
      };
      return new Promise((resolve, reject) => {
        if(item.activity.product===null){
          this.$axios
          .get(
            `${this.$apihost}` +
              "/wechat/api/image/?license=" +
              item.shop.license +
              "&activity_id=" +
              item.activity.id +
              "&product=00000000",
            config
          )
          .then(result => {
            // .activity.id + "&product=" + item.activity.product.product_id, config).then((result) => {
            return resolve(result);
          });
        }else{
          this.$axios
          .get(
            `${this.$apihost}` +
              "/wechat/api/image/?license=" +
              item.shop.license +
              "&activity_id=" +
              item.activity.id +
              "&product="+item.activity.product.product_id,
            config
          )
          .then(result => {
            // .activity.id + "&product=" + item.activity.product.product_id, config).then((result) => {
            return resolve(result);
          });
        }
      });
    },
    dleimg(item, img) {
      // item.activity.product.product_id
      console.log(item, img);
      console.log("删除");
      this.$confirm("此操作将永久删除该照片, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (item.activity.product === null) {
            this.$axios
              .post(
                `${this.$apihost}` +
                  "/wechat/api/image/?license=" +
                  item.shop.license +
                  "&activity_id=" +
                  item.activity.id +
                  "&product=00000000",
                {
                  img_path: img
                }
              )
              .then(result => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                console.log(result);
                console.log(this.tableData4);
                for (
                  let index = 0;
                  index < item.imglist.img_lis.length;
                  index++
                ) {
                  if (item.imglist.img_lis[index] == img) {
                    item.imglist.img_lis.splice(index, 1);
                  }
                }
              });
          }else{
            this.$axios
              .post(
                `${this.$apihost}` +
                  "/wechat/api/image/?license=" +
                  item.shop.license +
                  "&activity_id=" +
                  item.activity.id +
                  "&product="+item.activity.product.product_id,
                {
                  img_path: img
                }
              )
              .then(result => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                console.log(result);
                console.log(this.tableData4);
                for (
                  let index = 0;
                  index < item.imglist.img_lis.length;
                  index++
                ) {
                  if (item.imglist.img_lis[index] == img) {
                    item.imglist.img_lis.splice(index, 1);
                  }
                }
              });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async getimgFn1(item) {
      //  return new Promise((resolve, reject) => {
      // let res = await this.$axios.get(`${this.$apihost}`+"/wechat/api/image/?license="+ this.Dlicense + "&activity_id="+ 1 + "&product=" + item.activity.product.product_id).then((result) =>  {
      //   return result.data.img_lis
      // })
      // return res
      return [
        {
          name: "1121"
        },
        {
          name: "1121"
        }
      ];
      console.log(res);
      // })
    }
    // getimgFn(item){
    //      this.$axios.get(`${this.$apihost}`+"/wechat/api/image/?license="+ this.Dlicense + "&activity_id="+ item.activity.id + "&product=" + item.activity.product.product_id).then((result) =>  {
    //               if(result.data.img_lis.length > 0){
    //                   let array = result.data.img_lis
    //                   let arraynew = []
    //                   for (let index = 0; index < array.length; index++) {
    //                     arraynew.push(Object.assign({},{
    //                       url:hostType(2) + '/' + array[index]
    //                     }))
    //                   }
    //               }
    //         })
    // },
  }
};
</script>
<style scoped>
.text {
  width: 120px;
  height: 35px;
  line-height: 35px;
  margin-right: 10px;
}

.type2 {
  background-color: #ededed;
}

ul li {
  background-color: #ffffff;
  list-style: none;
}

.name {
  padding-top: 5px;
}

.name span {
  font-size: 16px;
}

.div-type-1 {
  padding: 10px 20px;
}

.div-type-1 span,
input,
button {
  display: inline-block;
  vertical-align: middle;
}

.lable {
  margin-right: 6px;
}

.div-type-2 {
  text-align: center;
  padding-bottom: 15px;
  padding-top: 15px;
}

.uploadimgBut {
  margin-top: 10px;
}

.imgdiv {
  padding: 15px;
}

.imgdiv img {
  width: 50%;
}
</style>
