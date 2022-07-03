<template>
    <div style="background-color:#f5f7f8">
        <div style="height:100px">    
            <a href="#/mainpage"><img class="logo" src="../assets/biglogo.png" alt="logo" ></a>
            <b class="animate__animated animate__flipInX" id="header" style="=margin-top:10px;font-size:30px;">gamerank</b>          
        </div>

        <div style="background-color:#f5f7f8">
            <el-menu  class="el-menu-vertical-demo" background-color="#f5f7f8" active-text-color="#14c9d2">
                <el-menu-item index="1">
                    <i class="el-icon-s-home"></i>
                    <a href="#/mainpage"><span slot="title" class="asidename">首页</span></a>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-rank"></i>
                    <a href="#/ranklist"><span slot="title" class="asidename">排行</span></a>
                </el-menu-item>
                <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-more"></i>
                    <span slot="title" class="asidename">分类</span>
                    </template>
                    <el-menu-item-group>
                    <template slot="title">时间</template>
                        <a href="#/mainpage/all/2018"><el-menu-item index="3-1">2018</el-menu-item></a>
                        <a href="#/mainpage/all/2017"><el-menu-item index="3-2">2017</el-menu-item></a>
                        <a href="#/mainpage/all/2016"><el-menu-item index="3-3">2016</el-menu-item></a>
                        <a href="#/mainpage/all/2015"><el-menu-item index="3-4">2015</el-menu-item></a>
                    </el-menu-item-group>
                    <el-menu-item-group title="平台">
                     <a href="#/mainpage/PSP"><el-menu-item index="3-5">PSP</el-menu-item></a>
                     <a href="#/mainpage/PS4"><el-menu-item index="3-6">PS4</el-menu-item></a>
                     <a href="#/mainpage/XOBX"><el-menu-item index="3-7">XBOX</el-menu-item></a>
                     <a href="#/mainpage/PC"><el-menu-item index="3-8">PC</el-menu-item></a>
                    </el-menu-item-group>
                </el-submenu>
                 <el-menu-item index="4">
                    <i class="el-icon-user"></i>
                    <a :href="userUrl+username"><span slot="title" class="asidename">个人</span></a>
                </el-menu-item>
                <el-menu-item index="5">
                    <i class="el-icon-upload"></i>
                    <a href="#/upload"><span slot="title" class="asidename">上传</span></a>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>



<script>
    export default {
       name:'MyLeftMenu',
       data(){
           return {
            msg:"MyLeftMenu",
            userUrl:'#/userpage/',
           }
       },
       props: ['username']
    }
</script>

<style>
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
a{
  text-decoration: none;
  color: black;
}
.asidename{
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size: x-large;
        font-weight: bold;
}
</style>
