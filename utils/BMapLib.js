/**
 * 异步加载百度地图插件 SearchInfoWindow
 * @returns {Promise<unknown>}
 * @constructor
 */

export function MapLib() {
  return new Promise((resolve, reject) => {
    // window.onload = function() {
    //   resolve(BMapLib)
    // }
    const map = document.createElement('script')
    map.type = 'text/javascript'
    map.src =
      'http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js'
    map.onerror = reject
    document.head.appendChild(map)
    map.onload = function() {
      resolve(BMapLib)
    }
  })
}
