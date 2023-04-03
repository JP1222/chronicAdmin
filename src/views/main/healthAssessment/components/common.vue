<template>
  <div class="common-cotianer">
    <form-create
      ref="cfrom"
      v-model="fApi"
      :rule="rule"
      :option="option"
    ></form-create>
    <el-button @click="mySubmit" class="my-btn" type="primary">提交</el-button>
  </div>
</template>

<script setup>
import { computed, inject, nextTick } from 'vue'
import { getAllType, getHistroyData } from '@/api/healthAssessment/main'
import { addHealthyAssess } from '@/api/healthAssessment/main.js'
import { ref, defineProps, watch } from 'vue'
import rules from './rules'
import { ElMessage } from 'element-plus'

// 使用form-create 的组件
let filesArray = ['bone', 'BM', 'heart', 'blood', 'muscle']

const props = defineProps({
  pid: Number,
  activeUrl: String,
  type: String
})

watch(props.pid, (newVal, oldVal) => {
  console.log(newVal)
})

const fApi = ref()

const rule = ref([])

const option = ref({
  form: {
    labelPosition: 'right',
    size: 'medium'
  },
  submitBtn: false,
  resetBtn: true,
  onSubmit: function (formData) {
    formData.pid = props.pid
    addHealthyAssess(activeUrl.value, formData).then((res) => {
      console.log(res)
    })
  }
})

const cfrom = ref()
const mySubmit = () => {
  cfrom.value.fapi.validate(async (valid, fail) => {
    console.log(valid)
    if (valid === true) {
      //todo 表单验证通过
      let formData = JSON.parse(JSON.stringify(fApi.value))
      formData.pid = props.pid
      const res = await addHealthyAssess(props.activeUrl, formData)
      if (res.success) {
        cfrom.value.fapi.resetFields()
        ElMessage({
          type: 'success',
          message: '添加成功'
        })
        cfrom.value.fapi.resetFields()
      }
    } else {
    }
  })
}

const atest = () => {
  console.log(cfrom.value.fapi)
}

const setRule = () => {
  console.log(props.activeUrl)
  const url = props.activeUrl
  // arule 为 rules 里面的对应的
  const arule = rules.rules[`${url}`]['rule']
  const aoption = rules.rules[`${url}`]['option']
  if (url === 'bone' || url === 'BM') {
    arule[0].props.data.pid = props.pid
  }
  if (arule != undefined) {
    nextTick(() => {
      rule.value = arule
      option.value = aoption
    })

    console.log(aoption)
  }
}

const setFromData = () => {}

defineExpose({
  setRule
})
</script>

<style lang="scss" scoped>
.my-btn {
  margin-left: 130px;
}

.common-cotianer {
  // width: 50vw;
}
</style>
