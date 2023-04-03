<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <el-row :gutter="24" style="margin: 5px 0">
      <el-row :span="4">
        <el-button type="primary" @click="handleCreate">新增指导</el-button>
      </el-row>
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
          <el-button @click="handelEdit(row)">编辑</el-button>
          <el-button @click="handleDelete(row)" type="danger"> 删除</el-button>
        </template>
        <template v-else-if="item.prop === 'isFinish'" v-slot="{ row }">
          <!-- <el-button @click="handelEdit(row)">编辑</el-button> -->
          <span v-if="row.isDrug">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      :total="total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    />
  </el-card>

  <food-dialog
    ref="FoodDialog"
    v-model:dialogVisible="dialogVisible"
    :doctorId="doctorId"
    :role="role"
    :dialogStatus="dialogStatus"
    :docList="docList"
    :editData="editData"
    @updateList="getList"
  />
</template>
<script setup>
import foodDialog from './components/foodDialog.vue'
import Pagination from '@/components/pagination/index.vue'

import {
  getFoodListForDoc,
  getFoodListForAdm,
  getAllDocList,
  deleteZhiDao,
  getFoodById
} from '@/api/foodManagement/food.js'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { addItem, options } from './options'
import { ElMessageBox, ElMessage } from 'element-plus'

// const store = useStore()
// const role = store.state.user.role
const role = 'staff'
// console.log(role)
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
  if (role === 'admin') {
    addItem()
    getListForAdm()
  } else if (role === 'staff') {
    getListForDoc()
  }
}

const getListForDoc = async () => {
  const res = await getFoodListForDoc(queryForm.value)
  if (res.success) {
    console.log(res)
    total.value = res.body.totalSize
    tableData.value = res.body.content
    loading.value = false
  }
}

const getListForAdm = async () => {
  const res = await getFoodListForAdm(queryForm.value)
  if (res.success) {
    console.log(res)
    total.value = res.body.totalSize
    tableData.value = res.body.content
    loading.value = false
  }
}

// 管理员获取医生列表
const docList = ref()
const getDocList = async () => {
  const res = await getAllDocList()
  if (res.success) {
    docList.value = res.body
  }
}

// 获取医生id
const doctorId = ref(0)
if (role === 'staff') {
  console.log('is staff')
  doctorId.value = parseInt(sessionStorage.getItem('doctorId'))
}

const FoodDialog = ref()

// 新增指导
const dialogStatus = ref('')
const dialogVisible = ref(false)
const handleCreate = () => {
  FoodDialog.value.getPatient(doctorId.value)

  dialogStatus.value = 'add'
  dialogVisible.value = true
}

// 编辑指导
const editData = ref()
const handelEdit = (row) => {
  dialogStatus.value = 'edit'
  // console.log(FoodDialog.value)
  getFoodById({ id: row.id }).then((res) => {
    nextTick(() => {
      FoodDialog.value.getPatient(doctorId.value)

      FoodDialog.value.setData(res.body)
    })
    dialogVisible.value = true
  })
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteZhiDao({ id: row.id })
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
if (role === 'admin') {
  getDocList()
}
</script>

<style lang="scss" scoped>
.patient-name-contianer {
  margin-left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
