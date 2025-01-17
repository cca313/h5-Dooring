import type {
  IColorConfigType,
  INumberConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TTextDefaultType,
} from '@/components/FormComponents/types';
// export type TLongTextSelectKeyType = 'left' | 'center' | 'right';

export type TModalEditData = (
  | ITextConfigType
  | IColorConfigType
  | INumberConfigType
  // | ISelectConfigType<TLongTextSelectKeyType>
  | ISwitchConfigType
)[];
export interface IModalConfig {
  title: TTextDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  // indent: TNumberDefaultType;
  // lineHeight: TNumberDefaultType;
  // textAlign: TSelectDefaultType<TLongTextSelectKeyType>;
  bgColor: TColorDefaultType;
  // padding: TNumberDefaultType;
  // radius: TNumberDefaultType;
}

export interface IModalSchema {
  editData: TModalEditData;
  config: IModalConfig;
}

const Modal: IModalSchema = {
  editData: [
    {
      key: 'defaultShow',
      name: '默认打开',
      type: 'Switch',
    },
    {
      key: 'title',
      name: '标题',
      type: 'Text',
    },
    {
      key: 'titleColor',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'showBtnCancel',
      name: '展示取消按钮',
      type: 'Switch',
    },
    {
      key: 'showBtnConfirm',
      name: '展示确认按钮',
      type: 'Switch',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    // {
    //   key: 'indent',
    //   name: '首行缩进',
    //   type: 'Number',
    //   range: [0, 100],
    // },
    // {
    //   key: 'textAlign',
    //   name: '对齐方式',
    //   type: 'Select',
    //   range: [
    //     {
    //       key: 'left',
    //       text: '左对齐',
    //     },
    //     {
    //       key: 'center',
    //       text: '居中对齐',
    //     },
    //     {
    //       key: 'right',
    //       text: '右对齐',
    //     },
    //   ],
    // },
    // {
    //   key: 'lineHeight',
    //   name: '行高',
    //   type: 'Number',
    //   step: 0.1,
    // },
    {
      key: 'bgColor',
      name: '背景颜色',
      type: 'Color',
    },
    // {
    //   key: 'padding',
    //   name: '填充间距',
    //   type: 'Number',
    // },
    // {
    //   key: 'radius',
    //   name: '背景圆角',
    //   type: 'Number',
    // },
  ],
  config: {
    title: '弹窗标题',
    color: 'rgba(60,60,60,1)',
    fontSize: 14,
    // indent: 20,
    // lineHeight: 1.8,
    // textAlign: 'left',
    bgColor: 'rgba(255,255,255,0)',
    // padding: 0,
    // radius: 0,
  },
};

export default Modal;
