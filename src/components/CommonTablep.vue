<template>
  <div class="common-table">
    <!-- :data="用于存放请求数据回来的数组"  -->
    <el-table  :data="tableData.slice((query.pageNum-1)*query.pageSize,query.pageNum*query.pageSize)" height="90%" v-loading="tableData.length>0?false:true" 
    element-loading-spinner="el-icon-loading" @sort-change="sortChange"
     ref="multipleTable" @selection-change="handleSelectionChange" border  :header-cell-style="{background:'#FAFAFA'}" stripe>
      <el-table-column align="center" width="60px">&gt;</el-table-column>
      <el-table-column
        prop="re_id"
        label="id"
        width="180px"
        align="center"
        sortable=“custom”
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        v-for="(item, index) in tableLabel"
        :prop="item.prop"
        :key="index"
        :label="item.label"
        width="330px"
        align="center"
      >
        <template slot-scope="scope">
          <!-- 表示该列的数 是来自所有行中的item.prop值 -->
          <!-- scope.row：用插槽拿到当前行row内置属性 -->
          <span style="margin-left=10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" min-width="180" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)" icon="el-icon-edit">编辑</el-button> 
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete">删除</el-button>
        </template>
 
      </el-table-column> -->
      <el-table-column
             label="操作"
             v-if="isOperate"  align="center">
            <template slot-scope="scope">
                <slot :row='scope.row' :index='scope.$index'></slot>
             </template>
        </el-table-column>
    </el-table>
    <div style="margin-top: 0.2rem; margin-left: 0.2rem">
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pageNum"
        :page-sizes="[3, 4, 5,8]"
        :page-size="query.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="query.total"
      ></el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CommonTable',
  props: {
    tableData: Array, //表格的数据
    tableLabel: Array, //表格的首行提示数据
    query: Object,// 用于传输的总数居 接收分页等配置
    isOperate: {
       type: Boolean,
        default: false
            },
  },
  data() {
    return {
      multipleSelection: []
    }
  },
  methods: {
    handleSelectionChange(val) {
        // console.log(val)  //打印选中的行集合
        this.multipleSelection = val;
    },
    handleDelete(row) {
         this.$emit('del',row)
    },
    handleEdit(row) {
        this.$emit('edit',row)
    },
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e);
    },
    // 页码变化
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e);
    },
    sortChange(column){
      this.$emit('sortChange', column)
      // console.log(column.prop);
     
    }
}
}
</script>
<style scope>
.common-table {
  height: 540px;
  background-color: #fff;
  position: relative;
}
.common-table .pager {
  position: absolute;
  bottom: 0;
  right: 20px;
}
</style>
