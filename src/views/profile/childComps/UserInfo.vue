<template>
  <div id="user-info" @click="infoClick">
    <a href="javascript:;" class="clear-fix">
      <slot name="user-icon">
        <img src="~assets/img/profile/avatar.svg" class="privateImage-svg left">
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <img src="~assets/img/profile/phone.svg" class="icon-mobile">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <i class="arrow-right"></i>
    </a>
  </div>
</template>

<script>
	export default {
    name: "UserInfo",
    methods: {
      infoClick() {
        this.$toast.show('Powered by Withyooou')
      }
    }
	}
</script>

<style scoped>
  #user-info {
    background-color: var(--color-tint);
    padding: 15px;
    margin-top: -5px;
    position: relative
  }
  #user-info .privateImage-svg {
    width: 60px;
    height: 60px;
    background-color: #fff;
    border-radius: 50%;
  }
  #user-info .login-info {
    color: #fff;
    margin: 10px 0 0 15px;
  }
  #user-info .login-info .phone {
    height: 20px;
    line-height: 20px;
    font-size: 13px;
    position: relative;
    margin-top: 8px;
    margin-left: 12px;
    padding-left: 8px;
  }
  #user-info .login-info .phone .icon-mobile {
    position: absolute;
    width: 20px;
    left: -15px;
    top: 0px;
  }
  .arrow-right {
    display: inline-block;
    padding: 4px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(-45deg) translateY(-50%);
    -webkit-transform: rotate(-45deg) translateY(-50%);
    position: absolute;
    right: 15px;
    top: 50%;
  }
</style>
