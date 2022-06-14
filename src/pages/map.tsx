import { PROVINCE_POST_CODE_LIST } from '../constants/province-post-code-list';
import { useSetLayoutMenu } from '../contexts/layout-menu';
import db from '../lib/prisma';
import { Student } from '@prisma/client';
import { Collapse } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

const { Panel } = Collapse;

const STUDENT_DATA = [
  {
    name: '俞凯戈',
    provincePostCode: '110000',
    university: '清华大学',
  },
  {
    name: '孙锦轩',
    provincePostCode: '320000',
    university: '天津大学',
  },
  {
    name: '孙锦轩',
    provincePostCode: '320000',
    university: '天津大学',
  },
  {
    name: '孙锦轩',
    provincePostCode: '320000',
    university: '天津大学',
  },
  {
    name: '孙锦轩',
    provincePostCode: '320000',
    university: '天津大学',
  },
  {
    name: '孙锦轩',
    provincePostCode: '320000',
    university: '天津大学',
  },
  {
    name: '孙锦轩',
    provincePostCode: '320000',
    university: '天津大学',
  },
];

export const getServerSideProps: GetServerSideProps = async () => {
  const students = await db.student.findMany({
    where: { show: true },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      school: true,
      class: true,
      // provincePostCode: true,
    },
  });
  return { props: { students, AMAP_KEY: process.env.AMAP_KEY } };
};

const MapGraph = dynamic(() => import('../components/MapGraph'), {
  ssr: false,
});

type studentData = Pick<Student, 'name' | 'university' | 'provincePostCode'>;

interface MapProps {
  students: studentData[];
  AMAP_KEY?: string | undefined;
}

const InfoPanel = ({ STUDENT_DATA }: { STUDENT_DATA: studentData[] }) => {
  return (
    <Collapse defaultActiveKey={['1']}>
      {PROVINCE_POST_CODE_LIST.map(({ code, province }) => (
        <Panel header={province} key={code}>
          <p>
            {STUDENT_DATA.map((student) => {
              if (student.provincePostCode == code)
                return (
                  <li>
                    <b>{student.name}</b>：{student.university}
                  </li>
                );
            })}
          </p>
        </Panel>
      ))}
    </Collapse>
  );
};

/**
 * 大学分布地图
 * @author rivertwilight
 * @docs https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare
 */

const MapPage: NextPage<MapProps> = ({ students, AMAP_KEY }) => {
  useSetLayoutMenu('map');

  return (
    <div className="flex flex-row">
      <div className="h-screen md:basis-4/5 xs:basis-full">
        <MapGraph AMAP_KEY={AMAP_KEY} STUDENT_DATA={STUDENT_DATA} />
      </div>
      <div className="overflow-scroll md:h-screen md:basis-1/5 xs:basis-full">
        <InfoPanel STUDENT_DATA={STUDENT_DATA} />
      </div>
    </div>
  );
};

export default MapPage;
