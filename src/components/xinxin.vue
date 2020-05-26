<template>
  <div class="xinxin">
      <ul class="StarsWrap">
        <li v-for="(i,index) in list" :key="index" @click="clickStars(index)">
          <img :src="xing>index?stara:starb"/>
        </li>
      </ul>
      <p v-if="this.xing>0">{{xing}}</p>
  </div>
</template>

<script>
export default {
name: 'evaluate',
  data () {
    return {
      rateScoreText: '',
    //   rateScoreDesc: ['非常不满意，各方面都很差', '不满意，比较差', '一般，还需改善', '比较满意，仍可改善', '非常满意,无可挑剔'],
      stara:require("../assets/img/on.png"),//亮星星
      list:[0,1,2,3,4],
      starb:require("../assets/img/off.png"),//暗星星
      xing:0,
    }
  },
  methods:{
    clickStars(i){
    //   this.rateScoreText=this.rateScoreDesc[i]
      this.xing = i+1
      this.$emit('listen',this.xing)
    //   console.log("点击了"+(i+1)+"颗星")
    }
  },
}
</script>

<style scoped>
.xinxin{
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}
.StarsWrap{
  height: 0.4rem;
  margin: 0.1rem 0;
}
.StarsWrap li{
  float: left;
  margin-right: 0.1rem;
}
.StarsWrap li img{
    width: 24px;
}
</style>