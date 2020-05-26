<template>
  <div class="pageh">
    <el-carousel :interval="5000" arrow="always" class="d_jump" :height="imgHeight">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <el-row>
          <el-col :span="24"><img ref="imgHeight" style="width:100%;height:3rem" :src="item.idView"
              class="banner_img" /></el-col>
        </el-row>
      </el-carousel-item>
    </el-carousel>

  </div>

</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        imgList: [{
            id: 0,
            idView: require('../Header/img/1.jpg')
          },
          {
            id: 1,
            idView: require('../Header/img/3.jpg')
          },
          {
            id: 2,
            idView: require('../Header/img/5.jpg')
          },
          {
            id: 3,
            idView: require('../Header/img/6.jpg')
          },
          {
            id: 4,
            idView: require('../Header/img/7.jpg')
          },
          {
            id: 5,
            idView: require('../Header/img/8.jpg')
          },
        ]

      }
    },
    components: {

    }
  }

</script>

<style scoped>
  .pageh {
    width: 100%;
    height: 3rem;
    /* background: pink; */
    /* font-size:20px; */
  }

  .pageh img {
    width: 100%;
    height: 100%;
  }

  .el-carousel__indicators {
    display: none;
  }

  .el-icon-arrow-right {
    display: none;
  }

</style>
