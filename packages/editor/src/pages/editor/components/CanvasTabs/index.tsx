import { Button, Divider, Tabs, Form, Modal, Input } from 'antd';
import { useRef, useState } from 'react';
import TargetBox from '../../TargetBox';
import CONSTANTS from '@/utils/CONSTANTS';
import styles from './index.less';
import ModalBox from '../../ModalBox';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

interface ICanvasSwitcherProps {
  // activeCanvas: string;
  allType: string[];
}

const CanvasSwitcher = (props: ICanvasSwitcherProps) => {
  const { allType } = props;
  const [isModalVisible, setModalShow] = useState(false);
  const [form] = Form.useForm();
  const handleAddModal = () => {
    setModalShow(true);
  };
  const handleModalConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        // form.resetFields();
        // onCreate(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  const handleModalCancel = () => {
    setModalShow(false);
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
      <Button icon={<PlusOutlined />} onClick={handleAddModal}>
        新增
      </Button>
      <Divider className={styles.divider} />
      <Button type="primary">默认页面</Button>
      <Modal
        title="新增弹窗"
        okText="确认"
        cancelText="取消"
        visible={isModalVisible}
        onOk={handleModalConfirm}
        onCancel={handleModalCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: 'public' }}
        >
          <Form.Item
            name="name"
            label="弹窗名称"
            rules={[{ required: true, message: '请输入弹窗名称' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CanvasSwitcher;
