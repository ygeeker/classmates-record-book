import { Student } from '@prisma/client';
import { Descriptions } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { useSetLayoutMenu } from '../../contexts/layout-menu';
import db from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const student = await db.student.findUnique({
    where: { id: params!.id as string },
  });
  if (!student) {
    return { notFound: true };
  }
  const { id, show, createdAt, ...studentData } = student;
  return { props: { student: studentData } };
};

interface StudentProps {
  student: Omit<Student, 'id' | 'show' | 'createdAt'>;
}

const Student: NextPage<StudentProps> = ({ student }) => {
  useSetLayoutMenu('');

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_TITLE_NAME}的同学录 - {student.name}
        </title>
      </Head>
      <Descriptions
        bordered
        column={{ xxl: 4, xl: 4, lg: 4, md: 1, sm: 1, xs: 1 }}
      >
        <Descriptions.Item label="姓名">{student.name}</Descriptions.Item>
        <Descriptions.Item label="性别">
          {{ boy: '男', girl: '女' }[student.gender]}
        </Descriptions.Item>
        <Descriptions.Item label="班级">{student.class}</Descriptions.Item>
        <Descriptions.Item label="就读学校">{student.school}</Descriptions.Item>
        <Descriptions.Item label="QQ" span={2}>
          {student.qq}
        </Descriptions.Item>
        <Descriptions.Item label="微信" span={2}>
          {student.wechat}
        </Descriptions.Item>
        <Descriptions.Item
          label="留言"
          span={4}
          className="whitespace-pre-wrap"
        >
          {student.message}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default Student;
