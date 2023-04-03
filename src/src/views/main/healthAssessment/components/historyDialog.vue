<template>
  <el-dialog
    :model-value="hisDetailVisiable"
    @close="handleClose"
    title="详细信息"
    width="40vw"
  >
    <!-- <div v-for="(item, index) in info" :key="index">
      <span>{{ changeValue(index) }}:</span>
      <span>{{ item }}</span>
    </div> -->

    <el-descriptions column="2" size="large">
      <el-descriptions-item
        v-for="(item, index) in info"
        :key="index"
        :label="changeValue(index)"
        >{{ item }}</el-descriptions-item
      >
    </el-descriptions>

    <div v-for="(item, index) in files" :key="index">
      <span>{{ changeValue(item.key) }}:&nbsp;&nbsp;</span>
      <el-button @click="handleDownload(item)">下载文件</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { defineProps, defineEmits, defineExpose, ref } from 'vue'
import { changeValue } from '@/utils/system/myLaunage.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  hisDetailVisiable: Boolean,
  detailData: Object
})

const emits = defineEmits(['update:hisDetailVisiable'])

const handleClose = () => {
  emits('update:hisDetailVisiable', false)
}

const keys = ref([])
const info = ref({})
const setData = (row) => {
  info.value = row
  const rkeys = Object.keys(row)
  keys.value = rkeys
}

const files = ref([])
const setFiles = (data) => {
  files.value = data
}

const handleDownload = (item) => {
  if (item.value === null) {
    ElMessage({
      type: 'error',
      message: '链接为空'
    })
  } else {
    window.open(item.value)
  }
}

defineExpose({
  setData,
  setFiles
})
</script>
<style lang="scss" scoped></style>
