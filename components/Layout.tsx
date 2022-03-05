import { FormOutlined, UserOutlined } from '@ant-design/icons';
import { Layout as AntdLayout, Menu, Typography } from 'antd';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

const Layout: NextPage = ({ children }) => {
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
            selectable={false}
            className="float-right"
          >
            <Menu.Item key="1" icon={<FormOutlined />}>
              登记
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              后台
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
