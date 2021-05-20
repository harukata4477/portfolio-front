<template>
  <div>
    <div v-if="loading" class="loading">
      <div class="loading_inner">
        <p class="loading_inner_text">Loading...</p>
        <vue-loading class="loading_inner_mark" type="beat" color="gold" :size="{ width: '60px', height: '60px'}"></vue-loading>
      </div>
    </div>

    <v-alert class="alert" style="top: 10px;" color="info" type="success" v-model="saveAlert" transition="slide-y-transition">
      保存されました。
    </v-alert>
    <v-alert class="alert" style="top: 10px;" color="info" type="success" v-model="doneAlert" transition="slide-y-transition">
      このルームが達成されました。
    </v-alert>
    <v-alert class="alert" style="top: 10px;" color ="" type="success" v-model="notYetAlert" transition="slide-y-transition">
      このルームが未達成されました。
    </v-alert>

    <div class="mind_map_save">
      <div class="mind_map_save_inner">
        <v-icon @click="$router.push('/rooms')" large class="mr-2" color="white">mdi-chevron-left</v-icon>
        <v-icon @click="notYet" class="mr-4" color="white" v-if="room.done == true">mdi-checkbox-marked-circle</v-icon>
        <v-icon @click="done" color="white" class="mr-4" v-else>mdi-checkbox-marked-circle-outline</v-icon>
        <v-btn small color="white" class="blue--text" @click="save">SAVE</v-btn>
      </div>
    </div>
    <div class="wrapper">
      <div
        id="myDiagramDiv"
        style="width:100%;height:100vh;"
      />
    </div>
    <!-- <div class="btn">

      <v-btn small color="info" @click="save">SAVE</v-btn>
    </div> -->
  </div>
</template>

<script>
import * as go from 'gojs'
const $ = go.GraphObject.make
import { VueLoading } from 'vue-loading-template';

export default {
  components: {VueLoading},
  props: {
    params: {
      type: String,
      default: ''
    },
  },
  computed: {
    setParams: {
      get () { return this.params },
      set (newVal) { return this.$emit('update:params', newVal) }
    },
  },
  data () {
    return {
      nodes: [],
      room: [],
      saveAlert: false,
      doneAlert: false,
      notYetAlert: false,
      loading: true,
    }
  },

  mounted() {

    const myDiagram = $(go.Diagram, 'myDiagramDiv',
      {
        initialAutoScale: go.Diagram.Uniform,
        // 'layout': $(go.TreeLayout, {angle: 0, arrangement: go.TreeLayout.ArrangementHorizontal}), 
        //ユーザーがノードをドラッグすると、そのノードから始まるサブツリー全体も移動/コピー/削除します
        "commandHandler.copiesTree": true,
        "commandHandler.copiesParentKey": true,
        "commandHandler.deletesTree": true,
        "draggingTool.dragsTree": true,
        'undoManager.isEnabled': true 
      })
      this.diagram = myDiagram
    const myModel = $(go.TreeModel)
    myModel.nodeDataArray = this.nodes
    myDiagram.model = myModel

    //ドキュメントが変更されたら、タイトルに「*」を追加し、「保存」ボタンを有効にします
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
        //ノードデータ内の各ノードの場所を覚えておいてください
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        //テキストが目的の方向に「成長」することを確認します
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
        //ノードデータ内の各ノードの場所を覚えておいてください
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        //テキストが目的の方向に「成長」することを確認します
        new go.Binding("locationSpot", "dir", function(d) { return spotConverter(d, false); })
      );

    //選択したノードに子を追加するためのボタンが表示されます
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

      //コンテキストメニューを使用すると、ユーザーはフォントのサイズと太さを変更できます。
      //そしてそのノードから開始して制限されたツリーレイアウトを実行します
      myDiagram.nodeTemplate.contextMenu =
        $("ContextMenu",
          // $("ContextMenuButton",
          //   $(go.TextBlock, "Bigger"),
          //   { click: function(e, obj) { slicechangeTextSize(obj, 1.1); } }),
          // $("ContextMenuButton",
          //   $(go.TextBlock, "Smaller"),
          //   { click: function(e, obj) { changeTextSize(obj, 1 / 1.1); } }),
          $("ContextMenuButton",
            $(go.TextBlock, "Bold/Normal"),
            { click: function(e, obj) { toggleTextWeight(obj); } }),
          $("ContextMenuButton",
            $(go.TextBlock, "Copy"),
            { click: function(e, obj) { e.diagram.commandHandler.copySelection(); } }),
          $("ContextMenuButton",
            $(go.TextBlock, "Delete"),
            { click: function(e, obj) { e.diagram.commandHandler.deleteSelection(); } }),
          $("ContextMenuButton",
            $(go.TextBlock, "Undo"),
            { click: function(e, obj) { e.diagram.commandHandler.undo(); } }),
          $("ContextMenuButton",
            $(go.TextBlock, "Redo"),
            { click: function(e, obj) { e.diagram.commandHandler.redo(); } }),
          $("ContextMenuButton",
            $(go.TextBlock, "Layout"),
            {
              click: function(e, obj) {
                var adorn = obj.part;
                adorn.diagram.startTransaction("Subtree Layout");
                layoutTree(adorn.adornedPart);
                adorn.diagram.commitTransaction("Subtree Layout");
              }
            }
          )
        );

      //リンクは、接続先のノードと同じ色のベジェ曲線です。
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

      myDiagram.contextMenu =
        $("ContextMenu",
          $("ContextMenuButton",
            $(go.TextBlock, "Paste"),
            { click: function (e, obj) { e.diagram.commandHandler.pasteSelection(e.diagram.toolManager.contextMenuTool.mouseDownPoint); } },
            new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canPasteSelection(o.diagram.toolManager.contextMenuTool.mouseDownPoint); }).ofObject()),
          $("ContextMenuButton",
            $(go.TextBlock, "Undo"),
            { click: function(e, obj) { e.diagram.commandHandler.undo(); } },
            new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canUndo(); }).ofObject()),
          $("ContextMenuButton",
            $(go.TextBlock, "Redo"),
            { click: function(e, obj) { e.diagram.commandHandler.redo(); } },
            new go.Binding("visible", "", function(o) { return o.diagram && o.diagram.commandHandler.canRedo(); }).ofObject()),
          // $("ContextMenuButton",
          //   $(go.TextBlock, "Save"),
          //   { click: function(e, obj) { save() } }),
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

    function changeTextSize(obj, factor) {
      var adorn = obj.part;
      adorn.diagram.startTransaction("Change Text Size");
      var node = adorn.adornedPart;
      var tb = node.findObject("TEXT");
      tb.scale *= factor;
      adorn.diagram.commitTransaction("Change Text Size");
    }

    function toggleTextWeight(obj) {
      var adorn = obj.part;
      adorn.diagram.startTransaction("Change Text Weight");
      var node = adorn.adornedPart;
      var tb = node.findObject("TEXT");
      // assume "bold" is at the start of the font specifier
      var idx = tb.font.indexOf("bold");
      if (idx < 0) {
        tb.font = "bold " + tb.font;
      } else {
        tb.font = tb.font.substr(idx + 5);
      }
      adorn.diagram.commitTransaction("Change Text Weight");
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
        var newdata = { text: "", brush: selectColor, dir: olddata.dir, parent: olddata.key };
      }else{
        var newdata = { text: "", brush: olddata.brush, dir: olddata.dir, parent: olddata.key };
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

    // function save() {
    //   const params = {
    //     room_id: this.params,
    //     content: this.this.nodes
    //   }
    //   this.$axios.$patch(`api/contents/${this.params}`, params, {
    //     headers:{
    //       'X-Access-Token': localStorage.getItem('X-Access-Token')
    //     }
    //   })
    // }


    this.$axios.$get(`api/contents/${this.params}`,{
      headers:{
        'X-Access-Token': localStorage.getItem('X-Access-Token')
      }
    }).then(res => {
      this.nodes = res.data.attributes.content
      this.room = res.data.attributes.room
      myDiagram.model = new go.Model.fromJson(
      { "class": "go.TreeModel",
          "nodeDataArray": this.nodes
        }
      );
      this.loading = false
    })
  },

  methods: {
    async save(){
      this.saveAlert = true
      const params = {
        room_id: this.params,
        content: this.nodes
      }
      this.$axios.$patch(`api/contents/${this.params}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
    },
    async done() {
      this.loading = true
      const params = {
        done: true
      }
      await this.$axios.$patch(`api/rooms/${this.params}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.$axios.$get(`api/rooms/${this.params}}`,{
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.room = res.data.attributes
        this.loading = false
        this.doneAlert = true
      });
    },

    async notYet() {
      this.loading = true
      const params = {
        done: false
      }
      await this.$axios.$patch(`api/rooms/${this.params}`, params, {
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      })
      this.$axios.$get(`api/rooms/${this.params}}`,{
        headers:{
          'X-Access-Token': localStorage.getItem('X-Access-Token')
        }
      }).then(res => {
        this.room = res.data.attributes
        this.loading = false
        this.notYetAlert = true
      });
    },
  },
  watch: {
    saveAlert (val) {
      val && setTimeout(() => {
        this.saveAlert = false
      }, 2000)
    },
    doneAlert (val) {
      val && setTimeout(() => {
        this.doneAlert = false
      }, 2000)
    },
    notYetAlert (val) {
      val && setTimeout(() => {
        this.notYetAlert = false
      }, 2000)
    },
  },
}
</script>

<style scoped>
.mind_map_save{
  position: fixed;
  background: rgb(60, 179, 248);
  width: 500px;
  height: 200px;
  border-radius: 100%;
  top: -100px;
  left: -250px;
  z-index: 100; 
}
.mind_map_save_inner{
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex; 
  align-items: center; 
  padding: 10px;  
}
</style>