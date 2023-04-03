<template>
  <el-dialog :model-value="dialogVisible" title="会员套餐管理" @close="handleClose">
    <el-row style="margin: 5px 0">
      <el-button type="primary" @click="handleCreateClick">新增会员套餐</el-button>
    </el-row>
    <el-table v-loading="loading" :data="tableData" stripe :border="true" height="400px" highlight-current-row
      style="font-size: 1rem">
      <el-table-column prop="id" label="序号" />
      <el-table-column prop="month" label="月数" />
      <el-table-column prop="money" label="金额" />
      <el-table-column label="操作" v-slot="{ row }" width="200px">
        <el-button type="primary" @click="handleClickUpdate(row)">更新套餐</el-button>
        <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
      </el-table-column>
    </el-table>
    <Pagination :total="total" v-model:pageSize="pageSize" v-model:pageNum="pageNum" @updateList="getList" />

  </el-dialog>
  <rule-form-dialog ref="ruleForm" v-model:dialogVisible="formDialogVisible" :title="formTitle" @update="fetchAllRule" />
</template>

<script setup>
import Pagination from '@/components/pagination/index.vue'
import ruleFormDialog from './ruleFormDialog.vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import { defineProps, defineEmits, reactive, toRefs, ref } from 'vue'
import { getAllRule, deleteRule } from '../../../../api/ruleManagement';
const emits = defineEmits(['update:dialogVisible'])

const prop = defineProps({
  dialogVisible: Boolean
})

const ruleForm = ref()

const state = reactive({
  tableData: [],
  loading: false,
  formDialogVisible: false,
  formTitle: '',
  total: 0,
  pageSize: 10,
  pageNum: 1
})

const fetchAllRule = async () => {
  const { pageNum, pageSize } = state
  const res = await getAllRule({ pageNum, pageSize })
  state.total = res.body.content.length
  state.tableData = res.body.content
}

const handleCreateClick = () => {
  state.formTitle = '新增套餐'
  state.formDialogVisible = true
}

const handleClickUpdate = (row) => {
  console.log('ruleForm', row);
  const { formData } = ruleForm.value.state
  formData.month = row.month
  formData.id = row.id
  formData.money = row.money
  state.formTitle = '更新套餐'
  state.formDialogVisible = true
}

const handleDelete = (id) => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteRule({ id })
      fetchAllRule()
      if(state.total == 0) state.pageNum -= 1

      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '删除取消'
      })
    })
}

const handleClose = () => {
  emits('update:dialogVisible', false)
}

fetchAllRule()

const {
  tableData,
  loading,
  formDialogVisible,
  formTitle,
  total,
  pageSize,
  pageNum } = toRefs(state)
</script>
