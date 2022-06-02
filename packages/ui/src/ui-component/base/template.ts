/*
 * @Author: Gavin Chan
 * @Date: 2022-05-20 16:03:56
 * @LastEditors: Gavin
 * @LastEditTime: 2022-06-02 10:14:11
 * @FilePath: \legao\packages\ui\src\ui-component\base\template.ts
 * @Descriptions: todo
 */
import Carousel from './Carousel/template';
import Form from './Form/template';
import Header from './Header/template';
import Icon from './Icon/template';
import Image from './Image/template';
import List from './List/template';
import LongText from './LongText/template';
import Notice from './Notice/template';
import Qrcode from './Qrcode/template';
import Tab from './Tab/template';
import Text from './Text/template';
import WhiteTpl from './WhiteTpl/template';
import RichText from './RichText/template';
import Price from './Price/template';
import Button from './Button/template';
// import Modal from './Modal/template';

const basicTemplate = [
  Carousel,
  Form,
  Header,
  Icon,
  Image,
  List,
  LongText,
  Notice,
  Qrcode,
  Tab,
  Text,
  WhiteTpl,
  RichText,
  Price,
  Button,
  // Modal,
];
const BasicTemplate = basicTemplate.map((v) => {
  return { ...v, category: 'base' };
});

export default BasicTemplate;
