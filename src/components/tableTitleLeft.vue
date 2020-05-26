<!--  -->
<template>
  <div class="table-cont">
    <div>
      <!-- <p class="name">
        <span class="span1"></span>
        <slot name="title"></slot>
      </p>-->
    </div>

    <!-- <div class="status"> -->
      <div v-if="tableDatalist.length>0" class="tablecont-c">
        <div class="tableft">
          <ul>
            <li v-for="(item,index) in leftList" :key="index">{{item}}</li>
          </ul>
        </div>
        <div class="tableright" v-loading="tableDatalist.length > 0 ? false : true">
          <ul>
            <li v-for="(header,index) in tableDatalist" :key="index" class="bitem-tbody-value">
              <span>{{header.name}}</span>
            </li>
          </ul>
          <div class="r-bottom">
            <div v-for="(tbody,index1) in tableDatalist" :key="index1" class="bitem-tbody">
              <div v-for="(item1,index2) in tbody.value" :key="index2" class="bitem-tbody-value">
                <span v-if="index2 == 'stocksmile'">
                  <img :src="img.iconX" alt v-if="item1== 1" @click="iconxFn(tbody,1)" />
                  <img :src="img.iconN" alt v-else-if="item1 == 0" />
                </span>
                <span v-else-if="index2 == 'demandsmile'">
                  <img :src="img.iconX" alt v-if="item1== 1" @click="iconxFn(tbody,2)" />
                  <img :src="img.iconN" alt v-else-if="item1 == 0" />
                </span>
                <span v-else-if="index2 == 'advance_order'">
                  <el-input v-model="tbody.modelvalue1" placeholder="请输入内容"></el-input>
                </span>
                <span v-else-if="index2 == 'stock'">
                  <el-input v-model="tbody.modelvalue2" placeholder="请输入内容"></el-input>
                </span>
                <span v-else-if="index2 == 'demand'">
                  <el-input v-model="tbody.modelvalue3" placeholder="请输入内容"></el-input>
                </span>
                <span v-else>{{item1 || 0}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-table style="margin-top:20px;" v-else></el-table>
    <!-- </div> -->
    <el-button type="primary" class="bcBut" @click="bcButFn" v-if=" butshow != false">保存</el-button>
  </div>
</template>

<script>
export default {
  props: {
    tableDatalist: Array,
    leftList: Array,
    license: String,
    type: Number,
    butshow: Boolean,
    types: Number
  },
  data() {
    return {
      img: {
        iconX: require("images/icon-x.png"),
        iconN: require("images/icon-n.png")
      },
      input: "",
      //   types:'',
      loading: true
    };
  },
  components: {},

  computed: {},

  mounted() {
    console.log(this.tableDatalist);
  },

  methods: {
    bcButFn() {
      let array = this.tableDatalist;
      let arraynew = [];
      for (let index = 0; index < array.length; index++) {
        arraynew.push(
          Object.assign(
            {},
            {
              product_id: array[index].product_id,
              advance_order: array[index].modelvalue1
                ? Number(array[index].modelvalue1)
                : "",
              stock: array[index].modelvalue2
                ? Number(array[index].modelvalue2)
                : "",
              demand: array[index].modelvalue3
                ? Number(array[index].modelvalue3)
                : ""
            }
          )
        );
      }
      let vm = this;
      this.$axios
        .post(`${this.$apihost}` + "/wechat/api/infocollect/", {
          v_license: this.license,
          product_list: arraynew
        })
        .then(response => {
          if (response.data.info == "success") {
            this.$message({
              message: "信息保存成功！！",
              type: "success"
            });
            this.$emit("getdataFn");
          }
        });
    },
    iconxFn(tbody, type) {
      this.types == type;
      console.log(this.types);
      let obj = {
        license: this.license,
        show: true,
        bgcolor: type == 1 ? "#ffffff" : "#dddddd",
        data: tbody,
        type: type
      };
      this.$emit("iconx", obj);
    }
  }
};
</script>
<style scoped>
.bcBut {
  width: 80%;
  height: 50px;
  display: block;
  margin: 10px auto;
  font-size: 18px;
  line-height: inherit;
}
.status{
  background: #ccc;
  padding: 10px;
  margin-top: 10px;
  margin-left: 10px;
}
ul,
li {
  list-style: none;
}

.bitem-tbody-value img {
  width: 25px;
  height: 25px;
}

.table-cont {
  /* padding: 1px 0; */
}

.tablecont-c {
  padding: 10px;
  display: flex;
}

.tableright ul {
  display: flex;
}

.tableright ul li {
  flex: 1;
  text-align: center;
}

.r-bottom {
  display: flex;
}

.r-bottom .bitem-tbody {
  flex: 1;
}

.bitem-tbody-value {
  height: 45px;
  text-align: center;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
}

.tableft li {
  height: 45px;
  text-align: center;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
  border-left: 1px solid #dddddd;
  background: #fff
}

.tableft {
  width: 100px;
  display: inline-block;
  vertical-align: top;
  border-top: 1px solid #dddddd;
}

.tableright {
  display: inline-block;
  vertical-align: top;
  width: 100%;
  border-top: 1px solid #dddddd;
  /* position: absolute;
    left: 20%;
    width: 78%;
     */
}
</style>
