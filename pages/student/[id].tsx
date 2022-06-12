import { useSetLayoutMenu } from '../../contexts/layout-menu';
import db from '../../lib/prisma';
import API from '../../service/apis';
import { Student } from '@prisma/client';
import { Descriptions } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import Error from 'next/error';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const student = await db.student.findUnique({
    where: { id: params!.id as string },
  });
  if (!student) {
    return { notFound: true };
  }
  const { id, createdAt, ...studentData } = student;
  return { props: { student: studentData } };
};

interface StudentProps {
  student: Omit<Student, 'id' | 'createdAt'>;
}

const StudentPage: NextPage<StudentProps> = ({ student }) => {
  useSetLayoutMenu('');
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!student.show) {
      (async () => {
        try {
          await API.adminInit();
        } catch (error) {
          setNotFound(true);
        }
      })();
    }
  }, [student.show]);

  if (notFound) {
    return <Error statusCode={401} title="尚未审核" />;
  }

  return (
    <>
      <Head>
        <title>
          {process.env.NEXT_PUBLIC_TITLE_NAME}的同学录 - {student.name}
        </title>
      </Head>
      {/* 由于响应式 这里会报span总和与column不符错误 忽略即可 */}
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

export default StudentPage;
