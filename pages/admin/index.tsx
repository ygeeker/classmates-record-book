import { LogoutOutlined } from '@ant-design/icons';
import { Button, message, Switch, Table } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSetLayoutMenu } from '../../contexts/layout-menu';
import db from '../../lib/prisma';
import API from '../../service/apis';

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await db.student.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      show: true,
      createdAt: true,
      name: true,
      gender: true,
      class: true,
      school: true,
    },
  });
  return {
    props: {
      students: students.map(({ createdAt, ...student }) => ({
        createdAt: `${createdAt}`,
        ...student,
      })),
    },
  };
};

type Student = {
  id: string;
  show: boolean;
  name: string;
  gender: 'boy' | 'girl';
  class: number;
  school: string;
  createdAt: string;
};

interface AdminProps {
  students: Student[];
}

const Admin: NextPage<AdminProps> = ({ students }) => {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/admin/login');
  };

  const tableColumns: ColumnType<Student>[] = [
    {
      title: '主页显示',
      dataIndex: 'show',
      key: 'show',
      render: (show: boolean, { id }) => (
        <StudentShowSwitch defaultShow={show} id={id} />
      ),
    },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      responsive: ['lg'],
      render: (gender: 'boy' | 'girl') => (
        <>{{ boy: '男', girl: '女' }[gender]}</>
      ),
    },
    { title: '班级', dataIndex: 'class', key: 'class', responsive: ['lg'] },
    {
      title: '就读学校',
      dataIndex: 'school',
      key: 'school',
      responsive: ['lg'],
    },
    {
      title: '创建于',
      dataIndex: 'createdAt',
      key: 'createdAt',
      responsive: ['lg'],
    },
    {
      title: '查看详情',
      dataIndex: 'id',
      key: 'more',
      render: (id: string) => <Link href={`/student/${id}`}>查看详情</Link>,
    },
  ];

  return (
    <>
      <Button
        type="primary"
        icon={<LogoutOutlined />}
        className="mb-3"
        onClick={handleLogout}
      >
        退出登录
      </Button>
      <Table
        dataSource={students}
        columns={tableColumns}
        rowKey="id"
        pagination={false}
      />
    </>
  );
};

interface StudentShowSwitchProps {
  id: string;
  defaultShow: boolean;
}

const StudentShowSwitch: React.FC<StudentShowSwitchProps> = ({
  id,
  defaultShow,
}) => {
  const [show, setShow] = useState<boolean>(defaultShow);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Switch
      checked={show}
      loading={loading}
      onChange={async (value) => {
        try {
          setLoading(true);
          await API.adminModifyStudentShow({ id, show: value });
          setShow(value);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      }}
    />
  );
};

export default Admin;
