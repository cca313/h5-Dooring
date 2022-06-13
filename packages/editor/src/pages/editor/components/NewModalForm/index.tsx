import { uuid } from '@/utils/tool';
import { Modal, Form, Input, Switch, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'umi';

interface IModalForm {
  title?: string;
  visible: boolean;
  initialValues: any;
  setVisible: (visible: boolean) => void;
  showCancel?: boolean;
  showConfirm?: boolean;
}

const ModalForm = (props: IModalForm) => {
  const [form] = Form.useForm();
  const { visible, setVisible, title, initialValues } = props;
  // const [isModalVisible, setModalShow] = useState(false);
  console.log(initialValues);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('effect');
    form.resetFields();
  }, [initialValues]);

  const handleModalConfirm = () => {
    setLoading(true);
    form
      .validateFields()
      .then((values) => {
        const { mode = 'add', id = null } = initialValues;
        // console.log(values);
        if (mode == 'add') {
          dispatch({
            type: 'modal/addCanvas',
            payload: {
              id: uuid(6, 10),
              config: values,
            },
          });
        } else {
          dispatch({
            type: 'modal/updateCanvasConfig',
            payload: { config: values, id },
          });
          // console.log(values);
        }
        setVisible(false);
        setLoading(false);
        form.resetFields();
        // onCreate(values);
      })
      .catch((info) => {
        setLoading(false);
        form.resetFields();
        console.log('Validate Failed:', info);
      });
  };
  const handleModalCancel = () => {
    form.resetFields();
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
  /* 弹窗中的表单 */
  /* preserve forcerender effect中resetfields */
  return (
    <Modal title={title || '新增弹窗'} visible={visible} forceRender footer={renderFooter()} onCancel={handleModalCancel} >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={initialValues}
        preserve={false}
      >
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
        <Form.Item name="visible" label="默认显示(进入页面就显示)" valuePropName="checked">
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Form.Item>
        <Form.Item name="btnCancelVisible" label="显示取消按钮" valuePropName="checked">
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Form.Item>
        <Form.Item name="btnConfirmVisible" label="显示确认按钮" valuePropName="checked">
          <Switch checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
