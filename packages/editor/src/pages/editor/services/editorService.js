import req from '@/utils/req'
import $axios from 'axios'
const API_DOMAIN = 'http://testadver.hxledu.com'
export function getTemplate(data) {
  return req('/test', { method: 'GET', params: data })
}

export function getCanvasData(canvasId) {
  return $axios.get()
}

export function AddOrUpdateCanvas(data) {
  return $axios.post(`${API_DOMAIN}/plat/adver-core/pc/pxMarket/addMarketPage`,data)
} 