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
    province: string;
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

      var numPerProvince = {
        '520000': 10, //贵州
        '540000': 10, //西藏
        '530000': 8.5, //云南
        '500000': 8.5, //重庆
        '360000': 8.5, //江西
        '340000': 8.0, //安徽
        '510000': 7.5, //四川
        '350000': 8.5, //福建
        '430000': 8.0, //湖南
        '420000': 7.5, //湖北
        '410000': 7.5, //河南
        '330000': 7.0, //浙江
        '640000': 7.5, //宁夏
        '650000': 7.0, //新疆
        '440000': 7.0, //广东
        '370000': 7.0, //山东
        '450000': 7.3, //广西
        '630000': 7.0, //青海
        '320000': 7.0, //江苏
        '140000': 6.5, //山西
        '460000': 7, // 海南
        '310000': 6.5, //上海
        '110000': 6.5, // 北京
        '130000': 6.5, // 河北
        '230000': 6, // 黑龙江
        '220000': 6, // 吉林
        '210000': 6.5, //辽宁
        '150000': 6.5, //内蒙古
        '120000': 5, // 天津
        '620000': 6, // 甘肃
        '610000': 8.5, // 甘肃
        '710000': 2.64, //台湾
        '810000': 3.0, //香港
        '820000': 4.7, //澳门
      };

      STUDENT_DATA.map((student) => {
        //check if string exsit in an object
        if (student.province in numPerProvince) {
          numPerProvince[student.province]++;
        } else {
          // 出国学生
        }
      });

      var disCountry = new AMap.DistrictLayer.Country({
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
