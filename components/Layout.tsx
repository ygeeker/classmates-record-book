import { FormOutlined, HomeOutlined, LoginOutlined } from '@ant-design/icons';
import { Layout as AntdLayout, Menu, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useLayoutMenuValue } from '../contexts/layout-menu';

const Layout: React.FC = ({ children }) => {
  const layoutMenu = useLayoutMenuValue();

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_NAME}的同学录</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AntdLayout className="min-h-screen">
        <AntdLayout.Header>
          <div className="text-white float-left">
            {process.env.NEXT_PUBLIC_NAME}的同学录
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            className="float-right w-4 sm:w-auto"
            selectedKeys={[layoutMenu]}
          >
            <Menu.Item key="index" icon={<HomeOutlined />}>
              <Link href="/">主页</Link>
            </Menu.Item>
            <Menu.Item key="register" icon={<FormOutlined />}>
              <Link href="/register">登记</Link>
            </Menu.Item>
            <Menu.Item key="admin" icon={<LoginOutlined />}>
              <Link href="/admin">后台</Link>
            </Menu.Item>
          </Menu>
        </AntdLayout.Header>
        <AntdLayout.Content>
          <div className="bg-white p-6 m-5">{children}</div>
        </AntdLayout.Content>
        <AntdLayout.Footer className="text-center">
          Github:{' '}
          <Typography.Link
            href="https://github.com/jsun969/classmates-record-book"
            target="_blank"
          >
            jsun969/classmates-record-book
          </Typography.Link>
        </AntdLayout.Footer>
      </AntdLayout>
    </>
  );
};

export default Layout;
