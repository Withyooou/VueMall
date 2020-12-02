<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>
  .nav-bar {
    display: flex;
    flex-flow: row nowrap;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100,100,100,.1);;
  }
  .left,
  .right {
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .center {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
</style>
