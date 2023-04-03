<template>
  <el-dialog
    :model-value="sportDialogVisible"
    title="运动处方数据"
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

  <sport-update-dialog
    v-model:dialogVisible="dialogVisible"
    :dialogStatus="dialogStatus"
    :role="role"
    :docList="docList"
    :actionList="actionList"
    :pid="patientId"
    :editData="editData"
    @updateList="getList"
  ></sport-update-dialog>
</template>

<script setup>
import sportUpdateDialog from '@/views/main/sportMangement/exercise/components/sportUpdateDialog.vue'
import { defineProps, ref, defineEmits, watch } from 'vue'
import { getHeightWithOutHeader } from '@/utils/params/height'
import { useStore } from 'vuex'
import {
  getChuFangByIdForDoc,
  getChuFangByIdForAdm,
  getActionList,
  deleteChuFang
} from '@/api/sportManagement/actionChuFang'
import { options } from '@/views/main/sportMangement/exercise/options'
import { ElMessageBox, ElMessage } from 'element-plus'

const cardHeight = getHeightWithOutHeader() - 150

const store = useStore()
const role = store.state.user.role
const prop = defineProps({
  sportDialogVisible: Boolean,
  patientId: Number,
  docList: Array
})

const emits = defineEmits(['update:sportDialogVisible'])

watch(
  () => prop.sportDialogVisible,
  (newVal) => {
    if (newVal) {
      getList()
    }
    // if (prop.docList) {
    //   staffList.value = prop.docList
    // }
  }
)

const loading = ref(true)
const tableData = ref([])
const getList = async () => {
  let pid = prop.patientId
  if (role === 'staff') {
    const res = await getChuFangByIdForDoc({ pid })
    if (res.success) {
      loading.value = false
      tableData.value = res.body
    }
  } else {
    const res = await getChuFangByIdForAdm({ pid })
    if (res.success) {
      loading.value = false
      tableData.value = res.body
    }
  }
}

const actionList = ref([])
const fetchActionList = async () => {
  const res = await getActionList()
  if (res) {
    actionList.value = res.body
  }
}
fetchActionList()

const editData = ref()
const dialogVisible = ref(false)
const dialogStatus = ref('')
const handleCreate = () => {
  dialogStatus.value = 'add'
  dialogVisible.value = true
}

const handleEdit = (row) => {
  dialogStatus.value = 'edit'
  editData.value = row
  dialogVisible.value = true
}

const handleClose = () => {
  emits('update:sportDialogVisible', false)
}

const handleDelete = (row) => {
  ElMessageBox.confirm('请确认是否删除该条记录', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      const res = await deleteChuFang({ id: row.id })
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
  // console.log(prop.actionList)
}
</script>

<style>
.el-dialog__body {
  padding-top: 3px;
}
</style>
<style lang="scss" scoped></style>
