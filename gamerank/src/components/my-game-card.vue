<template>
  <div>
    <el-card :body-style="{ padding: '0px' }" class="roundcards">
      <a :href="getGameUrl(item.game_id)"
        ><img
          :src="getGameCover(item.game_id)"
          class="image"
          style="height: 100%; width: 100%"
      /></a>
      <div style="padding: 14px">
        <a :href="getGameUrl(item.game_id)"
          ><span class="gamename">{{ item.game_title }}</span></a
        >
        <el-rate
          v-model="average_score"
          disabled
          show-score
          text-color="#ff9900"
          score-template="{value}"
          style="float: right;"
        ></el-rate>
        <br /><br />
        <span class="gameinfo">{{ item.game_intro }}</span>
        <div  style="text-align:right;margin-right:5%">
            
            <el-button v-if="collect_status" type="success"  icon="el-icon-star-on" circle @click="dealCollect(item.game_id)"></el-button>
            <el-button v-else  icon="el-icon-star-off" circle @click="dealCollect(item.game_id)"></el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>



<script>
import axios from "axios";
export default {
  name: "MyGameCard",
  props:["item", "msg", "is_authenticated"],

  watch:{
    msg:function(newVal,oldVal){
      this.collect_status = newVal;
    }
  },
  data() {
    return {
      collect_status:this.msg,
      average_score: parseFloat(this.item.game_average_score.toFixed(1)),
    };
  },
  methods: {
    getGameCover(id) {
      return require("../assets/gameMaterialStock/" + id + "/game_cover.png");
    },
    getGameUrl(id) {
      return "#/gamepage/" + id;
    },
    dealCollect(id) {
      if (!this.is_authenticated) {
        this.$notify.error({
          title: "错误",
          message: "请先登录！",
        });
        return;
      }
      var collectUrl;
      if (this.collect_status == false)
        collectUrl = "http://localhost:5000/api/game/collect?game_id=" + id;
      else
        collectUrl = "http://localhost:5000/api/game/uncollected?game_id=" + id;
      axios({
        method: "post",
        url: collectUrl,
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        this.$notify({
          title: "成功",
          message: this.collect_status == true ? "取消收藏成功" : "收藏成功",
          type: "success",
        });
        this.collect_status = !this.collect_status;
      });
    },
  },
};
</script>

<style >
a{
  text-decoration: none;
  color: black;
}
.roundcards {
  border-radius: 20px;
  margin-bottom: 20px;
}
.gamename {
  float: left;
  font-size: large;
  font-weight: bolder;
}
.gameinfo {
  float: left;
}
</style>
