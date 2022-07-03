<template>
<div >
    <el-container>
        <!-- 左边栏 -->
        <el-aside style="width:20%">
          <div style="height:100px">    
              <a href="#/mainpage"><img class="logo" src="../assets/biglogo.png" alt="logo" ></a>
              <b class="animate__animated animate__flipInX" id="header" style="=margin-top:10px;font-size:30px;">gamerank</b>          
          </div>
        </el-aside>

        <el-main style="width:65%;height:100%;padding-bottom:200px">
            
        <div class="login-wrap">
            <el-form class="login-container">
            <h1 class="title">用户登录</h1>
            <el-form-item label="账号">
                <el-input type="text" v-model="username" placeholder="登录账号" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
                <el-input type="password" v-model="password" placeholder="登录密码" autocomplete="off"></el-input>
            </el-form-item>
            <div style="margin-bottom:5%">
                    <a href="#/register" style="text-decoration:underline; color:#428bca;">没有账号？立即注册</a>
            </div>
            <el-form-item>
                <el-button :plain="true" type="primary" style="width: 100%;" @click="submit()">登录</el-button>
            </el-form-item>
            </el-form>
        </div>

        </el-main>
        <el-aside>
            <a class="loginBtn" href="#/login">登录</a>
            
            <a class="regBtn" href="#/register">注册</a>
        </el-aside>
        
      
    </el-container>



</div>
    
</template>


<style>

 .login-wrap {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 10%;
    background-image:url('../assets/background.svg');
    /* background-color: #112346; */
    background-repeat: no-repeat;
    background-position: center right;
    background-size: 100%;
  }
 
  .login-container {
    border-radius: 10px;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    text-align: left;
    box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
  }
 
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

.el-card{
    margin-right: 0px;
    margin-left: 0px;
}
a{
  text-decoration:none;
  color: black;
}
.bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

.loginPart{
  display:inline-block;
  margin-bottom: 50px;
  margin-top: -10px;
}

.logo{
    width: 100%;
    height: 100%;
    max-width:50px;
    max-height:50px;
    position:relative;
    
    box-sizing: border-box;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 50%;
    margin:auto;
}
   
</style>

<script>
import axios from 'axios'

export default {
    name:'login',
    data(){
      return{
          username:'',
          password:''
      }
    },
    methods:{
      submit(){
           let formData = new FormData();
           formData.append('username',this.username)
           formData.append('password',this.password)
          axios({
              method:"POST",
              url:'http://localhost:5000/api/signin',
              withCredentials:true,
              headers: {
                "Content-Type": "multipart/form-data"
              },
              data:formData
          }).then((response)=>{
              if(response.data.status=='success'){
                this.$message({
                  message: '登录成功，即将跳转',
                  type: 'success'
                })
                this.$cookies.set('username',this.username,60*30)
                window.location.href="#/mainpage"
              }
          }).catch((error)=>{
            console.log(error)
                this.$message({
                  message: '账户或密码错误，请重新输入',
                  type: 'error'
                })
          })
      }
      //变量

    }
}
</script>
