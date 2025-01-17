import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { connect } from 'dva';
import { Button, Result, Tabs } from 'antd';
import {
  PieChartOutlined,
  PlayCircleOutlined,
  HighlightOutlined,
  DoubleRightOutlined,
  DoubleLeftOutlined,
} from '@ant-design/icons';
import dooringCompt from 'dooringUI/components';
import { ActionCreators, StateWithHistory } from 'redux-undo';

import HeaderComponent from './components/Header';
// import CanvasControl from './components/CanvasControl';
import CanvasTabs from './components/CanvasTabs';
import TargetBox from './SourceBox';
import InfiniteCanvas from './components/Canvas';
import NewModalForm from './components/NewModalForm';
import ConfigPanel from './components/ConfigPanel';
import { getCanvasData } from './services/editorService'

import styles from './index.less';

const { TabPane } = Tabs;
const { template, mediaTpl, graphTpl, shopTpl, schemaH5 } = dooringCompt;
const DynamicEngine = React.lazy(() => import('dooringUI/loader'));

const Container = (props: {
  history?: any;
  location?: any;
  pstate?: any;
  cstate?: any;
  dispatch?: any;
}) => {
  const canvasId = 'default_canvas';
  const [scaleNum, setScale] = useState(1);
  const [pageConfig, setPageConfig] = useState({})
  const [initialModalValues, setInitialValues] = useState({
    name: '',
    title: '',
    visible: true,
    btnCancelVisible: true,
    btnConfirmVisible: true,
  });
  const [collapsed, setCollapsed] = useState(false);
  const [rightColla, setRightColla] = useState(true);
  const [newModalFormVisible, setNewModalFormVisible] = useState(false);
  const [activeCanvas, setActiveCanvas] = useState(canvasId);
  const { pstate, cstate, dispatch } = props;
  const pointData = pstate ? pstate.pointData : [];
  // const cpointData = cstate ? cstate.pointData : [];

  const changeCollapse = useMemo(() => {
    return (c: boolean) => {
      setCollapsed(c);
    };
  }, []);
  const changeRightColla = useMemo(() => {
    return (c: boolean) => {
      setRightColla(c);
    };
  }, []);
  const curPoint = pstate ? pstate.curPoint : {};

  // 指定画布的id

  // const backSize = () => {
  //   setScale(1);
  //   setDragState({ x: 0, y: 0 });
  // };

  const CpIcon = {
    base: <HighlightOutlined />,
    media: <PlayCircleOutlined />,
    visible: <PieChartOutlined />,
  };

  const generateHeader = useMemo(() => {
    return (type: any, text: string) => {
      return (
        <div>
          {(CpIcon as any)[type]} {text}
        </div>
      );
    };
  }, [CpIcon]);

  // const handleSlider = useMemo(() => {
  //   return (type: any) => {
  //     if (type) {
  //       setScale((prev: number) => +(prev + 0.1).toFixed(1));
  //     } else {
  //       setScale((prev: number) => +(prev - 0.1).toFixed(1));
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const { id } = props.location.query
    getCanvasData(id).then((res) => {
      console.log(res);
      const { data: { data } } = res
      const { courseName, courseType, coursePrice, id, pageName, pageJson } = data
      const pageConf = { courseName, courseType, coursePrice, id, pageName, pageJson }
      const modal = pageJson.modal
      const page = pageJson.page
      setPageConfig(pageConf)
      // dispatch({type: 'editorModal/setPointData', payload: page})
      // dispatch({type: 'modal/setModalData', payload: modal})
    })
  }, [])

  const clearData = useCallback(() => {
    dispatch({ type: 'editorModal/clearAll' });
    dispatch({ type: 'modal/clearAll' })
    setActiveCanvas('default_canvas')
  }, [dispatch]);

  // const handleFormSave = useMemo(() => {
  //   return (data: any) => {
  //     dispatch({
  //       type: 'editorModal/modPointData',
  //       payload: { ...curPoint, item: { ...curPoint.item, config: data } },
  //     });
  //   };
  // }, [curPoint, dispatch]);

  // const handleDel = useMemo(() => {
  //   return (id: any) => {
  //     dispatch({
  //       type: 'editorModal/delPointData',
  //       payload: { id },
  //     });
  //   };
  // }, [dispatch]);

  const redohandler = useMemo(() => {
    return () => {
      dispatch(ActionCreators.redo());
    };
  }, [dispatch]);

  const undohandler = useMemo(() => {
    return () => {
      dispatch(ActionCreators.undo());
    };
  }, [dispatch]);

  const importTpl = (data: any) => {
    dispatch({
      type: 'editorModal/importTplData',
      payload: data,
    });
  };

  // useEffect(() => {
  //   // note (@livs-ops): 检测当前浏览器是否处于手机模式下
  //   if (detectMobileBrowser(getBrowserNavigatorMetaInfo())) {
  //     props.history.push('/mobileTip');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const allType = useMemo(() => {
    let arr: string[] = [];
    template.forEach((v: { type: string }) => {
      arr.push(v.type);
    });
    mediaTpl.forEach((v: { type: string }) => {
      arr.push(v.type);
    });
    graphTpl.forEach((v: { type: string }) => {
      arr.push(v.type);
    });
    shopTpl.forEach((v: { type: string }) => {
      arr.push(v.type);
    });

    return arr;
  }, [graphTpl, mediaTpl, template]);

  // const [dragstate, setDragState] = useState({ x: 0, y: 0 });
  // const [dragModalstate, setModalDragState] = useState({ x: 0, y: 0 });

  /* 渲染函数-左侧组件分类tab */
  const tabRender = useMemo(() => {
    if (collapsed) {
      return (
        <>
          <TabPane tab={generateHeader('base', '')} key="1"></TabPane>
          <TabPane tab={generateHeader('media', '')} key="2"></TabPane>
          <TabPane tab={generateHeader('visible', '')} key="3"></TabPane>
        </>
      );
    } else {
      return (
        <>
          <TabPane tab={generateHeader('base', '')} key="1">
            <div className={styles.ctitle}>基础组件</div>
            {template.map(
              (value: { type: string | number | symbol }, i: React.Key | null | undefined) => {
                return (
                  <TargetBox item={value} key={i} canvasId={canvasId}>
                    <React.Suspense fallback="loading">
                      <DynamicEngine
                        {...value}
                        config={schemaH5[value.type].config}
                        componentsType="base"
                        isTpl={true}
                      />
                    </React.Suspense>
                  </TargetBox>
                );
              },
            )}
          </TabPane>
          <TabPane tab={generateHeader('media', '')} key="2">
            <div className={styles.ctitle}>媒体组件</div>
            {mediaTpl.map(
              (value: { type: string | number | symbol }, i: React.Key | null | undefined) => (
                <TargetBox item={value} key={i} canvasId={canvasId}>
                  <React.Suspense fallback="loading">
                    <DynamicEngine
                      {...value}
                      config={schemaH5[value.type].config}
                      componentsType="media"
                      isTpl={true}
                    />
                  </React.Suspense>
                </TargetBox>
              ),
            )}
          </TabPane>
          <TabPane tab={generateHeader('visible', '')} key="3">
            <div className={styles.ctitle}>可视化组件</div>
            {graphTpl.map(
              (value: { type: string | number | symbol }, i: React.Key | null | undefined) => (
                <TargetBox item={value} key={i} canvasId={canvasId}>
                  <React.Suspense fallback="loading">
                    <DynamicEngine
                      {...value}
                      config={schemaH5[value.type].config}
                      componentsType={'visible'}
                      isTpl={true}
                    />
                  </React.Suspense>
                </TargetBox>
              ),
            )}
          </TabPane>
          <TabPane tab={generateHeader('shop', '')} key="4">
            <div className={styles.ctitle}>营销组件</div>
            {shopTpl.map(
              (value: { type: string | number | symbol }, i: React.Key | null | undefined) => (
                <TargetBox item={value} key={i} canvasId={canvasId}>
                  <React.Suspense fallback="loading">
                    <DynamicEngine
                      {...value}
                      config={schemaH5[value.type].config}
                      componentsType={'shop'}
                      isTpl={true}
                    />
                  </React.Suspense>
                </TargetBox>
              ),
            )}
          </TabPane>
        </>
      );
    }
  }, [canvasId, collapsed, generateHeader, graphTpl, mediaTpl, schemaH5, template]);

  // const containerRef = useRef<HTMLDivElement>(null);
  // const [diffmove, setDiffMove] = useState({
  //   start: { x: 0, y: 0 },
  //   move: false,
  // });

  // const mousedownfn = useMemo(() => {
  //   return (e: React.MouseEvent<HTMLDivElement>) => {
  //     if (e.target === containerRef.current) {
  //       setDiffMove({
  //         start: {
  //           x: e.clientX,
  //           y: e.clientY,
  //         },
  //         move: true,
  //       });
  //     }
  //   };
  // }, []);

  // const mousemovefn = useMemo(() => {
  //   return (e: React.MouseEvent<HTMLDivElement>) => {
  //     if (diffmove.move) {
  //       let diffx: number;
  //       let diffy: number;
  //       const newX = e.clientX;
  //       const newY = e.clientY;
  //       diffx = newX - diffmove.start.x;
  //       diffy = newY - diffmove.start.y;
  //       setDiffMove({
  //         start: {
  //           x: newX,
  //           y: newY,
  //         },
  //         move: true,
  //       });
  //       // setDragState((prev) => {
  //       //   return {
  //       //     x: prev.x + diffx,
  //       //     y: prev.y + diffy,
  //       //   };
  //       // });
  //     }
  //   };
  // }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  // const mouseupfn = useMemo(() => {
  //   return () => {
  //     setDiffMove({
  //       start: { x: 0, y: 0 },
  //       move: false,
  //     });
  //   };
  // }, []);

  // const onwheelFn = useMemo(() => {
  //   return (e: React.WheelEvent<HTMLDivElement>) => {
  //     if (e.deltaY < 0) {
  //       //   setDragState((prev) => ({
  //       //     x: prev.x,
  //       //     y: prev.y + 40,
  //       //   }));
  //       // } else {
  //       //   setDragState((prev) => ({
  //       //     x: prev.x,
  //       //     y: prev.y - 40,
  //       //   }));
  //     }
  //   };
  // }, []);

  // 画布区域的鼠标指针图标
  // useEffect(() => {
  //   if (diffmove.move && containerRef.current) {
  //     containerRef.current.style.cursor = 'move';
  //   } else {
  //     containerRef.current!.style.cursor = 'default';
  //   }
  // }, [diffmove.move]);

  return (
    <div className={styles.editorWrap}>
      <HeaderComponent
        redohandler={redohandler}
        undohandler={undohandler}
        pointData={pointData}
        clearData={clearData}
        location={props.location}
        importTpl={importTpl}
        pageConfig={pageConfig}
        setPageConfig={setPageConfig}
      />
      <div className={styles.container}>
        <div
          className={styles.list}
          style={{
            transition: 'all ease-in-out 0.5s',
            position: 'fixed',
            width: collapsed ? '50px' : '350px',
            zIndex: 200,
            boxShadow: 'none',
          }}
        >
          <div className={styles.componentList}>
            <Tabs
              className="editorTabclass"
              tabPosition={'left'}
              defaultActiveKey="1"
              tabBarGutter={150}
              onTabClick={() => changeCollapse(false)}
            >
              {tabRender}
            </Tabs>
          </div>
          <div
            className={styles.collapsed}
            style={{ position: 'absolute', bottom: '80px', left: '20px' }}
            onClick={() => changeCollapse(!collapsed)}
          >
            {collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
          </div>
        </div>
        <CanvasTabs
          activeCanvas={activeCanvas}
          setModalVisible={setNewModalFormVisible}
          setActiveCanvas={setActiveCanvas}
          setModalValues={setInitialValues}
        />
        <div
          style={{
            width: collapsed ? '50px' : '350px',
            transition: 'all ease-in-out 0.5s',
          }}
        ></div>
        <InfiniteCanvas accepts={allType} activeCanvas={activeCanvas} />
        <ConfigPanel visible={rightColla} setVisible={setRightColla} activeCanvas={activeCanvas} />
        <div
          className={styles.rightcolla}
          style={{
            position: 'absolute',
            right: rightColla ? 0 : '304px',
            transform: 'translate(0,-50%)',
            transition: 'all ease-in-out 0.5s',
          }}
          onClick={() => changeRightColla(!rightColla)}
        >
          {!rightColla ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </div>
        <div
          style={{
            width: rightColla ? 0 : '304px',
            transition: 'all ease-in-out 0.5s',
          }}
        ></div>
      </div>
      {/* 新增弹窗画布 */}
      <NewModalForm
        visible={newModalFormVisible}
        initialValues={initialModalValues}
        setVisible={setNewModalFormVisible}
      />
    </div>
  );
};

export default connect((state: StateWithHistory<any>) => {
  return { pstate: state.present.editorModal, cstate: state.present.editorPcModal };
})(Container);
