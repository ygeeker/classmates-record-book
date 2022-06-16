import InfoPanel from '../components/map/InfoPanel';
import { useSetLayoutMenu } from '../contexts/layout-menu';
import db from '../lib/prisma';
import { Student } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await db.student.findMany({
    where: { show: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      class: true,
      school: true,
      provincePostCode: true,
    },
  });
  return { props: { students, AMAP_KEY: process.env.AMAP_KEY } };
};

const MapGraph = dynamic(() => import('../components/map/MapGraph'), {
  ssr: false,
});

export type StudentData = Pick<
  Student,
  'id' | 'name' | 'class' | 'school' | 'provincePostCode'
>;

interface MapProps {
  students: StudentData[];
  AMAP_KEY?: string;
}

const MapPage: NextPage<MapProps> = ({ students, AMAP_KEY }) => {
  useSetLayoutMenu('map');

  return (
    <div className="flex flex-row">
      <div className="h-screen md:basis-4/5 xs:basis-full">
        <MapGraph AMAP_KEY={AMAP_KEY} students={students} />
      </div>
      <div className="overflow-scroll md:h-screen md:basis-1/5 xs:basis-full">
        <InfoPanel students={students} />
      </div>
    </div>
  );
};

export default MapPage;
