<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row :span="4"> </el-row>
      <el-row :span="1" class="patient-name-contianer"> 患者姓名： </el-row>
      <el-row :span="7">
        <el-input v-model="queryForm.patientName" clearable></el-input>
      </el-row>
      <el-row>
        <el-button type="primary" @click="getList" style="margin-left: 10px"
          >搜索</el-button
        >
      </el-row>
    </el-row>

    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      :border="true"
      :height="cardHeight"
      highlight-current-row
      style="font-size: 1rem"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-if="item.prop === 'action'" v-slot="{ row }">
          <el-button @click="handleCheck(row)" v-debounce>查看</el-button>
          <el-button @click="handleDelete(row)" type="danger"> 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    />

    <report-detail
      ref="reportRef"
      v-model:detailDialogVisible="detailDialogVisible"
      @updateList="getList"
    ></report-detail>
  </el-card>
</template>
<script setup>
import { ref, nextTick } from 'vue'
import { options, addDoctor } from './options'
import Pagination from '@/components/pagination/index.vue'
import reportDetail from './components/reportDialog.vue'
import {
  getAllHuibaoForDoc,
  getAllHuibaoForAdm,
  getFoodDetailById,
  deleteReport
} from '@/api/foodManagement/foodreport.js'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { useStore } from 'vuex'
import { ElMessageBox, ElMessage } from 'element-plus'

const store = useStore()
const role = store.state.user.role
const cardHeight = getHeightWithOutHeader()

const total = ref(0)
const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})

const tableData = ref([])
const loading = ref(false)
const getList = () => {
  loading.value = true
  console.log('get')

  if (role === 'admin') {
    // addItem()
    getListForAdm()
  } else if (role === 'staff') {
    getListForDoc()
  }
}

const getListForDoc = async () => {
  const res = await getAllHuibaoForDoc(queryForm.value)
  if (res.success) {
    console.log(res)
    tableData.value = res.body.content
    total.value = res.body.totalPages
    loading.value = false
  }
}

const getListForAdm = async () => {
  const res = await getAllHuibaoForAdm(queryForm.value)
  if (res.success) {
    console.log(res)
    tableData.value = res.body.content
    total.value = res.body.totalPages
    loading.value = false
  }
}

const reportRef = ref(null)
const detailDialogVisible = ref(false)
// 处理单击汇查看汇报
const handleCheck = async (row) => {
  const res = await getFoodDetailById({ id: row.id })
  let resData = JSON.parse(JSON.stringify(res.body))
  console.log(reportRef.value)
  if (resData.content == null) {
    ElMessage({
      type: 'info',
      message: '暂无内容！'
    })
  } else {
    nextTick(() => {
      reportRef.value.setData(resData)
      detailDialogVisible.value = true
    })
  }
}

const handleDelete = (row) => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteReport({ id: row.id })
      getList()
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

getList()
</script>

<style lang="scss" scoped>
.patient-name-contianer {
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
