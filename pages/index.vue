<template>
  <div class="post_map">

    <div class="header">
      <v-icon class="help mb-1" color="white" @click="$router.push('/help/')">mdi-help-circle</v-icon>
      <div class="header_bg"></div>
      <v-img class="header_img" :src="`/img/mindmap1.jpg`"></v-img>
      <p class="header_ttl">成功の地図が見れる</p>
      <p class="header_txt">PostMapなら、成功のプロセスを共有できます。</p>
      <p class="header_account"><v-btn @click="$router.push('/signup')" large class="mr-4 font-weight-bold" style="font-size: 17px" color="info">新規作成</v-btn><v-btn @click="$router.push('/login')" style="font-size: 17px" large class="ml-4 font-weight-bold" color="white">ログイン</v-btn></p>
    </div>

    <div class="what">
      <div class="what_bg">
        <p class="what_ttl"><v-icon>mdi-help-circle</v-icon>PostMapとは</p>
        <p class="what_txt">マインドマップを共有し対話ができる。掲示板サービスです。</p>
      </div>
    </div>

    <div class="example_room">
      <div class="example_room_inner">
        <div class="left">
          <p class="display-1 font-weight-bold text-center"><v-icon class="mr-1 mb-2" x-large color="info">mdi-thumb-up</v-icon>使いやすい！</p>
          <p class="text-center">画面いっぱいの無駄のないシンプルなマインドマップ。</p>
          <p class="text-center">Layout機能、Back・Prev機能等であなたをサポート。</p>
          <p class="text-center">思考のためだけに力を使いましょう！！</p>
        </div>
        <div class="right">
          <v-img max-width="420" class="example_img" :src="`/img/mindmap.png`"></v-img>
        </div>
      </div>
    </div>

    <div class="example_post">
      <div class="example_post_inner">
        <div class="left">
          <v-img max-width="420" class="example_img" :src="`/img/Readme3.png`"></v-img>
        </div>
        <div class="right">
          <p class="display-1 font-weight-bold text-center"><v-icon class="mr-1 mb-2" x-large color="info">mdi-account-multiple</v-icon>マインドマップを共有</p>
          <p class="text-center">自分のマインドマップを即投稿でき、アドバイス(意見)をもらうことが可能。</p>
          <p class="text-center">他人のマインドマップも参考にし、思考を爆速させよう！!</p>
        </div>
      </div>
    </div>

    <div class="example_room">
      <div class="example_room_inner">
        <div class="left">
          <p class="display-1 font-weight-bold text-center"><v-icon class="mr-1 mb-2" x-large color="info">mdi-calendar-text</v-icon>予定管理</p>
          <p class="text-center">マインドマップで思考を整理し、</p>
          <p class="text-center">素晴らしい１日を手に入れよう！！</p>
        </div>
        <div class="right">
          <v-img max-width="420" class="example_img" :src="`/img/calendar.png`"></v-img>
        </div>
      </div>
    </div>

    <div class="other">
      <p class="display-1 font-weight-bold text-center mt-6 mb-6"><v-icon class="mr-1 mb-2" x-large color="info">mdi-shape-plus</v-icon>他の機能</p>
      <div class="other_inner">
        <v-card class="other_inner_card text-center"><v-icon class="mr-1" large color="info">mdi-magnify</v-icon>検索機能</v-card>
        <v-card class="other_inner_card text-center"><v-icon class="mr-1" large color="info">mdi-message</v-icon>コメント機能</v-card>
        <v-card class="other_inner_card text-center"><v-icon class="mr-1" large color="info">mdi-account-multiple-plus</v-icon>フォロー機能</v-card>
        <v-card class="other_inner_card text-center"><v-icon class="mr-1" large color="info">mdi-thumb-up</v-icon>いいね機能</v-card>
        <v-card class="other_inner_card text-center"><v-icon class="mr-1" large color="info">mdi-tag</v-icon>タグ機能</v-card>
        <v-card class="other_inner_card text-center"><v-icon class="mr-1" large color="info">mdi-bell</v-icon>通知機能</v-card>
      </div>
    </div>

    <div class="start pt-16">
      <p class="display-1 font-weight-bold text-center"><v-icon class="mr-1" x-large color="info">mdi-check-circle</v-icon>さあ、始めよう</p>
      <p class="text-center">登録に必要な時間は 30秒程度</p>
      <p class="text-center"><v-btn @click="$router.push('/signup')" large class="mr-4 font-weight-bold" style="font-size: 17px" color="info">新規作成</v-btn><v-btn @click="$router.push('/login')" style="font-size: 17px" large class="ml-4 font-weight-bold" color="white">ログイン</v-btn></p>
    </div>

  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.post_map{
  padding-bottom: 30px;
}
.help{
  position: absolute; 
  top: 10px; 
  right: 10px; 
<<<<<<< HEAD
  z-index: 3;
=======
  z-index: 10;
>>>>>>> 182d87152c0d2c1695618708f8cf61c8837d8c18
}
.header{
  position: relative;
  width: 100%;
  height: 300px;
}
.header_bg{
  width: 100%;
  height: 300px;
  margin: 0 auto;
  background: rgba(0,0,0,.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.header_img{
  width: 80%;
  height: 100%;
  margin: 0 auto;
}
.header_ttl{
  white-space: nowrap;
  color: #fff;
  font-size: 35px;
  font-weight: bold;
  position: absolute;
  top: 60px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.header_txt{
  color: #fff;
  font-size: 20px;
  width: 80%;
  text-align: center;
  position: absolute;
  top: 130px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.header_account{
  color: #fff;
  font-weight: bold;
  position: absolute;
  top: 220px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
  display: flex;
}
.what{
  position: relative;
  width: 100%;
  height: 300px;
}
.what_bg{
  width: 100%;
  height: 300px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.what_ttl{
  white-space: nowrap;
  color: #333;
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  top: 70px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.what_ttl i{
  font-size: 32px;
  margin-right: 5px;
}
.what_txt{
  width: 90%;
  text-align: center;
  color: #333;
  font-size: 20px;
  position: absolute;
  top: 140px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.example_img{
  margin: 0 auto;
}

.example_post{
  position: relative;
  width: 100%;
}
.example_post_inner{
  max-width: 95%;
  margin: 0 auto;
  display: flex;
  flex-wrap:wrap;
}
.example_post .right p{
  text-align: center;
}
.example_post .right{
  width: 100%;
  padding-top: 40px;
  order:1;
}
.example_post .left{
  width: 100%;
  position:relative;
  padding: 10px 0 40px;
  order:2;
}
.example_post .left .example_img{
  max-width: 350px;
  margin: 0 auto;
}
.example_room{
  background: #eee;
}
.example_room_inner{
  max-width: 95%;
  margin: 0 auto;
}
.example_room .left p{
  text-align: center;
}
.example_room .left{
  width: 100%;
  padding-top: 40px;
}
.example_room .right{
  width: 100%;
  position:relative;
  padding: 10px 0 40px;
}
.example_room .right .example_img{
  max-width: 350px;
  margin: 0 auto;
}

.other_inner{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.other_inner_card{
  width: 95%;
  padding: 20px 0;
  margin-bottom: 30px;
  font-size: 25px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.start{
  position: relative;
  background: #eee;
  padding-bottom: 100px;
}

@media (min-width: 800px){
.post_map{
  padding-bottom: 0;
}
.header{
  width: 100%;
  height: 300px;
}
.header_bg{
  width: 100%;
  height: 300px;
  margin: 0 auto;
  background: rgba(0,0,0,.6);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.header_img{
  margin: 0 auto;
}
.header_ttl{
  white-space: nowrap;
  color: #fff;
  font-size: 40px;
  font-weight: bold;
  position: absolute;
  top: 70px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.header_txt{
  white-space: nowrap;
  color: #fff;
  font-size: 20px;
  position: absolute;
  top: 140px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.header_account{
  color: #fff;
  font-weight: bold;
  position: absolute;
  top: 220px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.what{
  position: relative;
  width: 100%;
  height: 300px;
}
.what_bg{
  width: 100%;
  height: 300px;
  margin: 0 auto;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2;
}
.what_ttl{
  white-space: nowrap;
  color: #333;
  font-size: 25px;
  font-weight: bold;
  position: absolute;
  top: 70px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.what_ttl i{
  font-size: 32px;
  margin-right: 5px;
}
.what_txt{
  white-space: nowrap;
  color: #333;
  font-size: 20px;
  position: absolute;
  top: 140px;
  right: 50%;
  transform: translateX(50%);
  z-index: 3;
}
.example_post{
  position: relative;
  width: 100%;
  height: 350px;
}
.example_post_inner{
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 350px;
}
.example_post .right p{
  text-align: center;
}
.example_post .right{
  width: 50%;
  padding: 0;
  order: 2;
}
.example_post .left{
  width: 50%;
  position:relative;
  padding: 0;
  order: 1;
}
.example_post .left .example_img{
  max-width: 350px;
  margin: 0 auto;
}
.example_room{
  position: relative;
  width: 100%;
  height: 350px;
  background: #eee;
}
.example_room_inner{
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  height: 350px;
}
.example_room .left{
  width: 50vw;
  padding: 0;
}
.example_room .left p{
  text-align: center;
}
.example_room .right{
  width: 50vw;
  padding: 0;
}
.example_room .right .example_img{
  max-width: 220px;
}
.other{
  border-bottom: 1px solid #eee;
}
.other_inner{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.other_inner_card{
  width: 28%;
  padding: 20px 0;
  margin-bottom: 30px;
  font-size: 25px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
}
@media (min-width: 960px){
  .start{
    position: relative;
    background: #eee;
    padding-bottom: 50px;
  }
}
</style>