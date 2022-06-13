import { useSetLayoutMenu } from '../contexts/layout-menu';
import db from '../lib/prisma';
import { Student } from '@prisma/client';
import { Collapse } from 'antd';
import { GetServerSideProps, NextPage } from 'next';
import dynamic from 'next/dynamic';

const { Panel } = Collapse;

const PROVINCES_LIST = {
  '110000': '北京市',
  '120000': '天津市',
  '130000': '河北省',
  '140000': '山西省',
  '150000': '内蒙古自治区',
  '210000': '辽宁省',
  '220000': '吉林省',
  '230000': '黑龙江省',
  '310000': '上海市',
  '320000': '江苏省',
  '330000': '浙江省',
  '340000': '安徽省',
  '350000': '福建省',
  '360000': '江西省',
  '370000': '山东省',
  '410000': '河南省',
  '420000': '湖北省',
  '430000': '湖南省',
  '440000': '广东省',
  '450000': '广西壮族自治区',
  '460000': '海南省',
  '500000': '重庆市',
  '510000': '四川省',
  '520000': '贵州省',
  '530000': '云南省',
  '540000': '西藏自治区',
  '610000': '陕西省',
  '620000': '甘肃省',
  '630000': '青海省',
  '640000': '宁夏回族自治区',
  '650000': '新疆维吾尔自治区',
  '710000': '台湾省',
  '910000': '港澳',
};

const STUDENT_DATA = [
  {
    name: '俞凯戈',
    province: '110000',
    university: '清华大学',
  },
  {
    name: '孙锦轩',
    province: '120000',
    university: '天津大学',
  },
];

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

const InfoPanel = () => {
  return (
    <Collapse defaultActiveKey={['1']}>
      {Object.entries(PROVINCES_LIST).map(([code, name]) => (
        <Panel header={name} key={code}>
          <p>
            {STUDENT_DATA.map((student) => {
              if (student.province == code)
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
      <div className="md:basis-1/5 xs:basis-full">
        <InfoPanel />
      </div>
    </div>
  );
};

export default MapPage;
