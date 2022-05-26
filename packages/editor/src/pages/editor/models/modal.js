/*
 * @Description: 添加键盘快捷键
 * @Version: 2.1
 * @Autor: xuxiaoxi
 */
import { uuid } from '@/utils/tool';
import key from 'keymaster';
const LOCAL_MODAL_KEY = 'modalData';
const modals = localStorage.getItem(LOCAL_MODAL_KEY) || '[]';

function overSave(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export default {
  namespace: 'modal',
  state: {
    modals: [],
    // pointData: JSON.parse(pointData),
    // curPoint: null,
  },
  reducers: {
    addCanvas(state, { payload }) {
      // let modals = state.modals;
      state.modals.push({ ...payload, pointData: [], curPoint: null });
      // modals.push(payload);
      // return [modals];
    },
    addPointData(state, { payload }) {
      let pointData = [...state.pointData, payload];
      overSave(LOCAL_MODAL_KEY, pointData);
      return {
        ...state,
        pointData,
        curPoint: payload,
      };
    },
    addDragItem(state, { payload }) {
      const targetIdx = state.modals.findIndex((modal) => modal.id == payload.canvasId);
      console.log(state, targetIdx);
      state.modals[targetIdx].pointData.push(payload);
      state.modals[targetIdx].curPoint = payload;
      // const currentCanvas = state.modals[targetIdx]
      // let pointData = [...state.pointData, payload];
      // const newCanvas = Object.assign({},currentCanvas, payload)
      // overSave(LOCAL_MODAL_KEY, pointData);
      // return {
      //   ...state,
      //   modals: newCanvas
      // };
    },
    modPointData(state, { payload }) {
      const { id, canvasId } = payload;
      const curModalIdx = state.modals.findIndex((modal) => modal.id == canvasId);
      const curPointIdx = state.modals[curModalIdx].pointData.findIndex((point) => point.id == id);
      state.modals[curModalIdx].pointData[curPointIdx] = payload;
      state.modals[curModalIdx].curPoint = payload;
      // const pointData = state.pointData.map((item) => {
      //   if (item.id === id) {
      //     return payload;
      //   }
      //   return { ...item };
      // });
      // overSave(LOCAL_MODAL_KEY, pointData);
      // return {
      //   ...state,
      //   pointData,
      //   curPoint: payload,
      // };
    },
    importTplData(state, { payload }) {
      overSave(LOCAL_MODAL_KEY, payload);
      return {
        ...state,
        pointData: payload,
        curPoint: null,
      };
    },
    copyPointData(state, { payload }) {
      const { id } = payload;
      const pointData = [];
      state.pointData.forEach((item) => {
        pointData.push({ ...item });
        if (item.id === id) {
          pointData.push({ ...item, id: uuid(6, 10) });
        }
      });
      overSave(LOCAL_MODAL_KEY, pointData);

      return {
        ...state,
        pointData,
      };
    },
    delPointData(state, { payload }) {
      const { id } = payload;
      const pointData = state.pointData.filter((item) => item.id !== id);
      overSave(LOCAL_MODAL_KEY, pointData);
      return {
        ...state,
        pointData,
        curPoint: null,
      };
    },
    keyboardCopyPointData(state) {
      if (state.curPoint) {
        const { id } = state.curPoint;
        const pointData = [];
        state.pointData.forEach((item) => {
          pointData.push({ ...item });
          if (item.id === id) {
            pointData.push({ ...item, id: uuid(6, 10) });
          }
        });
        overSave(LOCAL_MODAL_KEY, pointData);

        return {
          ...state,
          pointData,
        };
      }
      return state;
    },
    keyboardDelPointData(state) {
      if (state.curPoint) {
        const { id } = state.curPoint;
        const pointData = state.pointData.filter((item) => item.id !== id);
        overSave(LOCAL_MODAL_KEY, pointData);
        return {
          ...state,
          pointData,
          curPoint: null,
        };
      }
      return state;
    },
    clearAll(state) {
      overSave(LOCAL_MODAL_KEY, []);
      return {
        ...state,
        pointData: [],
        curPoint: null,
      };
    },
  },
  effects: {},
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {});
    },
    keyEvent({ dispatch, state }) {
      // 复制
      // key('⌘+c, ctrl+c', () => {
      //   dispatch({
      //     type: 'modal/keyboardCopyPointData',
      //   });
      // });
      // // 删除
      // key('delete, backspace', () => {
      //   dispatch({
      //     type: 'modal/keyboardDelPointData',
      //   });
      // });
    },
  },
};
