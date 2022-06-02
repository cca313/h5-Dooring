/*
 * @Author: Gavin Chan
 * @Date: 2022-06-01 15:40:55
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-02 11:07:36
 * @FilePath: \legao\packages\ui\src\ui-component\base\Button\schema.ts
 * @Descriptions: todo
 */
import type {
  IColorConfigType,
  INumberConfigType,
  ISelectConfigType,
  ITextConfigType,
  TColorDefaultType,
  TNumberDefaultType,
  TSelectDefaultType,
  TTextDefaultType,
} from '@/components/FormComponents/types';

export type TTextAlignSelectKeyType = 'left' | 'right' | 'center';
export type TButtonPositionType = 'top' | 'bottom';
export type TButtonEditData = (
  | ITextConfigType
  | IColorConfigType
  | INumberConfigType
  | ISelectConfigType<TTextAlignSelectKeyType>
  | ISelectConfigType<TButtonPositionType>
)[];
export interface IButtonConfig {
  text: TTextDefaultType;
  url: TTextDefaultType;
  bgColor: TColorDefaultType;
  color: TColorDefaultType;
  fontSize: TNumberDefaultType;
  align: TSelectDefaultType<TTextAlignSelectKeyType>;
  lineHeight: TNumberDefaultType;
  position: TSelectDefaultType<TButtonPositionType>;
}

export interface IButtonSchema {
  editData: TButtonEditData;
  config: IButtonConfig;
}
const Button: IButtonSchema = {
  editData: [
    {
      key: 'text',
      name: '文字',
      type: 'Text',
    },
    {
      key: 'url',
      name: '跳转地址',
      type: 'Text',
    },
    {
      key: 'bgColor',
      name: '背景颜色',
      type: 'Color',
    },
    {
      key: 'color',
      name: '标题颜色',
      type: 'Color',
    },
    {
      key: 'fontSize',
      name: '字体大小',
      type: 'Number',
    },
    {
      key: 'align',
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
      key: 'position',
      name: '定位',
      type: 'Select',
      range: [
        {
          key: 'top',
          text: '吸顶',
        },
        {
          key: 'bottom',
          text: '吸底',
        },
      ],
    },
    {
      key: 'lineHeight',
      name: '行高',
      type: 'Number',
    },
  ],
  config: {
    text: '我是按钮',
    url: '',
    bgColor: 'rgba(228,65,65,1)',
    color: 'rgba(60,60,60,1)',
    fontSize: 18,
    align: 'center',
    lineHeight: 2,
    position: 'bottom',
  },
};
export default Button;
