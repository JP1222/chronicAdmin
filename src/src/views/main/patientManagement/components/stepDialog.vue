<template>
  <el-dialog
    :model-value="userStepDialogVisible"
    title="用户历史步数"
    @close="handleClose"
  >
    <el-row :gutter="24">
      <el-col :span="1"
        ><el-button type="primary" @click="handleExport"
          >导出</el-button
        ></el-col
      >
    </el-row>
    <el-table
      v-loading="loading"
      :data="stepList"
      stripe
      :border="true"
      highlight-current-row
      height="500"
    >
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="step" label="步数" />
      <el-table-column prop="date" label="日期" />
    </el-table>

    <Pagination
      :total="queryForm.total"
      v-model:pageSize="queryForm.pageSize"
      v-model:pageNum="queryForm.pageNum"
      @updateList="getList"
    />
  </el-dialog>
</template>

<script setup>
import Pagination from '@/components/pagination/index.vue'
import { defineProps, defineEmits, ref, watch } from 'vue'
import { exportUserStep, getUseStep } from '@/api/patientManagement/index'

const prop = defineProps({
  userStepDialogVisible: Boolean,
  patientId: Number
})

const emits = defineEmits(['update:userStepDialogVisible'])

const handleClose = () => {
  emits('update:userStepDialogVisible', false)
}

watch(
  () => prop.userStepDialogVisible,
  (newVal, oldVal) => {
    if (newVal) {
      getList()
    }
  }
)

const queryForm = ref({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const loading = ref(false)
const stepList = ref([])
const getList = () => {
  loading.value = true
  getUseStep({
    pid: prop.patientId,
    pageNum: queryForm.value.pageNum,
    pageSize: queryForm.value.pageSize
  }).then((res) => {
    stepList.value = res.body.content
    queryForm.value.total = res.body.totalSize
    loading.value = false
  })
}

const handleExport = () => {
  exportUserStep({ pid: prop.patientId }).then((res) => {
    console.log(res)
    dataURLtoBlob(res.body, prop.patientId)
  })
}

const dataURLtoBlob = (base64result, filename) => {
  var raw = window.atob(base64result)
  var uInt8Array = new Uint8Array(base64result.length)
  for (var i = 0; i < raw.length; i++) {
    uInt8Array[i] = raw.charCodeAt(i)
  }

  const link = document.createElement('a')
  const blob = new Blob([uInt8Array], {
    type: 'application/vnd.ms-excel'
  })

  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename + '.xls')

  document.body.appendChild(link)
  link.click()

  document.body.removeChild(link)
}
</script>
