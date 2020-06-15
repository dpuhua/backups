<template>
  <div class="header-menu">
    <el-row class="menu-wrap">
      <el-col :span="6" class="logo-wrap">
        <img
          class="logo-img"
          src="~@/assets/img/global/logo.png"
          alt="恒大宝"
        />
      </el-col>
      <el-col :span="18">
        <ul class="home-menu">
          <li class="menu-item-search">
            <search-bar></search-bar>
          </li>
          <li class="qrcode-wrap menu-item">
            下载APP
            <span class="qrcode-pop">
              <img src="~@/assets/img/home/hdb_qrcode.png" alt="恒大宝二维码" />
              <div class="qrcode-pop-text">
                <p>扫码或在应用市场</p>
                <div>下载<span class="light">恒大宝APP</span></div>
              </div>
            </span>
          </li>
          <li class="menu-item">会员专区</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import SearchBar from '~/components/common/search-bar'
export default {
  components: { SearchBar }
}
</script>
<style lang="less" scoped>
// 顶部菜单栏-首页
.header-menu {
  width: 100vw;
  height: 98px;
  background: rgba(255, 255, 255, 1);

  font-size: 22px;
  box-shadow: 0px 2px 14px 0px rgba(159, 159, 159, 0.5);
  line-height: 98px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  .menu-wrap {
    width: 1200px;
    margin: auto;
    height: 94px;
  }
  .logo-wrap {
    .logo-img {
      vertical-align: middle;
    }
  }

  .home-menu {
    border: none;
    display: flex;
    justify-content: space-between;
    .menu-item {
      flex-grow: 1;
      cursor: pointer;
      font-size: 22px;
      height: 94px;
      line-height: 94px;
      color: #44444f;
      text-align: center;
      &.is-active {
        color: #e62e37;
        border-bottom: 2px solid #e62e37;
      }
      &:hover {
        background: #e62e37;
        color: #fff;
        border-radius: 5px;
      }
    }
    .menu-item-search {
      flex-basis: 615px;
      .search-bar {
        margin-top: 20px;
        /deep/ .search-input {
          .el-input__inner {
            border: 1px solid rgba(212, 212, 212, 1);
            background: #fff;
          }
        }
      }
    }
  }
  .qrcode-wrap {
    position: relative;
    .qrcode-pop {
      display: none;
      position: absolute;
      top: 78px;
      left: calc(50% - 120px);
      .qrcode-pop-text {
        position: absolute;
        font-size: 19px;
        bottom: 70px;
        width: 100%;
        color: #44444f;
        text-align: center;
        line-height: 24px;
        font-weight: 500;
        .light {
          color: #e62e37;
        }
      }
    }
    &:hover .qrcode-pop {
      display: block;
    }
  }
  .menu-border {
    height: 4px;
    background: linear-gradient(
      220deg,
      rgba(24, 24, 120, 1) 0%,
      rgba(230, 46, 55, 1) 60%
    );
  }
}
</style>
