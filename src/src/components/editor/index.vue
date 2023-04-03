<template>
  <div ref="editor"></div>
  <el-button @click="test" style="margin-top: 20px" type="primary">
    单击提交</el-button
  >
</template>
<script setup>
import { ElMessage } from 'element-plus'
import { getURl } from '@/api/request.js'
import E from 'wangeditor'
import { onMounted, ref, defineEmits, defineExpose, defineProps } from 'vue'

const prop = defineProps({
  status: String
})
const emits = defineEmits(['sendMsg', 'submit'])

const content = ref('')
const editor = ref()
var temp = {}
console.log(editor)

const action = {
  imgUrl: getURl() + '/upload/editor/picture',
  videUrl: getURl() + '/upload/editor/video'
}

const food = {
  imgUrl: getURl() + '/upload/editor/food/picture',
  videUrl: getURl() + '/upload/editor/food/video'
}

const announce = {
  imgUrl: getURl() + '/upload/editor/notice/picture',
  videUrl: getURl() + '/upload/editor/notice/video'
}

let tempObj = {}

if (prop.status === 'action') {
  tempObj = action
} else if (prop.status === 'food') {
  tempObj = food
} else if (prop.status === 'announce') {
  tempObj = announce
}

onMounted(() => {
  var aeditor = new E(editor.value)
  aeditor.config.uploadFileName = 'file'
  aeditor.config.uploadVideoName = 'file'
  aeditor.config.withCredentials = true
  aeditor.config.withVideoCredentials = true
  aeditor.config.showLinkVideo = true
  aeditor.config.uploadImgServer = tempObj.imgUrl
  aeditor.config.uploadVideoServer = tempObj.videUrl
  // aeditor.config.uploadImgShowBase64 = true
  aeditor.create()
  temp = aeditor
})

const handleClick = () => {
  content.value = temp.txt.html()
  console.log(getURl())
}

const test = () => {
  if (temp.txt.html()) {
    emits('sendMsg', temp.txt.html())
  } else {
    ElMessage({
      message: '文本内容为空！',
      type: 'error'
    })
  }
}

const setData = (data) => {
  temp.txt.html(data)
}

defineExpose({
  setData
})
</script>
<style lang="scss" scoped></style>
