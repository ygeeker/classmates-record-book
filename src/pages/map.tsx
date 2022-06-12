import { useSetLayoutMenu } from '../contexts/layout-menu';
import db from '../lib/prisma';
import { Student } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await db.student.findMany({
    where: { show: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, school: true, class: true },
  });
  return { props: { students } };
};

interface MapProps {
  students: Pick<Student, 'id' | 'name' | 'school' | 'class'>[];
}

const MapPage: NextPage<MapProps> = ({ students }) => {
  useSetLayoutMenu('map');

  return (
    <div>
      <div>MAP</div>
      <div>{JSON.stringify(students)}</div>
    </div>
  );
};

export default MapPage;
