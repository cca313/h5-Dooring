import { dynamic } from 'umi';
import Loading from '../LoadingCp';
import { useMemo, memo } from 'react';

const needList = ['Tab', 'Carousel', 'Upload', 'Video'];

const DynamicFunc = type =>
  dynamic({
    loader: async function() {
      let Component;
      if (needList.includes(type)) {
        const { default: Graph } = await import(`@/components/${type}`);
        Component = Graph;
      } else {
        const Components = await import(`@/components/DynamicEngine/components`);
        Component = Components[type];
      }

      return props => {
        const { config } = props;
        return <Component {...config} />;
      };
    },
    loading: () => (
      <div style={{ paddingTop: 10, textAlign: 'center' }}>
        <Loading />
      </div>
    ),
  });

const DynamicEngine = memo(props => {
  const { type, config } = props;
  const Dynamic = useMemo(() => {
    return DynamicFunc(type);
  }, [type, config]);
  return <Dynamic type={type} config={config} />;
});

export default DynamicEngine;
