const decode = unescape
// const encode = encodeURIComponent
const pairSplitRegExp = /; */

function tryDecode(str, decode) {
  try {
    return decode(str)
  } catch (e) {
    return str
  }
}

function parseCookie(str = '', options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string')
  }

  const obj = {}
  const opt = options || {}
  const pairs = str.split(pairSplitRegExp)
  const dec = opt.decode || decode

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i]
    let eq_idx = pair.indexOf('=')

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue
    }

    const key = pair.substr(0, eq_idx).trim()
    let val = pair.substr(++eq_idx, pair.length).trim()

    // quoted values
    if (val[0] == '"') {
      val = val.slice(1, -1)
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec)
    }
  }

  return obj
}

function setCookie(name, value) {
  const days = 30
  const exp = new Date()
  exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString()
}

function getCookie(name) {
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  const arr = document.cookie.match(reg)
  return arr ? unescape(arr[2]) : null
}

function removeCookie(name) {
  const exp = new Date()
  exp.setTime(exp.getTime() - 1)
  const cval = getCookie(name)
  if (cval != null)
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
}

export default {
  parse: parseCookie,
  set: setCookie,
  get: getCookie,
  remove: removeCookie
}
