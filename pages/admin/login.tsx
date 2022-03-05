import { NextPage } from 'next';
import React from 'react';
import { useSetLayoutMenu } from '../../contexts/layout-menu';

const AdminLogin: NextPage = () => {
  useSetLayoutMenu('admin');

  return <div>login</div>;
};

export default AdminLogin;
