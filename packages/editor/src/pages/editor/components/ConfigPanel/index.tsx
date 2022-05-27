import { useEffect, useMemo, useRef, useState } from 'react';
import { Result } from 'antd';
import { useDispatch, useSelector } from 'umi';
import { FormRender } from '@/core';
import styles from '../../index.less';

interface IConfigPanelProps {
  // curPoint: Record<string, any>;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  activeCanvas: string | number;
  // pointData: any[];
}

const ConfigPanel = (props: IConfigPanelProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { visible, setVisible, activeCanvas } = props;
  const dispatch = useDispatch();
  // const [ curPoint, setCurPoint ] = useState({})
  // const [ pointData, setPointData ] = useState([])
  const curPoint = useSelector((state: any) => {
    if (activeCanvas == 'default_canvas') {
      return state.present.editorModal.curPoint;
    } else {
      return state.present.modal.modals.filter((modal: any) => modal.id == activeCanvas)[0]
        .curPoint;
    }
  });
  const pointData = useSelector((state: any) => {
    if (activeCanvas == 'default_canvas') {
      return state.present.editorModal.pointData;
    } else {
      return state.present.modal.modals.filter((modal: any) => modal.id == activeCanvas)[0]
        .pointData;
    }
  });
  const handleFormSave = useMemo(() => {
    return (data: any) => {
      dispatch({
        type: activeCanvas == 'default_canvas' ? 'editorModal/modPointData' : 'modal/modPointData',
        payload: { ...curPoint, item: { ...curPoint.item, config: data } },
      });
    };
  }, [curPoint, dispatch]);

  useEffect(() => {
    if (curPoint && curPoint.status === 'inToCanvas') {
      setVisible(false);
    }
  }, [curPoint]);

  useEffect(() => {
    setVisible(true);
  }, [activeCanvas]);

  const handleDel = useMemo(() => {
    return (id: any) => {
      dispatch({
        type: activeCanvas == 'default_canvas' ? 'editorModal/delPointData' : 'modal/delPointData',
        payload: { id },
      });
    };
  }, [dispatch]);

  return (
    <div
      ref={ref}
      className={styles.attrSetting}
      style={{
        transition: 'all ease-in-out 0.5s',
        transform: visible ? 'translate(100%,0)' : 'translate(0,0)',
      }}
    >
      {pointData.length && curPoint ? (
        <>
          <div className={styles.tit}>属性设置</div>
          <FormRender
            rightPannelRef={ref}
            config={curPoint.item.editableEl}
            uid={curPoint.id}
            defaultValue={curPoint.item.config}
            onSave={handleFormSave}
            onDel={handleDel}
          />
        </>
      ) : (
        <div style={{ paddingTop: '100px' }}>
          <Result status="404" title="还没有数据哦" subTitle="赶快拖拽组件来生成你的H5页面吧～" />
        </div>
      )}
    </div>
  );
};

export default ConfigPanel;
