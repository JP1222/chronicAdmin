<template>
  <el-card :body-style="{ padding: '5px 10px' }">
    <div style="height: 70vh">
      <h3>
        {{ active }}
      </h3>
      <div class="histroy-contianer">
        <el-button @click="getHistroy">历史记录</el-button>
      </div>

      <div class="common-contianer">
        <common
          ref="commonRef"
          :pid="pid"
          :activeUrl="activeUrl"
          :type="active"
          v-if="filesArray.indexOf(activeUrl) === -1"
        ></common>

        <muscle
          v-else-if="activeUrl === 'muscle'"
          :pid="pid"
          :activeUrl="activeUrl"
        ></muscle>

        <heart
          v-else-if="activeUrl === 'heart'"
          :pid="pid"
          :activeUrl="activeUrl"
        ></heart>

        <blood v-else :pid="pid" :activeUrl="activeUrl"></blood>
      </div>
    </div>
  </el-card>
  <histroy
    ref="hisitroyRef"
    v-model="histroyDialogVisiable"
    :pid="pid"
    :activeUrl="activeUrl"
    :type="active"
  />
</template>
<script setup>
import histroy from './components/histroy.vue'
import common from './components/common.vue'
import blood from './components/blood.vue'
import muscle from './components/muscle.vue'
import heart from './components/heart.vue'
import { inject, defineProps, watch, ref, nextTick, computed } from 'vue'
import { getTypeData, getHistroyData } from '@/api/healthAssessment/main'

const props = defineProps({
  pid: Number
})
const activeUrl = inject('activeUrl')
const active = inject('active')

// 有文件上传的
const filesArray = ['heart', 'blood', 'muscle']

const commonRef = ref()
watch(activeUrl, (newVal, oldVal) => {
  if (filesArray.indexOf(newVal) === -1) {
    nextTick(() => {
      commonRef.value.setRule()
    })
  }
})


const hisitroyRef = ref()
const histroyDialogVisiable = ref(false)
const getHistroy = () => {
  nextTick(() => {
    hisitroyRef.value.getHistroy()
    histroyDialogVisiable.value = true
  })
}
</script>
<style lang="scss" scoped>
.common-contianer {
  width: 60vw;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}
</style>
