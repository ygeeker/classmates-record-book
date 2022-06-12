import { useSetLayoutMenu } from '../../contexts/layout-menu';
import API from '../../service/apis';
import { Button, Form, Input } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const AdminLoginPage: NextPage = () => {
  useSetLayoutMenu('admin');

  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      (async () => {
        await API.adminInit();
        router.push('/admin');
      })();
    }
  }, []);

  return (
    <Form
      name="admin-login"
      className="max-w-md mx-auto"
      labelCol={{ span: 4 }}
      labelAlign="left"
      onFinish={async (formData) => {
        const response = await API.adminLogin(formData);
        localStorage.setItem('token', response.data.token);
        router.push('/admin');
      }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AdminLoginPage;
