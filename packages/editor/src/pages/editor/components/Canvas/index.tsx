import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'umi';
import Calibration from '../../../../components/Calibration';
import { throttle, detectMobileBrowser, getBrowserNavigatorMetaInfo } from '@/utils/tool';

import CONSTANTS from '@/utils/CONSTANTS';
import TargetBox from '../../TargetBox';

import styles from '../../index.less';
import ModalBox from '../../ModalBox';

interface ICanvasProps {
  accepts: string[];
  activeCanvas: string | number;
}

const InfiniteCanvas = (props: ICanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { accepts, activeCanvas } = props;
  const [dragState, setDragState] = useState({ x: 0, y: 0 });
  const [diffmove, setDiffMove] = useState({
    start: { x: 0, y: 0 },
    move: false,
  });
  const modals = useSelector((state: any) => state.present.modal.modals);

  const mousedownfn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === containerRef.current) {
        setDiffMove({
          start: {
            x: e.clientX,
            y: e.clientY,
          },
          move: true,
        });
      }
    };
  }, []);

  const mousemovefn = useMemo(() => {
    return (e: React.MouseEvent<HTMLDivElement>) => {
      if (diffmove.move) {
        let diffx: number;
        let diffy: number;
        const newX = e.clientX;
        const newY = e.clientY;
        diffx = newX - diffmove.start.x;
        diffy = newY - diffmove.start.y;
        setDiffMove({
          start: {
            x: newX,
            y: newY,
          },
          move: true,
        });
        setDragState((prev) => {
          return {
            x: prev.x + diffx,
            y: prev.y + diffy,
          };
        });
      }
    };
  }, [diffmove.move, diffmove.start.x, diffmove.start.y]);

  const mouseupfn = useMemo(() => {
    return () => {
      setDiffMove({
        start: { x: 0, y: 0 },
        move: false,
      });
    };
  }, []);

  const onwheelFn = useMemo(() => {
    return (e: React.WheelEvent<HTMLDivElement>) => {
      if (e.deltaY < 0) {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y + 40,
        }));
      } else {
        setDragState((prev) => ({
          x: prev.x,
          y: prev.y - 40,
        }));
      }
    };
  }, []);

  // 画布区域的鼠标指针图标
  useEffect(() => {
    if (diffmove.move && containerRef.current) {
      containerRef.current.style.cursor = 'move';
    } else {
      containerRef.current!.style.cursor = 'default';
    }
  }, [diffmove.move]);
  return (
    <div
      className={styles.tickMark}
      id="calibration"
      ref={containerRef}
      onMouseDown={mousedownfn}
      onMouseMove={throttle(mousemovefn, 500)}
      onMouseUp={mouseupfn}
      onMouseLeave={mouseupfn}
      onWheel={onwheelFn}
    >
      {/* 刻度尺 */}
      <div className={styles.tickMarkTop}>
        <Calibration direction="up" id="calibrationUp" multiple={CONSTANTS.CANVAS_SCALE_NUM} />
      </div>
      {/* 刻度尺 */}
      <div className={styles.tickMarkLeft}>
        <Calibration
          direction="right"
          id="calibrationRight"
          multiple={CONSTANTS.CANVAS_SCALE_NUM}
        />
      </div>
      {/* 画布 */}
      <div>
        {activeCanvas == 'default_canvas' && (
          <TargetBox
            dragState={dragState}
            setDragState={setDragState}
            scaleNum={CONSTANTS.CANVAS_SCALE_NUM}
            canvasId={'default_canvas'}
            allType={accepts}
          />
        )}
        {modals.map((modal: any, i: any) => {
          return (
            activeCanvas == modal.id && (
              <ModalBox
                key={`modalbox-${i}`}
                dragState={dragState}
                setDragState={setDragState}
                scaleNum={CONSTANTS.CANVAS_SCALE_NUM}
                canvasId={modal.id}
                canvasData={modal}
                allType={accepts}
              />
            )
          );
        })}
      </div>
      {/* 快捷键浮窗 */}
      {/* <CanvasControl scaleNum={scaleNum} handleSlider={handleSlider} backSize={backSize} /> */}
    </div>
  );
};

export default InfiniteCanvas;
