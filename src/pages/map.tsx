import { useSetLayoutMenu } from '../contexts/layout-menu';
import db from '../lib/prisma';
import { Student } from '@prisma/client';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await db.student.findMany({
    where: { show: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, school: true, class: true },
  });
  console.log(process.env);
  return { props: { students, AMAP_KEY: process.env.AMAP_KEY } };
};

const MapGraph = dynamic(() => import('../components/MapGraph'), {
  // Do not import in server side
  ssr: false,
});

interface MapProps {
  students: Pick<Student, 'id' | 'name' | 'school' | 'class'>[];
  AMAP_KEY?: string | undefined;
}

/**
 * 大学分部地图
 * @author rivertwilight
 * @docs https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare
 */

const MapPage: NextPage<MapProps> = ({ students, AMAP_KEY }) => {
  useSetLayoutMenu('map');

  return (
    <div>
      <div>MAP</div>
      <MapGraph AMAP_KEY={AMAP_KEY} />
    </div>
  );
};

export default MapPage;
