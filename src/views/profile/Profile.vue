<template>
  <div id="profile">
    <!-- 导航栏部分 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>菜鸟商城</div> 
      </template>
    </nav-bar>

    <scroll class="scroll-wrapper" ref="scroll">
      <!-- 用户头像部分 -->
      <user-info></user-info>

      <!-- 账户余额部分 -->
      <div class="account">
        <div class="account-item">
          <div class="number">
            <span class="balance">0.00</span>元
          </div>
          <div class="account-info">我的余额</div>
        </div>
        <div class="account-item">
          <div class="number">
            <span class="balance">0</span>个
          </div>
          <div class="account-info">我的优惠</div>
        </div>
        <div class="account-item">
          <div class="number">
            <span class="balance">0</span>分
          </div>
          <div class="account-info">我的积分</div>
        </div>
      </div>

      <!-- 选项栏部分 -->
      <div class="order-list">
        <div class="list-item">
          <img src="~assets/img/profile/message.svg" alt="">
          <span>我的消息</span>
        </div>
        <div class="list-item">
          <img src="~assets/img/profile/shopping.svg" alt="">
          <span>积分商城</span>
        </div>
        <div class="list-item">
          <img src="~assets/img/profile/vip.svg" alt="">
          <span>会员卡</span>
        </div>
      </div>

      <div class="service-list">
        <div class="list-item">
          <img src="~assets/img/profile/car.svg" alt="">
          <span>我的购物车</span>
        </div>
        <div class="list-item">
          <img src="~assets/img/profile/pointer.svg" alt="">
          <span>下载购物APP</span>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from '../../components/common/scroll/Scroll' 

	export default {
		name: "Profile",
    components: {
      NavBar,
      UserInfo,
      Scroll
    },
    activated() {
      this.$refs.scroll.refresh()
    }
	}
</script>

<style scoped>
  #profile {
    background-color: #f2f2f2;
    height: 100vh;
    display: flex;
    flex-flow: column wrap;
  }
  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
  .account {
    display: flex;
    flex-flow: row nowrap;
    background-color: #fff;
  }
  .account-item {
    flex: 1;
    color: #666;
    font-size: 13px;
    padding: 18px;
    text-align: center;
    border-right: 1px solid #F2F2F2;
  }
  .account > .account-item:last-child {
    border: 0;
  }
  .account-item .balance {
    font-size: 24px;
    font-weight: 700;
    color: #ff5f3e;
  }
  .account-info {
    margin-top: 6px;
  }
  .order-list, .service-list {
    margin-top: 12px;
    background-color: #fff;
  }
  .service-list {
    flex: 1;
  }
  .list-item {
    font-size: 16px;
    height: 44px;
    line-height: 44px;
    border-bottom: 1px solid #F2F2F2;
    padding: 0 10px;
  }
  .list-item img {
    width: 28px;
    margin-right: 8px;
    vertical-align: middle;
  }
  .scroll-wrapper {
    width: 100%;
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
