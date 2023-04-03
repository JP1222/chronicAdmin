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
      @current-change="handleCurrentChange"
      style="font-size: 1rem"
    >
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        v-for="(item, index) in options"
        :key="index"
        :width="item.width"
      >
        <template v-slot="{ row }" v-if="item.prop === 'action'">
          <el-button @click="handleEdit(row)">编辑</el-button>
          <el-button type="danger" @click="handleDelete(row)">删除</el-button>
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
  <disease-dialog
    v-model:dialogVisible="dialogVisible"
    :dialogStatus="dialogStatus"
    :editData="editData"
    :docList="staffList"
    :role="role"
  />
</template>

<script setup>
import DiseaseDialog from './components/diseaseDialog.vue'
import Pagination from '@/components/pagination/index.vue'

import {
  getAllDiseaseForDoc,
  getAllDiseaseForAdmin,
  deletDiseaseById,
  getAllDocList
} from '@/api/diseaseManagement/index'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { options, addDoc } from './options'
import { ElMessageBox, ElMessage } from 'element-plus'

const cardHeight = getHeightWithOutHeader()

const store = useStore()
const role = store.state.user.role
// const role = 'admin'
console.log(role)

const loading = ref(true)
const dialogVisible = ref(false)
const queryForm = reactive({
  pageNum: 1,
  pageSize: 10
})
const total = ref(0)
const tableData = ref([])
const staffList = ref([])
const dialogStatus = ref('')

// 获取表格数据
const getList = async () => {
  loading.value = true
  if (role === 'staff') {
    const res = await getAllDiseaseForDoc(queryForm)
    console.log(res)
    total.value = res.body.totalSize
    tableData.value = res.body.content
    loading.value = false
  } else if (role === 'admin') {
    const res = await getAllDiseaseForAdmin(queryForm)
    total.value = res.body.totalSize
    tableData.value = res.body.content
    loading.value = false
  }
}

// 获取医师列表(管理员)
const getDocList = async () => {
  const res = await getAllDocList()
  staffList.value = res.body
}

const handleCurrentChange = () => {}

const editData = ref()
const handleEdit = (row) => {
  dialogVisible.value = true
  dialogStatus.value = 'edit'

  editData.value = row
}

const handleDelete = async (row) => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deletDiseaseById({ id: row.id })
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
  addDoc()
  getDocList()
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
