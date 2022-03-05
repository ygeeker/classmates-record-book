import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import RouterLoading from '../components/RouterLoading';
import { LayoutMenuProvider } from '../contexts/layout-menu';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouterLoading>
      <LayoutMenuProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutMenuProvider>
    </RouterLoading>
  );
}

export default MyApp;
