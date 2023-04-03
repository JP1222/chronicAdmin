<template>
  <!-- addActionTypeDialog判断是否展示和隐藏（定义在父组件上）-->
  <el-dialog :model-value="actionTypeDialogVisible" :title="dialogTitle" width="30%" @close="handleClose">
    <!-- 值在父组件上，，因为v-model的双向数据绑定就要去修改父组件的值，这是不被允许的  =>  使用单向数据绑定 model-value -->

    <el-form ref="formRef" :model="forms" label-width="100px" class="demo-ruleForm">
      <el-form-item label="动作类型" prop="name" :rules="[{ required: true, message: '请填写动作类型' }]">
        <el-input v-model.number="forms.name" type="text" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>



<script setup>
import { ElMessage } from 'element-plus'
import { defineEmits, defineProps, ref, watch, reactive } from 'vue';
import { insertActionType, updateActionType } from '@/api/sportManagement/action.js'    // 导入 新增 动作类型

// defineProps 用于子组件接收父组件传来的值（定义好传过来的数据类型及其配置）
const props = defineProps({
  // dialogVisible: Boolean,
  // 接收 
  dialogTitle: {
    type: String,
    default: '',    // 空字符串
    required: true    // 必填项
  },
  dialogTableValue: {
    type: Object,
    default: () => { }   // 空对象
  },
  actionTypeDialogVisible: {
    type: Boolean,
    required: true
  }
})


const formRef = ref(null)
const forms = reactive({
  name: '',
})

// 监听 dialogTableValueStatus 的改变
watch(
  () => props.actionTypeDialogVisible,
  (newVal, oldVal) => {
    if (newVal) {
      // console.log(props.dialogTitle);
      if (props.dialogTitle === '添加') {
        forms.name = ''         // 添加时  =>  置空表单
        // console.log('form is empty');
        // forms.id = undefined
      } else if (props.dialogTitle === '更新') {
        // console.log('tabelValue', props.dialogTableValue)
        forms.name = props.dialogTableValue.name
        forms.id = props.dialogTableValue.id
      }
      // console.log(forms);
    }
    // form.value = props.titleValue   // 这里的form要在watch上面
    // forms.value = props.dialogTableValueStatus
  }, { deep: true, immediate: true })


// defineEmits在子组件（）     更新父组件传来的 addActionTypeDialog
const emits = defineEmits(['update:actionTypeDialogVisible', 'initList'])

// 关闭对话框（取消）
const handleClose = () => {
  emits('update:actionTypeDialogVisible', false)     // 更新 modelValue 的值为false
}

// 确认
const handleConfirm = () => {
  // 统一校验
  formRef.value.validate(async (valid) => {
    if (valid) {
      if (props.dialogTitle === '添加') {
        await insertActionType(forms)
        // const res = await insertActionType(forms)
        // console.log(res);
        ElMessage({
          showClose: true,
          message: '添加成功！',
          type: 'success'
        })
      } else {
        await updateActionType(forms)
        // const res = await updateActionType(forms)
        // console.log(forms)
        // console.log(res);
        ElMessage({
          showClose: true,
          message: '更新成功！',
          type: 'success'
        })
      }
      emits('initList')
      handleClose()
    } else {
      ElMessage({
        message: '提交请勿为空！',
        type: 'warning',
      })
      return false;
    }
  });
}

// 表单校验
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入动作类型',
      trigger: 'blur',
    }
  ]
})

</script>


<style scoped>
</style>