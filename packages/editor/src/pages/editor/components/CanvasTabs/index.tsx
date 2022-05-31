/*
 * @Author: Gavin Chan
 * @Date: 2022-05-24 10:21:28
 * @LastEditors: Gavin
 * @LastEditTime: 2022-05-31 14:40:17
 * @FilePath: \legao\packages\editor\src\pages\editor\components\CanvasTabs\index.tsx
 * @Descriptions: todo
 */
import { Button, Divider, Tabs, Form, Modal, Input, Popconfirm, Tooltip } from 'antd';
import { ReactEventHandler, useRef, useState } from 'react';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'umi';
import classnames from 'classnames';
import TargetBox from '../../TargetBox';
import CONSTANTS from '@/utils/CONSTANTS';
import styles from './index.less';
import ModalBox from '../../ModalBox';

const classes = classnames.bind(styles);
interface ICanvasTabsProps {
  setModalVisible: (visible: boolean) => void;
  activeCanvas: string;
  setActiveCanvas: (idx: any) => void;
  setModalValues: (values: any) => void;
}

const CanvasSwitcher = (props: ICanvasTabsProps) => {
  const { setModalVisible, activeCanvas, setActiveCanvas, setModalValues } = props;
  const modalTabs = useSelector((state: any) => state.present.modal.modals);
  // console.log(modalTabs);
  const dispatch = useDispatch();
  const handleBtnAddClick = () => {
    setModalValues({
      name: '',
      title: '',
      visible: true,
      btnCancelVisible: true,
      btnConfirmVisible: true,
    });
    setModalVisible(true);
    // setTimeout(() => setModalVisible(true), 100);
  };
  const handleBtnTabClick = (id: string) => {
    if (id === activeCanvas) return;
    setActiveCanvas(id);
  };
  const handleBtnEditClick = (modalId: string, e: any) => {
    e.stopPropagation();
    const activeCanvasConfig =
      modalTabs[modalTabs.findIndex((modal: any) => modal.id == modalId)].config;
    console.log(activeCanvasConfig);
    setModalValues({ ...activeCanvasConfig, mode: 'edit', id: modalId });
    setModalVisible(true);
    // setTimeout(() => setModalVisible(true), 100);
  };
  const handleBtnDelClick = (modalId: string) => {
    dispatch({
      type: 'modal/deleteModalCanvas',
      payload: { id: modalId },
    });
  };
  return (
    <div className={styles.buttonsBox}>
      <span className={styles.title}>弹窗设置</span>
      <Button icon={<PlusOutlined />} onClick={handleBtnAddClick}>
        新增
      </Button>
      <Divider className={styles.divider} />
      <div
        className={classes({
          [styles.gap]: true,
          [styles.btnTab]: true,
          [styles.btnTabActive]: activeCanvas == 'default_canvas',
        })}
        // type={activeCanvas == 'default_canvas' ? 'primary' : 'default'}
        onClick={() => handleBtnTabClick('default_canvas')}
      >
        默认页面
      </div>
      {modalTabs.length > 0 &&
        modalTabs.map((modal: any, i: any) => {
          return (
            <div
              key={`${modal.id}-${i}`}
              className={classes({
                [styles.gap]: true,
                [styles.btnTab]: true,
                [styles.btnTabActive]: activeCanvas == modal.id,
              })}
            >
              <span onClick={(e) => handleBtnEditClick(modal.id, e)}>
                <EditOutlined />
              </span>
              <span className={styles.btnDel}>
                <Popconfirm
                  title="是否确认删除"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={() => handleBtnDelClick(modal.id)}
                >
                  <CloseOutlined />
                </Popconfirm>
              </span>
              <Divider type="vertical"></Divider>
              <Tooltip placement="topLeft" title={modal.config.name}>
                <span onClick={() => handleBtnTabClick(modal.id)}>{modal.config.name}</span>
              </Tooltip>
            </div>
          );
        })}
    </div>
  );
};

export default CanvasSwitcher;
