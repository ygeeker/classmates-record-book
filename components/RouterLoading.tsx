import { Spin } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const RouterLoading: React.FC = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleStop = () => {
      setLoading(false);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);
  }, [router]);

  return (
    <Spin tip="加载中.." spinning={loading}>
      {children}
    </Spin>
  );
};

export default RouterLoading;
