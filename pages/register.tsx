import { NextPage } from 'next';
import React from 'react';
import { useSetLayoutMenu } from '../contexts/layout-menu';

const Register: NextPage = () => {
  useSetLayoutMenu('register');

  return <div>register</div>;
};

export default Register;
