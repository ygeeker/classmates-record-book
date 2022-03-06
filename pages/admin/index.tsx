import { message } from 'antd';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSetLayoutMenu } from '../../contexts/layout-menu';
import { API } from '../../service/apis';

const Admin: NextPage = () => {
  useSetLayoutMenu('admin');

  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/admin/login');
      message.warning('未登录');
      return;
    }
    (async () => {
      try {
        await API.adminInit();
      } catch (error) {
        localStorage.removeItem('token');
        router.push('/admin/login');
        throw error;
      }
    })();
  }, []);

  return <div>manage</div>;
};

export default Admin;
