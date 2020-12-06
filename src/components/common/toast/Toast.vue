<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      message: '',
      timer: null
    }
  },
  methods: {
    show(message='Toast Message', duration=1500) {
      // duration = duration || 1500
      this.isShow = true;
      this.message = message;
      if(this.timer) clearTimeout(this.timer)
      
      this.timer = setTimeout(() => {
        this.isShow = false;
      }, duration)
    }
  }
}
</script>

<style scoped>
  .toast {
    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    position: fixed;
    top: 75%;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 8px 12px;
    border-radius: 4px;
    z-index: 9999;
  }
</style>
