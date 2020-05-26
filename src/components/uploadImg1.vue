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
               :on-remove="handleRemove" :class="{'hide':hidelength}">
        <i class="el-icon-plus"></i>
    </el-upload>
    <img width="100%" :src="dialogImageUrl" alt="">
    <el-button type="primary" @click="subFn" class="subbut" v-if="uploadsuccess == false">点击上传</el-button>
  </div>
</template>

<script>
import qs from "qs"
import axios from 'axios'
import {hostType} from "api/env.js"

export default {
       props:{
        Dlicense:String,
        Dactivity_id:String,
        Dproduct:String,
      },
  data () {
    return {
        headers:{
            "Content-Type": "multipart/form-data"
        },
        multiple:false,
        hidelength:false,
        uploadComplete: true, // 图片上传完成状态
        imgVisible: false, // 上传图片预览
        dialogImageUrl: '', // 图片预览地址
        apihost:this.$apihost + "/wechat/api/shop",
       //文件上传的参数
        dialogVisible: false,
        //图片列表（用于在上传组件中回显图片）
        fileList: [],
        param:"",
        file:"",
        fileName:"",
        fd:"",
        loading:false,
        maxnum:5,
        uploadsuccess:false,//图片是否上传成功
    };
  },

  created(){
    // this.getdata()
  },
  methods: {
        getdata(){
            this.$axios.get(`${this.$apihost}`+"/wechat/api/image/?license="+ this.Dlicense + "&activity_id="+ this.Dactivity_id + "&product=" + this.Dproduct).then((result) =>  {
              console.log(result)
                    if(result.data ){
                        console.log(result.data)
                          if(result.data.img_lis.length > 0){
                                let array = result.data.img_lis
                                for (let index = 0; index < array.length; index++) {
                                  this.fileList.push(Object.assign({},{
                                    url:hostType(2) + '/' + array[index]
                                  }))
                                }
                            }
                    }
              })  

        }, 
        uploadUrl(){
          return `${this.$apihost}`+"/wechat/api/shop/" 
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
          let ndata = canvas.toDataURL("image/jpeg", 0.2);
          // console.log("*******压缩后的图片大小*******");
          // console.log(ndata)
          // console.log(ndata.length);
          return ndata;
        },
        addFile(file,fileList){

            const isJPG = file.raw.type === 'image/jpeg';
            const isGIF = file.raw.type === 'image/gif';
            const isPNG = file.raw.type === 'image/png';
            const isBMP = file.raw.type === 'image/bmp';
            const isLt2M = file.raw.size / 1024 / 1024 < 2;
            let self = this
            this.loading = true
            if(isJPG || isBMP || isGIF || isPNG){
                   this.file = file.raw;
                  this.fileName = file.name;
                  let fd = new FormData()
                  let fileListarr  =  fileList
                    for (let index = 0; index < fileList.length; index++) {
                          if(fileList[index].raw.size / 1024 / 1024 < 2){
                              // console.log("图片正常")
                              fd.append('files', fileList[index].raw); 
                               self.loading = false
                          }else{
                              //判断支不支持FileReader
                              // if (!file || !window.FileReader) return;
                              // console.log("图片太大")
                               let reader = new FileReader();
                                //将图片转成base64格式
                                    reader.readAsDataURL(fileList[index].raw);
                                    reader.onload = function (e) {
                                          let result = this.result;
                                          let img = new Image();
                                          img.src = result;
                                          // console.log("********未压缩前的图片大小********");
                                          // console.log(result.length);
                                            img.onload = ()=> {
                                                      let data = self.compress(img);
                                                      self.imgUrl = result;
                                                      let blob = self.dataURItoBlob(data);
                                                      // console.log("*******base64转blob对象******");
                                                      var formData = new FormData();
                                                      fd.append("files", blob);
                                                      self.loading = false
                                            }
                                    }
                          }
                          
                    }

                  // fd.append('files', this.file);
                  fd.append('activity', this.Dactivity_id);
                  fd.append('license', this.Dlicense);
                  fd.append('product', this.Dproduct);
                  this.fd = fd
                  if(fileList.length >= this.maxnum){
                    this.hidelength = true
                  }else{
                    this.hidelength = false
                  }
                        
            }else{
              this.$message({
                  message:"上传的图片格式不正确。请重新上传！",
                  type: 'error'
               })
               return false
            }

        },
        subFn(){
           this.loading = true

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data;boundary = ' + new Date().getTime(),
                    "Authorization": "JWT " + localStorage.getItem('token'),
                }
            };

            const axiosInstance = axios.create({
                    withCredentials: true,
            }); 
            
            // console.log(axiosInstance)
            console.log(this.fd)
            axiosInstance.post(`${this.$apihost}`+"/wechat/api/shop/",this.fd,config).then((result) => {
                     if(result.data == "保存成功"){
                        this.uploadsuccess = true
                        this.hidelength = true
                        this.$message({
                          message:"图片上传成功！",
                          type: 'success'
                        })
                        
                        // this.getdata()
                        this.fd = new FormData()
                        this.loading = false
                     }else{
                       this.$message({
                          message:"已参加过活动",
                          type: 'error'
                        })
                         this.loading = false
                     }           
            }).catch((err)=> {
                    //上传失败

                    // console.log(err.response.data)
                    this.$message({
                          message:"图片上传失败！"+" -- " + err.response.data,
                          type: 'error'
                        })
                    this.loading = false
             });   
        },
        //文件上传前的前的钩子函数
        //参数是上传的文件，若返回false，或返回Primary且被reject，则停止上传
        beforeUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isGIF = file.type === 'image/gif';
            const isPNG = file.type === 'image/png';
            const isBMP = file.type === 'image/bmp';
            const isLt2M = file.size / 1024 / 1024 < 2;
 
            if (!isJPG && !isGIF && !isPNG && !isBMP) {
                this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 2MB!');
            }
                // console.log(file);
                //创建临时的路径来展示图片
                var windowURL = window.URL || window.webkitURL;
                this.src=windowURL.createObjectURL(file);
                //重新写一个表单上传的方法
                this.param = new FormData();
                this.param.append('file', file, file.name);
                return false;

            return (isJPG || isBMP || isGIF || isPNG) && isLt2M;
        },   
          // 上传图片时调用
          uploadProgress(event,file, fileList){
            this.uploadComplete = false;
          },
           // 上传图片成功
          uploadSuccess(res, file, fileList) {
            this.uploadComplete = true;
            
          },
          // 上传图片出错
          uploadError(err, file, fileList) {
            this.$message.error("上传出错");
          },
          // 移除图片
          handleRemove(file, fileList) {
            // this.fileChange(fileList);
            let fd = new FormData()
           
              for (let index = 0; index < fileList.length; index++) {
                    // fd.append('files', fileList[index].raw);
                          if(fileList[index].raw.size / 1024 / 1024 < 2){
                              // console.log("图片正常")
                              fd.append('files', fileList[index].raw); 
                          }else{
                              //判断支不支持FileReader
                              // if (!file || !window.FileReader) return;
                              // console.log("图片太大")
                               let reader = new FileReader();
                                //将图片转成base64格式
                                    reader.readAsDataURL(fileList[index].raw);
                                    reader.onload = function (e) {
                                          let result = this.result;
                                          let img = new Image();
                                          img.src = result;
                                          // console.log("********未压缩前的图片大小********");
                                          // console.log(result.length);
                                            img.onload = ()=> {
                                                      let data = self.compress(img);
                                                      self.imgUrl = result;
                                                      let blob = self.dataURItoBlob(data);
                                                      // console.log("*******base64转blob对象******");
                                                      // console.log(blob);
                                                      var formData = new FormData();
                                                      fd.append("files", blob);
                                                      self.loading = false
                                            }
                                    }
                          }

              }
            // fd.append('files', this.file);
            fd.append('activity', this.Dactivity_id);
            fd.append('license', this.Dlicense);
            fd.append('product', this.Dproduct);
            this.fd = fd
            
             if(fileList.length >= this.maxnum){
                this.hidelength = true
              }else{
                this.hidelength = false
              }
          },
          // 图片预览
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.imgVisible = true;
          }
  }
}

</script>
<style scoped>
.subbut{
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
    border-color: #409EFF;
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