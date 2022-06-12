import { useSetLayoutMenu } from '../contexts/layout-menu';
import db from '../lib/prisma';
import {
  EllipsisOutlined,
  QqOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { Student } from '@prisma/client';
import { Badge, Button, Card, Empty, message } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await db.student.findMany({
    where: { show: true },
    orderBy: { createdAt: 'desc' },
  });
  return {
    props: {
      students: students.map(({ show, createdAt, ...student }) => student),
    },
  };
};

interface IndexProps {
  students: Omit<Student, 'show' | 'createdAt'>[];
}

const IndexPage: NextPage<IndexProps> = ({ students }) => {
  useSetLayoutMenu('index');

  const router = useRouter();

  const generateActions = (student: Omit<Student, 'show' | 'createdAt'>) => {
    const actions: React.ReactNode[] = [];
    if (student.qq) {
      actions.push(
        <QqOutlined
          key="qq"
          onClick={async () => {
            await navigator.clipboard.writeText(student.qq!);
            message.success(`成功复制QQ号: ${student.qq}`);
          }}
        />,
      );
    }
    if (student.wechat) {
      actions.push(
        <WechatOutlined
          key="wechat"
          onClick={async () => {
            await navigator.clipboard.writeText(student.wechat!);
            message.success(`成功复制微信号: ${student.wechat}`);
          }}
        />,
      );
    }
    actions.push(
      <EllipsisOutlined
        key="more"
        onClick={() => router.push(`/student/${student.id}`)}
      />,
    );
    return actions;
  };

  if (students.length === 0) {
    return (
      <Empty description="暂无数据">
        <Link href="/register" passHref>
          <Button type="primary">登记</Button>
        </Link>
      </Empty>
    );
  } else {
    return (
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <Badge.Ribbon
            key={student.id}
            text={`${student.class}班`}
            color={{ boy: 'blue', girl: 'pink' }[student.gender]}
          >
            <Card actions={generateActions(student)}>
              <Card.Meta title={student.name} description={student.school} />
            </Card>
          </Badge.Ribbon>
        ))}
      </div>
    );
  }
};

export default IndexPage;
