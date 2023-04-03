<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row style="margin: 5px 0">
      <el-button type="primary" @click="handleRuleClick">会员套餐管理</el-button>
    </el-row>
    <el-table v-loading="loading" :data="tableData" stripe :border="true" :height="cardHeight" highlight-current-row
      style="font-size: 1rem">
      <el-table-column v-for="(item, index) in options" :key="index" :prop="item.prop" :label="item.label"
        :width="item.width">
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-col :span="8">
            <el-button type="danger" @click="handleDelete(row.id)">删除</el-button>
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" v-model:pageSize="pageSize" v-model:pageNum="pageNum" @updateList="getList" />
    <rule-dialog v-model:dialogVisible="ruleDialogVisiable" />
  </el-card>
</template>

<script setup>
import Pagination from '@/components/pagination/index.vue'
import ruleDialog from './components/ruleDialog.vue'
import { reactive, toRefs, ref } from 'vue'
import { getAllRule, getAllBill } from '../../../api/ruleManagement'
import { options } from './optioin'
import { getHeightWithOutHeader } from '@/utils/params/height'

const state = reactive({
  loading: false,
  tableData: [],
  total: 0,
  pageSize: 10,
  pageNum: 1
})

const ruleDialogVisiable = ref(false)

const cardHeight = getHeightWithOutHeader()

//获取账单数据
const fetchData = async () => {
  state.loading = true
  const { pageSize, pageNum } = state
  const res = await getAllBill({ pageNum, pageSize })
  state.total = res.body.content.length
  state.tableData = res.body.content
  state.loading = false
}

//处理单击会员套餐管理
const handleRuleClick = () => {
  ruleDialogVisiable.value = true
}

//处理删除账单
const handleDelete = (id) => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteBill({ id })
      fetchData()
      if (state.total == 0) state.pageNum -= 1
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

fetchData()

const {
  loading,
  tableData,
  total,
  pageSize,
  pageNum
} = toRefs(state)
</script>
