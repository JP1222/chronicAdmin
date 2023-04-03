<template>
  <el-dialog
    :model-value="logDialogVisible"
    title="日志"
    @close="handleClose"
    width="800px"
  >
    <el-table :data="tableData" style="width: 100%" v-loading="listLoading">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="content" label="内容" />
      <el-table-column prop="date" label="日期" width="150" />
    </el-table>

    <Pagination
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      :total="queryForm.total"
      @updateList="getList"
    />
  </el-dialog>
</template>

<script setup>
import { getAllLog } from '@/api/systemManage/adminManage'
import { defineProps, reactive, ref } from 'vue'
import Pagination from '@/components/pagination/index.vue'

const props = defineProps({
  logDialogVisible: Boolean
})

const listLoading = ref(false)
const queryForm = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

const emits = defineEmits(['update:logDialogVisible'])

const tableData = ref([])
const getList = () => {
  const { pageNum, pageSize } = queryForm
  listLoading.value = true
  getAllLog({ pageNum, pageSize }).then((res) => {
    tableData.value = res.body.content
    queryForm.total = res.body.totalSize
    listLoading.value = false
  })
}

const handleClose = () => {
  emits('update:logDialogVisible', false)
}

getList()
</script>
