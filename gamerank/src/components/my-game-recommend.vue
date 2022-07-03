<template>
  <div>
    <div>
        <h3>猜你喜欢</h3>
    </div>
    <div class="animate__animated animate__fadeIn">
        <div  class="recbox">
            <div v-for="(iteminfo,index) in data" :key="index"  class="gamerecSingle">
                <el-row >
                  <el-col :span="4">
                    <div >
                        <a :href="getGameUrl(iteminfo.game_id)"><img :src="getGameCover(iteminfo.game_id)" class="gamerecImg"> 
                        </a>
                    </div>
                  </el-col>
                  <el-col :span="16">
                    <el-row >
                        <a :href="getGameUrl(iteminfo.game_id)"><b style="">{{(iteminfo.game_title.split('】').length>1?iteminfo.game_title.split('】')[1].substring(0,5):iteminfo.game_title.substring(0,5))+'..'}}</b></a>
                    </el-row>
                    <el-row class="gamerecTag">
                        <el-tag type="success">{{iteminfo.game_title.split('】').length>1?iteminfo.game_title.split('】')[0].split('【')[1]:iteminfo.game_title.substring(0,4)}}</el-tag>
                        <el-tag type="success">{{iteminfo.game_type_name}}</el-tag>
                    </el-row>
                  </el-col>
                      <i  style="margin-top:20px;color:#15c5ce" class="el-icon-star-on"><b>{{iteminfo.game_average_score==null?0:iteminfo.game_average_score.toFixed(1)}}</b></i>
                </el-row>
            </div>
        </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "MyGameRecommend",
  props:["item"],
  watch:{
    item:function(newVal,oldVal){
      this.data = newVal;
    }
  },
  data() {
    return {
        data:this.item
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
.recbox{
    /* border: 2px solid rgb(0, 255, 76); */
    backdrop-filter:blur(20px); 
    background: #ffffff;
    border-radius: 5%;
}
.gamerecSingle{
    padding:15px;
}
.gamerecImg{
    height:60px;width:60px;border-radius:25%
}
.gamerecTag{
    margin-top:10px;
    margin-left:10px
}

</style>
