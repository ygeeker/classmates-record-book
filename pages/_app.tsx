import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import React from 'react';
import Layout from '../components/Layout';
import RouterLoading from '../components/RouterLoading';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RouterLoading>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RouterLoading>
  );
}

export default MyApp;
