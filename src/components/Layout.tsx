import { useLayoutMenuValue } from '../contexts/layout-menu';
import {
  FormOutlined,
  GlobalOutlined,
  HomeOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { Layout as AntdLayout, Menu, Typography } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const Layout: React.FC = ({ children }) => {
  const layoutMenu = useLayoutMenuValue();

  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_TITLE_NAME}的同学录</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      <nav className="border fixed split-nav">
        <div className="nav-brand">
          <h3>
            <a href="#">Get PaperCSS</a>
          </h3>
        </div>
        <div className="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <label for="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
          <div className="collapsible-body">
            <ul className="inline">
              <li>
                <a href="#">Documentation</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Github</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <AntdLayout className="min-h-screen">
        <AntdLayout.Header>
          <Link href="/">
            <a className="text-white float-left">
              {process.env.NEXT_PUBLIC_TITLE_NAME}同学录
            </a>
          </Link>
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
            <Menu.Item key="map" icon={<GlobalOutlined />}>
              <Link href="/map">地图</Link>
            </Menu.Item>
            <Menu.Item key="admin" icon={<LoginOutlined />}>
              <Link href="/admin/login">后台</Link>
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
