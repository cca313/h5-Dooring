import { Button, Divider, Tabs, Form, Modal, Input } from 'antd';
import { ReactEventHandler, useRef, useState } from 'react';
import TargetBox from '../../TargetBox';
import CONSTANTS from '@/utils/CONSTANTS';
import styles from './index.less';
import ModalBox from '../../ModalBox';
import { CloseOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector } from 'umi';

const { TabPane } = Tabs;

interface ICanvasTabsProps {
  // activeCanvas: string;
  // allType: string[];
  setModalVisible: (visible: boolean) => void;
  activeCanvas: string;
  setActiveCanvas: (idx: any) => void;
  setModalValues: (values: any) => void;
}

const CanvasSwitcher = (props: ICanvasTabsProps) => {
  const { setModalVisible, activeCanvas, setActiveCanvas, setModalValues } = props;
  const modalTabs = useSelector((state: any) => state.present.modal.modals);
  // console.log(modalTabs);
  const handleBtnAddClick = () => {
    setModalValues({
      name: '',
      title: '',
      visible: true,
      btnCancelVisible: true,
      btnConfirmVisible: true,
    });
    setTimeout(() => setModalVisible(true), 100);
  };
  const handleBtnTabClick = (id: string) => {
    if (id === activeCanvas) return;
    setActiveCanvas(id);
  };
  const handleBtnEditClick = (modalId: string, e: any) => {
    // console.log(modalId, e);
    e.stopPropagation();
    // e.preventDefault();
    const activeCanvasConfig =
      modalTabs[modalTabs.findIndex((modal: any) => modal.id == modalId)].config;
    console.log(activeCanvasConfig);
    setModalValues({ ...activeCanvasConfig, mode: 'edit', id: modalId });
    setTimeout(() => setModalVisible(true), 100);
    // setModalVisible()
    // console.log(1);
  };
  const handleBtnDelClick = (e: any) => {
    e.stopPropagation();
    // e.preventDefault();
    console.log(2);
  };
  return (
    <div className={styles.buttonsBox}>
      {/* <Tabs
        type="editable-card"
        onChange={onChange}
        tabPosition={'left'}
        activeKey={activeKey}
        onEdit={onEdit}
      >
        <TabPane tab="默认页面" key="1" closable={false}>
          <TargetBox
            dragState={dragstate}
            setDragState={setDragState}
            scaleNum={CONSTANTS.CANVAS_SCALE_NUM}
            canvasId={'default_canvas'}
            allType={allType}
          />
        </TabPane>
        {panes.map((pane, i) => (
          <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
            <ModalBox
              dragState={dragstate}
              setDragState={setDragState}
              scaleNum={CONSTANTS.CANVAS_SCALE_NUM}
              canvasId={`modal-canvas-${i}`}
              allType={allType}
            />
          </TabPane>
        ))}
      </Tabs> */}
      <span className={styles.title}>弹窗设置</span>
      <Button icon={<PlusOutlined />} onClick={handleBtnAddClick}>
        新增
      </Button>
      <Divider className={styles.divider} />
      <Button
        className={styles.gap}
        type={activeCanvas == 'default_canvas' ? 'primary' : 'default'}
        onClick={() => handleBtnTabClick('default_canvas')}
      >
        默认页面
      </Button>
      {modalTabs.length > 0 &&
        modalTabs.map((modal: any) => {
          return (
            <Button
              className={[styles.gap, styles.btnTab].join(' ')}
              type={activeCanvas == modal.id ? 'primary' : 'default'}
              onClick={() => handleBtnTabClick(modal.id)}
            >
              <div className={styles.contetBox}>
                <span onClick={(e) => handleBtnEditClick(modal.id, e)}>
                  <EditOutlined />
                </span>
                <span style={{ marginLeft: 10 }}>
                  <CloseOutlined onClick={() => handleBtnDelClick(modal.id)} />
                </span>
                <Divider type="vertical"></Divider>
                <span>{modal.config.name}</span>
              </div>
            </Button>
          );
        })}
    </div>
  );
};

export default CanvasSwitcher;
