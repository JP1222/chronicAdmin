<template>
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
      <template v-slot="{ row }" v-if="item.prop === 'action'">
        <el-button @click="handleEdit(row)">编辑</el-button>
        <el-button type="danger" @click="handleDelete(row)">删除</el-button>
      </template></el-table-column
    >
  </el-table>

  <disease-dialog
    v-model:dialogVisible="dialogVisible"
    @updateList="getList"
    :dialogStatus="dialogStatus"
    :docList="staffList"
    :role="role"
    append-to-body
  />
</template>

<script setup>
import diseaseDialog from '@/views/main/diseaseManagement/components/diseaseDialog.vue'
import { reactive, ref, nextTick } from 'vue'
import {
  getDiseaseById,
  getDiseaseByIdForAdm,
  deletDiseaseById,
  getAllDocList
} from '@/api/diseaseManagement/index'
import { useStore } from 'vuex'
import { options, addDoc } from '@/views/main/diseaseManagement/options'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { ElMessageBox, ElMessage } from 'element-plus'

const prop = defineProps({
  patientId: Number
})

const store = useStore()
const role = store.state.user.role

const queryForm = reactive({
  pageNum: 1,
  pageSize: 10
})
const loading = ref(true)
const total = ref(0)
const tableData = ref([])
const cardHeight = getHeightWithOutHeader()
const staffList = ref([])
const dialogStatus = ref('')
const dialogVisible = ref(false)

// 获取表格数据
const getList = async () => {
  let id = prop.patientId
  loading.value = true
  if (role === 'staff') {
    const res = await getDiseaseById({ id })
    if (res.success) {
      console.log(res)
    }
  } else {
    const res = await getDiseaseByIdForAdm({ id })
    if (res.success) {
      console.log(res)
    }
  }
}

// 获取医师列表(管理员)
const getDocList = async () => {
  const res = await getAllDocList()
  staffList.value = res.body
}

const handleEdit = (row) => {
  dialogVisible.value = true
  dialogStatus.value = 'edit'
  console.log(row)
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

nextTick(() => {
  getList()
})
</script>
