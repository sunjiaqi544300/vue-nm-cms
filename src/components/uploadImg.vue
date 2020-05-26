<!--:on-change="addFile"   :auto-upload="false"  -->
<template>
  <div v-loading="loading">
    <el-upload
      ref="upload"
      :action="uploadUrl()"
      with-credentials
      multiple
      :headers="headers"
      name="picture"
      list-type="picture-card"
      :limit="maxnum"
      :on-progress="uploadProgress"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :auto-upload="false"
      :on-change="addFile"
      :file-list="fileList"
      accept="image/*"
      :on-remove="handleRemove"
      :class="{'hide':hidelength}"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <img width="100%" :src="dialogImageUrl" alt />
    <el-button type="primary" @click="subFn" class="subbut" v-if="uploadsuccess == false">点击上传</el-button>
  </div>
</template>

<script>
import qs from "qs";
import axios from "axios";
import { hostType } from "api/env.js";

export default {
  props: {
    Dlicense: String,
    Dactivity_id: String,
    Dproduct: String
  },
  data() {
    return {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      multiple: false,
      hidelength: false,
      uploadComplete: true, // 图片上传完成状态
      imgVisible: false, // 上传图片预览
      dialogImageUrl: "", // 图片预览地址
      apihost: this.$apihost + "/wechat/api/shop",
      //文件上传的参数
      dialogVisible: false,
      //图片列表（用于在上传组件中回显图片）
      fileList: [],
      param: "",
      file: "",
      fileName: "",
      fd: [],
      loading: false,
      maxnum: 5,
      uploadsuccess: false //图片是否上传成功
    };
  },

  created() {
    // this.getdata()
  },
  methods: {
    getdata() {
      this.$axios
        .get(
          `${this.$apihost}` +
            "/wechat/api/image/?license=" +
            this.Dlicense +
            "&activity_id=" +
            this.Dactivity_id +
            "&product=" +
            this.Dproduct
        )
        .then(result => {
          console.log(result);
          if (result.data) {
            console.log(result.data);
            if (result.data.img_lis.length > 0) {
              let array = result.data.img_lis;
              for (let index = 0; index < array.length; index++) {
                this.fileList.push(
                  Object.assign(
                    {},
                    {
                      url: hostType(2) + "/" + array[index]
                    }
                  )
                );
              }
            }
          }
        });
    },
    uploadUrl() {
      return `${this.$apihost}` + "/wechat/api/shop/";
    },
    // base64转成bolb对象
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(",")[0].indexOf("base64") >= 0)
        byteString = atob(base64Data.split(",")[1]);
      else byteString = unescape(base64Data.split(",")[1]);
      var mimeString = base64Data
        .split(",")[0]
        .split(":")[1]
        .split(";")[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    // 压缩图片
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      canvas.width = width;
      canvas.height = height;
      // 铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.25);
      // console.log("*******压缩后的图片大小*******");
      // console.log(ndata)
      // console.log(ndata.length);
      return ndata;
    },
    uploadProgress() {},
    uploadSuccess() {},
    uploadError() {},
    addFile(file, fileList) {
      if (fileList.length >= this.maxnum) {
        this.hidelength = true;
      } else {
        this.hidelength = false;
      }
      console.log(file);
      console.log(fileList);
      var _this = this;
      const isJPG = file.raw.type === "image/jpeg";
      const isGIF = file.raw.type === "image/gif";
      const isPNG = file.raw.type === "image/png";
      const isBMP = file.raw.type === "image/bmp";
      //图片验证
      if (isJPG || isBMP || isGIF || isPNG) {
        //是否支持FileReader
        if (typeof FileReader != "undefined") {
          let reader = new FileReader();
          reader.readAsDataURL(file.raw);
          reader.onload = function(e) {
            let img = new Image();
            img.src = e.target.result;
            img.onload = () => {
              let data = _this.compress(img);
              let blob = _this.dataURItoBlob(data);
              console.log(blob);
              _this.fd.push(blob)
              _this.loading = false;
            };
          };
        } else {
          this.$message({
            message: "你的浏览器不支持FileReader！请更换浏览器",
            type: "error"
          });
        }
      } else {
        this.$message({
          message: "上传的图片格式不正确。请重新上传！",
          type: "error"
        });
      }
    },
    subFn() {
      if(this.fd.length == 0) return
      var params = new FormData();
      params.append('activity', this.Dactivity_id);
      params.append('license', this.Dlicense);
      params.append('product', this.Dproduct);
      for(let i= 0;i<this.fd.length;i++){
        params.append('files', this.fd[i]);
      }
      this.loading = true;
      let config = {
        headers: {
          "Content-Type":
            "multipart/form-data;boundary = " + new Date().getTime(),
          Authorization: "JWT " + localStorage.getItem("token")
        }
      };
      const axiosInstance = axios.create({
        withCredentials: true
      });
      axiosInstance
        .post(`${this.$apihost}` + "/wechat/api/shop/",params,config)
        .then(result => {
          if (result.data == "保存成功") {
            this.uploadsuccess = true;
            this.hidelength = true;
            this.$message({
              message: "图片上传成功！",
              type: "success"
            });
            this.loading = false;
          } else {
            this.$message({
              message: "已参加过活动",
              type: "error"
            });
            this.loading = false;
          }
        })
        .catch(err => {
          this.$message({
            message: "图片上传失败！" + " -- " + err.response.data,
            type: "error"
          });
          this.loading = false;
        });
    },
    //文件上传前的前的钩子函数
    //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
    // 移除图片
    handleRemove(file, fileList) {
      // this.fileChange(fileList);
      let fd = new FormData();

      for (let index = 0; index < fileList.length; index++) {
        // fd.append('files', fileList[index].raw);
        if (fileList[index].raw.size / 1024 / 1024 < 2) {
          // console.log("图片正常")
          fd.append("files", fileList[index].raw);
        } else {
          //判断支不支持FileReader
          // if (!file || !window.FileReader) return;
          // console.log("图片太大")
          let reader = new FileReader();
          //将图片转成base64格式
          reader.readAsDataURL(fileList[index].raw);
          reader.onload = function(e) {
            let result = this.result;
            let img = new Image();
            img.src = result;
            // console.log("********未压缩前的图片大小********");
            // console.log(result.length);
            img.onload = () => {
              let data = self.compress(img);
              self.imgUrl = result;
              let blob = self.dataURItoBlob(data);
              // console.log("*******base64转blob对象******");
              // console.log(blob);
              var formData = new FormData();
              fd.append("files", blob);
              self.loading = false;
            };
          };
        }
      }
      // fd.append('files', this.file);
      fd.append("activity", this.Dactivity_id);
      fd.append("license", this.Dlicense);
      fd.append("product", this.Dproduct);
      this.fd = fd;

      if (fileList.length >= this.maxnum) {
        this.hidelength = true;
      } else {
        this.hidelength = false;
      }
    },
    //compress(img,Orientation)
    //Orientation IOS图片反转
    compress(img) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");
      //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = (width * height) / 4000000) > 1) {
        console.log("大于400万像素");
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
      // 		铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = (width * height) / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(
              img,
              i * nw * ratio,
              j * nh * ratio,
              nw * ratio,
              nh * ratio,
              0,
              0,
              nw,
              nh
            );
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      // if (Orientation != "" && Orientation != 1) {
      //   switch (Orientation) {
      //     case 6: //需要顺时针（向左）90度旋转
      //       this.rotateImg(img, "left", canvas);
      //       break;
      //     case 8: //需要逆时针（向右）90度旋转
      //       this.rotateImg(img, "right", canvas);
      //       break;
      //     case 3: //需要180度旋转
      //       this.rotateImg(img, "right", canvas); //转两次
      //       this.rotateImg(img, "right", canvas);
      //       break;
      //   }
      // }
      //进行最小压缩
      let ndata = canvas.toDataURL("image/jpeg", 0.2);

      console.log(
        "压缩率：" + ~~((100 * (initSize - ndata.length)) / initSize) + "%"
      );
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;

      return ndata;
    }
  }
};
</script>
<style scoped>
.subbut {
  margin-top: 15px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>