<template>
    <div>
        <div style="height:100px">    
            <a href="#/mainpage"><img class="logo" src="../assets/biglogo.png" alt="logo" ></a>
            <b class="animate__animated animate__flipInX" id="header" style="=margin-top:10px;font-size:30px;">gamerank</b>          
        </div>

        <div style="background:rgb(245, 247, 248)">
            <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item index="1">
                    <i class="el-icon-menu"></i>
                    <a href="#/mainpage"><span slot="title" class="asidename">首页</span></a>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <a href="#/ranklist"><span slot="title" class="asidename">排行榜</span></a>
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-document"></i>
                     <span slot="title" class="asidename">社区</span>
                    </el-menu-item>
                <el-menu-item index="4">
                    <i class="el-icon-setting"></i>
                    <span slot="title" class="asidename">上传</span>
                </el-menu-item>
                 <el-menu-item index="5">
                    <i class="el-icon-setting"></i>
                    <span slot="title" class="asidename">个人</span>
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>



<script>
    export default {
       name:'sidebox',
       data(){
           return {msg:"sidebox"}
       }
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
</style>
