<template>
  <div>
    <el-container>
      <!-- 左边栏 -->
      <el-aside style="width: 20%">
        <my-left-menu :username="username"></my-left-menu>
      </el-aside>

      <el-container style="width: 65%; height: 100%">
        <search_input :isHistory="true"
                        :lists_title="search_result_title"
                        :lists_note="search_result_note"
                        input_length
                        @parent_get_lists="get_selected_lists"
                        @parent_search="finish_search"
                        style="inline-block;width:95%;te"
                        >
        </search_input>
        <!-- 游戏信息和轮播图 -->
        <el-container style="height: 100%; width: 100%">
          <el-aside style="width: 40%; height: 55%; margin-top: 5%">
            <div class="gameTitle">{{ gameinfo.game_title }}</div>
            <img
              :src="getGameCover(gameinfo.game_id)"
              style="height: 30%; width: 40%; margin-top: 5%; margin-left: -50%"
            />
            <p style="text-align: left; margin-left: 10%">
              游戏平台：<span style="color: rgb(55, 55, 255)">{{
                gameinfo.game_type_name
              }}</span>
            </p>
            <p style="text-align: left; margin-left: 10%">
              游戏类型：<span style="color: rgb(55, 55, 255)">{{
                gameinfo.game_type_name
              }}</span>
            </p>
            <p style="text-align: left; margin-left: 10%">
              游戏类型：<span style="color: rgb(55, 55, 255)">{{
                gameinfo.game_type_name
              }}</span>
            </p>
            <p style="text-align: left; margin-left: 10%">
              游戏评分：<span style="color: rgb(55, 55, 255)">{{
                gameinfo.game_average_score
              }}</span>
            </p>
            <el-rate
              v-model="userRate" :colors="colors" :texts="texts"
              enabled
              show-text
              score-template="{value}"
              style="text-align: left; margin-left: 10%"
            ></el-rate>
            <el-button type="primary" size="mini" plain style="margin-left:-170px;margin-top:10px" @click="submitRate()">提交评分</el-button>

              

          </el-aside>
          <el-aside style="width: 60%; height: 55%; margin-top: 5%">
            <template>
              <el-carousel
                indicator-position="outside"
                style="margin-right: 10%; border-radius: 5px"
              >
                <el-carousel-item v-for="item in 3" :key="item">
                  <img
                    :src="getScreenShot(gameinfo.game_id, item)"
                    style="width: 100%; height: 100%; object-fit: cover"
                  />
                  <h3 text="2xl" justify="center">{{ item }}</h3>
                </el-carousel-item>
              </el-carousel>
            </template>
            <b>游戏介绍：{{ gameinfo.game_intro }}</b>
          </el-aside>
        </el-container>
        <!-- 提交评论区 -->
        <el-container style="width: 95%; margin-top: 5%">
          <el-main>
            <el-row>
              <el-col>
                <el-input
                  type="textarea"
                  placeholder="请输入内容"
                  v-model="userComment"
                  maxlength="100"
                  show-word-limit
                  rows="4"
                >
                </el-input>
              </el-col>
            </el-row>

            <el-row>
              <el-button type="primary" style="float: left" @click="submitComment()">提交评论</el-button>
            </el-row>
          </el-main>
        </el-container>
        <!-- 全部评论 -->
        <el-main>
          <h2>全部评论</h2>
          <div style="background-color:#ffffff;margin:0px;width:95%">
            <div v-for="(item, pos) in comments"
              :key="pos" > 
              <my-comment-card :commentinfo="item" :username="comment_users[pos].user_name" style="width:95%">
              </my-comment-card>
              <el-divider ></el-divider>
            </div>
          </div>
        </el-main>
        <el-footer> </el-footer>
      </el-container>

      <!-- 标签 -->
      <el-aside style="width: 15%; height: 100%">
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
      </el-aside>
    </el-container>
  </div>
</template>



<style scoped >
a{
  text-decoration: none;
  color: black;
}
.userComment {
  background-color: rgb(239, 239, 239);
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: 50px;
  padding: 20px;
  text-align: left;
  border-radius: 10px;
}

.gameTitle {
  font-size: x-large;
  color: rgb(0, 0, 0);
  font-weight: bold;
  text-align: left;
  margin-left: 0%;
  /* border:2px solid rgb(0, 255, 76); */
}
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.sidebox {
  /* height:60%; */
  /* 相对当前页面高度的60% */
  height: 600px;
  /* border: 2px solid rgb(0, 255, 76); */
  backdrop-filter: blur(20px);
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 5%;
}

.minisearch {
  width: 80%;
  left: -10%;
  margin-bottom: 30px;
  display: inline-block;
}

#SBSelectorList1 li {
  float: left;
  margin: 5px;
  /* 文字居中 */
}
#SBSelectorList1 {
  list-style: none;
}

.loginPart {
  display: inline-block;
  margin-bottom: 50px;
  margin-top: -10px;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: rgb(245, 247, 248);
}
</style>

<script>
import axios from "axios";
import bm_search_input from 'bm_search_input'


export default {
  components: bm_search_input,
  name: "MainPage",
  watch:{
	      '$route':"getData"
	},
  created() {
    this.getData()
  },
  data() {
    return {
      gameinfo: {},
      gameid:{},
      comments: [],
      comment_users: [],
      is_authenticated: false,
      userRate:0,
      userComment: "",
      username:'',
      colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
      texts:['差','一般','好','非常好','非常棒'],
      search_result_title:["1","2"],
      //搜索结果中的备注(不需要可以删掉)
      search_result_note:[]
    };
  },
  methods: {
    getData(){
      this.is_authenticated=this.$cookies.isKey('username')
    this.username=this.$cookies.get('username')
    this.gameid = this.$route.params.id;
    var game_url = "http://127.0.0.1:5000/api/get-game?game_id=" + this.gameid;
    var comment_url =
      "http://127.0.0.1:5000/api/game/get-comments-by-game_id?game_id=" + this.gameid;
    //获取游戏信息
    axios({
      method: "get",
      url: game_url,
    }).then((response) => {
      this.gameinfo = response.data.data[0];
      this.gameinfo.game_average_score = parseFloat(this.gameinfo.game_average_score.toFixed(1))
      this.userRate=this.gameinfo.game_average_score
    });

    //获取评论信息
    axios({
      method: "get",
      url: comment_url,
    }).then((response) => {
      console.log(response);
      this.comments = response.data.comments;
      this.comment_users = response.data.users;
      for (var i = 0; i < this.comments.length; i++)
        this.comments[i].comment_time = this.msToDate(
          this.comments[0].comment_time
        ).hasTime;
    });
    },
    getGameCover(id) {
      return require("../assets/gameMaterialStock/" + id + "/game_cover.png");
    },
    getScreenShot(id, index) {
      return require("../assets/gameMaterialStock/" +
        id +
        "/screenshot" +
        index +
        ".png");
    },
    submitComment(){
      if(!this.is_authenticated){
        this.$notify.error({
          title: '错误',
          message: '请先登录！'
        });
      }
      else{
        let formData = new FormData();
        formData.append('game_id',this.gameid)
        formData.append('comment',this.userComment)

        axios({
          method: "POST",
          url: "http://localhost:5000/api/game/add-comment",
          headers: {"Content-Type": "multipart/form-data"},
          withCredentials:true,
          data:formData
        }).then((response) => {
          this.$notify({
            title: '成功',
            message: '评论提交成功',
            type: 'success'
          });
          window.location.reload()
        });
      }
    },
    
    submitRate(){
      if(!this.is_authenticated){
        this.$notify.error({
          title: '错误',
          message: '请先登录！'
        });
        return
      }
       let rateUrl="http://localhost:5000/api/game/rate?"+"game_id="+this.gameid+"&score="+this.userRate
        axios({
          method: "post",
          url: rateUrl,
          data:this.gameid,
          withCredentials:true,
          headers:{
            'Content-Type': 'application/x-www-form-urlencoded'}//设置请求头请求格式为JSON
            //'Cookie':'session=.eJwlzjESwjAMBdG7uKZwJNmycpmMLPsPtAmpGO5OmBRbbfM-acM-j2da3_s5H2l7jbQm8KJVh0ppRL2ieNNqWsQas7IhGGVR8lJdINNHcYa3DBhJD50gBI2uRKIhkrkH9NpOLspRKVuLGD1cWjYzAJWc_41C6YKcx9xvzSKcvj_y0i_B.YqIGfw.Uj3fX42aR2liVtIDaaxU7OSnasg'}
        }).then((response) => {
          console.log(response);
          this.$notify({
            title: '成功',
            message: '评分提交成功',
            type: 'success'
          });
        }).catch((error)=>{
          console.log(error)

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
    //实现方法 @return 返回2个值，一个是带时分秒，另一个不带。
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
  },

};
</script>
