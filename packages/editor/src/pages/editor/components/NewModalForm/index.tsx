import { uuid } from '@/utils/tool';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'umi';

interface IModalForm {
  title?: string;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  showCancel?: boolean;
  showConfirm?: boolean;
}

const ModalForm = (props: IModalForm) => {
  const { visible, setVisible, title } = props;
  // const [isModalVisible, setModalShow] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleModalConfirm = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        dispatch({
          type: 'modal/addCanvas',
          payload: {
            id: uuid(6, 10),
            config: values,
          },
        });
        setVisible(false);
        setLoading(false);
        // form.resetFields();
        // onCreate(values);
      })
      .catch((info) => {
        setLoading(false);
        console.log('Validate Failed:', info);
      });
  };
  const handleModalCancel = () => {
    setVisible(false);
  };
  const renderFooter = () => {
    return (
      <div>
        <Button onClick={handleModalCancel}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleModalConfirm}>
          确认
        </Button>
      </div>
    );
  };
  return (
    <Modal title={title || '新增弹窗'} visible={visible} footer={renderFooter()} destroyOnClose>
      <Form form={form} layout="vertical" name="form_in_modal" preserve={false}>
        <Form.Item
          name="name"
          label="弹窗名称"
          rules={[{ required: true, message: '请输入弹窗名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="title" label="弹窗标题">
          <Input />
        </Form.Item>
        <Form.Item name="visible" label="默认显示(进入页面就显示)">
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Form.Item>
        <Form.Item name="btnCancelVisible" label="显示取消按钮">
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Form.Item>
        <Form.Item name="btnConfirmVisible" label="显示确认按钮">
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
