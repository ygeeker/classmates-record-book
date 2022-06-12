import AMapLoader from '@amap/amap-jsapi-loader';
import { useMount } from 'ahooks';
import { useEffect } from 'react';

const MapGraph = ({ key }: { key?: string }) => {
  useMount(() => {
    (async () => {
      const Amap = await AMapLoader.load({
        key: key!, // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      });
      new Amap.Map('container');
    })();
    return () => {};
  });
  return <div id="container"></div>;
};

export default MapGraph;
