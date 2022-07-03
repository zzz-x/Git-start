


<template style="background-color:#f5f7f8">
<div style="background-color:#f5f7f8">
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
                        style="margin-bottom:5%;"
                        >
              </search_input>
              <div v-for="(iteminfo,index) in gamelist" :key="iteminfo.game_id" id="aGame" class="animate__animated animate__bounceInUp" >
                    <my-game-card :item="iteminfo" :msg="collect_status[index]" :is_authenticated="is_authenticated">
                    </my-game-card>
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

          <h3>分类选择</h3>
          <div class="sidebox" style="height:300px;margin-bottom:20%">
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


<style scoped>

a{
  text-decoration: none;
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

</style>

<script>
import bm_search_input from 'bm_search_input'
import axios from 'axios'
import myGameRecommend from '../components/my-game-recommend.vue'


export default {
  components: { myGameRecommend },
    name:'MainPage',
    components:bm_search_input,
    watch:{
	      '$route':["getData","getRandomGame(8)"]
	 	},
    data(){
        return{
            gamelist:[],
            random_games:[],
            collect_status:[],
            is_authenticated:false,
            msg:'test game page',
            username:'',
            search_result_title:[],
            //搜索结果中的备注(不需要可以删掉)
            search_result_note:[]
        }
    },
    created(){
      this.getData()
      this.getRandomGame(8)
    },
    methods:{
      getGameCover(id){
        return require("../assets/gameMaterialStock/"+id+"/game_cover.png")
      },
      getGameUrl(id){
        return "#/gamepage/"+id
      },
      getRandomGame(num){
          axios({
          method:"get",
          url:"http://localhost:5000/api/game/get-random-games?num="+num
        }).then((response)=>{
          console.log(response)
          this.random_games=response.data.data
        })
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
              this.search_result_note[index] = index;
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
      toMainpage(){
        window.location.href="#/"
      },
      toUserPage(username){
        window.location.href="#/userpage/"+username
      },
      toRanklist(){
        window.location.href="#/ranklist"
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

      getData(){
           this.is_authenticated=this.$cookies.isKey('username')
      this.username=this.$cookies.get('username')
      let type=this.$route.params.type;
      let year=this.$route.params.year;
      var requestUrl="http://127.0.0.1:5000/api/get-games?limit=20&offset=1";
      if(typeof(type)!="undefined"&&type!="all")
        requestUrl+="&type_name="+type;
      if(typeof(year)!="undefined")
        requestUrl+="&start_year="+year+"&end_year="+(Number(year)+10).toString();
      
      
      //获取信息
      axios({
        method:"get",
        url:requestUrl,
      }).then((response) => {
      this.gamelist=response.data.data;
      

      if(this.is_authenticated){
        let collectUrl="http://localhost:5000/api/game/get-collected-games"
        axios({
          method:"get",
          url:collectUrl,
          withCredentials:true
        }).then((response)=>{
          var collectList=response.data.data
          for(var i=0;i<this.gamelist.length;i++){
            var flag=0;
            for(var j=0;j<collectList.length;j++){
              if(collectList[j].game_id===this.gamelist[i].game_id){
                  flag=1;
                  break;
              }
            }
            this.collect_status.push(flag);
          }
        })
      }
    });
      }
    }
}
</script>
