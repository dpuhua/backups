<template>
  <div id="map" :style="mapStyle"></div>
</template>

<script>
import { MapLib } from '@/utils/BMapLib'

export default {
  props: {
    // eslint-disable-next-line vue/require-default-prop
    mapData: {
      type: Object,
      // 地图在该视图上的高度
      mapHeight: {
        type: Number,
        default: 600
      },
      // 经度
      longitude: {
        type: Number,
        default: 113.845282
      },
      // 纬度
      latitude: {
        type: Number,
        default: 22.613041
      },
      title: {
        type: String,
        default: '1'
      },
      description: {
        type: String,
        default: '1'
      }
    }
  },
  data() {
    return {
      mapStyle: {
        width: '100%',
        height: '100%'
      }
    }
  },

  mounted() {
    window.onBMapCallback = () => {
      MapLib().then((BMapLib) => {
        const map = new BMap.Map('map')
        const point = new BMap.Point(
          this.mapData.longitude,
          this.mapData.latitude
        )
        const marker = new BMap.Marker(point) // 创建标注
        map.enableScrollWheelZoom() // 启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom() // 启用地图惯性拖拽，默认禁用
        map.addOverlay(marker) // 将标注添加到地图中
        map.centerAndZoom(point, 15)
        map.enableScrollWheelZoom(true)
        const top_left_navigation = new BMap.NavigationControl() // 左上角，添加默认缩放平移控件
        map.addControl(top_left_navigation)
        const content =
          '<div style="margin:0;line-height:20px;padding:2px;">' +
          '地址：' +
          this.mapData.address +
          '<br/>电话：' +
          this.mapData.tel +
          '<br/>简介：' +
          this.mapData.description +
          '</div>'
        let searchInfoWindow = null
        searchInfoWindow = new BMapLib.SearchInfoWindow(map, content, {
          title: this.mapData.title, // 标题
          width: 290, // 宽度
          height: 105, // 高度
          panel: 'panel', // 检索结果面板
          enableAutoPan: true, // 自动平移
          searchTypes: [
            // eslint-disable-next-line no-undef
            BMAPLIB_TAB_SEARCH, // 周边检索
            // eslint-disable-next-line no-undef
            BMAPLIB_TAB_TO_HERE, // 到这里去
            // eslint-disable-next-line no-undef
            BMAPLIB_TAB_FROM_HERE // 从这里出发
          ]
        })
        searchInfoWindow.open(marker)
        marker.addEventListener('click', function() {
          searchInfoWindow.open(marker)
        })
      })
    }
  },
  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css'
        }
      ],
      script: [
        {
          src:
            'http://api.map.baidu.com/api?v=2.0&ak=R0bgsowGrq3ElavVQTGSta90&callback=onBMapCallback'
        }
      ]
    }
  }
}
</script>

<style scoped>
#map {
  height: 500px;
  width: 100%;
  overflow: hidden;
}

dl,
dt,
dd,
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
}
dt {
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px dotted #000;
  padding: 5px 0 5px 5px;
  margin: 5px 0;
}
dd {
  padding: 5px 0 0 5px;
}
li {
  line-height: 28px;
}
</style>
