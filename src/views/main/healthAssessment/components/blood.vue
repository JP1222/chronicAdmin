<template>
  <el-form>
    <el-form-item label="血液状态：" label-position="right">
      <el-upload
        ref="bloodUploadRef"
        v-model:file-list="bloodFileList"
        list-type="picture-card"
        show-file-list
        :limit="1"
        :auto-upload="false"
        :with-credentials="true"
      >
        <template #default><i class="el-icon-plus"></i></template
      ></el-upload>
    </el-form-item>
    <el-form-item label="血液生化：">
      <el-upload
        ref="rawUploadRef"
        list-type="picture-card"
        show-file-list
        :limit="1"
        :auto-upload="false"
        :with-credentials="true"
        :file-list="rawFileList"
      >
        <template #default><i class="el-icon-plus"></i></template
      ></el-upload>
    </el-form-item>
  </el-form>
  <!-- 
  <h3>该项需要手动上传</h3> -->
  <el-button @click="subimt" type="primary">提交</el-button>
</template>
<script setup>
import { ref } from 'vue'
import { addHealthyAssess } from '@/api/healthAssessment/main.js'
import { ElMessage } from 'element-plus'

const props = defineProps({
  pid: Number,
  activeUrl: String
})

const bloodUploadRef = ref()
const rawUploadRef = ref()

const bloodFileList = ref([])
const rawFileList = ref([])

const subimt = () => {
  let a = bloodUploadRef.value
  const bloodFile = a.uploadFiles
  let b = rawUploadRef.value
  const rawFile = b.uploadFiles

  if (bloodFile.length === 0 || rawFile.length === 0) {
    ElMessage({
      message: '您还有未选择的文件！',
      type: 'error'
    })
    return
  } else {
    const afile = bloodFile[0].raw
    const bfile = rawFile[0].raw
    let formData = new FormData()
    formData.append('pid', props.pid)
    formData.append('state', afile)
    formData.append('raw', bfile)
    addHealthyAssess('blood', formData).then((res) => {
      if (res.code === 200) {
        a.clearFiles()
        b.clearFiles()
        ElMessage({
          message: '上传成功！',
          type: 'success'
        })
      }
    })
  }
}

const anotherSubmit = () => {
  const bloodFile = bloodFileList.value()
  const rawFile = rawFileList.value()
  if (bloodFile.length == 0 || rawFile.length == 0) {
    ElMessage({
      title: '请上传文件！',
      type: 'warnning',
      duration: 1000
    })
  } else {
    let formData = new FormData()
    formData.append('pid', props.pid)
    formData.append('state', stateFile)
    formData.append('raw', rawFile)
  }
}
</script>
<style lang="scss" scoped></style>
