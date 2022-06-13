import AMapLoader from '@amap/amap-jsapi-loader';
import { useMount } from 'ahooks';

const MapGraph = ({ AMAP_KEY }: { AMAP_KEY?: string }) => {
  useMount(() => {
    (async () => {
      const AMap = await AMapLoader.load({
        key: AMAP_KEY!, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      });
      new AMap.Map('container', {
        center: [116.397428, 39.90923],
        layers: [
          // 卫星
          // new AMap.TileLayer.Satellite(),
          // 路网
          new AMap.TileLayer.RoadNet(),
        ],
        zoom: 4,
        SOC: 'CHN',
        depth: 2,
        styles: {
          'nation-stroke': '#22ffff',
          'coastline-stroke': [0.8, 0.63, 0.94, 1],
          'province-stroke': 'white',
          'city-stroke': 'rgba(255,255,255,0.5)', //中国特有字段
          // 'fill':function(props){//中国特有字段
          //    return getColorByDGP(props.adcode_pro)
          // }
        },
      });
    })();
  });
  return <div id="container" style={{ height: '800px' }}></div>;
};

export default MapGraph;
