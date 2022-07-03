<template>
  <div>
    <div class="commentbox">
      <el-row>
        <el-col :span="2" style="margin-top:10px">
                <a :href="'#/userpage/'+name"><el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></a>
        </el-col>
          <el-col :span="16">
            <el-row>
              <el-col style="text-align:left;margin-top:10px;margin-bottom:10px;margin-left:-10x">
              <a :href="'#/userpage/'+name"><span style="color:#9acbfd" >{{name}}:</span></a>
              <span> {{info.comment_contents}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="text-align:left;margin-top:5px" >
                <span style="color:grey">{{info.comment_time}}</span>
            </el-col>
            </el-row>
        </el-col>
      </el-row>
    </div>
            
  </div>
</template>



<script>
export default {
  name: "MyCommentCard",
  props:["commentinfo","username"],
  watch:{
    commentinfo:function(newVal,oldVal){
      this.info = newVal;
    },
    username:function(newVal,oldVal){
      this.name=newVal
    }
  },
  data() {
    return {
        info:this.commentinfo,
        name:this.username
    };
  },
  methods: {
    getGameCover(id) {
      return require("../assets/gameMaterialStock/" + id + "/game_cover.png");
    },
    getGameUrl(id) {
      return "#/gamepage/" + id;
    }
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
  color: black;
}

.commentbox{
    backdrop-filter:blur(20px); 
    background: #ffffff;
    
}

</style>
