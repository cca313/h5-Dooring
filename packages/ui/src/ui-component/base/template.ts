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
import Modal from './Modal/template';

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
  Modal,
];
const BasicTemplate = basicTemplate.map((v) => {
  return { ...v, category: 'base' };
});

export default BasicTemplate;
