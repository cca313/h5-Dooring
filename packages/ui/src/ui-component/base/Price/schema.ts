import type {
  IColorConfigType,
  INumberConfigType,
  ISwitchConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TTextDefaultType,
  ISelectConfigType,
} from '@/components/FormComponents/types';
export type TPriceSelectKeyType = 'left' | 'center' | 'right';
export type TPriceEditData = (
  | ITextConfigType
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TPriceSelectKeyType>
  // | ISelectConfigType<TLongTextSelectKeyType>
  | ISwitchConfigType
)[];
export interface IPriceConfig {
  text: TTextDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  // indent: TNumberDefaultType;
  lineHeight: TNumberDefaultType;
  textAlign: TPriceSelectKeyType;
  // bgColor: TColorDefaultType;
  // padding: TNumberDefaultType;
  // radius: TNumberDefaultType;
}

export interface IPriceSchema {
  editData: TPriceEditData;
  config: IPriceConfig;
}

const Price: IPriceSchema = {
  editData: [
    {
      key: 'text',
      name: '价格',
      type: 'Text',
    },
    {
      key: 'color',
      name: '字体颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'textAlign',
      name: '对齐方式',
      type: 'Select',
      range: [
        {
          key: 'left',
          text: '左对齐',
        },
        {
          key: 'center',
          text: '居中对齐',
        },
        {
          key: 'right',
          text: '右对齐',
        },
      ],
    },
    {
      key: 'lineHeight',
      name: '行高',
      type: 'Number',
      step: 0.1,
    },
    // {
    //   key: 'bgColor',
    //   name: '背景颜色',
    //   type: 'Color',
    // },
  ],
  config: {
    text: '100',
    color: 'rgba(60,60,60,1)',
    fontSize: 14,
    // indent: 20,
    lineHeight: 1.8,
    textAlign: 'left',
    // bgColor: 'rgba(255,255,255,0)',
    // padding: 0,
    // radius: 0,
  },
};

export default Price;
