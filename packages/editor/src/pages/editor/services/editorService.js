import req from '@/utils/req';
import $axios from 'axios';
// const API_DOMAIN = 'http://testadver.hxledu.com'

export function getTemplate(data) {
  return req('/test', { method: 'GET', params: data });
}

export function getCanvasData(canvasId) {
  return req(`/adver-core/pc/pxMarket/getMarketPageInfo`, { params: { pageId: canvasId } });
}

export function AddOrUpdateCanvas(data) {
  return req(`/adver-core/pc/pxMarket/addMarketPage`, data);
}
