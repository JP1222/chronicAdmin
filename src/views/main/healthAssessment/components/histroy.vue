<template>
  <el-dialog
    :title="title"
    :model-value="histroyDialogVisiable"
    @close="handleClose"
    v-loading="loading"
  >
    <el-table :data="tableData" :size="'large'" height="50vh">
      <el-table-column prop="date" label="日期" />
      <el-table-column prop="action" label="操作">
        <template v-slot="{ row }">
          <el-button @click="handleClick(row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <Pagination :pageNum="pageNum" :pageSize="pageSize" :total="total" /> -->
    <div>
      <his-detail-dialog
        ref="hisDetailRef"
        v-model:hisDetailVisiable="hisDetailVisiable"
      ></his-detail-dialog>
    </div>
  </el-dialog>

  <!-- <history-dialog v-model:hisDetailVisiable="hisDetailVisiable"></history-dialog> -->
</template>
<script setup>
import hisDetailDialog from './historyDialog.vue'
import Pagination from '@/components/pagination/index.vue'
import { defineProps, defineEmits, computed, watch, ref, nextTick } from 'vue'
import { getHistroyData } from '@/api/healthAssessment/main'
import { hadleFiles } from '@/utils/system/myLaunage.js'

const pageNum = ref(1)
const pageSize = ref(10)
const total = ref(0)

const tableData = ref()

const props = defineProps({
  pid: Number,
  histroyDialogVisiable: Boolean,
  activeUrl: String,
  type: String
})

const loading = ref(true)

const title = computed(() => {
  return props.type
})

const getHistroy = () => {
  loading.value = true

  getHistroyData({ pid: props.pid, type: props.type }).then((res) => {
    tableData.value = res.body
    total.value = res.body.length
    loading.value = false
  })
}

const emits = defineEmits(['update:histroyDialogVisiable'])
const hisDetailRef = ref()
const hisDetailVisiable = ref(false)
const handleClick = (row) => {
  const tableData = JSON.parse(JSON.stringify(row))
  const res = hadleFiles(tableData)
  console.log(res)
  console.log(tableData)
  hisDetailVisiable.value = true
  delete tableData.id
  const ref = hisDetailRef.value
  nextTick(() => {
    ref.setData(tableData)
    ref.setFiles(res)
  })
}

const handleClose = () => {
  emits('update:histroyDialogVisiable', false)
}

defineExpose({ getHistroy })
</script>
<style lang="scss" scoped></style>
