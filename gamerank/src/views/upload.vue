<template>
<div>
    <el-container style="height:1000px">
        <!-- 左边栏 -->
        <my-left-menu :username="username" style="width:20%"></my-left-menu>

        <el-main style="width:45%;height:100%">
            <div style="margin-top:8%">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="游戏名称">
                        <el-input v-model="form.game_title"></el-input>
                    </el-form-item>
                     <el-form-item label="游戏介绍">
                        <el-input type="textarea" v-model="form.game_intro"></el-input>
                    </el-form-item>
                    <el-form-item label="游戏平台">
                        <el-col :span="11" >
                        <el-select v-model="form.game_type_name" placeholder="请选择游戏平台"  style="width: 100%;">
                        <el-option label="PS4" value="PS4"></el-option>
                        <el-option label="XBOX" value="XBOX"></el-option>
                        <el-option label="PC" value="PC"></el-option>
                        <el-option label="PSP" value="PSP"></el-option>
                        </el-select>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="发行时间">
                        <el-col :span="11" >
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.game_release_time" style="width: 100%;"></el-date-picker>
                        </el-col>

                    </el-form-item>
                

                    <el-form-item label="上传图片">
                        <el-col :span="11">
                    <el-upload ref="elupload" action=""  multiple :auto-upload="false" :http-request="handleupload"  list-type="picture-card" :limit="4">
	                    <i class="el-icon-plus"></i>
                    </el-upload>
                        </el-col>
                    </el-form-item>


                    <el-form-item >
                        <el-button type="primary" @click="upload()">立即上传</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </el-main>
        

    </el-container>



</div>
    
</template>


<style>

a{
  text-decoration:none;
  color: black;
}
.loginPart{
  display:inline-block;
  margin-bottom: 50px;
  margin-top: -10px;
}

   
</style>

<script>
import axios from 'axios'


export default {

    name:'MainPage',
    data(){
        return{
            is_authenticated:0,
            username:'',
            form:{
                game_title:'',
                game_intro:'',
                game_release_time:'',
                game_type_name:''
            },
            screenshotList:[],

        }
    },
    created(){
      this.is_authenticated=this.$cookies.isKey('username')
      this.username=this.$cookies.get('username')
    },
    methods:{
      getGameCover(id){
        return require("../assets/gameMaterialStock/"+id+"/game_cover.png")
      },
      getScreenShot(id,index){
        return require("../assets/gameMaterialStock/"+id+"/screenshot"+index+".png")
      },
      //变量
    handleupload(param) {
        //alert('*')
        this.screenshotList.push(param.file);// 一般情况下是在这里创建FormData对象，但我们需要上传多个文件，为避免发送多次请求，因此在这里只进行文件的获取，param可以拿到文件上传的所有信息
    },
    uploadelupload() {
      let formdata = new FormData()
      this.$refs.elupload.submit(); // 这里是执行文件上传的函数，其实也就是获取我们要上传的文件  
      //alert(this.screenshotList.length)
      for(var i=1;i<=this.screenshotList.length;i++)
        formdata.append(i==1?"game_cover":"screenshot"+i-1,this.screenshotList[i]);
      //alert(this.screenshotList.length)
      formdata.append('game_title',this.form.game_title)
      formdata.append('game_intro',this.form.game_intro)
      formdata.append('game_release_time',this.form.romgame_release_time)
      formdata.append('game_type_name',this.form.game_type_name)
        //alert(this.screenshotList.length)
        if(this.is_authenticated){
             axios({
              method:"POST",
              url:'http://localhost:5000/api/game/upload-new-game',
              headers: {
                "Content-Type": "multipart/form-data"
              },
              withCredentials:true,
              data:formdata
          }).then((response)=>{
              this.$message({
                  message: '上传成功',
                  type: 'success'
                })
          })
        }
        else{
            this.$message({
                  message: '请先登录',
                  type: 'error'
                })
        }
    },

    upload(){
        this.uploadelupload()
    }

    }
}
</script>
