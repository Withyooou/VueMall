<template>
  <div class="icon-selector" :class="{'selector-active': isChecked}">
    <img src="~/assets/img/car/tick.svg" alt="">
  </div>
</template>

<script>
	export default {
		name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: true
      }
    }
	}
</script>

<style scoped>
  .icon-selector {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    overflow: hidden;
  }
  .icon-selector img {
    width: 14px;
  }
  .selector-active {
    background-color: #ff8198;
    border-color: #ff8198;
  }
</style>
