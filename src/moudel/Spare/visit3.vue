<template>
  <div class="page">
     <p class="name">
      <span class="span1"></span>
      <span> 资料列表</span>
    </p>
    <div v-for="(item,index) in data" :key="index" class="box">
      <p><span>{{index+1}}、</span><a :href="item.url" target="_blank">{{item.materials}}</a></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import pdf from "vue-pdf";

export default {
  name: "page",
  data() {
    return {
      data: []
      //  lll:'http://www.baidu.com'
    };
  },
  mounted() {
    let vm = this;
    vm.$axios
      .get(`${this.$apihost}` + "/wechat/api/myprofile/")
      .then(function(response) {
        console.log(response.data.my_data);
        vm.data = response.data.my_data;
      });
  },
  components: {
    pdf
  }
};
</script>

<style scoped>
.box{
  margin-left: 15px;
  margin-top: 20px;
}
.box a{
  font-size: 14px;
  text-align: left;
  text-decoration: underline
}
.name {
  font-size: 18px;
  border-bottom: 1px #ccc solid;
}
</style>
