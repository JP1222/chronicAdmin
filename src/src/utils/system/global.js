export default class SocketService {
  static instance = null
  static get Instance() {
    if (!this.instance) {
      this.instance = new SocketService()
    }
    return this.instance
  }
  // 和服务端连接的socket对象
  ws = null
  // 标识是否连接成功
  connected = false
  // 记录重试的次数
  sendRetryCount = 0
  // 重新连接尝试的次数
  connectRetryCount = 0
  //  定义连接服务器的方法
  connect(uID) {
    // 连接服务器
    if (!window.WebSocket) {
      return console.log('您的浏览器不支持WebSocket')
    }
    if (!this.ws) {
      let url = `wss://www.aikeyunkang.top:8081/websocket/server/doctor/${uID}`
      this.ws = new WebSocket(url)
      // 连接成功的事件
      this.ws.onopen = () => {
        console.log('连接服务端成功了')
        this.connected = true
        // 重置重新连接的次数
        this.connectRetryCount = 0
      }
      // 1.连接服务端失败
      // 2.当连接成功之后, 服务器关闭的情况
      this.ws.onclose = () => {
        console.log('连接服务端失败')
        this.connected = false
        this.connectRetryCount++
        setTimeout(() => {
          this.connect()
        }, 500 * this.connectRetryCount)
      }
      // 得到服务端发送过来的数据
      this.ws.onmessage = (msg) => {
        console.log('sotre', this)
        console.log(msg, '从服务端获取到了数据')
      }
    } else {
      console.log('服务器已连接')
    }
  }

  // 发送数据的方法
  send(data) {
    // 判断此时此刻有没有连接成功
    if (this.connected) {
      this.sendRetryCount = 0
      try {
        console.log('send msg', data)
        this.ws.send(JSON.stringify(data))
      } catch (e) {
        this.ws.send(data)
      }
    } else {
      this.sendRetryCount++
      setTimeout(() => {
        this.send(data)
      }, this.sendRetryCount * 500)
    }
  }

  close() {
    if (!this.ws) {
      console.log('您还没有连接!')
    } else {
      console.log('已断开连接!')

      this.ws.close()
    }
  }
}
