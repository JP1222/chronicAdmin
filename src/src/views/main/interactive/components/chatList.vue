<!-- 聊天列表 -->
<template>
  <div class="msglist">
    <ul class="ul">
      <li
        v-for="(item, index) in chatList"
        :key="index"
        @click="handleSelect(item)"
        class="sessionlist"
        :class="{ active: item.toUid === aId, isOnline: item.isOnline }"
      >
        <div class="list-left">
          <img
            class="avatar"
            width="42"
            height="42"
            :alt="item.name"
            src="./emptyUser.png"
          />
          <!-- :src="
              item.avator ? item.avatar : '@/assets/emptyUser.png'
            " -->
        </div>
        <div class="list-right">
          <div class="dot"></div>
          <div class="name">{{ item.name }}</div>
          <span class="time">{{ aId }}</span>
          <p class="lastmsg">
            {{ item.latestMessage }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aId: 1
    }
  },
  computed: {
    // ...mapState(['selectId', 'searchText']),
    chatList() {
      const list = this.$store.getters['chat/chatList']
      console.log(list)
      return list
    },
    selectId() {
      const selectid = this.$store.getters['chat/selectId']
      this.aId = selectid
      return selectid
    }
  },
  methods: {
    handleSelect(item) {
      this.$store.dispatch('chat/selectSession', item)
      this.$store.commit('chat/SETLOADING', true)
      this.aId = item.toUid
    }
  }
}
</script>

<style lang="scss" scoped>
.msglist {
  height: 60vh;
  overflow-y: auto;
}
.isOnline {
  background-color: rgb(10, 219, 150);
}

.ul {
  padding: 0;
}

.sessionlist {
  display: flex;
  padding: 12px;
  transition: background-color 0.1s;
  font-size: 0;
  // pointer-events: none;
  user-select: none;
}

.sessionlist:hover {
  background-color: rgb(220, 220, 220);
}

.active {
  background-color: #c4c4c4;
}

.avatar {
  border-radius: 2px;
  margin-right: 12px;
}

.list-right {
  position: relative;
  flex: 1;
}

.name {
  display: inline-block;
  vertical-align: text-top;
  font-size: 14px;
}

.time {
  float: right;
  color: #999;
  font-size: 10px;
  vertical-align: top;
  margin-top: 10px;
}

.lastmsg {
  position: absolute;
  font-size: 12px;
  width: 130px;
  height: 15px;
  line-height: 15px;
  color: #999;
  bottom: -6px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.dot {
  float: right;
  background-color: red;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
</style>
