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
        v-for="(item, index) in options"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-button @click="handleCheck(row)" v-debounce>查看</el-button>
          <el-button @click="handleDelete(row)" type="danger">删除</el-button>
        </template></el-table-column
      >
    </el-table>

    <Pagination
      :total="total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    />
  </el-card>
  <report-detail
    ref="reportRef"
    v-model:detailDialogVisible="detailDialogVisible"
  ></report-detail>
</template>

<script setup>
import reportDetail from './components/reportDetail.vue'
import Pagination from '@/components/pagination/index.vue'
import { nextTick, ref } from 'vue'
import { useStore } from 'vuex'
import {
  getAllHuibaoForAdm,
  getAllHuibaoForDoc,
  getHuibaoById,
  deleteHuibao
} from '@/api/sportManagement/actionHuiBao'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { options, addDoctor } from './options'
import { ElMessageBox, ElMessage } from 'element-plus'

const cardHeight = getHeightWithOutHeader()

const store = useStore()
const role = store.state.user.role
console.log(role)

const queryForm = ref({
  pageNum: 1,
  pageSize: 10
})

const total = ref(0)

const loading = ref(true)
const tableData = ref([])
const getList = async () => {
  if (role === 'admin') {
    const res = await getAllHuibaoForAdm(queryForm.value)
    if (res.success) {
      console.log(res)
      tableData.value = res.body.content
      total.value = res.body.totalSize
      loading.value = false
    }
  } else if (role === 'staff') {
    const res = await getAllHuibaoForDoc(queryForm.value)
    if (res.success) {
      console.log(res)
      tableData.value = res.body.content
      total.value = res.body.totalSize
      loading.value = false
    }
  }
}

const actionList = ref([])
const getAcionList = async () => {
  const res = await getActionList()
  if (res.success) {
    console.log(res)
    actionList.value = res.body
  }
}

const reportRef = ref()
const detailDialogVisible = ref(false)
// 处理单击汇查看汇报
const handleCheck = async (row) => {
  const res = await getHuibaoById({ id: row.id })
  let resData = JSON.parse(JSON.stringify(res.body))
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

const handleDelete = () => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteHuibao({ id: row.id })
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

if (role === 'admin') {
  addDoctor()
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
