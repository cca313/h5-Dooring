import { Form, Input, Button, Checkbox } from 'antd';
import http from '@/utils/req';
import { history } from 'umi';
import styles from './index.less';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

const Login = (props) => {
  const onFinish = values => {
    http.post('/login', {...values}).then(res => {
      localStorage.setItem('token', res.token)
      localStorage.setItem('user', values.username)
      history.push('/')
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.loginWrap}>
      <Form
        {...layout}
        name="login"
        className={styles.formWrap}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className={styles.tit}>Doring开放平台<span style={{marginLeft: '20px',fontSize: '18px',color: '#06c'}}>登录</span></div>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button block onClick={() => props.history.push(`/editor?tid=${props.location.query.tid}`)}>
            直接使用
          </Button>
        </Form.Item>
    </Form>
    </div>
    
  );
};

export default Login
