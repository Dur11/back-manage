<template>
  <div class="">
    <el-dialog
      :width="width || '780px'"
      :title="title"
      :visible.sync="diaVisible"
      v-dialogDrag
      v-if="diaVisible"
      :before-close="close"
      :top="top || '15vh'"
    >
      <!-- 自定义插槽 noFooter为true的时候，不显示footer的插槽-->
      <slot name="dia_Content"></slot>
      <div
        slot="footer"
        class="dialog-footer"
        v-if="noFooter ? false : true"
      >
        <el-button size="mini" @click="cancel"> 取 消 </el-button>
        <el-button type="primary" size="mini" @click="save"> 确 定 </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ["diaVisible", "title", "width", "noFooter","top"],
  data() {
    return {};
  },
  created() {},
  methods: {
    close() {
      this.$emit("close");
    },
    cancel() {
      this.$emit("cancel");
    },
    save() {
      this.$emit("save");
    },
  },
  components: {},
};
</script>

<style scoped>
.el-dialog {
  border-radius: 8px !important;
}
</style>
