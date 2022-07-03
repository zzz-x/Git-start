<template>
<div>
    <el-container style="padding-bottom:300px">
        <my-left-menu style="width:20%" :username="username">
        </my-left-menu>
        
        <el-main style="width:65%;height:100%">
            <div>
            <h2 v-if="is_authenticated">我的收藏</h2>
            <h2 v-else>他的收藏</h2>
                <el-row v-for=" rowindex in Math.ceil(this.gameList.length/4)" :key="rowindex" style="margin-top:30px">
                    <el-col :span="5" v-for="(o, index) in Math.min(4,gameList.length-(rowindex-1)*4)" :key="o" :offset="index > 0 ? 1 : 0">
                        <el-card :body-style="{ padding: '0px'}">
                        <a :href="getGameUrl(gameList[(rowindex-1)*4+index].game_id)"><img :src="getGameCover(gameList[(rowindex-1)*4+index].game_id)" class="image" style="height:100%;width:100%"></a>
                        <div style="padding: 14px;">
                            <a :href="getGameUrl(gameList[(rowindex-1)*4+index].game_id)"><b><span>{{gameList[(rowindex-1)*4+index].game_title.split('】')[1]}}</span></b></a>
                            <div class="bottom clearfix">
                            <el-tag type="success">{{gameList[(rowindex-1)*4+index].game_title.split('】')[0].split('【')[1]}}</el-tag>
                           <el-button type="warning" size="small" icon="el-icon-star-off" circle style="float:right"></el-button>
                            </div>
                        </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            <div style="margin-top:5%">
              <h2 v-if="is_authenticated">我的动态</h2>
              <h2 v-else>他的动态</h2>

          <div style="background-color:#ffffff;margin:0px;width:95%;">
            <div v-for="(item, pos) in comments"
              :key="pos" > 
              <my-comment-card :commentinfo="item" :username="username" style="width:95%">
              </my-comment-card>
              <el-divider ></el-divider>
            </div>
          </div>
            </div>
            
        </el-main>
        
        
        <!-- 标签 -->
        <el-aside style="width:15%;height:100%">
            
            <div v-if="!is_authenticated" class="loginPart">
            <a class="loginBtn" href="#/login">登录</a>
            
            <a class="regBtn" href="#/register">注册</a>
            </div>

          <div v-else class="loginPart">
            <el-dropdown>
              <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" style="margin-top:10%"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="toUserPage(username)">个人页面</el-dropdown-item>
                <el-dropdown-item @click.native="toRanklist()">排行榜</el-dropdown-item>
                <el-dropdown-item @click.native="toMainpage()">首页</el-dropdown-item>
                <el-dropdown-item @click.native="logout()">登出</el-dropdown-item>
              </el-dropdown-menu>
              <span style="font-size:large;">hi,{{this.username}}</span>
            </el-dropdown>
          </div>

            <div class="sidebox" style="height:30%;margin-top:10%">
                <div style="display:inline-block;margin-top:10px">
                根据平台选择
                <ul id="SBSelectorList1" style="display:inline-block">
                <a href="#/mainpage"><li><el-tag type="info">全部</el-tag></li></a>
                <a href="#/mainpage/PSP"><li><el-tag type="info">PSP</el-tag></li></a>
                <a href="#/mainpage/PS4"><li><el-tag type="info">PS4</el-tag></li></a>
                <a href="#/mainpage/XBOX"><li><el-tag type="info">XBOX</el-tag></li></a>
                <a href="#/mainpage/PC"><li><el-tag type="info">PC</el-tag></li></a>
                </ul>
                </div>
                <div style="display:inline-block">
                根据发布年代筛选
                <ul id="SBSelectorList1" style="display:inline-block">
                <a href="#/mainpage"><li><el-tag type="info">全部</el-tag></li></a>
                <a href="#/mainpage/all/2019"><li><el-tag type="info">2019</el-tag></li></a>
                <a href="#/mainpage/all/2018"><li><el-tag type="info">2018</el-tag></li></a>
                <a href="#/mainpage/all/2017"><li><el-tag type="info">2017</el-tag></li></a>
                <a href="#/mainpage/all/2016"><li><el-tag type="info">2016</el-tag></li></a>
                <a href="#/mainpage/all/2015"><li><el-tag type="info">2015</el-tag></li></a>
                <a href="#/mainpage/all/2014"><li><el-tag type="info">2014</el-tag></li></a>

                </ul>
                </div>
            </div>
        </el-aside >

    </el-container>



</div>
    
</template>


<style>

.userComment {
  background-color: rgb(239, 239, 239);
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 50px;
  padding: 20px;
  text-align: left;
  border-radius: 10px;
}


a{
  text-decoration:none;
  color: black;
}

.userComment{
    background-color: rgb(239, 239, 239);
    margin-bottom: 20px;
    margin-top: 20px;
    margin-right: 50px;
    padding:20px;
    text-align: left;
    border-radius: 10px;
}


.sidebox{
    /* height:60%; */
    /* 相对当前页面高度的60% */
    height:600px;
    /* border: 2px solid rgb(0, 255, 76); */
    backdrop-filter:blur(20px); 
    background: #ffffff;
    box-sizing: border-box;
    border-radius: 5%;
}


#SBSelectorList1 li{
    float:left;
    margin:5px;
    /* 文字居中 */   

}
#SBSelectorList1{
    list-style: none;
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
    created(){
      this.username=this.$route.params.userid;
      this.is_authenticated=(this.username==this.$cookies.get('username'))


      if(this.is_authenticated){
        //获取收藏的游戏
        let collectUrl="http://localhost:5000/api/game/get-collected-games"
        axios({
          method:"get",
          url:collectUrl,
          withCredentials:true
        }).then((response)=>{
          //console.log(response)
          this.gameList=response.data.data
          //console.log(this.gameList)
        })

        var userid;
        //获取评论
        axios({
            method:"get",
            url:"http://localhost:5000/api/get-account",
            withCredentials:true
        }).then((response)=>{
            userid=response.data.data.id
             var comment_url="http://localhost:5000/api/game/get-comments-by-user_id?user_id="+userid
            axios({
              method:'get',
              url:comment_url,
              withCredentials:true
            }).then((response)=>{
              console.log(response)
              this.comments=response.data.comments
                for (var i = 0; i < this.comments.length; i++)
        this.comments[i].comment_time = this.msToDate(
          this.comments[0].comment_time
        ).hasTime;
            })
        })
      }

    },
    data(){
        return{
            gameList:[],
            comments:[],
            is_authenticated:false,
            username:''
        }
    },
    methods:{
      getGameCover(id){
        return require("../assets/gameMaterialStock/"+id+"/game_cover.png")
      },
       getGameUrl(id){
        return "#/gamepage/"+id
      },
      getScreenShot(id,index){
        return require("../assets/gameMaterialStock/"+id+"/screenshot"+index+".png")
      },
      //变量
        logout(){
          axios({
            method:"post",
            url:"http://localhost:5000/api/signout",
            withCredentials:true
          }).then((response)=>{
            console.log(response)
             this.$cookies.remove('username')
            this.$notify({
              title: '成功',
              message: '登出成功',
              type: 'success'
            });
            window.location.reload()
          })
          .catch((response)=>{
             this.$notify({
              title: '失败',
              message: '登出失败',
              type: 'error'
            });
            window.location.reload()
          })
      },
      toMainpage(){
        window.location.href="#/"
      },
      toUserPage(username){
        window.location.href="#/userpage/"+username
      },
      toRanklist(){
        window.location.href="#/ranklist"
      },
      msToDate(msec) {
      let datetime = new Date(msec);
      let year = datetime.getFullYear();
      let month = datetime.getMonth();
      let date = datetime.getDate();
      let hour = datetime.getHours();
      let minute = datetime.getMinutes();
      let second = datetime.getSeconds();

      let result1 =
        year +
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date) +
        " " +
        (hour + 1 < 10 ? "0" + hour : hour) +
        ":" +
        (minute + 1 < 10 ? "0" + minute : minute) +
        ":" +
        (second + 1 < 10 ? "0" + second : second);

      let result2 =
        year +
        "-" +
        (month + 1 >= 10 ? month + 1 : "0" + (month + 1)) +
        "-" +
        (date + 1 < 10 ? "0" + date : date);

      let result = {
        hasTime: result1,
        withoutTime: result2,
      };
      return result;
    },
    }
}
</script>
