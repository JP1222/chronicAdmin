<template>
    <el-dialog :model-value="dialogVisible" :title="title" @close="handleClose" width="50vh">
        <el-form :model="formData" ref="vForm" :rules="rules" label-position="left" label-width="80px" @submit.prevent>
            <el-form-item label="月数" prop="month" class="required">
                <el-select v-model="formData.month" class="full-width-input" clearable>
                    <el-option v-for="(item, index) in monthOptions" :key="index" :label="item.label" :value="item.value"
                        :disabled="item.disabled"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="金额" prop="money" class="required">
                <el-input v-model="formData.money" type="number" clearable></el-input>
            </el-form-item>
        </el-form>

        <template #footer>
            <div>
                <el-button type="primary" @click="submitForm">确认</el-button>
                <el-button @click="handleClose">取消</el-button>
            </div>
        </template>
    </el-dialog>
</template>
  
<script setup>
import { createRule, updateRule } from '../../../../api/ruleManagement';
import { ElMessage } from 'element-plus'

import {
    defineProps,
    defineEmits,
    toRefs,
    reactive,
    getCurrentInstance
} from 'vue'
const emits = defineEmits(['update:dialogVisible', 'update'])
const state = reactive({
    formData: {
        month: 1,
        money: "",
    },
    rules: {
        month: [{
            required: true,
            message: '请选择月数',
        }],
        money: [{
            required: true,
            message: '请输入金额',
        }, {
            pattern: /^[-]?\d+(\.\d+)?$/,
            trigger: ['blur', 'change'],
            message: '请输入数字'
        }],
    },
    monthOptions: [{
        "label": "1个月",
        "value": 1
    }, {
        "value": 2,
        "label": "2个月"
    }, {
        "value": 3,
        "label": "3个月"
    }, {
        "value": 4,
        "label": "4个月"
    }, {
        "value": 5,
        "label": "5个月"
    }, {
        "value": 6,
        "label": "6个月"
    }, {
        "value": 7,
        "label": "7个月"
    }, {
        "value": 8,
        "label": "8个月"
    }, {
        "value": 9,
        "label": "9个月"
    }, {
        "value": 10,
        "label": "10个月"
    }, {
        "value": 11,
        "label": "11个月"
    }, {
        "value": 12,
        "label": "12个月"
    }],
})

const instance = getCurrentInstance()

const prop = defineProps({
    dialogVisible: Boolean,
    title: String
})

const submitForm = () => {
    instance.proxy.$refs['vForm'].validate(async (valid) => {
        if (!valid) return
        //TODO: 提交表单
        state.formData.money = Number(state.formData.money)
        if (prop.title === '新增套餐') {
            const res = await createRule(state.formData)
            if (res.success) {
                ElMessage({
                    message: '新增成功！',
                    type: 'success'
                })
                update()
                handleClose()
            }
        } else {
            //更新套餐
            console.log(state.formData)
            const res = await updateRule(state.formData)
            console.log(res);
            if (res.success) {
                ElMessage({
                    message: '新增成功！',
                    type: 'success'
                })
                update()
                handleClose()
            }
        }
    })
}




const resetForm = () => {
    instance.proxy.$refs['vForm'].resetFields()
}

const update = () => {
    emits('update')

}

const handleClose = () => {
    console.log(state.formData);
    resetForm()
    emits('update:dialogVisible', false)
}

const { monthOptions, formData, rules } = toRefs(state)
defineExpose({
    state
})

</script>
  