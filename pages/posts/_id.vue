<template>
  <div class="post">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" type="error" v-model="submitAlert" transition="slide-y-transition">
      ログインが必要になります。
    </v-alert>

  <div class="post-header">
    <v-icon class="post_setting" v-if="currentUser_id == post.user_id" @click="$router.push(`/posts/edits/${$route.params.id}`)" color="info">mdi-wrench</v-icon>
    <v-row class="post_like mt-2 mr-2">
      <v-spacer></v-spacer>
      <p v-if="like_judge" @click="unlike" class="mb-0 ml-2">{{likes}}<v-icon class="pb-1 pl-1" color="orange">mdi-thumb-up</v-icon></p>
      <p v-else class="mb-0 ml-2" @click="like">{{likes}}<v-icon class="pb-1 pl-1" color="gray">mdi-thumb-up-outline</v-icon></p>
    </v-row>

    <div class="post_header" style="position: relative; border-bottom: solid 1px #eee; z-index: 2;">
      <h1 class="post_header_title display-1 mt-5 mb-2">{{post.title}}</h1>
      <div class="post_header_left">
        <p color="gray" class="post_header_created_at grey--text"><v-icon class=" mr-1 grey--text" x-small>mdi-autorenew</v-icon>{{post.updated_at}}</p>
        <v-spacer></v-spacer>
        <div class="post_header_tag">
          <p class="post_header_tag_list" v-for="(tag, i) in post.tag_list" :key="`tag-${i}`">{{tag}}</p>
        </div>
      </div>
    </div>
  </div>


  <div class="post_content" style="transform: translateY(-70px);">
    <div class="wrapper" style="border: solid 1px #eee;">
      <div
        id="myDiagramDiv"
        style="width:100%;height:70vh;"
      />
    </div>
    <div class="post_content_inner" v-for="(content, index) in postContents" :key="`content-${index}`">
      <h2 class="post_content_ttl mt-12 mb-10" v-if="content.kind == 'title'">{{content.title}}</h2>
      <h3 class="post_content_sub-ttl ml-1 mt-6 mb-5" v-text="content.sub_title" v-else-if="content.kind == 'sub_title'"></h3>
      <p class="post_content_txt ml-1 mt-5 mb-5" v-text="content.text" v-else-if="content.kind == 'text'"></p>
      <v-card class="mt-12 mb-12" flat v-else-if="content.kind == 'picture'">
        <v-img contain max-height="320" :src="`${apiUrl}${content.picture.url}`"></v-img>
      </v-card>
    </div>
  </div>
    
  </div>
</template>

<script>
import { VueLoading } from 'vue-loading-template';
import * as go from 'gojs'
const $ = go.GraphObject.make

export default {
  components: {
    VueLoading,
  },
  data(){
    return{ 
      contents: [],
      post: {},
      title: '',
      sub_title: '',
      text: '',
      picture: '',
      postContents: [],
      likes:0,
      params: 0,
      currentUser_id: localStorage.getItem('id'),

      like_judge:false,
      submitAlert: false,
      loading: true,
    }
  },

  computed: {
    apiUrl() {
      if(process.env.NODE_ENV === 'production'){
        return process.env.API_URL
      }else{
        // return 'http://localhost:3000'
        return process.env.API_URL
      }
    }
  },

  mounted() {
    const myDiagram = $(go.Diagram, 'myDiagramDiv',
      {
        initialAutoScale: go.Diagram.Uniform,
        "commandHandler.copiesTree": true,
        "commandHandler.copiesParentKey": true,
        "commandHandler.deletesTree": true,
        "draggingTool.dragsTree": true,
        'undoManager.isEnabled': true 
      })
    const myModel = $(go.TreeModel)
    myModel.nodeDataArray = this.contents
    myDiagram.model = myModel

    myDiagram.nodeTemplate =
      $(go.Node, "Vertical",
        { selectionObjectName: "TEXT" },
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        new go.Binding("locationSpot", "dir", function(d) { return spotConverter(d, false); }),
        $(go.TextBlock,
          {
            name: "TEXT",
            minSize: new go.Size(30, 15),
            editable: true
          }, 
          new go.Binding("text", "text").makeTwoWay(),
          new go.Binding("scale", "scale").makeTwoWay(),
          new go.Binding("font", "font").makeTwoWay()
        ),
        $(go.Shape, "LineH",
          {
            stretch: go.GraphObject.Horizontal,
            strokeWidth: 3, height: 3,
            //この線の形はポートです-リンクが接続するもの
            portId: "", fromSpot: go.Spot.LeftRightSides, toSpot: go.Spot.LeftRightSides
          },
          new go.Binding("stroke", "brush"),
          //リンクが適切な方向から入り、適切に出て行くことを確認します
          new go.Binding("fromSpot", "dir", function(d) { return spotConverter(d, true); }),
          new go.Binding("toSpot", "dir", function(d) { return spotConverter(d, false); }),
        ),
      );

    myDiagram.linkTemplate =
      $(go.Link,
        {
          curve: go.Link.Bezier,
          fromShortLength: -2,
          toShortLength: -2,
          selectable: false
        },
        $(go.Shape,
          { strokeWidth: 3 },
          new go.Binding("stroke", "toNode", function(n) {
            if (n.data.brush) return n.data.brush;
            return "black";
          }).ofObject())
      );

    myDiagram.addDiagramListener("SelectionMoved", function(e) {
      var rootX = myDiagram.findNodeForKey(0).location.x;
      myDiagram.selection.each(function(node) {
        if (node.data.parent !== 0) return; 
        var nodeX = node.location.x;
        if (rootX < nodeX && node.data.dir !== "right") {
          updateNodeDirection(node, "right");
        } else if (rootX > nodeX && node.data.dir !== "left") {
          updateNodeDirection(node, "left");
        }
        layoutTree(node);
      });
    });

    function spotConverter(dir, from) {
      if (dir === "left") {
        return (from ? go.Spot.Left : go.Spot.Right);
      } else {
        return (from ? go.Spot.Right : go.Spot.Left);
      }
    }

    function layoutTree(node) {
      if (node.data.key === 0) {  
        layoutAll();  
      } else {  
        var parts = node.findTreeParts();
        layoutAngle(parts, node.data.dir === "left" ? 180 : 0);
      }
    }

    function layoutAngle(parts, angle) {
      var layout = go.GraphObject.make(go.TreeLayout,
        {
          angle: angle,
          arrangement: go.TreeLayout.ArrangementFixedRoots,
          nodeSpacing: 5,
          layerSpacing: 20,
          setsPortSpot: false, 
          setsChildPortSpot: false
        });
      layout.doLayout(parts);
    }

    function layoutAll() {
      var root = myDiagram.findNodeForKey(0);
      if (root === null) return;
      myDiagram.startTransaction("Layout");
      
      var rightward = new go.Set(/*go.Part*/);
      var leftward = new go.Set(/*go.Part*/);
      root.findLinksConnected().each(function(link) {
        var child = link.toNode;
        if (child.data.dir === "left") {
          leftward.add(root);  
          leftward.add(link);
          leftward.addAll(child.findTreeParts());
        } else {
          rightward.add(root);  
          rightward.add(link);
          rightward.addAll(child.findTreeParts());
        }
      });
      
      layoutAngle(rightward, 0);
      layoutAngle(leftward, 180);
      myDiagram.commitTransaction("Layout");
    }

    if(localStorage.getItem('id')){
      this.$axios.$get(`api/posts/${this.$route.params.id}`, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.contents = res.data.attributes.contents.content
        this.postContents = res.data.attributes.post_contents
        var date = new Date(res.data.attributes.updated_at)
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        var updated_at = year + '/' + month + '/' + day
        this.post = {
          id: res.data.attributes.id,
          user_id: res.data.attributes.user_id,
          title: res.data.attributes.title,
          updated_at: updated_at,
          tag_list: res.data.attributes.tag_list,
        },
        this.likes = res.data.attributes.likes.length
        this.like_judge = res.data.attributes.like_judges
        this.loading = false

        myDiagram.model = new go.Model.fromJson(
        { "class": "go.TreeModel",
            "nodeDataArray": this.contents
          }
        );
      })
    }else{
      this.$axios.$get(`api/posts/${this.$route.params.id}`).then(res => {
        this.contents = res.data.attributes.contents.content
        this.postContents = res.data.attributes.post_contents
        var date = new Date(res.data.attributes.updated_at)
        var year = date.getFullYear();
        var month = date.getMonth() + 1 ;
        var day = date.getDate();
        var updated_at = year + '/' + month + '/' + day
        this.post = {
          id: res.data.attributes.id,
          user_id: res.data.attributes.user_id,
          title: res.data.attributes.title,
          updated_at: updated_at,
          tag_list: res.data.attributes.tag_list,
        },
        this.likes = res.data.attributes.likes.length
        this.like_judge = res.data.attributes.like_judges
        this.loading = false

        myDiagram.model = new go.Model.fromJson(
        { "class": "go.TreeModel",
            "nodeDataArray": this.contents
          }
        );
      })
    }
  },

  methods:{
    async likeIndex(){
      if(localStorage.getItem('id')){
        this.loading = true
        await this.$axios.$get(`api/posts/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(res => {
          this.likes = res.data.attributes.likes.length
          this.like_judge = res.data.attributes.like_judges
          this.loading = false
        })
      }else{
        await this.$axios.$get(`api/posts/${this.$route.params.id}`).then(res => {
          this.likes = res.data.attributes.likes.length
          this.like_judge = res.data.attributes.like_judges
          this.loading = false
        })
      }
    },

    async like(){
      if(localStorage.getItem('X-Access-Token')){
        this.loading = true
        const params = {
          post_id: this.$route.params.id,
          user_id: this.post.user_id
        }
        await this.$axios.$post(`api/likes/`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeIndex()
      }else if (localStorage.getItem('id') == null){
        this.submitAlert = true
      }
    },

    async unlike(){
      if(localStorage.getItem('X-Access-Token')){
        this.loading = true
        await this.$axios.$delete(`api/likes/${this.$route.params.id}`, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        })
        this.likeIndex()
      }else if (localStorage.getItem('id') == null){
        this.submitAlert = true
      }
    },
  },

  watch: {
    submitAlert (val) {
      val && setTimeout(() => {
        this.submitAlert = false
      }, 2000)
    },
  },
}
</script>

<style scoped>
.post_setting{
  position: absolute; 
  top: 10px; 
  left: 0;
}
.post_like p{
  cursor:pointer;
}
.post_header{
  background: #fff;
  z-index:2;
}
.post_header_title{
  text-align: center;
  font-weight: bold;
}
.post_header_left{
  display: flex;
  align-items: center;
}
.post_header_left p{
  margin-bottom: 5px;
}
.post_header_created_at{
  display: flex;
  align-items: center;
  font-size: 12px;
}
.post_header_tag{
  width: 50%;
  display: flex;
  overflow: scroll; 
}
.post_header_tag_list{
  white-space: pre;
  font-size: 10px;
  background-color:rgb(211, 238, 252);
  border-radius:5px;
  font-weight: bold;
  color: gray;
  margin-left: 5px;
  padding: 1px 2px;
}
.post_header_tag_list:first-child{
  margin-left:auto;
}
.post_content_ttl{
  font-weight: bold; 
  font-size: 30px; 
  border-bottom: solid 1px rgb(220 218 218);
}
.post_content_sub-ttl{
  font-size: 23px;
}
.post_content_txt{
  line-height: 1.6;
}
</style>