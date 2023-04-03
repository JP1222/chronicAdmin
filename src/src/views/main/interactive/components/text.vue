<template>
  <div class="text">
    <div class="pic">
      <i class="el-icon-picture-outline icon" @click="handleUploadImg"></i>
      <input
        ref="imgRef"
        id="imgRef"
        type="file"
        style="display: none"
        @change="fileChange"
        accept=".jpg, .jpeg, .png"
        multiple
      />
    </div>
    <textarea
      ref="text"
      v-model="content"
      @keyup="onKeyup"
      @click="showEmoji = false"
    ></textarea>
    <div class="send" @click="send">
      <span>发送(ent)</span>
    </div>
    <transition name="appear">
      <div class="warn" v-show="warn">
        <div class="description">不能发送空白信息</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, nextTick, watch } from 'vue-demi'
import { useStore } from 'vuex'

const store = useStore()

const content = ref('')
const frequency = ref(0)
const warn = ref(false)
const text = ref()

// 文件ref
const imgRef = ref()

const selectId = computed(() => {
  return store.state.chat.selectId
})

onMounted(() => {
  nextTick(() => {
    // 文本框聚焦
    text.value.focus()
  })
})

watch(selectId, () => {
  text.value.focus()
})

watch(content, () => {
  if (content.value === '') {
    if (frequency.value === 0) {
      warn.value = true
      frequency.value++
      setTimeout(() => {
        warn.value = false
      }, 1000)
    }
  }
})

// 单击发送
const send = () => {
  warn.value = true
  if (content.value.length <= 1) {
    warn.value = true
    content.value = ''
    setTimeout(() => {
      warn.value = false
    }, 1000)
  } else {
    store.dispatch('chat/sendMsg', {msg:content.value, type:'text'}).then((res) => {
      if (res) {
        content.value = ''
        store.dispatch('chat/fetchChatById', selectId.value)
      }
    })
  }
}

const onkeyup = (e) => {
  if (e.keyCode === 13) {
    send()
  }
}

// 单击图片文件上传
const handleUploadImg = () => {
  // imgRef.value.clivk()
  // const file = document.getElementById('imgRef')
  imgRef.value.click()
}

const fileChange = (e) => {
  const files = imgRef.value.files
  console.log(files)
  const img = new FileReader()
  img.addEventListener(
    'load',
    function () {
      const res = img.result
      console.log(res)
      store.dispatch('chat/sendMsg',{ msg:res, type:'image'})
    },
    false
  )
  img.readAsDataURL(files[0])
}
</script>

<style lang="scss" scoped>
.text {
  position: relative;
  min-height: 150px;
  height: 20vh;
  background: #fff;
  transition: all 0.8s ease;
}

.pic {
  display: flex;
  align-items: center;
  height: 40px;
  margin-left: 30px;
}

.icon {
  cursor: pointer;
}

.icon:hover {
  color: #1aad19;
}

.emojiBox {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  top: -210px;
  left: -100px;
  width: 300px;
  height: 200px;
  padding: 5px;
  background-color: #fff;
  border: 1px solid #d1d1d1;
  border-radius: 2px;
  box-shadow: 0 1px 2px 1px #d1d1d1;
}

textarea {
  box-sizing: border-box;
  padding: 0 30px;
  height: 110px;
  width: 100%;
  border: none;
  outline: none;
  font-family: 'Micrsofot Yahei';
  resize: none;
}
.send {
  position: absolute;
  bottom: 10px;
  right: 30px;
  width: 75px;
  height: 28px;
  line-height: 28px;
  box-sizing: border-box;
  text-align: center;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  background: #f5f5f5;
  font-size: 14px;
  color: #7c7c7c;
}

.send:hover {
  background: rgb(18, 150, 17);
  color: #fff;
}

.warn {
  position: absolute;
  bottom: 50px;
  right: 10px;
  width: 110px;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  text-align: center;
  border: 1px solid #bdbdbd;
  border-radius: 4px;
  box-shadow: 0 1px 5px 1px #bdbdbd;
}

.warn,
.appear-enter-active,
.appear-leave-active {
  transition: all 1s;
}

.warn,
.appear-enter,
.appear-leave-active {
  opacity: 1;
}

.warn::before {
  content: ' ';
  position: absolute;
  top: 100%;
  right: 20px;
  border: 7px solid transparent;
  border-top-color: #fff;
  filter: drop-shadow(1px 3px 2px #bdbdbd);
}
</style>
