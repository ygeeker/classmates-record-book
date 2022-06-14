import AMapLoader from '@amap/amap-jsapi-loader';
import { useMount } from 'ahooks';

const getColorByNum = (num: number | string) => {
  if (!num) {
    return 'rgb(227,227,227)';
  }

  var rg = 255 - Math.floor(((Number(num) - 5) / 5) * 255);
  return 'rgb(' + rg + ',' + rg + ',255)';
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
  useMount(() => {
    (async () => {
      const AMap = await AMapLoader.load({
        key: AMAP_KEY!, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      });

      let numPerProvince = {
        '520000': 0, //贵州
        '540000': 0, //西藏
        '530000': 0, //云南
        '500000': 0, //重庆
        '360000': 0, //江西
        '340000': 0, //安徽
        '510000': 0, //四川
        '350000': 0, //福建
        '430000': 0, //湖南
        '420000': 0, //湖北
        '410000': 0, //河南
        '330000': 0, //浙江
        '640000': 0, //宁夏
        '650000': 0, //新疆
        '440000': 0, //广东
        '370000': 0, //山东
        '450000': 0, //广西
        '630000': 0, //青海
        '320000': 0, //江苏
        '140000': 0, //山西
        '460000': 0, // 海南
        '310000': 0, //上海
        '110000': 0, // 北京
        '130000': 0, // 河北
        '230000': 0, // 黑龙江
        '220000': 0, // 吉林
        '210000': 0, //辽宁
        '150000': 0, //内蒙古
        '120000': 0, // 天津
        '620000': 0, // 甘肃
        '610000': 0, // 甘肃
        '710000': 0, //台湾
        '810000': 0, //香港
        '820000': 0, //澳门
      };

      STUDENT_DATA.map((student) => {
        //check if string exsit in an object
        if (student.province in numPerProvince) {
          numPerProvince[student.province]++;
        } else {
          // 出国学生
        }
      });

      console.log(STUDENT_DATA);

      const disCountry = new AMap.DistrictLayer.Country({
        zIndex: 10,
        SOC: 'CHN',
        depth: 2,
        styles: {
          'nation-stroke': '#22ffff',
          'coastline-stroke': [0.85, 0.63, 0.94, 1],
          'province-stroke': 'white',
          'city-stroke': 'rgba(255,255,255,0.15)', //中国特有字段
          fill: function (props: any) {
            //中国特有字段
            return getColorByNum(numPerProvince[props.adcode_pro]);
          },
        },
      });

      var map = new AMap.Map('container', {
        zooms: [3, 10],
        showIndoorMap: false,
        zoom: 3,
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
        var props = disWorld.getDistrictByContainerPos(px);

        if (props) {
          var SOC = props.SOC;
          if (SOC) {
            // 重置行政区样式
            disWorld.setStyles({
              // 国境线
              //nation-stroke': nationStroke,
              // 海岸线
              //'coastline-stroke': '',
              fill: function (props) {
                return props.SOC == SOC ? nationFill : 'white';
              },
            });
            updateInfo(props);
          }
        }
      });
    })();
  });
  return <div id="container" style={{ height: '800px' }}></div>;
};

export default MapGraph;
