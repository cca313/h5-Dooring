import { BasicTemplateItem } from './schema';

export type TemplateKeyType =
  | 'Text'
  | 'LongText'
  | 'Carousel'
  | 'Tab'
  | 'Notice'
  | 'Qrcode'
  | 'Icon'
  | 'Image'
  | 'Header'
  | 'List'
  | 'Footer';

export type TemplateType = Array<BasicTemplateItem<TemplateKeyType>>;

const template: TemplateType = [
  {
    type: 'Text',
    h: 20,
  },
  {
    type: 'LongText',
    h: 36,
  },
  {
    type: 'Carousel',
    h: 82,
  },
  {
    type: 'Tab',
    h: 130,
  },
  {
    type: 'Notice',
    h: 20,
  },
  {
    type: 'Qrcode',
    h: 150,
  },
  {
    type: 'Icon',
    h: 23,
  },
  {
    type: 'Image',
    h: 188,
  },
  {
    type: 'Header',
    h: 28,
  },
  {
    type: 'List',
    h: 110,
  },
  {
    type: 'Footer',
    h: 24,
  },
];

export default template;
