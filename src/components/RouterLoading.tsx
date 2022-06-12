import { useBoolean, useMount } from 'ahooks';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const RouterLoading: React.FC = ({ children }) => {
  const [loading, { setTrue: setLoading, setFalse: setNotLoading }] =
    useBoolean();

  const router = useRouter();
  useMount(() => {
    router.events.on('routeChangeStart', setLoading);
    router.events.on('routeChangeComplete', setNotLoading);
    router.events.on('routeChangeError', setNotLoading);
    return () => {
      router.events.off('routeChangeStart', setLoading);
      router.events.off('routeChangeComplete', setNotLoading);
      router.events.off('routeChangeError', setNotLoading);
    };
  });

  return (
    <Spin tip="加载中.." spinning={loading}>
      {children}
    </Spin>
  );
};

export default RouterLoading;
