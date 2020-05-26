<template>
  <div class="page">
    <headers></headers>
  </div>
</template>
<script type='text/javascript' src='https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js'></script>
<script type="text/ecmascript-6">
  import headers from 'com/Header/tabList';
  export default {
    data() {
      return {
        colors: '',
        img: {
          img1: require("img/myhj.png"),
          img2: require("img/mysq.png"),
          img3: require("img/jhjy.png"),
          img4: require("img/ppxq.png"),
          img5: require("img/kcyh.png"),
          img6: require("img/mycenter.png"),
        },
      }
    },
    components: {
      headers
    },

    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      chenageColor() {
        this.colors == "colors"
      }
    }
  }

</script>

<style lang="less">
  a {
    text-decoration: none;
    color: black;
  }

  .nav {
    width: 100%;
    font-size: 0.3rem;
    // margin-top: 0.2rem;
  }

  .rous1 {
    width: 32%;
    display: inline-block;
    border-right: solid 1px #E5E5E5;
    padding-top: 0.1rem;
    padding-bottom: 0.13rem;
    padding-left: 4%;
  }

  .rous4 {
    //  width: 32%;
    display: inline-block;
    //  border-right: solid 1px #E5E5E5;
    padding-top: 0.1rem;
    padding-bottom: 0.13rem;
    padding-left: 4%;
  }

  .rous1 img {
    width: 24%;
    vertical-align: middle;
  }

  .rous2 {
    width: 33%;
    display: inline-block;
    padding-top: 0.1rem;
    border-right: solid 1px #E5E5E5;
    padding-bottom: 0.13rem;
    padding-left: 4%;
  }

  .rous2 img {
    width: 24%;
    vertical-align: middle;
  }

  .rous3 {
    width: 32%;
    display: inline-block;
    padding-bottom: 0.13rem;
    padding-top: 0.1rem;
    padding-left: 4%;
  }

  .rous3 img {
    width: 24%;
    vertical-align: middle;
  }

  .above {
    border-bottom: #E5E5E5 1px solid;
  }

  //  .rous1:active{
  //    background: #3D8EEF;
  //  }
  // .rous2:active{
  //    background: #3D8EEF;
  //  }
  // .rous3:active{
  //    background: #3D8EEF;
  //  }
  //  .router-link-class{
  //    background: #3D8EEF;
  //  }
  .router-link-active {
    background: #C8E1FF;
  }

</style>
