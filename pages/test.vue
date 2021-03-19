<template>
    <div class="college">
        <!-- 3. 使用插件并绑定数据 -->
        <Mindmap style="height: 50vh;" v-model="test"></Mindmap>
        {{test}}
    </div>
</template>
<script>
    // 1. 引入插件
    import Mindmap from '@hellowuxin/mindmap'
    export default {
        data(){
            return {
                // 4. 数据类型
                ssr: [
                    {
                        "name": "マインドマップ",
                        "children":
                            [
                                {
                                    "name": "フロントエンド",
                                    "children":
                                        [
                                            {"name": "HTML & CSS", "children": []},
                                            {"name": "JavaScript", "children": []}
                                        ]
                                },
                                {
                                    "name": "バックエンド",
                                    "children": [
                                      {"name": "ruby", "children": []},
                                      {"name": "python", "children": []}
                                    ]
                                },
                            ]
                    }
                ],
                test: [
                  {"id": 1, "sub_id": 0,  "name": "マインドマップ", "children":[]},
                  {"id": 2, "sub_id": 1,  "name": "フロントエンド", "children":[]},
                  {"id": 3, "sub_id": 2,  "name": "HTML", "children":[]},
                  {"id": 4, "sub_id": 2,  "name": "CSS", "children":[]},
                  {"id": 5, "sub_id": 2,  "name": "JS", "children":[]},
                  {"id": 6, "sub_id": 1,  "name": "バックエンド", "children":[]},
                  {"id": 7, "sub_id": 6,  "name": "ruby", "children":[]},
                  {"id": 8, "sub_id": 6,  "name": "python", "children":[]},
                ],
            }
        },
        created() {
          for(var a = 0; a < this.test.length; a++){
            for(var b = 0; b < this.test.length; b++){
              if(this.test[a].id == this.test[b].sub_id){
                this.test[a].children.push(this.test[b])
              }
            }
          }
        },
        methods: {
          crete(){
           
          }
        },
        // 2. 声明插件
        components: {
            Mindmap,
        },
    }
</script>
