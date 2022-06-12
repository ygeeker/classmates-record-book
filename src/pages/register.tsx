import { useSetLayoutMenu } from '../contexts/layout-menu';
import API from '../service/apis';
import { useRequest } from 'ahooks';
import { Button, Form, Input, InputNumber, Radio } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const RegisterPage: NextPage = () => {
  useSetLayoutMenu('register');

  const router = useRouter();

  const { run } = useRequest(API.createStudent, { manual: true });

  return (
    <Form
      name="register"
      className="max-w-xl mx-auto"
      labelCol={{ span: 4 }}
      scrollToFirstError
      onFinish={(formData) => {
        run(formData);
        router.push('/');
      }}
    >
      <Form.Item
        label="姓名"
        name="name"
        rules={[{ required: true, message: '请输入姓名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="性别"
        name="gender"
        rules={[{ required: true, message: '请选择性别' }]}
      >
        <Radio.Group>
          <Radio value="boy">男</Radio>
          <Radio value="girl">女</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item
        label="班级"
        name="class"
        rules={[{ required: true, message: '请输入班级' }]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        label="就读学校"
        name="school"
        rules={[{ required: true, message: '请输入学校' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="QQ"
        name="qq"
        rules={[{ pattern: /^[1-9][0-9]{4,10}$/, message: 'QQ号格式错误' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="微信" name="wechat">
        <Input />
      </Form.Item>
      <Form.Item label="留言" name="message">
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="登记口令"
        name="key"
        rules={[{ required: true, message: '请输入口令' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
