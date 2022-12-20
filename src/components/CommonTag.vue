<template>
    <div class="tabs">
        <el-tag
            :key="tag.name"
            v-for="(tag,index) in tags"
            :closable="tag.name!=='home'"
            :effect="$route.name===tag.name?'dark':'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag,index)"
            size="small"
        >
            {{ tag.label }}
        </el-tag>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
export default {
    name: 'commonTag',
    data() {
        return {
        };
    },
    methods: {  
        // 删除得修改state中tabList函数
        ...mapMutations({
          close:'closeTag'
        }),          
        // 点击跳转的实现，切换路由
        changeMenu(tag){
          this.$router.push({name:tag.name})
        },
        // 删除的实现:
        // 删除tag也会删除对应的面包屑，面包屑对应的是state.tabsList。首先拿到tag的总长度，总长度减1就是我们当前选中的tag,赋值给length，判断length和index的长度进行比较，如果这两个值相等，那么就表示此时我们选中的tag是tag中的最后一项。首先判断tag.name与当前的路由是否一致，如果不一致，不需要额外操作，直接return，即高亮在最后一个tag，删除的tag是非选中的tag，所以无需操作。
        // 如果当前删除的tag是最后一个tag，那么高亮部分一个向左移动一格。如果当前菜单高亮在中间，并且你删除当前的菜单时，高亮显示      向右移动一格。

        handleClose(tag,index) {
          
            // this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
            const length=this.tags.length-1;
            this.close(tag);
            if(tag.name!==this.$route.name){
              return;
            }
            if(index==length){
              // 当删除的tag的index==length时 相当于删除的是最后一个tag index和length都减一
              this.$router.push({name:this.tags[index-1].name})
            }
            // 可省略
            else{
              // 当不同时 删除的是前面的 然后自动跳转到下一个tag index不变
               this.$router.push({
                        name: this.tags[index].name
                    })

            }
        },
        
    },
    computed: {
        ...mapState({
          // 添加的实现 根据获取的数据 显示tag
            tags: state => state.tab.tabList,
        }),
    },
};
</script>

<style>
.tabs {
    padding: 20px;
    
}
.tabs .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
</style>
