import {
  PROVINCE_POST_CODE_LIST,
  POSTCODE_LIST,
} from '../constants/province-post-code-list';
import { StudentData } from '../pages/map';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useMount } from 'ahooks';
import { useState } from 'react';

const CODE_PROVINCE_MAP = PROVINCE_POST_CODE_LIST.reduce(
  (acc, { code, province }) => ({ ...acc, [code]: province }),
  {} as { [code: string]: string },
);

const getColorByNum = (num: number) => {
  if (!num) {
    return 'rgb(227,227,227)';
  }

  const rg = 255 - Math.floor(((num - 5) / 5) * 255);

  console.log(rg);

  return 'rgb(' + rg + ',' + rg + ',255)';
};

const publicStyle = {
  'nation-stroke': '#22ffff',
  'coastline-stroke': [0.85, 0.63, 0.94, 1],
  'province-stroke': 'white',
  'city-stroke': 'rgba(255,255,255,0.15)', //中国特有字段
};

const InfoBox = ({
  info,
}: {
  info: {
    provinceName: string;
    students: any[];
  };
}) => {
  return <div className="flex flex-col">{info.provinceName}</div>;
};

const MapGraph = ({
  AMAP_KEY,
  STUDENT_DATA,
}: {
  STUDENT_DATA: {
    name: string;
    provincePostCode: string | number;
    university: string;
  }[];
  AMAP_KEY?: string;
}) => {
  const [info, setInfo] = useState<{
    students: StudentData[];
    provinceCode: string;
    provinceName: string;
  }>({
    students: [],
    provinceName: '',
    provinceCode: '',
  });

  useMount(() => {
    (async () => {
      const AMap = await AMapLoader.load({
        key: AMAP_KEY!, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      });

      let numPerProvince: {
        [code: string]: number;
      } = {};

      POSTCODE_LIST.forEach((item: string) => {
        numPerProvince[item] = 0;
      });

      STUDENT_DATA.map((student) => {
        if (Number(student.provincePostCode) in numPerProvince) {
          numPerProvince[student.provincePostCode]++;
        } else {
          // 出国学生
        }
      });

      const disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: 'CHN',
        depth: 2,
        styles: {
          fill: function (props: any) {
            //中国特有字段
            return getColorByNum(numPerProvince[props.adcode_pro]);
          },
          ...publicStyle,
        },
      });

      var map = new AMap.Map('container', {
        zooms: [3, 10],
        showIndoorMap: false,
        zoom: 4,
        isHotspot: false,
        defaultCursor: 'pointer',
        touchZoomCenter: 1,
        pitch: 0,
        layers: [disCountry],
        viewMode: '3D',
      });

      map.on('click', function (ev: any) {
        var px = ev.pixel;
        // 拾取所在位置的行政区
        var props = disCountry.getDistrictByContainerPos(px);
        console.log(props);
        if (props) {
          var selectedPro = props.adcode_pro;
          // 重置行政区样式
          disCountry.setStyles({
            fill: function (props: { adcode_pro: string }) {
              return props.adcode_pro == selectedPro
                ? 'green'
                : getColorByNum(numPerProvince[props.adcode_pro]);
            },
            ...publicStyle,
          });
          setInfo({
            provinceCode: selectedPro,
            provinceName: CODE_PROVINCE_MAP[selectedPro] || '海外',
            students: STUDENT_DATA.filter(
              (student) => student.provincePostCode === selectedPro,
            ),
          });
        }
      });
    })();
  });

  return (
    <>
      <InfoBox info={info} />
      <div id="container" style={{ height: '80vh' }}></div>
    </>
  );
};

export default MapGraph;
