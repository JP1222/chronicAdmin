<template>
  <el-dialog
    :model-value="dieaseRecordDIalogVisible"
    title="疾病汇报记录"
    @close="handleClose"
    class="diseaseClass"
  >
    <el-row :gutter="24">
      <el-col :span="1"
        ><el-button type="primary" @click="handleCreate"
          >新增</el-button
        ></el-col
      >
    </el-row>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      :height="cardHeight"
      :border="true"
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
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
  <disease-dialog
    v-model:dialogVisible="dialogVisible"
    :dialogStatus="dialogStatus"
    :docList="staffList"
    :role="role"
    :pid="patientId"
    @updateList="getList"
    :editData="editData"
  ></disease-dialog>
</template>

<script setup>
import diseaseDialog from '../../diseaseManagement/components/diseaseDialog.vue'
import { defineProps, ref, defineEmits, watch } from 'vue'
import {
  getDiseaseById,
  getDiseaseByIdForAdm,
  deletDiseaseById
} from '@/api/diseaseManagement/index'
import { useStore } from 'vuex'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { ElMessageBox, ElMessage } from 'element-plus'

import { options, addDoc } from '@/views/main/diseaseManagement/options'
const store = useStore()
const role = store.state.user.role
const cardHeight = getHeightWithOutHeader() - 150

const prop = defineProps({
  dieaseRecordDIalogVisible: Boolean,
  patientId: Number,
  docList: Array
})

watch(
  () => prop.dieaseRecordDIalogVisible,
  (newVal) => {
    if (newVal) {
      getList()
    }
    if (prop.docList) {
      staffList.value = prop.docList
    }
  }
)

const emits = defineEmits(['update:dieaseRecordDIalogVisible'])

const loading = ref(true)
const tableData = ref([])
const staffList = ref([])

// 获取表格数据
const getList = async () => {
  let id = prop.patientId
  if (role === 'staff') {
    const res = await getDiseaseById({ id })
    if (res.success) {
      loading.value = false
      tableData.value = res.body
    }
  } else {
    const res = await getDiseaseByIdForAdm({ id })
    if (res.success) {
      loading.value = false
      tableData.value = res.body
    }
  }
}

const dialogVisible = ref(false)
const dialogStatus = ref('')
const handleCreate = () => {
  dialogVisible.value = true
  dialogStatus.value = 'add'
}

const editData = ref({})
const handleEdit = (row) => {
  dialogVisible.value = true
  dialogStatus.value = 'edit'
  editData.value = row
}

const handleClose = () => {
  emits('update:dieaseRecordDIalogVisible', false)
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
</script>

<style>
.el-dialog__body {
  padding-top: 3px;
}
</style>
<style lang="scss" scoped></style>
