


<template>
<div>
    <el-container>
        <my-left-menu style="width:20%" :username="username">
        </my-left-menu>
         <el-container style="width:60%;height:100%">
            <el-main style="width:80%; margin-left:10%;margin-right:10%">

                          <search_input :isHistory="true"
                        :lists_title="search_result_title"
                        :lists_note="search_result_note"
                        input_length
                        @parent_get_lists="get_selected_lists"
                        @parent_search="finish_search"
                        style="margin-bottom:5%"
                        >
              </search_input>
              <div class="rankbox">
                <div v-for="(item,index) in gamelist" :key="index" style="padding-left:5px;padding-right:5px">
                    <el-row >
                        <el-col :span="1" style="margin-right:-20px">
                            <h1 style="margin-top:50px">{{index+1}}</h1>
                        </el-col>
                        <el-col :span="8">
                            <a :href="getGameUrl(item.game_id)"><img :src="getGameCover(item.game_id)" alt="" style="height:100px;  width:100px; border-radius:10%"></a>
                        </el-col>
                        
                        <el-col :span="8" style="margin-left:-20px;text-align:left">
                            <el-row style="margin-top:5px" >
                            <a :href="getGameUrl(item.game_id)"><b>{{item.game_title.split('】')[1]}}</b></a>
                            </el-row>
                            <el-row style="margin-top:10px">
                                <el-tag  effect="dark" color="#15c5ce">{{item.game_title.split('】')[0].split('【')[1]}}</el-tag>
                                <el-tag color="#ffffff" hit="true">{{item.game_type_name}}</el-tag>
                            </el-row>
                            <el-row style="margin-top:-5px">
                                <i  style="margin-top:20px;color:#15c5ce" class="el-icon-star-on"><b>{{item.game_average_score.toFixed(1)}}</b></i>
                                 发行时间：{{item.game_release_time}}
                            </el-row>
                        </el-col>

                        <el-col :span="8">
                            <el-image 
                                style="border-radius:10%;height:100px"
                                :src="getScreenShot(item.game_id,2)" 
                                :preview-src-list="getScreenShotArr(item.game_id)">
                            </el-image>
                        </el-col>
                    
                    </el-row>
                    <el-divider></el-divider>
                </div>
            </div>
        </el-main>
         </el-container>


        <el-aside style="width:20%">
          
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

          <div class="sidebox" style="height:300px">
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

          <my-game-recommend :item="random_games">
          </my-game-recommend>
        </el-aside >

    </el-container>



</div>
    
</template>


<style>

a{
  text-decoration:none;
  color: black;
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
.loginBtn{
    width:50%;
    height:100%;
    color: rgb(0, 0, 0);
    text-decoration: none;
    right:0px;
    border: 2px solid rgba(217, 255, 4, 0);
    padding: 0px 10px 0px;
    box-sizing: border-box;
    font-size:medium;
}

.regBtn{
    width:50%;
    height:100%;
    color: rgb(0, 0, 0);
    border: 2px solid rgba(217, 255, 4, 0);
    text-decoration: none;
    /* float:right; */
    right:0px;
    padding:  0px 10px 0px;
    box-sizing: border-box;
    font-size:medium;
}

.logOutBtn{
    color: rgb(0, 0, 0);
    text-decoration: none;
    font-size:medium;
    width:10%;
    float:right;
    /* border: 2px solid rgb(217, 255, 4); */
    /* border-radius: 10px; */
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

.rankbox{
    backdrop-filter:blur(20px); 
    background: rgb(245, 247, 248);
    padding-top:30px
}



   
 
</style>

<script>
import bm_search_input from 'bm_search_input'
import axios from 'axios'


export default {
    name:'MainPage',
    components:bm_search_input,
    watch:{
	      '$route':"getData"
	 	},
    data(){
        return{
            gamelist:[],
            random_games:[],
            is_authenticated:false,
            msg:'test game page',
            collect_status:[],
            username:'',
            search_result_title:[],
            //搜索结果中的备注(不需要可以删掉)
            search_result_note:[],
        }
    },
    created(){
      this.getData()
      this.getRandomGame(8)
    },
    methods:{
         getRandomGame(num){
          axios({
          method:"get",
          url:"http://localhost:5000/api/game/get-random-games?num="+num
        }).then((response)=>{
          console.log(response)
          this.random_games=response.data.data
        })
      },
      getGameCover(id){
        return require("../assets/gameMaterialStock/"+id+"/game_cover.png")
      },
      getGameUrl(id){
        return "#/gamepage/"+id
      },
          getScreenShot(id, index) {
      return require("../assets/gameMaterialStock/" +
        id +
        "/screenshot" +
        index +
        ".png");
    },
        getScreenShotArr(id) {
        var arr=[]
        for(var i=1;i<=3;i++)
        arr.push(require("../assets/gameMaterialStock/" +
                            id +
                            "/screenshot" +
                            i +
                            ".png"))
        return arr
        },
      goTypeYear(type,year){
        var url="#/mainapge"
        if(type!="none")
          url+="/"+type
        if(year!="none")
          url+="/"+year  
        this.$router.push({
          
          path: url//要跳转的页面的路由
        });
      },
      get_selected_lists(input_content){
        axios({
          method:"get",
          url:"http://localhost:5000/api/game/search?keyword="+input_content
        }).then((res)=>{

          res.data.data.forEach((item,index) => {
              this.search_result_title[index] = res.data.data[index].game_title;
              this.search_result_note[index] = res.data.data[index].game_id;
            })
        })
      },

      finish_search(input_content){
        input_content=input_content.split('.')[0].substring(0,15)
        
        console.log(input_content);
        //搜索框显示完成，页面展示搜索结果
        //这里写入你之后想要运行的程序
        axios({
          method:"get",
          url:"http://localhost:5000/api/game/search?keyword="+input_content
        }).then((response)=>{
          console.log(response)
          if(response.data.data.length>0){
            window.location.href="#/gamepage/"+response.data.data[0].game_id
          }
          else{
              this.$message({
                                message: '查找为空',
                                type: 'error'
                              })
          }
        })
      },

      dealCollect(id){
        if(this.is_authenticated){
            let collectUrl='http://localhost:5000/api/game/collect?game_id='+id
              axios({
              method:"post",
              url:collectUrl,
              withCredentials:true,
            }).then((response) => {
              console.log(response)
              alert("收藏成功")
          })
        }
      },
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

      getData(){
        this.is_authenticated=this.$cookies.isKey('username')
        this.username=this.$cookies.get('username')
        var requestUrl="http://127.0.0.1:5000/api/get-games?limit=20&offset=1";
      
        //获取信息
        axios({
            method:"get",
            url:requestUrl,
        }).then((response) => {
        this.gamelist=response.data.data;
        for (var i = 0; i < this.gamelist.length; i++)
            this.gamelist[i].game_release_time = this.msToDate(
          this.gamelist[0].game_release_time
        ).withoutTime;      
            //如果登录的话，还需获取收藏信息
            if(this.is_authenticated){
                for(var i=0;i<this.gamelist.length;i++){
                var item=this.gamelist[i]
                var collectUrl="http://localhost:5000/api/game/is-collected?game_id="+item.game_id
                axios({
                    method:"get",
                    url:collectUrl,
                    withCredentials:true
                }).then((response)=>{
                    this.collect_status.push(response.data.is_collected);
                    })
                }
            }
        });
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
        }
    }
}
</script>
