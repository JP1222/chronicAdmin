<template>
  <el-form
    :model="formData"
    ref="vForm"
    :rules="rules"
    label-position="left"
    label-width="130px"
    @submit.prevent
  >
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="握力（左）" prop="left">
          <el-input
            :controls="false"
            v-model="formData.left"
            :min="0"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :push="1" class="grid-cell">
        <el-form-item label="握力（右）" prop="right">
          <el-input
            v-model="formData.right"
            :min="0"
            type="number"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="30s坐站（中老年）" prop="sitStand">
          <el-input
            v-model="formData.sitStand"
            type="number"
            :min="0"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" class="grid-cell">
        <el-form-item label="4.5m步行（中老年）" prop="walk">
          <el-input
            v-model="formData.walk"
            type="number"
            :min="0"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11" class="grid-cell">
        <el-form-item label="俯卧撑（男）" prop="pushUp">
          <el-input
            v-model="formData.pushUp"
            type="number"
            :min="0"
            clearable
          ></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="11" :offset="1" class="grid-cell">
        <el-form-item label="肌力汇总" prop="number">
          <el-upload
            ref="uploadRef"
            name="all"
            :file-list="uploadFileList"
            :action="uploadUrl"
            :data="formData"
            :limit="1"
            :auto-upload="false"
            :with-credentials="true"
            :on-success="handleSuccess"
          >
            <el-button type="primary">点我上传</el-button>
          </el-upload>
        </el-form-item>
      </el-col>
    </el-row>

    <el-button size="mini" type="primary" @click="submitForm">提交</el-button>
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

const uploadFileList = reactive([])
const formData = reactive({
  left: '',
  right: '',
  sitStand: '',
  walk: '',
  pushUp: ''
})

const rules = ref({
  pushUp: [
    {
      required: true,
      message: '请输入俯卧撑（男）'
    }
  ],
  left: [
    {
      required: true,
      message: '请输入握力（左）'
    }
  ],
  right: [
    {
      required: true,
      message: '请输入握力（右）'
    }
  ],
  sitStand: [
    {
      required: true,
      message: '请输入30s坐站（中老年）'
    }
  ],
  walk: [
    {
      required: true,
      message: '请输入4.5m步行（中老年）'
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
  const keys = Object.entries(formData)

  for (let item of keys) {
    if (!item[1]) {
      ElMessage.warning('请填写完整表单！！')
      return
    }
  }
  formData.pid = props.pid
  uploadRef.value.submit()
  // instance.ctx.$refs['vForm'].validate((valid) => {
  //   if (!valid) return
  //   formData.pid = props.pid
  //   uploadRef.value.submit()
  //   //TODO: 提交表单
  // })
}

const resetForm = () => {
  const keys = Object.keys(formData)
  keys.forEach((item) => {
    formData[item] = ''
  })
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
