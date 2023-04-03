<template>
  <el-pagination :currentPage="pageNum" :page-size="pageSize" :page-sizes="[5, 10, 15, 20]" :small="small"
    :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="props.total"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>

<script setup>
import { defineProps, ref } from 'vue'
const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    required: true
  },
  pageNum: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['update:pageNum', 'update:pageSize', 'updateList'])

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  emits('update:pageSize', val)
  emits('updateList')
}
const handleCurrentChange = (val) => {
  emits('update:pageNum', val)
  emits('updateList')
}
</script>
