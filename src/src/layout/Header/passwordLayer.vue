<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form
      :model="formData"
      ref="ruleFormRef"
      :rules="rules"
      label-position="left"
      label-width="80px"
      size="medium"
      @submit.native.prevent
    >
      <el-row>
        <el-col :span="10" :offset="1" class="grid-cell">
          <el-form-item label="姓名" prop="name" class="required">
            <el-input v-model="formData.name" type="text" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :push="2" class="grid-cell">
          <el-form-item label="账号" prop="account" class="required">
            <el-input
              v-model="formData.account"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :offset="1" class="grid-cell">
          <el-form-item label="注册日期" prop="date">
            <el-input
              v-model="formData.date"
              :disabled="true"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" :push="2" class="grid-cell">
          <el-form-item label="机构" prop="organizationName" class="required">
            <el-select v-model="formData.organizationName">
              <el-option
                v-for="(item, index) in orgList"
                :key="index"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10" :push="1" class="grid-cell">
          <el-form-item label="新密码" prop="password">
            <el-input
              v-model="formData.password"
              type="text"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" class="grid-cell"> </el-col>
      </el-row> </el-form
  ></Layer>
</template>

<script setup>
import { reactive, onMounted, ref, watch, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import Layer from '@/components/layer/index.vue'
import {
  getDocInfo,
  getOrgList,
  updateDocInfo
} from '@/api/systemManage/adminManage'

const props = defineProps({
  layer: {
    type: Object,
    default: () => {
      return {
        show: false,
        title: '',
        showButton: true
      }
    }
  }
})

const orgList = ref([])
const formData = reactive({
  name: '',
  account: '',
  date: '',
  organizationName: '',
  password: ''
})

const rules = {
  name: [
    {
      required: true,
      message: '字段值不可为空'
    },
    {
      pattern: /^[一-龥]+$/,
      trigger: ['blur', 'change'],
      message: ''
    }
  ],
  account: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ],
  organizationName: [
    {
      required: true,
      message: '字段值不可为空'
    }
  ]
}

watch(
  () => props.layer,
  (newVal, oldVal) => {
    console.log(newVal)
  }
)

onMounted(() => {
  getOrgList().then((res) => {
    orgList.value = res.body
  })
  getDocInfo().then((res) => {
    const data = JSON.parse(JSON.stringify(res.body))
    const keys = Object.keys(data)
    keys.forEach((item) => {
      formData[item] = data[item]
    })
  })
})

const layerDom = ref(null)

const instance = getCurrentInstance()
const submitForm = () => {}

const submit = () => {
  if (
    formData.name &&
    formData.account &&
    formData.date &&
    formData.organizationName
  ) {
    if (!formData.password) {
      delete formData.password
    }
    updateDocInfo(formData).then((res) => {
      if (res.success) {
        ElMessage.success('更新成功！')
        layerDom.value.close()
      }
    })
  } else {
    ElMessage.error('请填写表单!')
  }
}
</script>

<style lang="scss" scoped></style>
