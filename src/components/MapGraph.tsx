import { PROVINCE_POST_CODE_LIST } from '../constants/province-post-code-list';
import { StudentData } from '../pages/map';
import AMapLoader from '@amap/amap-jsapi-loader';
import { useMount } from 'ahooks';
import { useState } from 'react';

const CODE_PROVINCE_MAP = PROVINCE_POST_CODE_LIST.reduce(
  (acc, { code, province }) => ({ ...acc, [code]: province }),
  {} as Record<string, string>,
);

const getColorByNum = (num: number) => {
  if (!num) {
    return 'rgb(227,227,227)';
  }
  const rg = 255 - Math.floor(((num - 5) / 5) * 255);
  return `rgb(${rg},${rg},255)`;
};

const publicStyle = {
  'nation-stroke': '#22ffff',
  'coastline-stroke': [0.85, 0.63, 0.94, 1],
  'province-stroke': 'white',
  'city-stroke': 'rgba(255,255,255,0.15)', //中国特有字段
};

interface MapGraphProps {
  students: StudentData[];
  AMAP_KEY?: string;
}

/**
 * @docs https://lbs.amap.com/api/jsapi-v2/guide/abc/prepare
 */
const MapGraph: React.FC<MapGraphProps> = ({ students, AMAP_KEY }) => {
  const [selectedInfo, setSelectedInfo] = useState<{
    studentsCount: number;
    provinceCode: string;
    provinceName: string;
  }>({
    studentsCount: -1,
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

      const countPerProvince = students.reduce(
        (prev, { provincePostCode }) => ({
          ...prev,
          [provincePostCode]: prev[provincePostCode]++ || 1,
        }),
        {} as Record<string, number>,
      );

      const country = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: 'CHN',
        depth: 2,
        styles: {
          fill(props: { adcode_pro: number }) {
            //中国特有字段
            return getColorByNum(countPerProvince[props.adcode_pro]);
          },
          ...publicStyle,
        },
      });

      const map = new AMap.Map('map-container', {
        zooms: [3, 10],
        showIndoorMap: false,
        zoom: 4,
        isHotspot: false,
        defaultCursor: 'pointer',
        touchZoomCenter: 1,
        pitch: 0,
        layers: [country],
        viewMode: '3D',
      });

      map.on('click', (ev: any) => {
        const px = ev.pixel;
        // 拾取所在位置的行政区
        const props = country.getDistrictByContainerPos(px);
        if (props) {
          const selectedProvincePostCode = props.adcode_pro;
          // 重置行政区样式
          country.setStyles({
            fill(props: { adcode_pro: string }) {
              return props.adcode_pro == selectedProvincePostCode
                ? 'green'
                : getColorByNum(countPerProvince[props.adcode_pro]);
            },
            ...publicStyle,
          });
          setSelectedInfo({
            provinceCode: selectedProvincePostCode,
            provinceName: CODE_PROVINCE_MAP[selectedProvincePostCode],
            studentsCount: countPerProvince[selectedProvincePostCode],
          });
        }
      });
    })();
  });

  return (
    <>
      {selectedInfo.studentsCount !== -1 && (
        <div>
          {selectedInfo.provinceCode} {selectedInfo.provinceName}{' '}
          {selectedInfo.studentsCount}人
        </div>
      )}
      <div id="map-container" style={{ height: '80vh' }}></div>
    </>
  );
};

export default MapGraph;
