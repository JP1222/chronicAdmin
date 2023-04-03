<template>
  <el-form
    :model="formData"
    ref="vForm"
    :rules="rules"
    label-position="left"
    label-width="130px"
    size="medium"
    @submit.prevent
  >
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="安静心率" prop="rate">
          <el-input
            :controls="false"
            v-model="formData.rate"
            :min="0"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :push="1" class="grid-cell">
        <el-form-item label="血氧饱和度" prop="SaO2">
          <el-input
            v-model="formData.SaO2"
            :min="0"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="射血指数" prop="EF">
          <el-input
            v-model="formData.EF"
            type="number"
            :min="0"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" class="grid-cell">
        <el-form-item label="安静心电图">
          <el-upload
            ref="uploadRef"
            name="electricity"
            :action="uploadUrl"
            :data="formData"
            show-file-list
            :limit="1"
            :auto-upload="false"
            :with-credentials="true"
            :on-success="handleSuccess"
          >
            <el-button>点我上传 </el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-button size="large" type="primary" @click="submitForm">提交</el-button>
  </el-form>
</template>
<script setup>
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  computed,
  ref
} from 'vue'
import { ElMessage } from 'element-plus'
import { getURl } from '@/api/request'

const props = defineProps({
  pid: Number,
  activeUrl: String
})

const uploadUrl = computed(() => {
  const baseUrl = getURl()
  return `${baseUrl}/${props.activeUrl}/insert`
})

const formData = reactive({
  rate: '',
  SaO2: '',
  EF: ''
})

const rules = ref({
  rate: [
    {
      required: true,
      message: '请输入安静心率'
    }
  ],
  SaO2: [
    {
      required: true,
      message: '请输入血氧饱和度'
    }
  ],
  EF: [
    {
      required: true,
      message: '请输入射血指数'
    }
  ]
})
const state = reactive({
  allFileList: [],
  allUploadHeaders: {},
  allUploadData: {}
})

const instance = getCurrentInstance()
const uploadRef = ref()
const submitForm = () => {
  console.log(props)
  instance.ctx.$refs['vForm'].validate((valid) => {
    if (!valid) return
    formData.pid = props.pid
    uploadRef.value.submit()
  })
}

const resetForm = () => {
  instance.ctx.$refs['vForm'].resetFields()
}

const handleSuccess = (res, uploadFile, uploadFiles) => {
  if (res) {
    ElMessage({
      type: 'success',
      message: '新增成功!'
    })
    resetForm()
  }
}
</script>
<style lang="scss" scoped></style>
