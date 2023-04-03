<template>
  <!-- <el-card :body-style="{ padding: '5px 10px', width: '250px' }"> -->
  <div class="category">
    <div class="header-box">
      <h2>分类列表</h2>
    </div>
    <ul class="list">
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="changeActive(item, index)"
      >
        <span>{{ index }}</span>
      </li>
    </ul>
  </div>
  <!-- </el-card> -->
</template>

<script setup>
import { getAllType } from '@/api/healthAssessment/main'

import { inject, ref } from 'vue'

// const list = [
//   '一般调查',
//   '运动前筛查',
//   '身体成分',
//   '心肺适能',
//   '肌力',
//   '糖代谢状态',
//   '血脂指标',
//   '血压',
//   '血管机能',
//   '血液指标',
//   '骨相关',
//   '肺功能',
//   '心脏相关',
//   '肌骨健康评估',
//   '生命体征'
// ]

const list = ref([])
const getSideTypeList = async () => {
  const res = await getAllType()
  console.log(res)
  if (res.success) {
    list.value = res.body
    let obj = Object.keys(res.body)
    let value = Object.values(res.body)
    active.value = obj[0]
    activeUrl.value = value[0]
  }
}

getSideTypeList()

const active = inject('active')
const activeUrl = inject('activeUrl')
const changeActive = (item, index) => {
  active.value = index
  activeUrl.value = item
}
</script>
<style lang="scss" scoped>
.category {
  background: #fff;
  width: 250px;
  height: 73vh;
  display: flex;
  flex-direction: column;
  .header-box {
    padding: 10px;
    display: flex;
    align-items: center;
    h2 {
      padding: 0;
      margin: 0;
      margin-right: 20px;
      font-size: 14px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
    }
  }
  .list {
    flex: 1;
    height: auto;
    margin: 0;
    padding: 0;
    display: block;
    overflow: auto;

    li {
      height: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-left: 20px;
      width: 100%;
      box-sizing: border-box;
      cursor: pointer;
      transition: 0.2s;
      & + li {
        border-top: 1px solid #eee;
      }
      &:hover {
        background: #eee;
      }
      &.active {
        background: rgba(186, 220, 255, 0.4);
      }
      span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 14px;
      }
    }
  }
}
</style>
