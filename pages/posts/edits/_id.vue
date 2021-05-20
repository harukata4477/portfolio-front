<template>
  <div class="post mt-6">

    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" :color="colors" :type="types" v-model="submitAlert" transition="slide-y-transition">
      {{answer}}
    </v-alert>

    <div class="post_header" style="background: #fff; position: relative; border-bottom: solid 1px #eee; z-index: 2;">
      <h1 class="post_header_title display-1 mb-4">{{post.title}}</h1>
      <v-dialog
        v-model="editForm"
        width="500"
        class="mr-0 ml-0"
        relative
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="transparent"
            v-bind="attrs"
            v-on="on"
            fab
            filled
            rounded
            dense
            elevation="0"
            small
            class="post_header_btn"
          >
            <v-icon color="primary">mdi-pencil</v-icon>
          </v-btn>
        </template>
        <v-card class="post_edit_card">
          <v-icon @click="deletePost" style="position: absolute; top: 20px; right: 20px;" color="info">mdi-delete</v-icon>
          <v-container fluid>
            <v-row
              align="center"
              justify="center"
            >
              <v-col
                cols="12"
                class="my-8 text-center"
              >
                <h1 class="text-h5 font-weight-bold">
                  タイトル&nbsp;変更
                </h1>
              </v-col>
              <v-card
                flat
                width="80%"
                max-width="320"
                color="transparent"
              >
                <v-form
                  v-model="isValid"
                  ref="form"
                >
                  <div class="post_edit_card_form">
                    <posts-form-title :title.sync="post.title" />
                  </div>
                </v-form>
                <v-btn
                  :disabled="!isValid"
                  block
                  color="info"
                  class="white--text mb-8"
                  @click="update"
                >
                  登録する
                </v-btn>
              </v-card>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>

      <div class="post_mindmap">
        <p color="gray" class="post_mindmap_created_at grey--text"><v-icon class=" mr-1 grey--text" x-small>mdi-autorenew</v-icon>{{post.updated_at}}</p>
        <v-spacer></v-spacer>
        <p class="post_mindmap_tag_list">{{post.tags}}</p>
      </div>
    </div>
    
    <div class="mind_map">
      <div class="wrapper" style="transform: translateY(-80px); border: solid 1px #eee; z-index: 1;">
        <div
          id="myDiagramDiv"
          style="width:100%;height:70vh;"
        />
      </div>
    </div>

    <div class="post_form mb-16 mt-3">
      <v-select
        :items="createKinds"
        label="Type 選択"
        outlined
        v-model="kindSelect"
      ></v-select>

      <v-text-field  v-if="kindSelect == 'title'" v-model="title" label="title" outlined></v-text-field>
      <v-text-field v-else-if="kindSelect == 'sub_title'" v-model="sub_title" label="sub title" outlined></v-text-field>
      <v-textarea v-else-if="kindSelect == 'text'" v-model="text" label="text" outlined></v-textarea>
      <v-file-input
        v-else-if="kindSelect == 'picture'"
        v-model="picture"
        class="post_form_file"
      >
      </v-file-input>
      <v-btn class="mb-5" @click="create">新規追加</v-btn>

      <div class="post_content" v-for="(content, i ) in postContents" :key="content[i]">
        <div class="post_content_inner" v-if="content.kind == 'title'">
          <v-col class="post_content_inner_col" cols="1">
            <v-select
              :items="kinds"
              v-model="content.kind"
              solo
              flat
              single-line
              return-object
              append-icon="mdi-dots-horizontal"
              hide-details="auto"
              background-color="transparent"
            ></v-select>
          </v-col>
          <input
            class="titleForm mt-12 mb-5 pl-0"
            v-model="content.title"
            @keypress.enter="postContentsUpdate(content)"
          >
        </div>

        <div class="post_content_inner" v-else-if="content.kind == 'sub_title'">
          <v-col cols="1" class="post_content_inner_sub_title">
            <v-select
              :items="kinds"
              v-model="content.kind"
              solo
              flat
              single-line
              return-object
              append-icon="mdi-dots-horizontal"
              hide-details="auto"
              background-color="transparent"
            ></v-select>
          </v-col>
          <input 
            class="subTitleForm ml-1 mt-3 mb-3" 
            v-model="content.sub_title" 
            @keypress.enter="postContentsUpdate(content)"
          >
        </div>

        <div class="post_content_inner" v-else-if="content.kind == 'text'">
          <v-col cols="1" class="post_content_inner_text">
            <v-select
              :items="kinds"
              v-model="content.kind"
              solo
              flat
              single-line
              append-icon="mdi-dots-horizontal"
              return-object
              hide-details="auto"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-textarea
            solo-inverted
            flat
            dense
            auto-grow
            background-color="transparent"
            hide-details="auto"
            rows="1"
            v-model="content.text" 
            @keypress.enter="postContentsUpdate(content)"
          ></v-textarea>
        </div>
        
        <div class="post_content_inner" v-else-if="content.kind == 'picture'">
          <v-col cols="1" class="post_content_inner_picture">
            <v-select
              :items="kinds"
              v-model="content.kind"
              append-icon="mdi-dots-horizontal"
              solo
              flat
              single-line
              return-object
              hide-details="auto"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-card flat class="mb-6 mt-6">
            <v-img contain max-height="320" :src="`${apiUrl}${content.picture.url}`">
              <v-file-input
                v-model="content.picture"
                hide-input
                style="margin: 0; padding: 0;"
                @change="postContentsUpdate(content)"
              >
              </v-file-input>
            </v-img>
          </v-card>
        </div>

        <div class="post_content_inner" v-else-if="content.kind == 'delete'">
          <v-col cols="1" class="post_content_inner_delete">
            <v-select
              :items="kinds"
              v-model="content.kind"
              solo
              flat
              single-line
              return-object
              append-icon="mdi-dots-horizontal"
              hide-details="auto"
              background-color="transparent"
            ></v-select>
          </v-col>
          <v-btn class="mt-6 mb-6" color="error" width="100%" @click="postContentsUpdate(content)">このコンテンツを削除</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { VueLoading } from 'vue-loading-template';
import PostsFormTitle from '../../../components/posts/PostsFormTitle.vue'
import * as go from 'gojs'
const $ = go.GraphObject.make

export default {
  components: {
    PostsFormTitle,
    VueLoading,
  },
  data(){
    return{ 
      contents: [],
      post: {},
      kinds:["title", "sub_title", "picture", "text", "delete"],
      createKinds:["title", "sub_title", "picture", "text"],
      title: '',
      sub_title: '',
      text: '',
      picture: '',
      kindSelect: '',
      postContents: [],
      num: 0,

      answer: 'されました',
      colors: '',
      types: '',

      isValid: false,
      editForm: false,
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
  created(){
    // if(localStorage.getItem('X-Access-Token')){
    //   this.$axios.$get(`api/posts/${this.$route.params.id}`, {
    //     headers:{
    //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //     }
    //   }).then(res => {
    //     this.contents = res.data.attributes.contents.content
    //     this.postContents = res.data.attributes.post_contents
    //     var date = new Date(res.data.attributes.updated_at)
    //     var year = date.getFullYear();
    //     var month = date.getMonth() + 1 ;
    //     var day = date.getDate();
    //     var updated_at = year + '/' + month + '/' + day
    //     this.post = {
    //       id: res.data.attributes.id,
    //       title: res.data.attributes.title,
    //       updated_at: updated_at,
    //       tag_list: res.data.attributes.tag_list,
    //     }
    //     this.num = res.data.attributes.post_contents.length + 1
    //     this.loading = false
    //   }).catch(
    //     this.loading = false,
    //   )
    // }else{
    //   this.loading = false,
    //   this.submitAlert = true,
    //   this.colors = '',
    //   this.types = 'error',
    //   this.answer = 'ログインしてください。'
    // }
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
      this.diagram = myDiagram
    const myModel = $(go.TreeModel)
    myModel.nodeDataArray = this.contents
    myDiagram.model = myModel

    myDiagram.addDiagramListener("Modified", function(e) {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });

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

      myDiagram.nodeTemplate.selectionAdornmentTemplate =
      $(go.Adornment, "Spot",
        $(go.Panel, "Auto",
          //この装飾は、選択したノードの周りに長方形の青い形状をしています
          $(go.Shape, { fill: null, stroke: "dodgerblue", strokeWidth: 3 }),
          $(go.Placeholder, { margin: new go.Margin(4, 4, 0, 4) })
        ),
        //この装飾には、選択したノードの右側にボタンがあります
        $("Button",
          {
            alignment: go.Spot.Right,
            alignmentFocus: go.Spot.Left,
            click: addNodeAndLink
          },
          $(go.TextBlock, "+",
            { font: "bold 8pt sans-serif" }
          )
        )
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
        if (node.data.parent !== 0) return; // ルートに接続されているノードのみを考慮してください
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

    function updateNodeDirection(node, dir) {
      myDiagram.model.setDataProperty(node.data, "dir", dir);
      // recursively update the direction of the child nodes
      var chl = node.findTreeChildrenNodes(); // gives us an iterator of the child nodes related to this particular node
      while (chl.next()) {
        updateNodeDirection(chl.value, dir);
      }
    }

    function addNodeAndLink(e, obj) {
      var adorn = obj.part;
      var diagram = adorn.diagram;
      diagram.startTransaction("Add Node");
      var oldnode = adorn.adornedPart;
      var olddata = oldnode.data;
      // copy the brush and direction to the new node data
      if(olddata.key == 0){
        var color = ["palevioletred","coral","darkseagreen", "skyblue"]
        var selectColor = color[Math.floor(Math.random() * color.length)]
        var newdata = { text: "idea", brush: selectColor, dir: olddata.dir, parent: olddata.key };
      }else{
        var newdata = { text: "idea", brush: olddata.brush, dir: olddata.dir, parent: olddata.key };
      }
      diagram.model.addNodeData(newdata);
      layoutTree(oldnode);
      diagram.commitTransaction("Add Node");

      // if the new node is off-screen, scroll the diagram to show the new node
      var newnode = diagram.findNodeForData(newdata);
      if (newnode !== null) diagram.scrollToRect(newnode.actualBounds);
    }

    function layoutTree(node) {
      if (node.data.key === 0) {  // adding to the root?
        layoutAll();  // lay out everything
      } else {  // otherwise lay out only the subtree starting at this parent node
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
          setsPortSpot: false, // don't set port spots since we're managing them with our spotConverter function
          setsChildPortSpot: false
        });
      layout.doLayout(parts);
    }

    function layoutAll() {
      var root = myDiagram.findNodeForKey(0);
      if (root === null) return;
      myDiagram.startTransaction("Layout");
      // split the nodes and links into two collections
      var rightward = new go.Set(/*go.Part*/);
      var leftward = new go.Set(/*go.Part*/);
      root.findLinksConnected().each(function(link) {
        var child = link.toNode;
        if (child.data.dir === "left") {
          leftward.add(root);  // the root node is in both collections
          leftward.add(link);
          leftward.addAll(child.findTreeParts());
        } else {
          rightward.add(root);  // the root node is in both collections
          rightward.add(link);
          rightward.addAll(child.findTreeParts());
        }
      });
      // do one layout and then the other without moving the shared root node
      layoutAngle(rightward, 0);
      layoutAngle(leftward, 180);
      myDiagram.commitTransaction("Layout");
    }

    if(localStorage.getItem('X-Access-Token')){
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
          title: res.data.attributes.title,
          updated_at: updated_at,
          tag_list: res.data.attributes.tag_list,
        }
        this.num = res.data.attributes.post_contents.length + 1
        this.loading = false

        myDiagram.model = new go.Model.fromJson(
          { "class": "go.TreeModel",
            "nodeDataArray": this.contents
          }
        );
      }).catch(
        this.loading = false,
      )
    }else{
      this.loading = false,
      this.submitAlert = true,
      this.colors = '',
      this.types = 'error',
      this.answer = 'ログインしてください。'
    }
  },

  methods:{
    async create(){
      if(localStorage.getItem('id')){
        this.loading = true
        if(this.kindSelect){
          let formData = new FormData
            formData.append('post_id', this.$route.params.id)
            formData.append('kind', this.kindSelect)
            formData.append('order_num', this.num)
            formData.append('title', this.title)
            formData.append('sub_title', this.sub_title)
            formData.append('text', this.text)
            formData.append('picture', this.picture)
    
          await this.$axios.$post('api/post_contents/', formData, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(
            this.submitAlert = true,
            this.colors = 'info',
            this.types = 'success',
            this.answer = '作成されました'
          )

          this.$axios.$get(`api/posts/${this.$route.params.id}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(res => {
            this.postContents = res.data.attributes.post_contents
            this.num = res.data.attributes.post_contents.length + 1
            this.loading = false
          })
          this.num += 1
    
          this.title = ''
          this.sub_title = ''
          this.text = ''
          this.picture = ''
          this.kindSelect = ''
        }else{
          this.loading = false
          this.submitAlert = true
          this.colors = 'error',
          this.types = 'error',
          this.answer = 'Typeを選択してください'
        }
      }else{
        this.submitAlert = true
      }
    },

    async update(){
      if(localStorage.getItem('id')){
        const params = {
          title: this.post.title
        }
        await this.$axios.$patch(`api/posts/${this.$route.params.id}`, params, {
          headers:{
            'X-Access-Token': localStorage.getItem('X-Access-Token')
          }
        }).then(
          this.loading = false,
          this.editForm = false,
          this.submitAlert = true,
          this.colors = '',
          this.types = 'success',
          this.answer = '更新されました'
        )
      }else{
        this.submitAlert = true
      }
    },

    async postContentsUpdate(post_content){
      if(localStorage.getItem('id')){
        this.loading = true
        if(post_content.kind == "delete"){
          await this.$axios.$delete(`api/post_contents/${post_content.id}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          })
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
              title: res.data.attributes.title,
              updated_at: updated_at,
            }
            this.num = res.data.attributes.post_contents.length + 1
            this.loading = false
          })
          this.submitAlert = true
          this.colors = 'info'
          this.types = 'success',
          this.answer = '削除されました'
        }else{
          let formData = new FormData
            formData.append('post_id', post_content.post_id)
            formData.append('kind', post_content.kind)
            formData.append('order_num',post_content.order_num)
            formData.append('title', post_content.title)
            formData.append('sub_title', post_content.sub_title)
            formData.append('text', post_content.text)
            formData.append('picture', post_content.picture)
    
          await this.$axios.$patch(`api/post_contents/${post_content.id}`, formData, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(
            this.submitAlert = true,
            this.colors = '',
            this.answer = '更新されました',
            this.types = 'success',
            this.loading = false
          )
          if (post_content.kind == 'picture'){
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
                title: res.data.attributes.title,
                updated_at: updated_at,
              }
              this.num = res.data.attributes.post_contents.length + 1
              this.loading = false
            })
          }
        }
      }else{
        this.submitAlert = true
      }
    },

    async deletePost(){
      if(localStorage.getItem('id')){
        this.loading = true
        const confirmation = window.confirm("本当に削除して良いのですか？");
        if (confirmation){
          await this.$axios.$delete(`api/posts/${this.$route.params.id}`, {
            headers:{
              'X-Access-Token': localStorage.getItem('X-Access-Token')
            }
          }).then(
            window.location.href = `/users/posts/${localStorage.getItem('id')}`,
            this.$router.push(`/users/posts/${localStorage.getItem('id')}`),
            this.loading = false
          )
        }else{
          this.loading = false
        }
      }else{
        this.submitAlert = true
      }
    }
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
.post_header_btn{
  position:absolute; 
  right: 0; 
  top: 10px;
  z-index: 20;
}
.post_header_title{
  text-align: center;
  font-weight: bold;
}
.post_mindmap{
  display: flex;
  align-items: center;
}
.post_mindmap p{
  margin-bottom: 5px;
}
.post_mindmap_created_at{
  display: flex;
  align-items: center;
  font-size: 12px;
}
.post_mindmap_tag_list{
  font-size: 10px;
  background-color:rgb(211, 238, 252);
  border-radius:5px;
  font-weight: bold;
  color: gray;
  padding: 1px 2px;
}
.post_edit_card_form{
  display: flex; 
  flex-wrap: wrap;
}
.post_form{
  transform: translateY(-80px);
}
.post_form_file{
  margin: 0; 
  padding: 0;
}
.post_content_inner{
  position: relative;
}
.post_content_inner_col{
  position: absolute; 
  top: 1px; 
  left: -30px;
}

.post_content_inner_sub_title{
  position: absolute; 
  top: -35px; 
  left: -30px;
}
.post_content_inner_text{
  position: absolute; 
  top: -35px; 
  left: -30px;
}
.post_content_inner_picture{
  position: absolute; 
  top: -50px; 
  left: -30px;
}
.post_content_inner_delete{
  position: absolute; 
  top: -35px; 
  left: -30px;
}

input {
 border: none;
 outline: none;
}
.titleForm{
  font-weight: bold;
  width:100%;
  font-size: 30px;
  border-bottom: solid 1px rgb(220 218 218);
}
.subTitleForm{
  font-size: 23px;
  width: 100%;
  font-weight: bold;
}
.mind_map{
  position: relative;
}
.mind_map_move{
  position: absolute;
  right: 5px;
  bottom: 40px;
}

</style>