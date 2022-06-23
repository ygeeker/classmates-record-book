import { useLayoutMenuValue } from '../contexts/layout-menu';
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
            <a href="#">{process.env.NEXT_PUBLIC_TITLE_NAME}同学录</a>
          </h3>
        </div>
        <div className="collapsible">
          <input id="collapsible1" type="checkbox" name="collapsible1" />
          <label htmlFor="collapsible1">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
          <div className="collapsible-body">
            <ul className="inline">
              <li>
                <Link href="/">主页</Link>
              </li>
              <li>
                <Link href="/register">登记</Link>
              </li>
              <li>
                <Link href="/map">地图</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* <Menu
            theme="dark"
            mode="horizontal"
            className="float-right w-4 sm:w-auto"
            selectedKeys={[layoutMenu]}
          > */}
    </>
  );
};

export default Layout;
