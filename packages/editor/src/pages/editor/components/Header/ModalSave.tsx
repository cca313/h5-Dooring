import { Form, Input, Modal, Radio } from "antd"

interface IModalSaveFormProps {
  visible: boolean;
  onConfirm: (values: any) => void;
  onCancel: () => void;
}

const ModalSaveForm: React.FC<IModalSaveFormProps> = ({
  visible,
  onConfirm,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="是否保存"
      okText="确认"
      cancelText="取消"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onConfirm(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_save_template"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="courseName"
          label="课程名称"
          rules={[{ required: true, message: '请输入课程名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="pageName" label="页面名称" rules={[{ required: true, message: '请输入课程名称' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="coursePrice" label="课程价格" rules={[{ required: true, message: '请输入课程名称' }]}>
          <Input type="number" />
        </Form.Item>
        <Form.Item name="courseType" label="课程类型" rules={[{ required: true, message: '请输入课程名称' }]}>
          <Radio.Group>
            <Radio value={1}>付费</Radio>
            <Radio value={0}>免费</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalSaveForm