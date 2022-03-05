import { Button, Empty } from 'antd';
import { NextPage } from 'next';
import Link from 'next/link';
import React from 'react';
import { useSetLayoutMenu } from '../contexts/layout-menu';

const Home: NextPage = () => {
  useSetLayoutMenu('index');

  return (
    <Empty>
      <Link href="/register" passHref>
        <Button type="primary">登记</Button>
      </Link>
    </Empty>
  );
};

export default Home;
