import { NextPage } from 'next';
import React from 'react';
import { useSetLayoutMenu } from '../../contexts/layout-menu';

const Admin: NextPage = () => {
  useSetLayoutMenu('admin');

  return <div>manage</div>;
};

export default Admin;
