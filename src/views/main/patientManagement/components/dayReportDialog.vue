<template>
  <el-dialog :model-value="dialogVisible" @close="handleClose" width="1000px">
    <el-space wrap>
      <el-table :data="dayReportList.xueYa" border height="400px">
        <el-table-column prop="date" label="日期" width="150" />
        <el-table-column prop="blood1" label="收缩压" />
        <el-table-column prop="blood2" label="舒张压" />
      </el-table>

      <el-table :data="dayReportList.xueTang" border height="400px">
        <el-table-column prop="date" label="日期" width="150" />
        <el-table-column prop="sweet" label="血糖" />
      </el-table>

      <el-table :data="dayReportList.xinLv" border height="400px">
        <el-table-column prop="date" label="日期" width="150" />
        <el-table-column prop="rate" label="心率" />
      </el-table>
    </el-space>
  </el-dialog>
</template>

<script setup>
import { defineProps, ref, defineEmits, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

const prop = defineProps({
  dialogVisible: Boolean,
  patientId: Number,
  dayReportList: Object
})

const emits = defineEmits(['update:dialogVisible'])

const tableData = ref([])

const handleClose = () => {
  emits('update:dialogVisible', false)
}
</script>

<style>
.el-dialog__body {
  padding-top: 3px;
}
</style>
<style lang="scss" scoped></style>
